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

    if (!cart?.items.length) {
        return <div className=" h-96 flex flex-col items-center pt-20 gap-5">
            <p className="font-bold text-orange-500 text-6xl">Opps...</p>
            <div className="flex items-center justify-center text-xl text-orange-400 gap-2">
                <AiOutlineShoppingCart className="text-2xl"></AiOutlineShoppingCart>
                <p>
                    your cart is empty
                </p>
            </div>
            <Link href="/" className=" text-white text-xl bg-teal-700 p-5 rounded-full underline-offset-4 hover:text-2xl transition-all ease-out duration-200">Lets find what you need</Link>

        </div>

    }
    return (
        <div className=" relative flex flex-col md:flex-row md:gap-5 lg:mx-20 lg:gap-10 mt-5 md:mt-10">
        <div className="w-full">
        
            <>
              <h1 className="mb-6 text-3xl font-bold">Shopping Cart</h1>
              <div>
                {cart?.items.map((v) => {
                  return (
                    <CartEntry
                      key={v.id}
                      cartItem={v}
                      setProductQuantity={setProductQuantity}
                    />
                  );
                })}
              </div>
            </>
         
        </div>
        <div className="sticky bottom-0 h-fit w-full bg-base-100 p-5 md:top-28 md:max-w-xs md:shadow-xl">
          <p className=" mb-3">
            Subtotal ({cart?.size} items):{" "}
            <span className=" font-semibold">
              {formatPrice(cart?.subtotal || 0)}
            </span>
          </p>
          <button className="py-3 px-7 bg-teal-700 hover:bg-teal-500 text-white text-xl flex items-center justify-center w-full rounded-full transition-all ease-out duration-200">Proceed to checkout</button>
        </div>
      </div>
    )
}

export default Cart