import { Product } from "@prisma/client"
import Link from "next/link"
import PriceTag from "./PriceTag"
import Image from "next/image"

interface ProductCardProps {
    product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {

    // still a week
    const isNew = Date.now() - new Date(product?.createdAt).getTime() < 1000 * 60 * 60 * 24 * 7

    return (
        <Link
            href={`/product/${product?.id}`}
            className="card w-full bg-base-100 shadow-md hover:shadow-xl transition-shadow rounded-2xl"
        >
            <figure>
                <img
                    src={product?.imageUrl}
                    alt={product?.name}
                    width={800}
                    height={400}
                    className="h-48 object-cover"
                >

                </img>

            </figure>

            <div className="card-body ">
                <h2 className="card-title">
                    {product?.name}
                    {isNew
                        ?
                        <span className="badge text-sm bg-yellow-300">New</span>
                        :
                        ""
                    }
                </h2>
                <p>
                    {product?.description}
                </p>
                <PriceTag product={product} />
            </div>

        </Link>
    )
}

export default ProductCard