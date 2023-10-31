import { prisma } from "./prisma";
import { z } from "zod";
import { FastifyInstance } from "fastify";

// modelel Product {
//   id          Int      @id @default(autoincrement())
//   title       String
//   price       Float
//   image       String
//   discount    Float
//   category    String
//   description String
//   createdAt   DateTime @default(now())
//   updatedAt   DateTime @updatedAt
// }

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
      discount: z.number()
    });

    const { title, price, description, category, image, discount } =
      createProductSchema.parse(request.body);

    await prisma.product.create({
      data: {
        title,
        price,
        description,
        category,
        image,
        discount
      }
    });
  });
}
