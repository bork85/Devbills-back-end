import Fastify from 'fastify';
import routes from './routes';
import type { FastifyInstance } from 'fastify';
import cors from '@fastify/cors'

const app:FastifyInstance = Fastify({
    logger: true
});
app.register(cors);
app.register(routes);

export default app;