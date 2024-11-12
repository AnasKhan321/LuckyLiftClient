'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AlertTriangle, Download, Trophy, TrendingUp, Shield, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Event } from "@/interfaces";
import {convertDatetoString}  from "@/utils/index"

export default  function HomePage({upcomingMatches}  : {upcomingMatches : Event[]}) {
  const [isAgeVerified, setIsAgeVerified] = useState(false)



  

  return (
    <div className="min-h-screen bg-gray-950 text-white">



      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h2 className="text-2xl  md:text-5xl font-bold mb-6">
              Bet on Your 
              <span className="bg-gradient-to-r from-blue-500 to-red-500 bg-clip-text text-transparent">
                {' '}Cricket Knowledge
              </span>
            </h2>
            <p className="text-md md:text-xl text-gray-400 mb-8">
              Join thousands of cricket fans who turn their match predictions into rewards.
              Bet responsibly on live matches, tournaments, and more.
            </p>
            <div className="flex items-center space-x-4 mb-8">
              <Checkbox
                id="age-verify"
                checked={isAgeVerified}
                onCheckedChange={(checked) => setIsAgeVerified(checked as boolean)}
              />
              <label htmlFor="age-verify" className="text-sm text-gray-400">
                I confirm that I am 18 years or above
              </label>
            </div>
            <div className="flex flex-wrap gap-4">
                <Link href="/events"> 
              <Button
                size="lg"
                disabled={!isAgeVerified}
                className="bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700"
              >
                Start Betting Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button></Link> 

            </div>
          </div>
        </div>

        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20">
          <div className="w-full h-full bg-gradient-to-bl from-blue-500 to-red-500 blur-3xl" />
        </div>
      </section>

      <section className="py-16 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold mb-8 text-center md:text-left">Upcoming Matches</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingMatches.slice(1,3).map((match) => (
              <Card key={match.id} className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <Badge className="mb-4 bg-gradient-to-r from-blue-500 to-red-500">
                    {match.Status}
                  </Badge>
                  <h4 className="text-xl font-semibold mb-2  text-white">
                    {match.Team1} vs {match.Team2}
                  </h4>
                  <p className="text-gray-400 mb-4">{ convertDatetoString(  match.eventDate)}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">{match.Venue}</span>
                    <span className="text-xl font-bold text-green-500"></span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Trophy className="w-12 h-12 mx-auto mb-4 text-yellow-500" />
              <h3 className="text-xl font-semibold mb-2">Win Big</h3>
              <p className="text-gray-400">Turn your cricket knowledge into rewards</p>
            </div>
            <div className="text-center">
              <TrendingUp className="w-12 h-12 mx-auto mb-4 text-green-500" />
              <h3 className="text-xl font-semibold mb-2">Real-Time Odds</h3>
              <p className="text-gray-400">Get live updates and dynamic betting odds</p>
            </div>
            <div className="text-center">
              <Shield className="w-12 h-12 mx-auto mb-4 text-blue-500" />
              <h3 className="text-xl font-semibold mb-2">Secure Platform</h3>
              <p className="text-gray-400">Your funds and data are always protected</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <Alert className="bg-yellow-900/20 border-yellow-600/50">
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-yellow-600">
              <strong>Betting Responsibility Warning:</strong> Cricket betting can be addictive and involves
              substantial risk of money loss. Bet responsibly and within your means. If you feel you may have a
              gambling problem, please seek help. LuckyLift promotes responsible gambling.
            </AlertDescription>
          </Alert>
        </div>
      </section>
    </div>
  )
}