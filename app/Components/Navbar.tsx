
import GoogleClient from "@/clients/index"

import { Rubik_Wet_Paint } from 'next/font/google';
import Link from "next/link";


const roboto = Rubik_Wet_Paint({
  weight: ['400'],
  subsets: ['latin'],
});
export default function Navbar(){

    return(

        <>

<nav className="border-b border-gray-800  bg-gray-950 text-white ">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className={` ${roboto.className} text-2xl font-bold bg-gradient-to-r from-blue-500 to-red-500 bg-clip-text text-transparent`}>
                <Link href="/"> LuckyLift </Link>
                
              </h1>
              <div className="hidden md:flex space-x-6">
              <Link href="/" className="text-gray-300 hover:text-white">Home</Link>

                <Link href="/events" className="text-gray-300 hover:text-white">Matches</Link>
                <Link href="/about" className="text-gray-300 hover:text-white">About </Link>
        
              </div>
            </div>
            <div className="flex items-center space-x-4">
                <GoogleClient/> 

            </div>
          </div>
        </div>
      </nav>


        </>
    )
}