
import axios from "axios"
import Events from "../Components/Events"
import { Event } from "@/interfaces";
export default async function Home() {

  let rdata  : Event[] | null ; 

  try{
    const {data} = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL  as string}api/event/getevents`)
    rdata = data
  }catch(error){
    rdata = null
    console.log(error)
  }

  if(rdata == null ){
    return(
      <div className="text-center font-bold mt-10  text-xl ">Api not found </div>
    )
  }


  return (
    <>

      {rdata!== null && 
      <Events data={rdata}/>}
    </>
  );
}
   