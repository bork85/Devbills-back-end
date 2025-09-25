import type { TransactionType } from "@prisma/client";
import type { CategorySummary } from "./category.types";


export interface TransactionFilter{
    userId: string,
    date?: {
        gte: Date,
        lte: Date,
    },
    type?: TransactionType,
    categoryId?: string, 
}
export interface IQueryParams {
  month: string;
  year: string;
  categoryId?: string; // Use '?' para propriedades opcionais
  type: 'income' | 'expense'; // Exemplo de união de tipos para valores específicos
}

export interface TransactionSummary {
    totalExpenses: number,
    totalIncomes: number,
    balance: number,
    expensesByCategory: CategorySummary[],
}