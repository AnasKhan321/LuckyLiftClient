"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarIcon, MapPinIcon } from "lucide-react"
import { LineChart, Line, ResponsiveContainer } from "recharts"
import { Event } from "@/interfaces"
import { useRouter } from "next/navigation"

export default function EventCard({matchInfo}  : {matchInfo : Event}) {

  const router = useRouter()
  // Sample data for the graph
  const data = Array.from({ length: 20 }, (_, i) => ({
    value: 50 + Math.random() * 60 - 30,
  }))

  const handleClick = ()=>{
      router.push(`/events/${matchInfo.id}`)
  }

  return (
    <Card className="w-full  max-w-xs   md:max-w-4xl my-5 cursor-pointer  bg-gradient-to-tl from-blue-900 to-red-900 text-white  "  onClick={handleClick}>
      <CardHeader className="flex flex-col  md:flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-medium">
          {matchInfo.Description}
        </CardTitle>
        <div className="flex items-center gap-2">
          <span className="text-md  md:text-2xl font-bold text-blue-600">Live</span>
          <span className="text-xs  md:text-sm text-muted-foreground">{matchInfo.Status.toUpperCase()}</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 space-y-2">
          <div className="flex items-center justify-between text-lg font-semibold">
            <span>{matchInfo.Team1}</span>
            <span className="text-sm text-muted-foreground">vs</span>
            <span>{matchInfo.Team2}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {new Date(matchInfo.eventDate).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'short', 
              day: 'numeric', 
              hour: '2-digit', 
              minute: '2-digit'
            })}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPinIcon className="mr-2 h-4 w-4" />
            {matchInfo.Venue}
          </div>
        </div>
        
        <div className="h-[100px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#2563eb" 
                strokeWidth={2} 
                dot={false} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 flex flex-col md:flex-row mb-2   items-center justify-between">
          <div className="flex items-center gap-4 md:flex-row flex-col ">
            <div className="text-sm">
              <div>1,234</div>
              <div className="text-muted-foreground">Traders</div>
            </div>
            <div className="flex gap-2">
              <div className="text-sm">
                <div className="font-sm md:font-medium text-blue-600">{matchInfo.Team1} ₹ 1.5</div>
              </div>
              <div className="text-sm">
                <div className="font-medium text-red-600">{matchInfo.Team2} ₹ 2.5</div>
              </div>
            </div>
          </div>
          <div className="flex gap-2 mt-5 md:mt-0 ">
            <Button variant="yes" className="text-blue-600 border-blue-600 ">
              {matchInfo.Team1}
            </Button>
            <Button variant="no" className="text-red-600 border-red-600">
              {matchInfo.Team2}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}