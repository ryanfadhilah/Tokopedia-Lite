import ButtonPagination from "@/components/ButtonPagination"
import ProductCard from "@/components/ProductCard"
import { prisma } from "@/lib/db/prisma"
import Image from "next/image"
import Link from "next/link"


interface HomeProps {
  searchParams: { page: string }
}

export default async function Home({ searchParams: { page = "1" } }: HomeProps) {

  const currentPage = parseInt(page)
  const pageSize = 6
  const heroItemCount = 1
  const totalItemCount = await prisma.product.count()
  // const totalPages = Math.ceil((totalItemCount - heroItemCount) / pageSize)
  const totalPages = Math.ceil((totalItemCount) / pageSize)
  // const totalPages = totalItemCount / pageSize

  const product = await prisma.product.findMany({
    orderBy: { id: "desc" },
    skip: (currentPage - 1) * pageSize,
    // skip: (currentPage - 1) * pageSize + (currentPage === 1 ? 0 : heroItemCount),
    take: pageSize // + (currentPage === 1 ? heroItemCount : 0)
  })

  function set(nama: string, data: string) {
    const cookies = { nama: data }
    return cookies
  }

  return (


    <div className="flex flex-col items-center py-5">

      {/* <section className="hero bg-base-100 rounded-xl">
        <div className="hero-content flex-col gap-16 md:gap-10 md:flex-row">
          <Image
            src={product[0].imageUrl}
            alt={product[0].name}
            width={400}
            height={400}
            priority
            className="w-full max-w-sm rounded-lg shadow-2xl"
          >
          </Image>

          <div className="flex flex-col gap-5 items-center md:items-start">
            <h1 className="text-5xl font-bold">{product[0].name}</h1>
            <p>{product[0].description}</p>
            <Link className="flex  items-center justify-center p-5 w-full bg-teal-700 text-white font-semibold rounded-full hover:bg-teal-500 animate-none ease-out duration-200 outline-none" href={`/product/${product[0].id}`}>Check out</Link>
          </div>
        </div>
      </section> */}

      <section className="my-4 grid gap-5
      grid-cols-1 
      md:grid-cols-2 
      xl:grid-cols-3">
        {product.map((v, i, a) => {
          return (
            <ProductCard product={v} key={i}></ProductCard>
          )
        })}
      </section>
      {
        totalPages > 1 && (
          <ButtonPagination currentPage={currentPage} totalPages={totalPages}></ButtonPagination>
        )
      }
    </div>


  )
}
