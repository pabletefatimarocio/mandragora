import { PrismaClient } from "@prisma/client";

// function prismaClientSingleton() {
//   return new PrismaClient();
// }

const prisma = globalThis.prismaGlobal ?? new PrismaClient();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
