"use client"

import { CartItemWithProducts } from "@/lib/db/cart"
import formatPrice from "@/lib/format"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useTransition } from "react"

interface CartEntryProps {
    cartItem: CartItemWithProducts,
    setProductQuantity: (productId: string, quantity: number) => Promise<void>
}

const CartEntry = ({ cartItem, setProductQuantity }: CartEntryProps) => {

    const quantityOptions: JSX.Element[] = []

    for (let i = 1; i < 99; i++) {
        quantityOptions.push(
            <option key={i} value={i}>{i}</option>
        )
    }

    const [isPending, startTransition] = useTransition()


    return (
        <div className="">

            <div className="flex flex-wrap items-center gap-5">
                <Image
                    height={150}
                    width={150}
                    src={cartItem.product.imageUrl}
                    alt={cartItem.product.name}
                    className="rounded-lg"
                />

                <div className="flex flex-col gap-2 text-sm">
                    <Link
                        href={`/product/${cartItem.product.id}`}
                        className="font-bold text-xl"
                    >
                        {cartItem.product.name}
                    </Link>
                    <div>Price : {formatPrice(cartItem.product.price)}</div>
                    <div>Total Price : {formatPrice(cartItem.product.price * cartItem.quantity)}</div>
                    {isPending
                        ? <span className=" loading loading-spinner"></span>
                        :
                        <div className="my-1 flex items-center gap-3">
                            Quantity:
                            <select defaultValue={cartItem.quantity}
                                onChange={(e) => {
                                    const newQuantity = parseInt(e.currentTarget.value)
                                    startTransition(async () => {
                                        await setProductQuantity(cartItem.product.id, newQuantity)
                                    })
                                }}
                                className="select select-bordered w-full max-w-[80px]
                        ">
                                <option value={0}>0 (remove)</option>
                                {quantityOptions}
                            </select>
                        </div>
                    }
                    {/* <div className="my-1 flex items-center gap-3">
                        Quantity:
                        <select defaultValue={cartItem.quantity}
                            onChange={(e) => {
                                const newQuantity = parseInt(e.currentTarget.value)
                                startTransition(async () => {
                                    await setProductQuantity(cartItem.product.id, newQuantity)
                                })
                            }}
                            className="select select-bordered w-full max-w-[80px]
                        ">
                            <option value={0}>0 (remove)</option>
                            {quantityOptions}
                        </select>
                    </div> */}
                </div>
            </div>

            <div className=" divider"></div>

        </div>
    )
}

export default CartEntry