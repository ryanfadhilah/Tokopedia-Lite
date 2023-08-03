"use client"

import React, { useState, useTransition } from 'react'
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
                className='flex items-center justify-center gap-5 p-5 w-full bg-black text-white rounded-md hover:bg-teal-500 animate-none ease-linear duration-150'
            >

                {
                    !isPending && success
                        ? <span className=' tracking-widest'> success</span>
                        : "add to cart"
                }
                {isPending && <span className='loading loading-spinner loading-md'></span>}
            </button>
        </div>
    )
}

export default AddToCardButton