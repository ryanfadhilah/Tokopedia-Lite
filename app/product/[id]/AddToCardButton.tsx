"use client"

import React, { useState, useTransition } from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai'
// import { incrementProductQuantity } from './actions' // to avoid current but, we pas server action to client component as argument

// to avoid bug we pas 
interface AddToCardButtonProps {
    productId: string,
    incrementProductQuantity: (productId: string) => Promise<void> // its an async function that have no return
}

const AddToCardButton = ({ productId, incrementProductQuantity }: AddToCardButtonProps) => {

    const [isPending, startTransition] = useTransition()
    const [success, setSuccess] = useState(false)

    return (
        <div className=' w-full flex items-center gap-2'>
            <button
                onClick={() => {
                    setSuccess(false)
                    startTransition(async () => {
                        await incrementProductQuantity(productId)
                        setSuccess(true)
                    })
                }}
                className='flex items-center justify-center gap-5 p-4 w-full bg-teal-700 font-semibold text-white rounded-full hover:bg-teal-500 animate-none ease-out duration-200'
            >
                {isPending
                    ? <span className='loading loading-spinner loading-md'></span>
                    : success
                        ? <span className=' tracking-widest'> success</span>
                        : <span>add to cart</span>
                }
                {/* {
                    !isPending && success
                        ? <span className=' tracking-widest'> success</span>
                        : <span>add to cart</span>
                }
                {isPending && <span className='loading loading-spinner loading-md'></span>} */}
            </button>
        </div>
    )
}

export default AddToCardButton