import type { FastifyReply, FastifyRequest } from "fastify";
import { createTransactionSchema } from "../../schemas/transaction.schema";
import prisma from "../../config/prisma";

const createTransaction = async (request:FastifyRequest, reply:FastifyReply): Promise<void> => {
    const userId = request.userId; 
    
    if(!userId){
        reply.status(500).send({error: "Usuário não autenticado!"})
        return
    }
    const result = createTransactionSchema.safeParse(request.body)

    if(!result.success){
        const errorMessage = result.error.message || "Validação inválida";
        return reply.status(400).send({error: errorMessage})
    }
    const transaction = result.data;

    try {
        const category =await prisma.category.findFirst({
            where: {
                id: transaction.categoryId,
                type: transaction.type,
            },
        });
        if(!category){
            reply.status(400).send({error: "Categoria inválida"})
            return;
        }
        const parsedDate = new Date(transaction.date);

        const newTransaction = await prisma.transaction.create({
            data: {
                ...transaction,
                userId,
                date: parsedDate,
            },
            include: {
                category: true,
            },
        });
        reply.status(201).send(newTransaction);
    } catch (error) {
        request.log.error("Erro ao criar transação")
        reply.status(500).send({error: "Erro interno do servidor"})
    }
}
export default createTransaction;