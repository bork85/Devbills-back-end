import type { FastifyInstance } from "fastify"
import createTransaction from "../controllers/transactions/createTransaction.controller"
import { getTransaction } from "../controllers/transactions/getTransaction.controller";
import { getTransactionsSummary } from "../controllers/transactions/getTransactionsSummary.controller";
import { deleteTransaction } from "../controllers/transactions/deleteTransaction.controller";
import { AuthMiddleware } from "../middlewares/auth.middlewares";
import { getHistoricalSummary } from "../controllers/transactions/getHistoricalSummary.controller";

const transactionRoutes = async (fastify:FastifyInstance)=>{
    fastify.addHook("preHandler", AuthMiddleware);

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
        method: 'GET',
        url: '/historical',
        schema: {
            querystring: 
            {                           /* zodToJsonSchema(getHistoricalSummarySchema).toString(), */
                type: 'object',
                properties: {
                    month: {type:'string',}, 
                    year: {type:'string'},
                    monthHist: {type: 'string'},
                } 
            }
        },
        handler: getHistoricalSummary,
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