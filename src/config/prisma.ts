import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const prismaConnect = async () => {
    try {
        await prisma.$connect();
        console.log('✅ DB conectado!')
    } catch (error) {
        console.error('❌ Falha ao conectar DB!')
    }
};

export default prisma;