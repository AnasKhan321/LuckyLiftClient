"use client";

import Userdetail from '@/app/Components/Usertdetail';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import axios from "axios";
import { LogIn } from 'lucide-react';
import { useEffect   , useState} from 'react';

export default function GoogleClient() {


  const [isLogin , setLogin]  = useState(true)

  const onsuccess = async (cred: CredentialResponse) => {
    if (cred && cred.credential) {
      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}auth/login`, {
          token: cred.credential,
        }, {
          headers: {
            'Content-Type': 'application/json', 
          },
        });

        localStorage.setItem("luckyToken"  , response.data.token)
        setLogin(true)
      } catch (error) {
        console.error('Error during login:', error); 
      }
    } else {
      console.error('No credentials received');
    }
  };

  useEffect(()=>{
      const token = localStorage.getItem("luckyToken")
      if(!token){
        setLogin(false)
      }
  },[isLogin])

  return (
    <div>
      {isLogin &&  <Userdetail setLogin={setLogin}/> }
      {!isLogin &&
        <GoogleLogin
          onSuccess={onsuccess}
          onError={() => console.error('Login failed')} // Handle error callback
        />}

    </div>

  );
}
