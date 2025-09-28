import type { FastifyReply, FastifyRequest } from "fastify";
import type { GetTransactionSummaryQuery } from "../../schemas/transaction.schema";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc'
import prisma from "../../config/prisma";
import { CategorySummary } from "../../types/category.types";
import { TransactionType } from "@prisma/client";
import { TransactionSummary } from "../../types/trasaction.types";

dayjs.extend(utc);

export const getTransactionsSummary = async (
    request: FastifyRequest<{Querystring: GetTransactionSummaryQuery}>, 
    reply: FastifyReply,
): Promise<void> => {
    const userId = request.userId; 
    
    if(!userId){
        reply.status(500).send({error: "Usuário não autenticado!"})
        return
    }

    const {month, year} = request.query;

    if(!month || !year){
        reply.status(400).send({error: "Mes e Ano são obrigatórios!"});
        return; 
    }
    const startDate = dayjs.utc(`${year}-${month}-01`).startOf('month').toDate();
    const finishDate = dayjs.utc(`${year}-${month}-31`).endOf('month').toDate();
    try {
        const transactions = await prisma.transaction.findMany({
            where: {
                userId,
                date: {
                    gte:startDate,
                    lte: finishDate,
                },
            },
            orderBy: {date: 'desc'},
            include: {
                category: true,
            },
        });
        let totalExpenses = 0;
        let totalIncomes = 0;
        const groupedExpenses = new Map<string, CategorySummary>();

        for (const transaction of transactions) {
            if(transaction.type === TransactionType.expense) {
                const existing = groupedExpenses.get(transaction.categoryId) ?? {
                    categoryId: transaction.categoryId,
                    categoryName: transaction.category.name,
                    categoryColor: transaction.category.color,
                    amount: 0,
                    percentage: 0,
                }
                existing.amount += transaction.amount;
                groupedExpenses.set(transaction.categoryId, existing);
                totalExpenses += transaction.amount;
            } else {
                totalIncomes += transaction.amount;
            }
        }
        const summary: TransactionSummary = {
            totalExpenses,
            totalIncomes,
            balance: Number.parseFloat((totalIncomes - totalExpenses).toFixed(2)),
            expensesByCategory: Array.from(groupedExpenses.values()).map((entry) => ({
                ...entry,
                percentage: Number.parseFloat(((entry.amount / totalExpenses) * 100).toFixed(2)),
            })).sort((a,b)=> b.amount - a.amount),
        }

        reply.send(summary);
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
}}