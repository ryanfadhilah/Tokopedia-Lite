import ProductCard from "@/components/ProductCard"
import { prisma } from "@/lib/db/prisma"
import Image from "next/image"
import Link from "next/link"


export default async function Home() {

  const product = await prisma.product.findMany({
    orderBy: { id: "desc" }
  })

  function set(nama: string, data: string) {
    const coockies = { nama: data }
    return coockies
  }

  return (


    <div>
      <section className="hero bg-base-200 rounded-xl">
        <div className="hero-content flex-col gap-16 md:gap-10 md:flex-row">
          <Image
            src={product[0].imageUrl}
            alt={product[0].name}
            width={400}
            height={800}
            priority
            className="w-full max-w-sm rounded-lg shadow-2xl"
          >
          </Image>

          <div className="flex flex-col gap-5 items-center md:items-start">
            <h1 className="text-5xl font-bold">{product[0].name}</h1>
            <p>{product[0].description}</p>
            <Link className="flex  items-center justify-center p-5 w-full bg-black text-white rounded-md hover:bg-teal-500 animate-none ease-linear duration-150 outline-none" href={`/product/${product[0].id}`}>Check out</Link>
          </div>
        </div>
      </section>

      <section className="my-4 grid gap-5
      grid-cols-1 
      md:grid-cols-2 
      xl:grid-cols-3">
        {product.slice(1).map((v, i, a) => {
          return (
            <ProductCard product={v} key={i}></ProductCard>
          )
        })}

      </section>
    </div>


  )
}
