import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export const connectPrisma = async () => {
  try {
    await prisma.$connect();
    console.log("Successfully connected to the database");

    const result = await prisma.$queryRaw`SELECT current_database()`;
    console.log("Connected to database:", result);

    return true;
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    return false;
  }
};
