"use client"
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const Login = () => {

  const router = useRouter()
  const [error, setError] = useState("")
  const { data: session, status: sessionStatus} = useSession()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isFormValid, setIsFormValid] = useState(false)

  const isValidEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email)
  }

  useEffect(() =>{
    if(isValidEmail(email) && password.length >=8){
      setIsFormValid(true)
    }else{
      setIsFormValid(false)
    }
  }, [email, password])

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    if(!isValidEmail(email)){
      setError("Email is invalid")
      return
    }

    if(!password || password.length < 8) {
      setError("Password is Invalid")
      return
    }

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    })

    if(res?.error) {
      setError("Invalid email or password")
    }else{
      setError("")
      router.push("./dashboard")
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
            <label className="block mb-2 text-indigo-500" htmlFor="Email">
              email
            </label>
            <input onChange={(e)=> setEmail(e.target.value)}
            value={email}
              className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
              type="text"
              name="email"
            />
          </div>
          <div>
            <label className="block mb-2 text-indigo-500" htmlFor="Password">
              Password
            </label>
            <input
              onChange={(e)=> setPassword(e.target.value)}
              value={password}
              className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
              type="password"
              name="password"
            />
          </div>
          <div>
            <input
              disabled={!isFormValid}
              className="w-full cursor-pointer bg-indigo-700 hover:bg-pink-700 text-white font-bold py-2 px-4 mb-6 rounded"
              type="submit"
              value='Enviar'
            />
            <p className="text-red-600 text-[16px] mb-4">{error && error}</p>

          </div>
        </form>
        <footer>
          <Link
            className="text-indigo-700 hover:text-pink-700 text-sm float-left"
            href="#"
          >
            Forgot Password?
          </Link>
          <Link
            className="text-indigo-700 hover:text-pink-700 text-sm float-right"
            href={'./cadastro'}
          >
            Create Account
          </Link>
        </footer>
      </div>
    </div>
  );
}

export default Login