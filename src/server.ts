import app from "./app"
import dotenv from 'dotenv';
import { prismaConnect } from "./config/prisma";
import { initGlobalCategories } from "./services/globalCategories.service";

dotenv.config();

const PORT = Number(process.env.PORT);

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