import { PrismaClient } from "@prisma/client";

// Add better global type declaration
declare global {
  var prisma: PrismaClient | undefined;
}

// Use global prisma instance to prevent multiple instances during hot reloading
export const prisma =
  global.prisma ||
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

// Only assign to global object in development to prevent memory leaks in production
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

// Graceful shutdown
process.on("beforeExit", async () => {
  await prisma.$disconnect();
});
