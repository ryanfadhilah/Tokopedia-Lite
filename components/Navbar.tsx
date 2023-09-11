import { redirect } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getCart } from '@/lib/db/cart'
import ButtonShoppingCart from './ButtonShoppingCart'
import { AiOutlineSearch } from 'react-icons/ai'
import ButtonUserMenu from './ButtonUserMenu'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

async function searchProducts(formData: FormData) {
    "use server"
    const searchQuery = formData.get('searchQuery')?.toString()
    console.log(searchQuery)

    redirect(`/search?query=${searchQuery}`)

}


const Navbar = async () => {

    const session = await getServerSession(authOptions)
    const cart = await getCart()


    return (
        <div className='bg-white/90 backdrop-blur-sm pt-5'>
            <div className='navbar max-w-7xl m-auto gap-1 md:gap-5'>


                <div className='flex-1 gap-1 md:gap-5'>
                    <Link href="/" className='btn btn-ghost '>
                        <Image src="/Tokped.png" alt='foto' width={30} height={30} />
                        <p className='hidden md:flex tracking-wider'>TOKOPEDIA</p>
                    </Link>
                    <form action={searchProducts} className='flex-1 rounded-full'>
                        <div className='flex items-center gap-3 outline-none text-teal-950 w-full outline-1 outline-teal-500 focus:bg-teal-50 p-3 pl-6 rounded-full transition-all ease-out duration-200'>
                            <AiOutlineSearch className='text-teal-700 font-bold'></AiOutlineSearch>
                            <input
                                type="text"
                                name='searchQuery'
                                placeholder='search here'
                                className=' placeholder:italic text-teal-700  placeholder:font-light w-full outline-none bg-transparent'
                            // className=' outline-none text-teal-950 w-full outline-1 outline-teal-500 focus:bg-teal-50 p-3 pl-6 rounded-full transition-all ease-out duration-200'
                            />
                        </div>
                    </form>
                </div>


                <div className='md:flex gap-0 md:gap-5'>
                    <ButtonShoppingCart cart={cart}></ButtonShoppingCart>
                    <ButtonUserMenu session={session}></ButtonUserMenu>
                </div>


            </div>
        </div>
    )
}

export default Navbar