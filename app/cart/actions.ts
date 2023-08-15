import { createCart, getCart } from "@/lib/db/cart";
import { prisma } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

export async function setProductQuantity(productId: string, quantity: number) {
    "use server"
    const cart = await getCart() ?? await createCart()

    const itemsInCart = cart.items.find(v => v.productId === productId)

    if (quantity === 0) {
        if (itemsInCart) {
            await prisma.cart.update({
                where: { id: cart.id },
                data: {
                    items: {
                        delete: { id: itemsInCart.id }
                    }
                }
            })
            // await prisma.cartItem.delete({
            //     where: { id: itemsInCart.id },
            // })
        }
    } else {
        if (itemsInCart) {
            await prisma.cart.update({
                where: { id: cart.id },
                data: {
                    items: {
                        update: {
                            where: { id: itemsInCart.id },
                            data: { quantity }
                        }
                    }
                }
            })
            // await prisma.cartItem.update({
            //     where: { id: itemsInCart.id },
            //     data: { quantity: quantity }
            // })
        } else {
            await prisma.cart.update({
                where: { id: cart.id },
                data: {
                    items: {
                        create: {
                            productId: productId,
                            quantity: quantity
                        }
                    }
                }
            })
            // await prisma.cartItem.create({
            //     data: {
            //         productId: productId,
            //         cartId: cart.id,
            //         quantity: quantity
            //     }
            // })
        }

    }
    revalidatePath('/cart')
}
