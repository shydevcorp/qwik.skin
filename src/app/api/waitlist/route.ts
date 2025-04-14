import { NextResponse } from "next/server";
import { prisma, connectPrisma } from "@/db/client";
import { z } from "zod";

const waitlistSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export async function POST(request: Request) {
  const isConnected = await connectPrisma();
  if (!isConnected) {
    console.error("Database connection failed");
    return NextResponse.json(
      { error: "Database connection error" },
      { status: 500 },
    );
  }

  try {
    let body;
    try {
      body = await request.json();
      console.log("Received waitlist request:", body);
    } catch (jsonError) {
      console.error("Error parsing JSON:", jsonError);
      return NextResponse.json(
        { error: "Invalid request format" },
        { status: 400 },
      );
    }

    const result = waitlistSchema.safeParse(body);
    if (!result.success) {
      const validationErrors = result.error.format();
      console.error("Validation error:", validationErrors);
      return NextResponse.json(
        { error: "Invalid email address", details: validationErrors },
        { status: 400 },
      );
    }

    const { email } = result.data;
    console.log("Processing waitlist request for email:", email);

    const existingEntry = await prisma.waitlistEntry.findUnique({
      where: { email },
    });

    if (existingEntry) {
      console.log("Email already registered:", email);
      return NextResponse.json(
        { message: "Email already registered" },
        { status: 200 },
      );
    }

    const newEntry = await prisma.waitlistEntry.create({
      data: { email },
    });

    console.log("Successfully added to waitlist:", email, newEntry.id);
    return NextResponse.json(
      { message: "Successfully added to waitlist" },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error adding to waitlist:", error);
    return NextResponse.json(
      { error: "Failed to add to waitlist" },
      { status: 500 },
    );
  }
}
