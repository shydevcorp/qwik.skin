import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

export const connectPrisma = async () => {
  try {
    await prisma.$connect();
    console.log("Connected to database successfully");
    return true;
  } catch (error) {
    console.error("Failed to connect to database:", error);
    return false;
  }
};

process.on("beforeExit", async () => {
  await prisma.$disconnect();
});
