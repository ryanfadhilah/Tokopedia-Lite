import ProductCard from "@/components/ProductCard"
import { prisma } from "@/lib/db/prisma"
import Image from "next/image"
import Link from "next/link"


export default async function Home() {

  const products = await prisma.products.findMany({
    orderBy: { id: "desc" }
  })

  return (


    <div>
      <section className="hero bg-base-200 rounded-xl">
        <div className="hero-content flex-col gap-16 md:gap-10 md:flex-row">
          <Image
            src={products[0].imageUrl}
            alt={products[0].name}
            width={400}
            height={800}
            priority
            className="w-full max-w-sm rounded-lg shadow-2xl"
          >
          </Image>

          <div className="flex flex-col gap-5">
            <h1 className="text-5xl font-bold">{products[0].name}</h1>
            <p>{products[0].description}</p>
            <Link className="flex  items-center justify-center p-5 w-full bg-black text-white rounded-md hover:bg-teal-500 animate-none ease-linear duration-150 outline-none" href={`/products/${products[0].id}`}>Check out</Link>
          </div>
        </div>
      </section>

      <section className="my-4 grid gap-5
      grid-cols-1 
      md:grid-cols-2 
      xl:grid-cols-3">
        {products.slice(1).map((v, i, a) => {
          return (
            <ProductCard products={v} key={i}></ProductCard>
          )
        })}

      </section>
    </div>


  )
}
