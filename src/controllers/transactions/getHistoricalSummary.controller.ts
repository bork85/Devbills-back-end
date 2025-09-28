import { FastifyReply, FastifyRequest } from "fastify"
import { GetHistoricalSummaryQuery } from "../../schemas/transaction.schema"
import dayjs from "dayjs";
import 'dayjs/locale/pt-br'
import utc from 'dayjs/plugin/utc'
import prisma from "../../config/prisma";

dayjs.extend(utc);
dayjs.locale('pt-br');

export const getHistoricalSummary = async (
    request: FastifyRequest<{Querystring: GetHistoricalSummaryQuery}>, reply: FastifyReply): Promise<void> => {
    const userId = request.userId; 
    
    if(!userId){
        reply.status(500).send({error: "Usuário não autenticado!"})
        return;
        
    }
    const {month, year, monthHist = 6} = request.query;

    if(!month || !year){
        reply.status(400).send({error: "Mes e Ano são obrigatórios!"});
        return; 
    }
    const baseDate = new Date(year, month - 1, 1);
    const startDate = dayjs.utc(baseDate).subtract(monthHist - 1, 'month').startOf('month').toDate();
    const endDate = dayjs.utc(baseDate).endOf('month').toDate();

    try {
        const transactions = await prisma.transaction.findMany({
            where: {
                userId,
                date: {
                    gte: startDate,
                    lte: endDate,
                },
            },
            select: {
                amount: true,
                type: true,
                date: true,
            }
        })
        const monthlyData = Array.from({length: monthHist}, (_,i)=>{
            const date = dayjs.utc(baseDate).subtract(monthHist - 1 - i, 'month');
            return {
                name: date.format('MMM/YYYY'),
                income: 0,
                expense: 0,
            }
        })

        transactions.forEach((transaction) => {
            const monthKey = dayjs.utc(transaction.date).format('MMM/YYYY');
            const monthData = monthlyData.find((m)=> m.name === monthKey);
            if(monthData){
                if(transaction.type === 'income'){
                    monthData.income += transaction.amount;
                }else if (transaction.type === 'expense'){
                    monthData.expense += transaction.amount;
                }
            }
        })
        reply.send({history: monthlyData});
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
 