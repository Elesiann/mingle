import { prisma } from "./prisma";
import { z } from "zod";
import { FastifyInstance, FastifyRequest } from "fastify";

export async function AppRoutes(app: FastifyInstance) {
  app.get("/products", async (request, reply) => {
    const products = await prisma.product.findMany();
    reply.send(products);
  });

  app.post("/products", async (request) => {
    const createProductSchema = z.object({
      title: z.string(),
      price: z.number(),
      description: z.string(),
      category: z.string(),
      image: z.string(),
      discount: z.number(),
      type: z.string()
    });

    const { title, price, description, category, image, discount, type } =
      createProductSchema.parse(request.body);

    await prisma.product.create({
      data: {
        title,
        price,
        description,
        category,
        image,
        discount,
        type
      }
    });
  });

  app.get(
    "/products/:id",
    async (request: FastifyRequest<{ Params: { id: string } }>, reply) => {
      const { id } = request.params;

      const product = await prisma.product.findUnique({
        where: {
          id: Number(id)
        }
      });

      reply.send(product);
    }
  );
}
