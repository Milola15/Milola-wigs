import { PrismaClient } from './src/generated/prisma/client.js';
import { writeFileSync } from 'fs';

const prisma = new PrismaClient();

async function main() {
  const products = await prisma.product.findMany();
  writeFileSync('products.json', JSON.stringify(products, null, 2));
  console.log(`✅ ${products.length} produits exportés dans products.json`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());