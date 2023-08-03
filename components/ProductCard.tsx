import { products } from "@prisma/client"
import Link from "next/link"
import PriceTag from "./PriceTag"
import Image from "next/image"

interface ProductCardProps {
    products: products
}

const ProductCard = ({ products }: ProductCardProps) => {

    // still a week
    const isNew = Date.now() - new Date(products?.createdAt).getTime() < 1000 * 60 * 60 * 24 * 7

    return (
        <Link
            href={`/products/${products?.id}`}
            className="card w-full bg-base-100 hover:shadow-xl transition-shadow"
        >
            <figure>
                <Image
                    src={products?.imageUrl}
                    alt={products?.name}
                    width={800}
                    height={400}
                    className="h-48 object-cover"
                >

                </Image>

            </figure>

            <div className="card-body ">
                <h2 className="card-title">
                    {products?.name}
                    {isNew
                        ?
                        <span className="badge text-sm bg-yellow-300">New</span>
                        :
                        ""
                    }
                </h2>
                <p>
                    {products?.description}
                </p>
                <PriceTag products={products} />
            </div>

        </Link>
    )
}

export default ProductCard