import EventCardDetails from '@/app/Components/EventCardDetail'
import axios from 'axios'

export default async function Page({params}  : {params : Promise<{id : string}>}){
    const payload = await params
    
    const {data }  = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL as string}api/event/getevent/${payload.id}`)
    if(data ==null){
        return (
            <div className='text-center font-bold text-2xl '>Event not found</div>
        )
    }
    return (
        <div className='container mx-auto '>
        <EventCardDetails matchInfo={data}/>

        </div>
    )
}