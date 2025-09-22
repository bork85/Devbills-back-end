import { TransactionType } from '@prisma/client';
import { ObjectId } from 'mongodb';
import {z} from 'zod';

const isValidObjectId = (id:string):boolean => ObjectId.isValid(id); 

export const createTransactionSchema = z.object({
    description: z.string().min(1, "o campo descrição é obrigatório!"),
    amount: z.number().positive("o valor deve ser positivo!"),
    date: z.coerce.date({message: "Data inválida"}),
    categoryId: z.string().refine(isValidObjectId, {message:"Categoria Inválida"}),
    type: z.enum([TransactionType.expense, TransactionType.income], {message: "Tipo de transação inválido"}),
})