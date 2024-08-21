"use client"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const AddNewProduct = () => {

  const [name, setName] = useState("")
  const [category, setCategory] = useState("")
  const [image, setImage] = useState("")
  const [price, setPrice] = useState("")

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if(!name || !image) {
      alert("Name and image are required")
      return
    }

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({name, image, category, price}),
      })
      if(res.ok){
        router.push("/dashboard")
      }else{
        throw new Error("Failed to create a Product")
      }
    } catch (error) {
      console.log(error);
      
    }
  }

  return (
    <div className="flex h-screen bg-indigo-700">
      <div className="w-full max-w-xs m-auto bg-indigo-100 rounded p-5">
        <header>
          <h1 className='text-2xl font-bold text-center'>AddNewProduct</h1>
        </header>
        <br />
        <form onSubmit={handleSubmit}>
         <div>
            <label className="block mb-2 text-indigo-500" htmlFor="image">
            Image
            </label>
            <input
            className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
            type="text"
            name="text"
            placeholder='./Images/1.jpg'
            onChange={(e)=> setImage(e.target.value)}
            value={image}
            />
            </div>
          <div>
            <label className="block mb-2 text-indigo-500" htmlFor="name">
              Name Product
            </label>
            <input
              className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
              type="text"
              name="name"
              placeholder='Name product'
              onChange={(e)=> setName(e.target.value)}
              value={name}
            />
          </div>
          <div>
            <label className="block mb-2 text-indigo-500" htmlFor="category">
              Category
            </label>
            <input
              className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
              type="text"
              name="category"
              placeholder='Category'
              onChange={(e)=> setCategory(e.target.value)}
              value={category}
            />
          </div>
          <div>
            <label className="block mb-2 text-indigo-500" htmlFor="price">
              Price
            </label>
            <input
              className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
              type="text"
              name="price"
              placeholder='Price'
              onChange={(e)=> setPrice(e.target.value)}
              value={price}
            />
          </div>

          <div>
            <input
              className="w-full cursor-pointer bg-indigo-700 hover:bg-pink-700 text-white font-bold py-2 px-4 mb-6 rounded"
              type="submit"
              value='AddNewProduct'
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddNewProduct