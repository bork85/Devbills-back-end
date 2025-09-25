import type { FastifyInstance } from "fastify"
import createTransaction from "../controllers/transactions/createTransaction.controller"
import { zodToJsonSchema } from "zod-to-json-schema";
import { createTransactionSchema, deleteTransactionSchema, getTransactionSchema, getTransactionSummarySchema } from "../schemas/transaction.schema";
//import { object } from "zod";
import { getTransaction } from "../controllers/transactions/getTransaction.controller";
import { getTransactionsSummary } from "../controllers/transactions/getTransactionsSummary.controller";
import { object } from "zod";
import { deleteTransaction } from "../controllers/transactions/deleteTransaction.controller";

const transactionRoutes = async (fastify:FastifyInstance)=>{
    // criar transação
    fastify.route({
        method: "POST",
        url: "/" ,
        schema: {
            body: {
                type: "object",
                required: ['description', 'amount', 'date', 'categoryId', 'type'],
                properties: {
                    description: {type: 'string'},
                    amount: {type: 'number'},
                    date: {type: 'string', format: 'date-time'},
                    categoryId: {type: 'string'},
                    type: {type: 'string', enum: ['expense','income']},
                }

            }
           // body: zodToJsonSchema(createTransactionSchema, 'createTransactionSchema'),

        },
        handler: createTransaction,
    });

    // buscar transações com filtro de mes/ano
    fastify.route({
        method: "GET",
        url: "/" ,
        schema: {
            querystring: {
                type: 'object',
                properties: {
                    month: {type:'string',}, 
                    year: {type:'string'}, 
                    categoryId: {type:'string'},
                    type: {type:'string', enum: ['expense','income']},
                } 
            }                                     //zodToJsonSchema(getTransactionSchema, "getTransactionSchema")
        },
        handler: getTransaction,   
    });
    fastify.route({
        method: 'GET',
        url: '/summary',
        schema: {
            querystring: {                           /* zodToJsonSchema(getTransactionSummarySchema), */
                type: 'object',
                properties: {
                    month: {type:'string',}, 
                    year: {type:'string'}, 
                } 
            }
        },
        handler: getTransactionsSummary,
    });
    fastify.route({
        method: 'DELETE',
        url: '/:id',
        schema: {
            params: {                                           //deleteTransactionSchema
                type: 'object',
                properties: {
                    id: {type: 'string'},
                },                
            },       
        },
        handler: deleteTransaction,
    });
}
export default transactionRoutes