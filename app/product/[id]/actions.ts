"use server"

import { createCart, getCart } from "@/lib/db/cart"
import { prisma } from "@/lib/db/prisma"
import { revalidatePath } from "next/cache"

export async function incrementProductQuantity(productId: string) {

    const cart = await getCart() ?? await createCart() // if exist Get Cart, else Create Cart

    const article_in_cart = cart.items.find(items => items.productId === productId) // find cartItems that match productID

    if (article_in_cart) { // if exist, update cartItems.quantity + 1
        await prisma.cartItem.update({
            where: { id: article_in_cart.id },
            data: { quantity: { increment: 1 } }
        })
    } else {
        await prisma.cartItem.create({ // else, create cartItems and setup everything
            data: {
                productId: productId,
                quantity: 1,
                cartId: cart.id
            }
        })
    }
    revalidatePath("/product/[id]")
    revalidatePath("/cart")

}

