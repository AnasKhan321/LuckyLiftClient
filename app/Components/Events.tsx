import { Event } from "@/interfaces";
import EventCard from "./EventCard";

export default function Events({data}  : {data : Event[]}){




    return(
        <div  className="container mt-10  mx-auto flex flex-col justify-center items-center">

            {data.map((item)=>{
                return(
                  <EventCard matchInfo={item}  key={item.id}/>
                )
            })}
        </div>
    )


}