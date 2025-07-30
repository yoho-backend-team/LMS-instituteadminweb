"use client"

import {
  ArrowLeft,
  ArrowUpFromLine,
  HandCoins,
  MoreVertical,
  Ticket,
  Users,
  Wallet,
  MailOpen,
  BookOpen,
  ArrowRight,
} from "lucide-react"
import { useState } from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"

interface BranchDetailsPageProps {
  locationName: string
  onBack: () => void
}

export function BranchDetailsPage({ locationName, onBack }: BranchDetailsPageProps) {
  const chartData = [
    { month: "Jan", fee: 10000, salary: 5000, pendings: 2000, totalIncome: 12000 },
    { month: "Feb", fee: 15000, salary: 7000, pendings: 3000, totalIncome: 18000 },
    { month: "Mar", fee: 20000, salary: 8000, pendings: 4000, totalIncome: 22000 },
    { month: "Apr", fee: 25000, salary: 10000, pendings: 5000, totalIncome: 28000 },
    { month: "May", fee: 15000, salary: 8000, pendings: 3000, totalIncome: 18000 },
    { month: "Jun", fee: 50000, salary: 20000, pendings: 10000, totalIncome: 60000 },
    { month: "Jul", fee: 35000, salary: 15000, pendings: 7000, totalIncome: 40000 },
    { month: "Aug", fee: 30000, salary: 12000, pendings: 6000, totalIncome: 35000 },
    { month: "Sep", fee: 36000, salary: 14000, pendings: 7500, totalIncome: 42000 },
    { month: "Oct", fee: 30000, salary: 13000, pendings: 6500, totalIncome: 38000 },
    { month: "Nov", fee: 40000, salary: 18000, pendings: 8000, totalIncome: 48000 },
    { month: "Dec", fee: 26000, salary: 11000, pendings: 5500, totalIncome: 30000 },
  ]

  const chartConfig = {
    fee: {
      label: "Fee",
      color: "hsl(175 78% 40%)", // A shade of teal/green
    },
    salary: {
      label: "Salary",
      color: "hsl(200 78% 40%)", // A shade of blue
    },
    pendings: {
      label: "Pendings",
      color: "hsl(0 78% 60%)", // A shade of red
    },
    totalIncome: {
      label: "Total Income",
      color: "hsl(40 78% 60%)", // A shade of orange/yellow
    },
  }

  const [activeTab, setActiveTab] = useState("fee")

  return (
    <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-6">
        <Button variant="ghost" onClick={onBack} className="flex items-center gap-2 text-[#1BBFCA]">
          <ArrowLeft className="w-5 h-5" />
          <span className="text-lg font-medium">Back to Locations</span>
        </Button>
        <h1 className="text-2xl font-bold text-[#1BBFCA]">{locationName} Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Key Metrics */}
          <Card className="p-4 shadow-lg rounded-xl">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-[#716F6F]">Key Metrics</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col items-start p-4 rounded-xl bg-[#F3E8FF] relative overflow-hidden">
                <div className="p-2 rounded-lg bg-[#E0BFFF] mb-2">
                  <Wallet className="w-6 h-6 text-[#8A2BE2]" />
                </div>
                <span className="text-sm font-medium text-[#716F6F]">Profits</span>
                <span className="text-2xl font-bold text-[#716F6F]">12345</span>
              </div>
              <div className="flex flex-col items-start p-4 rounded-xl bg-[#E0F7FA] relative overflow-hidden">
                <div className="p-2 rounded-lg bg-[#B2EBF2] mb-2">
                  <ArrowUpFromLine className="w-6 h-6 text-[#00BCD4]" />
                </div>
                <span className="text-sm font-medium text-[#716F6F]">Payouts</span>
                <span className="text-2xl font-bold text-[#716F6F]">1234</span>
              </div>
              <div className="flex flex-col items-start p-4 rounded-xl bg-[#FFEBEE] relative overflow-hidden">
                <div className="p-2 rounded-lg bg-[#FFCDD2] mb-2">
                  <Users className="w-6 h-6 text-[#F44336]" />
                </div>
                <span className="text-sm font-medium text-[#716F6F]">Courses</span>
                <span className="text-2xl font-bold text-[#716F6F]">098</span>
                <Button variant="ghost" size="icon" className="absolute top-4 right-4 bg-white/50 rounded-full">
                  <ArrowRight className="w-4 h-4 text-[#716F6F]" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Statistics */}
          <Card className="p-4 shadow-lg rounded-xl">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="text-lg font-semibold text-[#716F6F]">Statistics</CardTitle>
              <Button variant="ghost" size="icon">
                <MoreVertical className="w-5 h-5 text-[#716F6F]" />
              </Button>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="fee" onValueChange={setActiveTab}>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-light text-[#7D7D7D]">Yearly Earnings Overview</span>
                  <TabsList className="bg-transparent p-0 h-auto">
                    <TabsTrigger
                      value="fee"
                      className="data-[state=active]:bg-transparent data-[state=active]:text-[#1BBFCA] data-[state=active]:border-b-2 data-[state=active]:border-[#1BBFCA] text-[#716F6F] font-medium text-sm px-3 py-1"
                    >
                      Fee
                    </TabsTrigger>
                    <TabsTrigger
                      value="salary"
                      className="data-[state=active]:bg-transparent data-[state=active]:text-[#1BBFCA] data-[state=active]:border-b-2 data-[state=active]:border-[#1BBFCA] text-[#716F6F] font-medium text-sm px-3 py-1"
                    >
                      Salary
                    </TabsTrigger>
                    <TabsTrigger
                      value="pendings"
                      className="data-[state=active]:bg-transparent data-[state=active]:text-[#F44336] data-[state=active]:border-b-2 data-[state=active]:border-[#F44336] text-[#716F6F] font-medium text-sm px-3 py-1"
                    >
                      Pendings
                    </TabsTrigger>
                    <TabsTrigger
                      value="totalIncome"
                      className="data-[state=active]:bg-transparent data-[state=active]:text-[#FFC107] data-[state=active]:border-b-2 data-[state=active]:border-[#FFC107] text-[#716F6F] font-medium text-sm px-3 py-1"
                    >
                      Total Income
                    </TabsTrigger>
                  </TabsList>
                </div>
                <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                  <BarChart accessibilityLayer data={chartData}>
                    <CartesianGrid vertical={false} strokeDasharray="4 4" />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      tickMargin={10}
                      axisLine={false}
                      tickFormatter={(value) => value}
                    />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tickMargin={10}
                      tickFormatter={(value) => `$${value / 1000}K`}
                    />
                    <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                    <TabsContent value="fee" className="h-full w-full">
                      <Bar dataKey="fee" fill="hsl(175 78% 40%)" radius={[4, 4, 0, 0]} />
                    </TabsContent>
                    <TabsContent value="salary" className="h-full w-full">
                      <Bar dataKey="salary" fill="hsl(200 78% 40%)" radius={[4, 4, 0, 0]} />
                    </TabsContent>
                    <TabsContent value="pendings" className="h-full w-full">
                      <Bar dataKey="pendings" fill="hsl(0 78% 60%)" radius={[4, 4, 0, 0]} />
                    </TabsContent>
                    <TabsContent value="totalIncome" className="h-full w-full">
                      <Bar dataKey="totalIncome" fill="hsl(40 78% 60%)" radius={[4, 4, 0, 0]} />
                    </TabsContent>
                  </BarChart>
                </ChartContainer>
              </Tabs>
            </CardContent>
          </Card>

          {/* Detailed Insights */}
          <Card className="p-4 shadow-lg rounded-xl">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-[#716F6F]">Detailed Insights</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col items-start p-4 rounded-xl bg-[#F3E8FF]">
                <span className="text-sm font-medium text-[#716F6F] mb-2">Courses</span>
                <span className="text-xs text-[#7D7D7D] mb-4">Updates 1 Month Ago</span>
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-2 rounded-lg bg-[#FFCDD2]">
                    <HandCoins className="w-5 h-5 text-[#F44336]" />
                  </div>
                  <span className="text-sm font-medium text-[#716F6F]">Active</span>
                  <span className="ml-auto text-lg font-bold text-[#716F6F]">22</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-[#FFCDD2]">
                    <HandCoins className="w-5 h-5 text-[#F44336]" />
                  </div>
                  <span className="text-sm font-medium text-[#716F6F]">Inactive</span>
                  <span className="ml-auto text-lg font-bold text-[#716F6F]">03</span>
                </div>
              </div>

              <div className="flex flex-col items-start p-4 rounded-xl bg-[#E0F7FA]">
                <span className="text-sm font-medium text-[#716F6F] mb-2">Classes</span>
                <span className="text-xs text-[#7D7D7D] mb-4">Updates 1 Week Ago</span>
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-2 rounded-lg bg-[#B2EBF2]">
                    <HandCoins className="w-5 h-5 text-[#00BCD4]" />
                  </div>
                  <span className="text-sm font-medium text-[#716F6F]">Online</span>
                  <span className="ml-auto text-lg font-bold text-[#716F6F]">230</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-[#B2EBF2]">
                    <HandCoins className="w-5 h-5 text-[#00BCD4]" />
                  </div>
                  <span className="text-sm font-medium text-[#716F6F]">Offline</span>
                  <span className="ml-auto text-lg font-bold text-[#716F6F]">45</span>
                </div>
              </div>

              <div className="flex flex-col items-start p-4 rounded-xl bg-[#FFEBEE]">
                <span className="text-sm font-medium text-[#716F6F] mb-2">Courses</span>
                <span className="text-xs text-[#7D7D7D] mb-4">Updates 1 Day Ago</span>
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-2 rounded-lg bg-[#FFCDD2]">
                    <HandCoins className="w-5 h-5 text-[#F44336]" />
                  </div>
                  <span className="text-sm font-medium text-[#716F6F]">Teaching</span>
                  <span className="ml-auto text-lg font-bold text-[#716F6F]">66</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-[#FFCDD2]">
                    <HandCoins className="w-5 h-5 text-[#F44336]" />
                  </div>
                  <span className="text-sm font-medium text-[#716F6F]">Non-Teaching</span>
                  <span className="ml-auto text-lg font-bold text-[#716F6F]">10</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          {/* Recent Activities */}
          <Card className="p-4 shadow-lg rounded-xl">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-[#716F6F]">Recent Activities</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              {[
                { title: "Notes Created", subtitle: "| Create | Rvr - Study Material Created", active: false },
                { title: "Notes Created", subtitle: "| Create | Rvr - Study Material Created", active: false },
                { title: "Notes Created", subtitle: "| Create | Rvr - Study Material Created", active: true },
                { title: "Notes Created", subtitle: "| Create | Rvr - Study Material Created", active: false },
                { title: "Notes Created", subtitle: "| Create | Rvr - Study Material Created", active: false },
                { title: "Notes Created", subtitle: "| Create | Rvr - Study Material Created", active: false },
                { title: "Notes Created", subtitle: "| Create | Rvr - Study Material Created", active: false },
              ].map((activity, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-3 p-3 rounded-lg ${
                    activity.active ? "bg-[#E0F7FA] border border-[#1BBFCA]" : "bg-white border border-gray-200"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full ${activity.active ? "bg-white" : "bg-[#1BBFCA]"} flex-shrink-0`}
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-[#716F6F]">{activity.title}</span>
                    <span className="text-xs text-[#7D7D7D]">{activity.subtitle}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Support Tickets */}
          <Card className="p-4 shadow-lg rounded-xl">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-[#716F6F]">Support Tickets</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col items-start p-4 rounded-xl bg-[#F3E8FF]">
                <div className="p-2 rounded-lg bg-[#E0BFFF] mb-2">
                  <Ticket className="w-6 h-6 text-[#8A2BE2]" />
                </div>
                <span className="text-sm font-medium text-[#716F6F]">New Tickets</span>
                <span className="text-2xl font-bold text-[#716F6F]">142</span>
              </div>
              <div className="flex flex-col items-start p-4 rounded-xl bg-[#E0F7FA]">
                <div className="p-2 rounded-lg bg-[#B2EBF2]">
                  <MailOpen className="w-6 h-6 text-[#00BCD4]" />
                </div>
                <span className="text-sm font-medium text-[#716F6F]">Open Tickets</span>
                <span className="text-2xl font-bold text-[#716F6F]">28</span>
              </div>
              <div className="flex flex-col items-start p-4 rounded-xl bg-[#FFEBEE] md:col-span-2 relative">
                <span className="absolute top-4 right-4 text-lg font-bold text-[#F44336]">164</span>
                <div className="p-2 rounded-lg bg-[#FFCDD2] mb-2">
                  <BookOpen className="w-6 h-6 text-[#F44336]" />
                </div>
                <span className="text-sm font-medium text-[#716F6F]">Average Response Time</span>
                <span className="text-2xl font-bold text-[#716F6F]">1 Day</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
