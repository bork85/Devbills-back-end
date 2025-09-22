import { FastifyInstance } from "fastify";

async function routes(fastify:FastifyInstance): Promise<void> {
    fastify.get('/health', async ()=> {
        return {
            status: 'OK',
            message: 'DevBills API rodando normalmente'
        }
    })   
}
export default routes;