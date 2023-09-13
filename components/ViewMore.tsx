import ProductCard from "@/components/ProductCard";
import { prisma } from "@/lib/db/prisma";
import { Metadata } from "next";

interface viewMoreProps {
  productName: string;
  productId: string;
}

export default async function ViewMore({
  productName,
  productId,
}: viewMoreProps) {
  const product = await prisma.product.findMany({
    take: 5,
    orderBy: { id: "desc" },
    where: {
      OR: [{ name: { contains: productName, mode: "insensitive" } }],
      NOT: { id: productId },
    },
  });

  const randomProduct = await prisma.product.findMany({
    take: 5,
    orderBy: { id: "desc" },
    where: {
      NOT: { id: productId },
    },
  });

  return (
    <div>
      {product.length === 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {randomProduct.map((v) => (
            <ProductCard product={v} key={v.id} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {product.map((v) => (
            <ProductCard product={v} key={v.id} />
          ))}
        </div>
      )}
    </div>
  );
}