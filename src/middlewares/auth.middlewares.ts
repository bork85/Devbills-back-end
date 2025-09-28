import type {FastifyReply, FastifyRequest} from 'fastify';
import admin from 'firebase-admin';

declare module 'fastify'{
    interface FastifyRequest{
        userId?: string;
    }
}

export const AuthMiddleware = async (request: FastifyRequest, reply: FastifyReply):Promise<void>=>{
    const authHeader = request.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        reply.code(401).send({error: "Token de autenticação inválido ou não fornecido"});
        return;
    }
    const token = authHeader.replace("Bearer ", "");
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        //console.log(decodedToken)
        request.userId = decodedToken.uid;        
    } catch (error) {
        if (error instanceof Error) {
            // Agora o TypeScript sabe que 'error' é do tipo 'Error'
            console.error(error.message); 
            //console.log(authHeader)
        } else{
            const message = typeof error === 'string' ? error : "Token inválido ou expirado!";
            request.log.error(`Erro ao verificar token: ${message}`);
            reply.code(401).send({error: "Token inválido ou expirado!"});
        }
    }
}