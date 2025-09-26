import type { FastifyReply, FastifyRequest } from "fastify";
import type { IQueryParams, TransactionFilter } from "../../types/trasaction.types";
import dayjs from "dayjs";
import prisma from "../../config/prisma";
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc);

export const getTransaction = async(request:FastifyRequest, reply:FastifyReply):Promise<void> => {
    const userId = request.userId; 

    if(!userId){
        reply.status(500).send({error: "Usuário não autenticado!"})
        return
    }
    const { month, year, categoryId, type } = request.query as IQueryParams;

    const filters:TransactionFilter = {userId}

    if(month && year){
        const startDate = dayjs.utc(`${year}-${month}-01`).startOf('month').toDate();
        const finishDate = dayjs.utc(`${year}-${month}-31`).endOf('month').toDate();
        filters.date = {gte: startDate, lte: finishDate};
    }
    if (type) filters.type = type; 
    if (categoryId) filters.categoryId = categoryId;

    try {
        const transactions = await prisma.transaction.findMany({
            where: filters,
            orderBy: {date: 'desc'},
            include: {
                category: {
                    select: {
                        color: true,
                        name: true,
                        type: true,
                    },
                },
            },
        });
        reply.send(transactions);
    } catch (error) {
        if (error instanceof Error) {
            // Agora o TypeScript sabe que 'error' é do tipo 'Error'
            console.error(error.message); 
            
        } else {
            // Para outros tipos de erro
            console.error('Ocorreu um erro desconhecido:', error);
            request.log.error("Erro ao buscar transações")
            reply.status(500).send({error: "Erro no servidor"})
  }
}
}