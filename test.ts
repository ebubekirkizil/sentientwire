import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import { createClient } from "@libsql/client";

const libsql = createClient({
  url: "file:dev.db",
});
const adapter = new PrismaLibSql(libsql);

const prisma = new PrismaClient({ adapter });

async function main() {
  try {
    const res = await prisma.article.count();
    console.log(res);
  } catch (e) {
    console.error(e);
  }
}
main();
