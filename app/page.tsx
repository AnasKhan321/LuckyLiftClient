import { Event } from "@/interfaces";
import HomePage from "./Components/HomePage";
import axios from "axios"
export default async function Page(){
  let rdata : Event[] | null ; 

  try {
     const {data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL  as string}api/event/getevents`)
     rdata = data ; 
  } catch (error) {
    rdata = null 
    console.log(error)
  }

  if(rdata == null){
    return(
        <div className="text-center font-bold text-xl mt-10 "> Api not found </div>
    )
  }
  


  return(
    <> 

       {rdata !== null  && 
          <HomePage upcomingMatches={rdata}/>}
 
    </>


  )
}