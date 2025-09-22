import Fastify from 'fastify';
import routes from './routes';
import type { FastifyInstance } from 'fastify';

const app:FastifyInstance = Fastify({
    logger: true
});

app.register(routes);

export default app

/* // app.ts
import Fastify from 'fastify';
import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';
import { TransactionType } from '@prisma/client';
import { ObjectId } from 'mongodb';

// Seu schema de validação
const isValidObjectId = (id: string): boolean => ObjectId.isValid(id);
const createTransactionSchema = z.object({
  description: z.string().min(1, "o campo descrição é obrigatório!"),
  amount: z.number().positive("o valor deve ser positivo!"),
  date: z.coerce.date({ message: "Data inválida" }),
  categoryId: z.string().refine(isValidObjectId, { message: "Categoria Inválida" }),
  type: z.enum([TransactionType.expense, TransactionType.income], { message: "Tipo de transação inválido" }),
});

const fastify = Fastify({ logger: true });

// A rota mais simples para testar a validação
fastify.post('/transactions', {
  schema: {
    body: zodToJsonSchema(createTransactionSchema),
  },
  handler: async (request, reply) => {
    // Se chegou aqui, a validação funcionou.
    return { success: true, message: 'JSON validado com sucesso!' };
  },
});

const start = async () => {
  try {
    await fastify.listen({ port: 3001 });
    console.log('Servidor rodando em http://localhost:3001');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start(); */