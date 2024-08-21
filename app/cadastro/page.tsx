"use client"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const Cadastro = () => {

  const router = useRouter()
  const [error, setError] = useState("")

  const isValidEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email)
  }

  const isValidUsername = (name: string): boolean => {
    return name.trim().length > 0;
  }
  

  const handleSubmit = async(e: any) => {
    e.preventDefault()
    const name = e.target[0].value
    const email = e.target[1].value
    const password = e.target[2].value

    if(!isValidUsername(name)){
      setError("Username is necessary")
      return
    }

    if(!isValidEmail(email)) {
      setError("Email is invalid")
      return
    }

    if(!password || password.lenght < 8) {
      setError("password must be at least 5 characters long")
      return
    }
    
    try {
      const res = await fetch("http://localhost:3000/api/register", {
        method: 'POST',
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          password,
        })
      })

      if(res.status === 400){
        setError("This email is already registered")
      }
      if(res.status === 200){
        setError("")
        router.push("/")
      }
    } catch (error) {
      setError("Error, try again")
      console.log(error);
      
    }

  }


  return (
    <div className="flex h-screen bg-indigo-700">
      <div className="w-full max-w-xs m-auto bg-indigo-100 rounded p-5">
        <header>
          <img
            className="w-20 mx-auto mb-5"
            src="https://img.icons8.com/fluent/344/year-of-tiger.png"
          />
        </header>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="block mb-2 text-indigo-500" htmlFor="username">
              Username
            </label>
            <input
              className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
              type="text"
              name="username"
            />
          </div>
          <div>
            <label className="block mb-2 text-indigo-500" htmlFor="email">
              Email
            </label>
            <input
              className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
              type="email"
              name="email"
            />
          </div>
          <div>
            <label className="block mb-2 text-indigo-500" htmlFor="password">
              Password
            </label>
            <input
              className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
              type="password"
              name="password"
            />
          </div>
          <div>
            <input
              className="w-full cursor-pointer bg-indigo-700 hover:bg-pink-700 text-white font-bold py-2 px-4 mb-6 rounded"
              type="submit"
              value="Cadastrar"
            />
            <p className='text-red-500'>{error && error}</p>
          </div>
        </form>
        <footer>
          <Link
            className="text-indigo-700 hover:text-pink-700 text-sm float-right"
            href={'./'}
          >
            I have account
          </Link>
        </footer>
      </div>
    </div>
  )
}

export default Cadastro