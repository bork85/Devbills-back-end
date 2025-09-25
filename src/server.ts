import app from "./app"
import { prismaConnect } from "./config/prisma";
import { initGlobalCategories } from "./services/globalCategories.service";
import { env } from './config/env'

const PORT = env.PORT;

const startServer = async () => {
    try {
        await prismaConnect();
        await initGlobalCategories()

        await app.listen({
            port: PORT,
        }).then(() => console.log(`🟢 Server rodando na porta ${PORT}...`))

    } catch (error) {
        console.error(error);
    }
}
startServer();