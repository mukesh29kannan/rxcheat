'use client'
import { useEffect } from "react"
import { useRouter } from "next/navigation"
export default function(){
    const router = useRouter();
    useEffect(()=>{
      router.push('/')
    },[])
    return (
        <p>Poocha!!!!</p>
    )
}