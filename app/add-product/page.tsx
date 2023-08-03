import ButtonSubmitForm from "@/components/ButtonSubmitForm"
import { prisma } from "@/lib/db/prisma"
import { redirect } from "next/navigation"

export const metadata = {
    title: "Add products - Flowmazon"
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

const AddProduct = () => {
    return (
        <div className='flex flex-col gap-5'>

            <h1 className=" font-semibold text-xl">Add Product</h1>

            <form
                action={addProduct}
                className='flex flex-col gap-5'
            >
                <input
                    type="text"
                    required
                    name='name'
                    placeholder='Product Name'
                    className='p-5 rounded-md w-full '
                />
                <textarea
                    required
                    name='description'
                    placeholder='Product Description'
                    className='p-5 rounded-md w-full '
                />
                <input
                    type="url"
                    required
                    name='imageUrl'
                    placeholder='Image Url'
                    className='p-5 rounded-md w-full '
                />
                <input
                    required
                    name="price"
                    type="number"
                    placeholder='Product Price'
                    className='p-5 rounded-md w-full '
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