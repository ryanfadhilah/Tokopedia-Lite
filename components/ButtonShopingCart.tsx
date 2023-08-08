import { ShoppingCart } from '@/lib/db/cart'
import formatPrice from '@/lib/format'
import Link from 'next/link'
import React from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai'

interface ButtonShopingCart {
    cart: ShoppingCart | null
}

const ButtonShopingCart = ({ cart }: ButtonShopingCart) => {
    return (
        <div className=' dropdown dropdown-end'>

            <label tabIndex={0} className='btn-ghost btn-circle btn'>
                <div className='indicator'>
                    <AiOutlineShoppingCart className="text-2xl"></AiOutlineShoppingCart>
                    <span className=' badge badge-sm indicator-item'>{cart ? cart.size : 0}</span>
                </div>
            </label>

            <div tabIndex={0} className='card dropdown-content card-compact mt-3 w-52 bg-base shadow z-30'>
                <div className='card-body bg-white rounded-md'>
                    <span className='text-lg font-bold'>{cart ? cart.size : 0} items</span>
                    <span className=' text-gray-500'>
                        subtotal: {formatPrice(cart ? cart.subtotal : 0)}
                    </span>
                    <div className='w-full flex justify-center items-center'>
                        <Link href={"/cart"} className='flex justify-center p-3 w-full font-semibold bg-black text-white rounded-sm hover:bg-teal-500 ease-out transition-all duration-300'>VIEW CART</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ButtonShopingCart