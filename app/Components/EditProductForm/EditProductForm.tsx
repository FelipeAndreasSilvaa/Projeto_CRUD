"use client"
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const EditProductForm = ({id, name, image, price, category}) => {
    const [newName, setNewName] = useState(name)
    const [newImage, setNewImage] = useState(image)
    const [newPrice, setNewPrice] = useState(price)
    const [newCategory, setNewCategory] = useState(category)

    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await fetch(`http://localhost:3000/api/products/${id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({newName, newImage, newPrice, newCategory}),
            })
            if(!res.ok){
                throw new Error("Failed to update product")
            }
            router.refresh()
            router.push("/dashboard")
        } catch (error) {
            console.log(error);
            
        }
    }

  return (
    <div className="flex h-screen bg-indigo-700">
      <div className="w-full max-w-xs m-auto bg-indigo-100 rounded p-5">
        <header>
          <h1 className="text-2xl font-bold text-center">AddNewProduct</h1>
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
              placeholder="./Images/1.jpg"
              onChange={(e) => setNewImage(e.target.value)}
              value={newImage}
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
              placeholder="Name product"
              onChange={(e) => setNewName(e.target.value)}
              value={newName}
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
              placeholder="Category"
              onChange={(e) => setNewCategory(e.target.value)}
              value={newCategory}
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
              placeholder="Price"
              onChange={(e) => setNewPrice(e.target.value)}
              value={newPrice}
            />
          </div>

          <div>
            <input
              className="w-full cursor-pointer bg-indigo-700 hover:bg-pink-700 text-white font-bold py-2 px-4 mb-6 rounded"
              type="submit"
              value="UpdateProduct"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProductForm