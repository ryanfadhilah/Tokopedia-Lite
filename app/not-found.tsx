import Link from 'next/link'
import React from 'react'
import { BiWorld } from 'react-icons/bi'

export const metadata ={
    title: "forbidden"
}

const NotFound = () => {
    return (
        <div className=" h-screen flex flex-col items-center pt-20 gap-5">
            <p className="font-bold text-orange-500 text-6xl">Opps...</p>
            <div className="flex items-center justify-center text-xl text-orange-400 gap-2">
                <BiWorld className="text-2xl"></BiWorld>
                <p>
                    404 Page Not-Found
                </p>
            </div>
            <Link href="/" className=" text-white text-xl bg-teal-700 py-5 px-7 rounded-full underline-offset-4 hover:text-2xl transition-all ease-out duration-200">Back to Shop</Link>

        </div>
    )
}

export default NotFound