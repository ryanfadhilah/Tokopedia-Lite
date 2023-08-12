import CartEntry from "@/components/CartEntry"
import { getCart } from "@/lib/db/cart"
import { setProductQuantity } from "./actions"

export const metadata = {
    title: "Your Cart - Tokopedia"
}

const Cart = async () => {

    const cart = await getCart()

    return (
        <div>

            <h1 className='text-3xl font-bold'></h1>

            {cart?.items.map((v, i, a) => {
                return (
                    <CartEntry
                        key={i}
                        cartItem={v}
                        setProductQuantity={setProductQuantity}
                    />
                )
            })}

        </div>
    )
}

export default Cart