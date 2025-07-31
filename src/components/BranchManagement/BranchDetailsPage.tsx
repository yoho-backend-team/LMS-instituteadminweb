"use client"

import { ArrowLeft, ArrowRight, BookOpen, MailOpen, MessageSquare, MoreVertical, Ticket, Users } from "lucide-react"
import { useState } from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, LabelList } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs"
import Profit from "../../assets/profit.png"
import Course from "../../assets/courses.png"
import Pay from "../../assets/payout.png"

interface BranchDetailsPageProps {
  locationName: string
  onBack: () => void
}

const CylinderBar = (props: any) => {
  const { fill, x, y, width, height } = props;
  const barX = Number.isNaN(x) ? 0 : x;
  const barY = Number.isNaN(y) ? 0 : y;
  const barWidth = Number.isNaN(width) ? 0 : Math.max(0, width);
  const barHeight = Number.isNaN(height) ? 0 : Math.max(0, height);

  // Colors for the cylinder effect
  const topColor = "#FAD3EF";
  const highlightColor = "#FAD3EF";
  const baseColor = fill || "#FAD3EF";
  const shadowColor = "#FAD3EF";

  // Calculate points for the elliptical top and bottom
  const radiusX = barWidth / 2;
  const radiusY = 8; // Height of the ellipse

  return (
    <g>
      {/* Main cylinder body with gradient */}
      <defs>
        <linearGradient id={`cylinderBody-${fill}`}>
          <stop offset="0%" stopColor={baseColor} stopOpacity="0.9" />
          <stop offset="100%" stopColor={shadowColor} stopOpacity="0.9" />
        </linearGradient>
      </defs>
      <rect 
        x={barX} 
        y={barY} 
        width={barWidth} 
        height={barHeight} 
        fill={`url(#cylinderBody-${fill})`} 
        rx="2" // Slightly rounded corners
      />

      {/* Top ellipse (3D effect) */}
      <ellipse
        cx={barX + radiusX}
        cy={barY}
        rx={radiusX}
        ry={radiusY}
        fill={topColor}
      />
      
      {/* Top highlight */}
      <ellipse
        cx={barX + radiusX}
        cy={barY}
        rx={radiusX * 0.7}
        ry={radiusY * 0.7}
        fill={highlightColor}
        opacity="0.5"
      />

      {/* Bottom ellipse (3D effect) */}
      <ellipse
        cx={barX + radiusX}
        cy={barY + barHeight}
        rx={radiusX}
        ry={radiusY}
        fill={shadowColor}
      />

      {/* Side highlight for 3D effect */}
      <path
        d={`
          M${barX + barWidth * 0.7},${barY}
          L${barX + barWidth * 0.7},${barY + barHeight}
          A${radiusX * 0.3},${radiusY} 0 0 0 ${barX + barWidth},${barY + barHeight}
          L${barX + barWidth},${barY}
          A${radiusX * 0.3},${radiusY} 0 0 1 ${barX + barWidth * 0.7},${barY}
        `}
        fill={highlightColor}
        opacity="0.2"
      />
    </g>
  );
};

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
      color: "#23AF62", // Green from image
    },
    salary: {
      label: "Salary",
      color: "#FF8400", // Orange from CSS
    },
    pendings: {
      label: "Pendings",
      color: "#CA2858", // Red from CSS
    },
    totalIncome: {
      label: "Total Income",
      color: "#FFCC00", // Yellow from CSS
    },
  }

  const [activeTab, setActiveTab] = useState<keyof typeof chartConfig>("fee")

  return (
    <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-8">
        <Button variant="ghost" onClick={onBack} className="flex items-center gap-2 text-[#1BBFCA]">
          <ArrowLeft className="w-5 h-5" />
          <span className="text-lg font-medium">Back to Locations</span>
        </Button>
        <h1 className="text-2xl font-bold text-[#1BBFCA]">{locationName} Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Key Metrics Card */}
          <Card className="shadow-lg rounded-2xl">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-[#716F6F]">Key Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4 justify-between">
                {/* Profits Card */}
                <div className="flex flex-col items-start p-4 rounded-2xl bg-[rgba(122,105,254,0.2)] shadow-[4px_4px_24px_rgba(0,0,0,0.1)] w-full sm:w-[193px] h-[229px]">
                  <div className="flex justify-center items-center p-[9px] w-[70px] h-[70px] bg-white rounded-xl shadow-[2px_2px_4px_rgba(114,142,171,0.1),-6px_-6px_20px_#FFFFFF,4px_4px_20px_rgba(111,140,176,0.41),inset_-4px_-4px_9px_rgba(255,255,255,0.88)] mb-4">
                    <img src={Profit} alt="Profit Icon" className="w-[42px] h-[42px]" />
                  </div>
                  <div className="flex flex-col justify-between h-[111px]">
                    <span className="text-[22px] leading-[33px] font-normal text-[#716F6F]">Profits</span>
                    <span className="text-[32px] leading-[48px] font-bold text-[#7D7D7D]">12345</span>
                  </div>
                </div>
                
                {/* Payouts Card */}
                <div className="flex flex-col items-start p-4 rounded-2xl bg-[rgba(62,223,235,0.2)] shadow-[4px_4px_24px_rgba(0,0,0,0.1)] w-full sm:w-[241px] h-[284px]">
                  <div className="flex justify-center items-center p-[9px] w-[70px] h-[70px] bg-white rounded-xl shadow-[2px_2px_4px_rgba(114,142,171,0.1),-6px_-6px_20px_#FFFFFF,4px_4px_20px_rgba(111,140,176,0.41),inset_-4px_-4px_9px_rgba(255,255,255,0.88)] mb-4">
                   <img src={Pay} alt="Payout Icon" className="w-[42px] h-[42px]" />                  </div>
                  <div className="flex flex-col justify-between h-[169px]">
                    <span className="text-[22px] leading-[33px] font-normal text-[#716F6F]">Payouts</span>
                    <span className="text-[42px] leading-[63px] font-bold text-[#7D7D7D]">1234</span>
                  </div>
                </div>
                
                {/* Courses Card */}
                <div className="flex flex-col items-start p-4 rounded-2xl bg-[rgba(230,33,174,0.2)] shadow-[4px_4px_24px_rgba(0,0,0,0.1)] w-full sm:w-[193px] h-[229px] relative">
                  <div className="flex justify-center items-center p-[9px] w-[70px] h-[70px] bg-white rounded-xl shadow-[2px_2px_4px_rgba(114,142,171,0.1),4px_4px_20px_rgba(111,140,176,0.41),-6px_-6px_20px_#FFFFFF,inset_-4px_-4px_9px_rgba(255,255,255,0.88)] mb-4">
                 <img src={Course} alt="Courses Icon" className="w-[42px] h-[42px]" />
                  </div>
                  <div className="flex flex-col justify-between h-[111px]">
                    <span className="text-[22px] leading-[33px] font-normal text-[#716F6F]">Courses</span>
                    <span className="text-[32px] leading-[48px] font-bold text-[#7D7D7D]">098</span>
                  </div>
                  <Button variant="ghost" size="icon" className="absolute top-4 right-4 bg-white rounded-full shadow-md">
                    <ArrowRight className="w-4 h-4 text-[#716F6F]" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Statistics Card */}
          <Card className="shadow-lg rounded-2xl">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-lg font-semibold text-[#716F6F] uppercase">Statistics</h2>
                  <div className="mt-2">
                    <h3 className="text-lg font-semibold text-[#716F6F]">Earning Reports</h3>
                    <p className="text-sm font-light text-[#7D7D7D] uppercase">Yearly Earnings Overview</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="bg-[#1BBFCA] rounded-lg">
                  <MoreVertical className="w-5 h-5 text-white rotate-90" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="fee" onValueChange={(value) => setActiveTab(value as keyof typeof chartConfig)}>
                <TabsList className="bg-transparent p-0 gap-4 mb-6">
                  <TabsTrigger
                    value="fee"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-[#23AF62]"
                  >
                    <span className="text-[#23AF62] font-semibold">Fee</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="salary"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-[#FF8400]"
                  >
                    <span className="text-[#FF8400] font-semibold">Salary</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="pendings"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-[#CA2858]"
                  >
                    <span className="text-[#CA2858] font-semibold">Pendings</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="totalIncome"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-[#FFCC00]"
                  >
                    <span className="text-[#FFCC00] font-semibold">Total Income</span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>

             <div className="h-[350px]">
  <BarChart
    width={700}
    height={350}
    data={chartData}
    margin={{ top: 20, right: 10, left: 5, bottom: 5 }} /* Adjusted margins */
    barCategoryGap="20%" /* Added gap between bars */
  >
    <CartesianGrid vertical={false} strokeDasharray="4 4" />
    <XAxis 
      dataKey="month" 
      tickLine={false} 
      tickMargin={10} 
      axisLine={false}
      padding={{ left: 10, right: 10 }} /* Added padding */
    />
    <YAxis
      tickLine={false}
      axisLine={false}
      tickMargin={10}
      tickFormatter={(value) => `₹${value / 1000}K`}
    />
    <Bar
      dataKey={activeTab}
      fill={chartConfig[activeTab].color}
      shape={<CylinderBar />}
      radius={[4, 4, 0, 0]} /* Added rounded corners to bars */
    >
      <LabelList
        dataKey={activeTab}
        position="top"
        formatter={(value: number) => `₹${value / 1000}K`}
        fill="#716F6F"
        offset={10} /* Adjusted label offset */
      />
    </Bar>
  </BarChart>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Insights Card */}
          <Card className="shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-[#716F6F]">Detailed Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Courses Card (Active/Inactive) */}
                <div className="flex flex-col p-4 rounded-xl bg-[#F3E8FF]">
                  <span className="text-sm font-medium text-[#716F6F]">Courses</span>
                  <span className="text-xs text-[#7D7D7D] mb-4">Updates 1 Month Ago</span>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-[#E0BFFF]">
                        <BookOpen className="w-5 h-5 text-[#8A2BE2]" />
                      </div>
                      <span className="text-sm font-medium text-[#716F6F]">Active</span>
                      <span className="ml-auto text-lg font-bold text-[#716F6F]">22</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-[#E0BFFF]">
                        <BookOpen className="w-5 h-5 text-[#8A2BE2]" />
                      </div>
                      <span className="text-sm font-medium text-[#716F6F]">Inactive</span>
                      <span className="ml-auto text-lg font-bold text-[#716F6F]">03</span>
                    </div>
                  </div>
                </div>
                
                {/* Classes Card (Online/Offline) */}
                <div className="flex flex-col p-4 rounded-xl bg-[#E0F7FA]">
                  <span className="text-sm font-medium text-[#716F6F]">Classes</span>
                  <span className="text-xs text-[#7D7D7D] mb-4">Updates 1 Week Ago</span>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-[#B2EBF2]">
                        <Users className="w-5 h-5 text-[#00BCD4]" />
                      </div>
                      <span className="text-sm font-medium text-[#716F6F]">Online</span>
                      <span className="ml-auto text-lg font-bold text-[#716F6F]">230</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-[#B2EBF2]">
                        <Users className="w-5 h-5 text-[#00BCD4]" />
                      </div>
                      <span className="text-sm font-medium text-[#716F6F]">Offline</span>
                      <span className="ml-auto text-lg font-bold text-[#716F6F]">45</span>
                    </div>
                  </div>
                </div>
                
                {/* Staff Card (Teaching/Non-Teaching) */}
                <div className="flex flex-col p-4 rounded-xl bg-[#E8F5E9]">
                  <span className="text-sm font-medium text-[#716F6F]">Staff</span>
                  <span className="text-xs text-[#7D7D7D] mb-4">Updates 1 Day Ago</span>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-[#C8E6C9]">
                        <Users className="w-5 h-5 text-[#4CAF50]" />
                      </div>
                      <span className="text-sm font-medium text-[#716F6F]">Teaching</span>
                      <span className="ml-auto text-lg font-bold text-[#716F6F]">66</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-[#C8E6C9]">
                        <Users className="w-5 h-5 text-[#4CAF50]" />
                      </div>
                      <span className="text-sm font-medium text-[#716F6F]">Non-Teaching</span>
                      <span className="ml-auto text-lg font-bold text-[#716F6F]">10</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column (1/3 width) */}
        <div className="space-y-6">
          {/* Recent Activities Card */}
          <Card className="shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-[#716F6F]">Recent Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-[500px] overflow-y-auto">
                {Array.from({ length: 7 }).map((_, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-3 p-3 rounded-lg ${
                      index === 2 ? "bg-[#E0F7FA] border border-[#1BBFCA]" : "bg-white border border-gray-200"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex-shrink-0 ${
                        index === 2 ? "bg-white" : "bg-[#1BBFCA]"
                      }`}
                    />
                    <div className="flex-1">
                      <span className="text-sm font-medium text-[#716F6F]">Notes Created</span>
                      <p className="text-xs text-[#7D7D7D]">| Create | Rvr - Study Material Created</p>
                    </div>
                    
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Support Tickets Card */}
          <Card className="shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-[#716F6F]">Support Tickets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {/* New Tickets */}
                <div className="flex flex-col p-4 rounded-xl bg-[#F3E8FF]">
                  <div className="p-2 rounded-lg bg-[#E0BFFF] mb-2 w-fit">
                    <Ticket className="w-5 h-5 text-[#8A2BE2]" />
                  </div>
                  <span className="text-sm font-medium text-[#716F6F]">New Tickets</span>
                  <span className="text-2xl font-bold text-[#716F6F]">142</span>
                </div>
                
                {/* Open Tickets */}
                <div className="flex flex-col p-4 rounded-xl bg-[#E0F7FA]">
                  <div className="p-2 rounded-lg bg-[#B2EBF2] mb-2 w-fit">
                    <MailOpen className="w-5 h-5 text-[#00BCD4]" />
                  </div>
                  <span className="text-sm font-medium text-[#716F6F]">Open Tickets</span>
                  <span className="text-2xl font-bold text-[#716F6F]">28</span>
                </div>
                
                {/* Average Response Time (full width) */}
                <div className="flex flex-col p-4 rounded-xl bg-[#FFEBEE] col-span-2 relative">
                  <div className="absolute top-4 right-4 text-2xl font-bold text-[#F44336]">164</div>
                  <div className="p-2 rounded-lg bg-[#FFCDD2] mb-2 w-fit">
                    <MessageSquare className="w-5 h-5 text-[#F44336]" />
                  </div>
                  <span className="text-sm font-medium text-[#716F6F]">Average Response Time</span>
                  <span className="text-2xl font-bold text-[#716F6F]">1 Day</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}