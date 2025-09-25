import type { FastifyReply, FastifyRequest } from "fastify";
import { createTransactionSchema } from "../../schemas/transaction.schema";
import prisma from "../../config/prisma";

const createTransaction = async (request:FastifyRequest, reply:FastifyReply): Promise<void> => {
    const userId = "bork85"; 
    console.log(userId)
    if(!userId){
        reply.status(500).send({error: "Usuário não autenticado!"})
        return
    }
    console.log(request.body)
    const result = createTransactionSchema.safeParse(request.body)
    console.log(result);

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
/* const createTransaction = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    const userId = "bork85"; // Aqui, você precisa autenticar o usuário de verdade

    if (!userId) {
        reply.status(500).send({ error: "Usuário não autenticado!" });
        return;
    }

    try {
        // Garantindo que o corpo está sendo lido corretamente
        const body = await request.body;

        // Validação com Zod
        const result = createTransactionSchema.safeParse(body);
        console.log("Corpo da requisição:", body);

        if (!result.success) {
            // Melhoria: enviar todos os erros de validação
            const errorMessages = result.error.errors.map(err => err.message).join(", ");
            return reply.status(400).send({ error: errorMessages });
        }

        const transaction = result.data;

        const category = await prisma.category.findFirst({
            where: {
                id: transaction.categoryId,
                type: transaction.type,
            },
        });

        if (!category) {
            reply.status(400).send({ error: "Categoria inválida" });
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
        request.log.error("Erro ao criar transação", error);
        reply.status(500).send({ error: "Erro interno do servidor" });
    }
};

export default createTransaction; */