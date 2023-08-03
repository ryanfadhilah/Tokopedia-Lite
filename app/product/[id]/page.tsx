import PriceTag from '@/components/PriceTag'
import { prisma } from '@/lib/db/prisma'
import { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import React, { cache } from 'react'
import AddToCardButton from './AddToCardButton'
import { incrementProductQuantity } from './actions' // to avoid current but, we pas server action to client component as argument

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
        title: `${product.name} - Tokopedia`,
        description: `${product.description}`,
        openGraph: {
            images: [{ url: product.imageUrl }]
        }
    }
}

const ProductPage = async ({ params: { id } }: ProductPageProps) => {

    const product = await getProducts(id)

    return (
        <div className='flex flex-col items-center lg:flex-row gap-5'>
            <Image
                priority
                src={product.imageUrl}
                alt={product.name}
                width={500}
                height={500}
                className='w-full max-w-sm rounded-lg'
            >
            </Image>

            <div className='w-full flex flex-col gap-5 items-center lg:items-start'>
                <h1 className='text-5xl font-bold'>{product.name}</h1>
                <PriceTag product={product} />
                <p>{product.description}</p>
                <AddToCardButton productId={product.id} incrementProductQuantity={incrementProductQuantity}></AddToCardButton>

            </div>
        </div>
    )
}

export default ProductPage