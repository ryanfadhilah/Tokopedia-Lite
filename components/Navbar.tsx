import { redirect } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getCart } from '@/lib/db/cart'
import ButtonShopingCart from './ButtonShopingCart'
import { AiOutlineSearch } from 'react-icons/ai'

async function searchProducts(formData: FormData) {
    "use server"
    const searchQuery = formData.get('searchQuery')?.toString()
    console.log(searchQuery)

    redirect(`/search?query=${searchQuery}`)

}


const Navbar = async () => {

    const cart = await getCart()

    return (
        <div className='bg-base-100'>
            <div className='navbar max-w-7xl m-auto flex-col sm:flex-row gap-2 md:gap-5'>


                <div className='md:flex-1'>
                    <Link href="/" className='btn btn-ghost'>
                        <Image src="/Tokped.png" alt='foto' width={30} height={30} />
                        <p className=' tracking-wider'>TOKOPEDIA</p>
                    </Link>
                </div>


                <div className='flex-none gap-2'>
                    <form action={searchProducts}>
                        <div className='flex gap-2 items-center input rounded-full bg-base-200 hover:bg-base-300 focus:bg-base-100 w-full w-min-[100px] transition-all ease-linear duration-100'>
                            <AiOutlineSearch className='text-gray-400 '></AiOutlineSearch>
                            <input
                                type="text"
                                name='searchQuery'
                                placeholder='search'
                                className='p-auto outline-none bg-inherit'
                            />
                        </div>
                    </form>
                    <ButtonShopingCart cart={cart}></ButtonShopingCart>
                </div>


            </div>
        </div>
    )
}

export default Navbar