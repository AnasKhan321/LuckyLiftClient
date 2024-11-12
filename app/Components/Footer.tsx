import Link from 'next/link'
import { Facebook, Twitter, Instagram, Youtube, Mail  , Github } from 'lucide-react'
import { Button } from "@/components/ui/button"

import { Rubik_Wet_Paint } from 'next/font/google';


const roboto = Rubik_Wet_Paint({
    weight: ['400'],
    subsets: ['latin'],
  });
export  function Footer() {
  return (
    <footer className="bg-gray-950 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h2 className={` ${roboto.className} text-2xl font-bold mb-4`}>
              Lucky<span className="text-red-500">Lift</span>
            </h2>
            <p className="text-gray-400 mb-4">
              Your premier platform for cricket betting and predictions.
            </p>
            <div className="flex space-x-4">
              <Link href="https://github.com/AnasKhan321"  target="blank" className="text-gray-400 hover:text-white">
                <Github size={20} />
              </Link>
              <Link href="https://x.com/ANASKHA96399553" target="blank" className="text-gray-400 hover:text-white">
                <Twitter size={20} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Instagram size={20} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Youtube size={20} />
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-400 hover:text-white">About Us</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white">How to Play</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white">FAQ</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-400 hover:text-white">Terms of Service</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white">Responsible Gaming</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white">AML Policy</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">Stay updated with the latest odds and promotions.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-800 text-white px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Button className="bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700 rounded-l-none">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 mt-8 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} LuckyLift. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs mt-2">
            LuckyLift is committed to responsible gaming. If you or someone you know has a gambling problem, please call 1-800-GAMBLER for help.
          </p>
        </div>
      </div>
    </footer>
  )
}