import formatPrice from "@/lib/format"
import { Product } from "@prisma/client"

interface PriceTagProps {
    product: Product
    className?: string
}

export default function PriceTag({ product, className }: PriceTagProps) {
    return (
        <span
            className={`badge ${className}`}
        >
            {formatPrice(product.price)}
        </span>
    )
}