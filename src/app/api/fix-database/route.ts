import { NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";

const execPromise = promisify(exec);

export async function GET() {
  try {
    console.log("Starting database fix...");

    console.log("Generating Prisma client...");
    try {
      const { stdout: genOutput, stderr: genError } = await execPromise(
        "npx prisma generate",
      );
      console.log("Generate output:", genOutput);
      if (genError) console.error("Generate error:", genError);
    } catch (genErr) {
      console.error("Error generating Prisma client:", genErr);
      return NextResponse.json(
        {
          error: "Failed to generate Prisma client",
          details: genErr instanceof Error ? genErr.message : String(genErr),
        },
        { status: 500 },
      );
    }

    console.log("Running Prisma migration...");
    try {
      const { stdout: migrateOutput, stderr: migrateError } = await execPromise(
        "npx prisma migrate dev --name init-auth-schema",
      );
      console.log("Migrate output:", migrateOutput);
      if (migrateError) console.error("Migrate error:", migrateError);
    } catch (migrateErr) {
      console.error("Error running migration:", migrateErr);

      console.log("Attempting database reset...");
      try {
        const { stdout: resetOutput, stderr: resetError } = await execPromise(
          "npx prisma migrate reset --force",
        );
        console.log("Reset output:", resetOutput);
        if (resetError) console.error("Reset error:", resetError);

        return NextResponse.json({
          message: "Database reset completed",
          details: resetOutput,
        });
      } catch (resetErr) {
        console.error("Error resetting database:", resetErr);
        return NextResponse.json(
          {
            error: "Failed to reset database",
            details:
              resetErr instanceof Error ? resetErr.message : String(resetErr),
          },
          { status: 500 },
        );
      }
    }

    return NextResponse.json({
      message: "Database fix completed successfully",
    });
  } catch (error) {
    console.error("Unexpected error during database fix:", error);
    return NextResponse.json(
      {
        error: "Unexpected error during database fix",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
