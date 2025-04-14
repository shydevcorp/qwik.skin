import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

export const connectPrisma = async () => {
  try {
    await prisma.$connect();
    return true;
  } catch (error) {
    console.error("Failed to connect to db:", error);
    return false;
  }
};
