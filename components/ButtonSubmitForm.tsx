"use client"
import React from 'react'
// experimental feature
import { experimental_useFormStatus as useFormStatus } from 'react-dom'

type ButtonSubmitForm = {

    children: React.ReactNode,
    className?: string,
} & React.ComponentProps<"button">

const ButtonSubmitForm = ({ children, className, ...props }: ButtonSubmitForm) => {

    const { pending } = useFormStatus()

    return (
        <button
            {...props}
            disabled={pending}
            type='submit'
            className={className
                ?
                `${className}`
                :
                "flex items-center justify-center gap-5 p-5 w-full bg-teal-700 font-semibold text-white rounded-full hover:bg-teal-500 animate-none ease-out duration-150"
            }
        >
            {pending
                ?
                <div className='flex items-center gap-3'>
                    <p>Loading</p>
                    <p className='loading loading-spinner'></p>
                </div>
                :
                <>
                    {children}
                </>
            }

        </button>
    )
}

export default ButtonSubmitForm