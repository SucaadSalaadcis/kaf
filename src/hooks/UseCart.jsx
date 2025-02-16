import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthProvider'
import { useQuery } from '@tanstack/react-query'

function UseCart() {
    const {user} = useContext(AuthContext)
    const {refetch,data:cart = []} = useQuery({
        queryKey: ['carts', user?.email],
        queryFn: async () => {
          const res = await fetch(`https://kafoon.onrender.com/carts?email=${user?.email}`)
           return res.json()
        },
      
    })
  return [cart, refetch]
}

export default UseCart