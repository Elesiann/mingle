import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  deleteAllProducts();
}

// const getAllProducts = async () => {
//   const products = await prisma.product.findMany();
//   console.log(products);
// };

const deleteAllProducts = async () => {
  const products = await prisma.product.deleteMany();
  console.log(products);
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
