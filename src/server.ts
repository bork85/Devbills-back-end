// Novo arquivo: src/server.ts (Padrão Serverless)

// Importe a instância do Fastify configurada
import app from "./app"; 
import { prismaConnect } from "./config/prisma";
import { initGlobalCategories } from "./services/globalCategories.service";
import initialyzeFirebaseAdmin from "./config/firebase";

// 1. Ações Síncronas (se houver)
initialyzeFirebaseAdmin();
let initOK = false;
// 2. Garanta que todas as ações assíncronas sejam executadas
const initialize = async () => {
    // Estas chamadas serão feitas APENAS na primeira vez (cold start)
    await prismaConnect();
    await initGlobalCategories();
    // Você também pode adicionar um await app.ready() aqui se necessário
    console.log('✅ Serviços assíncronos prontos.');
    initOK = true;
};

// 3. Exporte a função handler Serverless
// Esta função é o que a Vercel executa em CADA requisição
module.exports = async (req: any, res: any) => {
    // Garante que o cold start só prossiga após a inicialização
    if (!initOK) {
        await initialize();
        initOK = true; // Flag simples para evitar re-execução
    }
    
    // Deixa o Fastify lidar com a requisição
    await app.ready(); // Garante que o Fastify está totalmente pronto
    app.server.emit('request', req, res);
};