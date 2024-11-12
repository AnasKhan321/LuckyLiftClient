"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, MapPinIcon, TrendingUpIcon, UsersIcon, AlertCircleIcon, BarChartIcon } from "lucide-react"
import { LineChart, Line, BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"
import { useRouter } from "next/navigation"
import axios from "axios"
import { Event } from "@/interfaces"
import { UserDetail  } from '@/interfaces/index'
import  toast from 'react-hot-toast';
import {HashLoader}  from "react-spinners"


export default function EventCardDetails({matchInfo}  : {matchInfo : Event}) {
  const [betAmount, setBetAmount] = useState(100)
  const [selectedTeam, setSelectedTeam] = useState("")
  const [isbetted , setisbetted]  = useState(false)
  const [voteindex , setvoteindex]  = useState(-1)
  
  const router = useRouter()
  const [user , setuser ]  = useState<UserDetail | null>(null)
  useEffect(()=>{
    const token = localStorage.getItem("luckyToken")
    if(!token){
        router.push("/")
    }else{
      ;(async()=>{
        const {data}  = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}auth/userdetail`  , {
          headers : {
            Authorization : `Bearer ${token}`
          }
        })
        setuser(data.user)
      })()
    }
  },[])

  useEffect(()=>{

    if(user){
      const index = user.votes.findIndex(event=> event.eventId == matchInfo.id)

      if(index >= 0){
        setisbetted(true)
        setvoteindex(index)
      }
    }
  },[user])





  // Sample data for the graphs
  const trendData = Array.from({ length: 20 }, (_, i) => ({
    name: i,
    matchInfo: 50 + Math.random() * 20,
    India: 50 + Math.random() * 20,
  }))

  const volumeData = [
    { name: 'Last Hour', team1: 4000, India: 2400 },
    { name: 'Last 3 Hours', team1: 3000, India: 1398 },
    { name: 'Last 6 Hours', team1: 2000, India: 9800 },
    { name: 'Last 12 Hours', team1: 2780, India: 3908 },
    { name: 'Last 24 Hours', team1: 1890, India: 4800 },
  ]

  const handleBet = async (team  : string ) => {
    if(user !== null ) {
    if(betAmount >  user.balance){
      toast.error("You don't have enough balance")

      return
    }
    setSelectedTeam(team=="ONE"? matchInfo.Team1 : matchInfo.Team2)
    const token = localStorage.getItem("luckyToken")
    const {data} = await  axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/vote/create`  , {
        amount : betAmount , 
        predicted : team  , 
        eventid : matchInfo.id
    }  , {
        headers : {
            Authorization : `Bearer ${token}`
        }
    } )

    toast.success(`You bet ${betAmount}  on ${team}`)
    router.push("/")
  }

  }

  if(user == null){
    return(
      <div  className="w-full min-h-[80vh] justify-center items-center flex "><HashLoader color="#c9c9c9" />
</div>
    )
  }

  return (
    
<>

    <Card className="w-full mt-5 max-w-xs  md:max-w-2xl lg:max-w-4xl flex flex-col justify-center items-center  mx-auto   bg-gradient-to-bl from-blue-900 to-red-900 text-white  ">
      <CardHeader>
          <div>
            <CardTitle className=" text-xl  md:text-3xl font-bold mb-2 text-center ">{matchInfo.Description}</CardTitle>
            <CardDescription className=" text-md md:text-lg  text-white font-bold ">
              {matchInfo.Team1} vs {matchInfo.Team2}
            </CardDescription>
          </div>

      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2 mb-6">
          <div className="space-y-4">
            <div className="flex items-center text-sm text-white ">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {new Date(matchInfo.eventDate).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric', 
                hour: '2-digit', 
                minute: '2-digit',
                timeZoneName: 'short'
              })}
            </div>
            <div className="flex items-center text-sm text-white">
              <MapPinIcon className="mr-2 h-4 w-4" />
              {matchInfo.Venue}
            </div>
            <div className="flex items-center justify-between  text-white">
              <div className="flex items-center">
                <UsersIcon className="mr-2 h-4 w-4" />
                <span className="text-sm font-medium">1,234 Traders</span>
              </div>
              <div className="flex items-center">
                <TrendingUpIcon className="mr-2 h-4 w-4" />
                <span className="text-sm font-medium">₹5,67,890 Traded</span>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="text-lg font-semibold">{matchInfo.Team1}</div>
              <div className="text-lg font-semibold text-blue-600">₹ 1.5</div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-lg font-semibold">{matchInfo.Team2}</div>
              <div className="text-lg font-semibold text-red-600">₹ 2.5</div>
            </div>
            <div className="flex items-center text-sm text-yellow-600">
              <AlertCircleIcon className="mr-2 h-4 w-4" />
              Odds may change. Bet responsibly.
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="trends" className="mb-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="trends">Betting Trends</TabsTrigger>
            <TabsTrigger value="volume">Trading Volume</TabsTrigger>
          </TabsList>
          <TabsContent value="trends">
            <Card>
              <CardHeader>
                <CardTitle>Betting Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={trendData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey={matchInfo.Team1} stroke="#2563eb" strokeWidth={2} />
                      <Line type="monotone" dataKey={matchInfo.Team2} stroke="#dc2626" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="volume">
            <Card>
              <CardHeader>
                <CardTitle>Trading Volume</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={volumeData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey={matchInfo.Team1} fill="#2563eb" />
                      <Bar dataKey={matchInfo.Team2} fill="#dc2626" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle>{!isbetted &&  "Place Your Bet"}</CardTitle>
          </CardHeader>
          <CardContent>
              <>

            {isbetted? <div className="font-bold text-center text-green-700 text-lg  md:text-2xl "> You already Betted ${user.votes[voteindex].amount}  on {user.votes[voteindex].predicted == "ONE"? matchInfo.Team1 : matchInfo.Team2}  </div>   :  


              
              <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold">Bet Amount</span>
                <span className="text-lg font-bold">₹ {betAmount}</span>
                </div>
              </div>  
}
            
              {
                !isbetted && 
              
              <Slider
                value={[betAmount]}
                onValueChange={(value) => setBetAmount(value[0])}
                max={10000}
                step={10}
                className="mb-4"
              />}

              {!isbetted &&

              <div className="flex justify-between gap-4">
                <Button 
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                  onClick={() => handleBet("ONE")}
                >
                  Bet on {matchInfo.Team1}
                </Button>
                <Button 
                  className="flex-1 bg-red-600 hover:bg-red-700"
                  onClick={() => handleBet("TWO")}
                >
                  Bet on {matchInfo.Team2}
                </Button>
              </div>}
              {selectedTeam && (
                <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-md">
                  You've placed a bet of ₹{betAmount} on {selectedTeam}. Good luck!
                </div>
              )}
         </>
          </CardContent>
        </Card>
      </CardContent>
    </Card>


    </> 
  )
}