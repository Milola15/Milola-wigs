import prisma from '@/lib/prisma';
import CollectionsClient from '@/app/components/CollectionsClient';

export default async function CollectionsPage({ searchParams }) {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
  });

  const categorieInitiale = searchParams?.cat || 'tout';

  return (
    <CollectionsClient
      products={products}
      categorieInitiale={categorieInitiale}
    />
  );
}