import PriceTag from '@/components/PriceTag'
import { prisma } from '@/lib/db/prisma'
import { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import React, { cache } from 'react'

interface ProductPageProps {
    params: {
        id: string
    }
}

const getProducts = cache(async (id: string) => {
    const products = await prisma.products.findUnique({
        where: { id }
    })
    if (!products) notFound()
    return products
})

// Metadata
export async function generateMetadata(
    { params: { id } }: ProductPageProps
): Promise<Metadata> {
    const products = await getProducts(id)
    return {
        title: `${products.name} - Tokopedia`,
        description: `${products.description}`,
        openGraph: {
            images: [{ url: products.imageUrl }]
        }
    }
}

const ProductPage = async ({ params: { id } }: ProductPageProps) => {

    const products = await getProducts(id)

    return (
        <div className='flex flex-col lg:flex-row gap-5'>
            <Image
                priority
                src={products.imageUrl}
                alt={products.name}
                width={500}
                height={500}
                className='rounded-lg'
            >
            </Image>

            <div className='flex flex-col gap-5'>
                <h1 className='text-5xl font-bold'>{products.name}</h1>
                <PriceTag products={products} />
                <p>{products.description}</p>
            </div>
        </div>
    )
}

export default ProductPage