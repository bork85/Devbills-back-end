import { FastifyInstance } from "fastify";
import { getCategories } from "../controllers/category.controller";
import { AuthMiddleware } from "../middlewares/auth.middlewares";

const categoryRoutes = async (fastify:FastifyInstance):Promise<void> => {
    fastify.addHook("preHandler", AuthMiddleware);

    fastify.get('/', getCategories);
}
export default categoryRoutes;