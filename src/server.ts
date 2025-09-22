import app from "./app"
import dotenv from 'dotenv';

dotenv.config();

const PORT = Number(process.env.PORT);

const startServer = async () => {
    try {
        await app.listen({
            port: PORT,
        }).then(() => console.log(`Server rodando na porta ${PORT}...`))
    } catch (error) {
        console.error(error);
    }
}
startServer();