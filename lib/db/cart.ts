import { cookies } from "next/dist/client/components/headers"
import { prisma } from "./prisma"
import { Cart, Prisma } from "@prisma/client"
import { revalidatePath } from "next/cache"


export type CartWithProducts = Prisma.CartGetPayload<{
    include: { items: { include: { product: true } } }
}>

export type CartItemWithProducts = Prisma.CartItemGetPayload<{
    include: { product: true }
}>

// export type ShoppingCart = Cart & {
export type ShoppingCart = CartWithProducts & {
    size: number,
    subtotal: number
}


export async function getCart(): Promise<ShoppingCart | null> {

    // try to get cookies
    const localCardId = cookies().get("localCardId")?.value

    // if exist, find the matching id & save/include product data to cart
    const cart = localCardId
        ? await prisma.cart.findUnique({
            where: { id: localCardId },
            include: { items: { include: { product: true } } }
        })
        : null

    if (!cart) {
        return null
    }

    // Objective: return cart data && total item in cart && total price

    return {
        ...cart,
        size: cart.items.reduce((accumulated, item) => accumulated + item.quantity, 0),
        subtotal: cart.items.reduce((accumulated, item) => accumulated + item.quantity * item.product.price, 0)
    }

}

// triggered if user add product to their cart
export async function createCart(): Promise<ShoppingCart> {

    // Create Data in MongoDB
    const cart = await prisma.cart.create({
        data: {}
    })

    // Update Browser cookies (it should be encrypted in production)
    cookies().set("localCardId", cart.id)

    // Return Result
    return {
        ...cart,
        items: [],
        size: 0,
        subtotal: 0
    }
}



