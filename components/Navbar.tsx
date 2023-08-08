import { redirect } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getCart } from '@/lib/db/cart'
import ButtonShopingCart from './ButtonShopingCart'

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
            <div className='navbar max-w-7xl m-auto flex-col sm:flex-row gap-5'>

                <div className='flex-1'>
                    <Link href="/" className='btn btn-ghost'>
                        <Image src="/Tokped.png" alt='foto' width={30} height={30} />
                        <p className=' tracking-wider'>TOKOPEDIA</p>
                    </Link>
                </div>

                <div className='flex-none'>
                    <form action={searchProducts}>
                        <div className='form-control'>
                            <input
                                type="text"
                                name='searchQuery'
                                placeholder='search'
                                className='input rounded-full bg-gray-100 w-full w-min-[100px]'
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