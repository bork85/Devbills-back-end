import Fastify from 'fastify';
import routes from './routes';
import type { FastifyInstance } from 'fastify';
import cors from '@fastify/cors'

const app:FastifyInstance = Fastify({
    logger: true,
    //readyContext: { initialised: false },
});
app.register(cors, {
    origin: true,
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH", "OPTIONS"]
}
    
);
app.register(routes);
export default app;