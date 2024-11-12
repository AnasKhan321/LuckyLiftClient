'use client'

import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, DollarSign, User, Clock, AlertCircle } from 'lucide-react'
import { UserDashboardDetail } from '@/interfaces'

export default function UserDashboard({user}  : {user : UserDashboardDetail}) {


  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

 

  return (
    <div className="container mx-auto p-4 space-y-6   ">
      <Card className="border-t-4 border-black    bg-gradient-to-bl from-blue-900 to-red-900">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold text-white">User Dashboard</CardTitle>
          <Avatar className="h-16 w-16 ring-2 ring-blue-500">
            <AvatarImage src={user.profilepicture} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col space-y-2">
              <span className="text-sm font-medium text-white">Name</span>
              <span className="text-lg font-semibold">{user.name}</span>
            </div>
            <div className="flex flex-col space-y-2">
              <span className="text-sm font-medium text-white">Email</span>
              <span className="text-lg font-semibold">{user.email}</span>
            </div>
            <div className="flex flex-col space-y-2">
              <span className="text-sm font-medium text-white">Balance</span>
              <span className="text-lg font-semibold text-green-600">${user.balance}</span>
            </div>
            <div className="flex flex-col space-y-2">
              <span className="text-sm font-medium text-white">Member Since</span>
              <span className="text-lg font-semibold">{formatDate(user.createdAt)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-t-4 border-black   bg-gradient-to-tl from-blue-900 to-red-900">
        <CardHeader>
          <CardTitle className="text-white">Recent Vote</CardTitle>
          <CardDescription className="text-white/70 " >Your most recent prediction</CardDescription>
        </CardHeader>
        <CardContent>

            {user.votes.length <=0 &&   
                   <div className="flex items-center justify-center p-4 text-red-500">
                   <AlertCircle className="mr-2 h-5 w-5" />
                   <p>No votes recorded yet.</p>
                 </div>
            
            
            }

            {
                user.votes.length > 0 && <>
                { 
                user.votes.map((vote)=>(

                    <div className="space-y-4 mb-10  " key={vote.id}>
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-blue-700">{vote.event.Team1} vs {vote.event.Team2}</h3>
                      <div className="flex space-x-2">
                        <Badge variant={vote.event.Status === "Completed" ? "secondary" : "default"}>
                          {vote.event.Status}
                        </Badge>
                        <Badge variant={vote.status === "Pending" ? "outline" : "default"} className={ `${vote.status=='PENDING' && "bg-yellow-700 text-yellow-400"   }  ${vote.status=='LOST' && "bg-red-800 text-red-300"   }   ${vote.status=='WON' && "bg-green-700 text-green-400"   } ` } > 
                          {vote.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="grid gap-2 md:grid-cols-2">
                      <div className="flex items-center">
                        <CalendarIcon className="mr-2 h-4 w-4 text-blue-500" />
                        <span className="text-sm">{formatDate(vote.event.eventDate)}</span>
                      </div>
                      <div className="flex items-center">
                        <User className="mr-2 h-4 w-4 text-red-500" />
                        <span className="text-sm">Predicted: <span className="font-semibold text-red-500">{vote.predicted =="ONE"? vote.event.Team1 : vote.event.Team2}</span></span>
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="mr-2 h-4 w-4 text-green-500" />
                        <span className="text-sm">Amount: <span className="font-semibold text-green-600">${vote.amount}</span></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4 text-blue-500" />
                        <span className="text-sm">Voted: {formatDate(vote.createdAt)}</span>
                      </div>
                    </div>
                    <div className="mt-4 p-4 bg-blue-50 rounded-md">
                      <h4 className="font-medium mb-2 text-blue-700">Event Description</h4>
                      <p className="text-sm text-black font-bold ">{vote.event.Description}</p>
                    </div>
                    <div className="mt-4 p-4 bg-red-50 rounded-md">
                      <h4 className="font-medium mb-2 text-red-700">Venue</h4>
                      <p className="text-sm text-red-600">{vote.event.Venue}</p>
                    </div>
                    <Button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white" asChild>
                      <a href={vote.event.ResultUrl} target="_blank" rel="noopener noreferrer">
                        View Full Results
                      </a>
                    </Button>
                  </div>

                ))
                }
                </>
            }
       
     
        </CardContent>
      </Card>
    </div>
  )
}