'use client'

import { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User, Settings, LogOut } from 'lucide-react'
import axios from 'axios'
import { UserDetail  } from '@/interfaces/index'
import Image from "next/image"
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Userdetail({setLogin}  : {setLogin : React.Dispatch<React.SetStateAction<boolean>>}) {
  const [isOpen, setIsOpen] = useState(false)
  const [user , setuser]   = useState<UserDetail | null >(null)
  const [token , settoken]  = useState("")
  const router = useRouter() 
  useEffect(()=>{
    ;(async()=>{

            const token = localStorage.getItem("luckyToken")

            if(token){
              settoken(token)

              try {
                const {data}  = await  axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}auth/userdetail`  , {
                  headers : {
                      Authorization : `Bearer ${token}`
                  }
                 
              } )
              setuser(data.user)
              } catch (error) {
                setuser(null)

              }

            }

    })()
  },[])

  const logout = ()=>{
      localStorage.removeItem("luckyToken")
      setuser(null)
      setLogin(false)
      router.push("/")
  }

  return (
    <>
    
    {user && 
    <div className="relative flex justify-center ">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <button className="focus:outline-none" aria-label="Open user menu">
            <Avatar className="cursor-pointer transition-opacity hover:opacity-80">
             <Image src={user?.profilepicture} width={50}  height={50 } alt="user_image"/> 

            </Avatar>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 mt-2 p-4   bg-gradient-to-tl from-blue-900 to-red-900 text-white ">
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user?.email}</p>
              <p className="text-xs leading-none text-white/50">{user?.name}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <Link  href={`/profile/${token}`}>Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem  onClick={logout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
}
    
    </>



  )
}