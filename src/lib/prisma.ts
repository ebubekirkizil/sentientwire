process.env.DATABASE_URL = "file:./dev.db";
import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import { createClient } from "@libsql/client";

const libsql = createClient({
  url: "file:dev.db",
});
const adapter = new PrismaLibSql(libsql);

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
  adapter,
  datasources: {
    db: {
      url: "file:dev.db"
    }
  }
});

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
