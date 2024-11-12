import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { GoogleOAuthProvider } from '@react-oauth/google';
import Navbar from "./Components/Navbar"
import  { Toaster } from 'react-hot-toast';
import {Footer}  from "./Components/Footer"
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "LuckyLift -  A Cricket Prediction Site",
  description: "A Cricket Gambling Website where users can predict and win the rewards ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <GoogleOAuthProvider clientId="628059584467-83ngjfflop94rascrq2flsjcea5nn3td.apps.googleusercontent.com">
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar/>
        <div className="min-h-screen">
        {children} </div>
        <Toaster
            position="bottom-center"
            reverseOrder={false}
          />

          <Footer/> 
      </body>
    </html>
    </GoogleOAuthProvider>
  );
}
