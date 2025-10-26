import app from "./app"
import { prismaConnect } from "./config/prisma";
import { initGlobalCategories } from "./services/globalCategories.service";
import { env } from './config/env'
import initialyzeFirebaseAdmin from "./config/firebase";
import fastify from "fastify";

const PORT = env.PORT;

initialyzeFirebaseAdmin();

const startServer = async () => {
    try {
        await prismaConnect();
        await initGlobalCategories()

        /* await app.listen({
            port: PORT,
        }).then(() => console.log(`🟢 Server rodando na porta ${PORT}...`)) */
        module.exports = fastify;
    } catch (error) {
        console.error(error);
    }
}
startServer();