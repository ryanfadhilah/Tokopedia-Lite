import PriceTag from '@/components/PriceTag'
import { prisma } from '@/lib/db/prisma'
import { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import React, { cache } from 'react'
import AddToCardButton from './AddToCardButton'
import { incrementProductQuantity } from './actions' // to avoid current but, we pas server action to client component as argument
import ViewMore from '@/components/ViewMore'
import formatPrice from '@/lib/format'



interface ProductPageProps {
    params: {
        id: string
    }
}

const getProducts = cache(async (id: string) => {
    const product = await prisma.product.findUnique({
        where: { id }
    })
    if (!product) notFound()
    return product
})

// Metadata
export async function generateMetadata(
    { params: { id } }: ProductPageProps
): Promise<Metadata> {
    const product = await getProducts(id)
    return {
        title: `${product.name} - TOKOPEDIA`,
        description: `${product.description}`,
        openGraph: {
            images: [{ url: product.imageUrl }]
        }
    }
}

const ProductPage = async ({ params: { id } }: ProductPageProps) => {

    const product = await getProducts(id)

    return (
        <div className=" flex flex-col gap-10 lg:mx-20 py-5 md:py-10">
        <div className=" grid h-full w-full grid-cols-1 gap-10 overflow-hidden md:h-[400px] md:grid-cols-2">
          <div className="h-full w-full overflow-clip md:col-start-1 md:col-end-2">
            <img
              src={product.imageUrl}
              alt={product.name}
              width={1000}
              height={1000}
              className="h-[400px] w-full object-none  rounded-lg"
 
            />
          </div>
          <div className=" flex flex-col justify-between md:col-start-2 md:col-end-3">
            <div>
              <h1 className=" text-5xl font-bold">{product.name}</h1>
              <p className="py-6 ">{product.description}</p>
            </div>
            <div className="flex flex-col gap-5">
              <p className="text-xl font-bold sm:text-3xl">
                {formatPrice(product.price)}
              </p>
              <AddToCardButton
                productId={product.id}
                incrementProductQuantity={incrementProductQuantity}
              />
            </div>
          </div>
        </div>
        <div className=" mt-5 flex flex-col gap-3">
          <h1 className=" text-xl md:text-3xl">You Might Also Like</h1>
          <ViewMore
            productName={`${product.name.substring(0, 4)}`}
            productId={`${product.id}`}
          />
        </div>
      </div>
    )
}

export default ProductPage