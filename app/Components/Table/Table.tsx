import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import RemoveBtn from '../RemoveBtn/RemoveBtn'

const getProducts = async () => {
    try {
        const res = await fetch("http://localhost:3000/api/products", {
            cache: "no-store",
        })

        if(!res.ok){
            throw new Error("Failed to fetch products")
        }

        return res.json()
    } catch (error) {
        console.log("Error loading products: ", error);
        
        
    }
}
export default async function Table () {

    const {products} = await getProducts()

  return (
    <div className="shadow-lg rounded-lg overflow-hidden mx-4 md:mx-10">
        <div className="flex justify-between">
            <div>
                <h1 className='text-2xl font-bold'>Product Table</h1>
            </div>
            <div>
                <Link href={'./addNewProduct'}>
                    <button
                        className="border border-blue-500 bg-blue-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-blue-700 focus:outline-none focus:shadow-outline">
                        Add Product
                    </button>
                </Link>
            </div>
        </div>
        <table className="w-full table-fixed mt-5">
            <thead>
                <tr className="bg-gray-100">
                    <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Name</th>
                    <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Price</th>
                    <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Category</th>
                    <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Status</th>
                </tr>
            </thead>
            <tbody className="bg-white">
               {products.map((rs)=> (
                <tr className='hover' key={rs._id}>
                    <td>
                        <div className='flex items-center gap-3'>
                            <div className="avatar">
                                <div className='w-12 h-12'>
                                    <Image src={rs.image} alt={rs.name}
                                    width={80}
                                    height={80}
                                    className='rounded-lg' />
                                </div>
                            </div>
                        </div>
                    </td>
                    <td>
                        ${rs.price}
                    </td>
                    <td>{rs.category}</td>
                    <th>
                        <Link href={`/editProduct/${rs._id}`}>
                            <button className='btn bg-cyan-300 py-3 px-4'>Edit</button>
                        </Link>
                        <RemoveBtn id={rs._id} />
                    </th>
                </tr>
               ))}
            </tbody>
        </table>
    </div>
  )
}