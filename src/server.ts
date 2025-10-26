import app from "./app"
import { prismaConnect } from "./config/prisma";
import { initGlobalCategories } from "./services/globalCategories.service";
import { env } from './config/env'
import initialyzeFirebaseAdmin from "./config/firebase";

const PORT = env.PORT;

initialyzeFirebaseAdmin();

const initAsyncServices = async () => {
    try {
        await prismaConnect();
        await initGlobalCategories();
        console.log('✅ Inicialização de serviços completa (Cold Start).');
    } catch (error) {
        console.error('❌ Erro na inicialização de serviços:', error);
        // O log de erro será crucial se a aplicação não funcionar.
    }
}
initAsyncServices();

// 3. Exportação Direta do Handler (CRUCIAL PARA O VERCEL)
// Este é o objeto que a Vercel espera para rotear as requisições.
module.exports = app;
