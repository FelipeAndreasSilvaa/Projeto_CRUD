"use client"
import { useRouter } from 'next/navigation'
import React from 'react'

const RemoveBtn = ({id}) => {

    const router = useRouter()

    const removeBtn = async () => {
        const confirmed = confirm('Are you sure?')
            
        if(confirmed){
            const res = await fetch(`http://localhost:3000/api/products/${id}`, {
                method: "DELETE",
            })
            if(res.ok){
                router.refresh()
                console.log("deletou o", {id});
                
            }
        }
        
    }

  return (
    <button onClick={removeBtn} className='btn bg-red-600 ml-2 py-3 px-4'>
        Delete
    </button>
  )
}

export default RemoveBtn