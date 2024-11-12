import axios from "axios";
import { checkDomainOfScale } from "recharts/types/util/ChartUtils";
import UserDashboard from "@/app/Components/UserDashboard";

export default async  function Page ({params}  : {params  :  Promise<{id : string}>}){

    const parameters = await params ; 
    const {data}  = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}auth/userdetail`  , {
        headers : {
            Authorization : `Bearer ${parameters.id}`
        }
    })
    if(data.user ==null){
        return(
            <div className="font-bold text-center mt-5 text-2xl"> Profile Not Found!</div>
        )
    }

    return(
        <UserDashboard user={data.user}/> 
    )

}