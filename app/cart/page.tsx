import CartEntry from "@/components/CartEntry"
import { getCart } from "@/lib/db/cart"
import { setProductQuantity } from "./actions"
import Link from "next/link"
import { AiOutlineShoppingCart } from "react-icons/ai"
import formatPrice from "@/lib/format"

export const metadata = {
    title: "Your Cart - Tokopedia"
}

const Cart = async () => {

    const cart = await getCart()

    // if (!cart?.items.length) {
    //     return <div className=" h-96 flex flex-col items-center pt-20 gap-5">
    //         <p className="font-bold text-orange-500 text-6xl">Opps...</p>
    //         <div className="flex items-center justify-center text-xl text-orange-400 gap-2">
    //             <AiOutlineShoppingCart className="text-2xl"></AiOutlineShoppingCart>
    //             <p>
    //                 your cart is empty
    //             </p>
    //         </div>
    //         <Link href="/" className=" text-white text-xl bg-teal-700 p-5 rounded-full underline-offset-4 hover:text-2xl transition-all ease-out duration-200">Lets find what you need</Link>

    //     </div>

    // }
    return (
        <div className="flex flex-col gap-10 
        pt-10">
            <h1 className='text-2xl font-bold text-teal-700'>Shopping Cart</h1>
            {cart?.items.map((v, i, a) => {
                return (
                    <CartEntry
                        key={i}
                        cartItem={v}
                        setProductQuantity={setProductQuantity}
                    />
                )
            })}

            <div className="p-5 flex flex-col gap-5">
                <p className="font-bold">
                    Total: {formatPrice(cart?.subtotal || 0)}
                </p>
                <button className="p-4 font-semibold bg-teal-700 text-white rounded-full hover:bg-teal-500 transition-all ease-out duration-200"> Checkout</button>
            </div>

        </div>
    )
}

export default Cart