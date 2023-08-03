import formatPrice from "@/lib/format"
import { products } from "@prisma/client"

interface PriceTagProps {
    products: products
    className?: string
}

export default function PriceTag({ products, className }: PriceTagProps) {
    return (
        <span
            className={`badge ${className}`}
        >
            {formatPrice(products.price)}
        </span>
    )
}