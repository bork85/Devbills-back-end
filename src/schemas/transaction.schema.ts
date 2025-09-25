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
});

export const getTransactionSchema = z.object({
    month: z.string().optional(),
    year: z.string().optional(),
    categoryId: z.string().refine(isValidObjectId, {message:"Categoria Inválida"}).optional(),
    type: z.enum([TransactionType.expense, TransactionType.income], {message: "Tipo de transação inválido"}).optional(),
});

export const getTransactionSummarySchema = z.object({
    month: z.string({message: "Valor MES inválido"}),
    year: z.string({message: "Valor ANO inválido"}),   
});

export const deleteTransactionSchema = z.object({
    id: z.string().refine(isValidObjectId, {message:"ID Inválido"}),
});

export type getTransactionQuery =z.infer<typeof getTransactionSchema>;
export type getTransactionSummaryQuery =z.infer<typeof getTransactionSummarySchema>;
export type deleteTransactionParams = z.infer<typeof deleteTransactionSchema>;