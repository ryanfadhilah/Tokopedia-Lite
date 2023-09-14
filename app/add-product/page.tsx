import ButtonSubmitForm from "@/components/ButtonSubmitForm"
import { prisma } from "@/lib/db/prisma"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "../api/auth/[...nextauth]/route"

export const metadata = {
    title: "Add products - Tokopedia"
}

async function addProduct(formData: FormData) {
    'use server'

    // get data from Form
    const name = formData.get("name")?.toString()
    const description = formData.get("description")?.toString()
    const imageUrl = formData.get("imageUrl")?.toString()
    const price = Number(formData.get("price") || 0);


    // server validation
    if (!name || !description || !imageUrl || !price) {
        throw Error("Missing required fields");
    }

    // send data to server
    await prisma.product.create({
        data: { name, description, imageUrl, price }
    });


    redirect("/");
}

const AddProduct = async () => {

    const session = await getServerSession(authOptions)

    if (!session) {
        redirect("/api/auth/signin?callbackUrl=/add-product")
    }

    return (
        <div className='flex flex-col gap-5 bg-base-100 py-5 rounded-md'>

            <h1 className=" font-semibold text-xl text-teal-700">Add Product</h1>

            <form
                action={addProduct}
                className='flex flex-col gap-5'
            >
                <label className="font-semibold">Name</label>
                <input
                    required
                    type="text"
                    name='name'
                    placeholder='Product Name'
                    className=' placeholder:italic p-5 rounded-sm w-full bg-base-200 placeholder:text-teal-700 focus:bg-teal-50 transition-all ease-out duration-200 outline-none hover:outline-2 hover:outline-teal-700'
                />
                <label className="font-semibold">Description</label>
                <textarea
                    required
                    name='description'
                    placeholder='Product Description'
                    className=' placeholder:italic p-5 rounded-sm w-full bg-base-200 placeholder:text-teal-700 focus:bg-teal-50 transition-all ease-out duration-200 outline-none hover:outline-2 hover:outline-teal-700'
                />
                <label className="font-semibold">Image Url</label>
                <input
                    type="url"
                    required
                    name='imageUrl'
                    placeholder='URL'
                    className=' placeholder:italic p-5 rounded-sm w-full bg-base-200 placeholder:text-teal-700 focus:bg-teal-50 transition-all ease-out duration-200 outline-none hover:outline-2 hover:outline-teal-700 '
                />
                <label className="font-semibold">Price</label>
                <input
                    required
                    name="price"
                    type="number"
                    placeholder='Product Price'
                    className=' placeholder:italic p-5 rounded-sm w-full bg-base-200 placeholder:text-teal-700 focus:bg-teal-50 transition-all ease-out duration-200 outline-none hover:outline-2 hover:outline-teal-700 '
                />
                <ButtonSubmitForm
                    type="submit"
                >
                    Add Product
                </ButtonSubmitForm>


            </form>
        </div>
    )
}

export default AddProduct