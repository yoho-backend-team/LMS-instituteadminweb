"use client"
import { ArrowLeft, ArrowRight, BookOpen, MailOpen, MessageSquare, MoreVertical, Ticket, Users } from "lucide-react"
import { useState, useRef } from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, LabelList } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"

const Profit = "/placeholder.svg?height=42&width=42"
const Course = "/placeholder.svg?height=42&width=42"
const Pay = "/placeholder.svg?height=42&width=42"

interface BranchDetailsPageProps {
  locationName: string
  onBack: () => void
}

const CylinderBar = (props: any) => {
  const { fill, x, y, width, height } = props
  const barX = Number.isNaN(x) ? 0 : x
  const barY = Number.isNaN(y) ? 0 : Math.max(0, y)
  const barWidth = Number.isNaN(width) ? 0 : Math.max(0, width)
  const barHeight = Number.isNaN(height) ? 0 : Math.max(0, height)

  const baseColor = fill
  const topHighlightColor = "rgba(255, 255, 255, 0.5)"
  const sideHighlightColor = "rgba(255, 255, 255, 0.2)"
  const shadowColor = "rgba(0, 0, 0, 0.2)"

  const radiusX = barWidth / 2
  const radiusY = 8

  return (
    <g>
      <rect
        x={barX}
        y={barY}
        width={barWidth}
        height={barHeight}
        fill={baseColor}
        rx="2"
      />
      <ellipse cx={barX + radiusX} cy={barY} rx={radiusX} ry={radiusY} fill={topHighlightColor} />
      <ellipse
        cx={barX + radiusX}
        cy={barY}
        rx={radiusX * 0.7}
        ry={radiusY * 0.7}
        fill={topHighlightColor}
        opacity="0.5"
      />
      <ellipse cx={barX + radiusX} cy={barY + barHeight} rx={radiusX} ry={radiusY} fill={shadowColor} />
      <path
        d={`
          M${barX + barWidth * 0.7},${barY}
          L${barX + barWidth * 0.7},${barY + barHeight}
          A${radiusX * 0.3},${radiusY} 0 0 0 ${barX + barWidth},${barY + barHeight}
          L${barX + barWidth},${barY}
          A${radiusX * 0.3},${radiusY} 0 0 1 ${barX + barWidth * 0.7},${barY}
        `}
        fill={sideHighlightColor}
        opacity="0.2"
      />
    </g>
  )
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
      color: "rgba(35, 175, 98, 0.75)",
    },
    salary: {
      label: "Salary",
      color: "rgba(255, 132, 0, 0.75)",
    },
    pendings: {
      label: "Pendings",
      color: "rgba(202, 40, 88, 0.75)",
    },
    totalIncome: {
      label: "Total Income",
      color: "rgba(255, 204, 0, 0.75)",
    },
  }

  const [activeTab, setActiveTab] = useState<keyof typeof chartConfig>("fee")
  const metricsContainerRef = useRef<HTMLDivElement>(null)

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  const cardHoverVariants = {
    hover: {
      y: -5,
      boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.3 }
    }
  }

  const scrollMetrics = (direction: 'left' | 'right') => {
    if (metricsContainerRef.current) {
      const container = metricsContainerRef.current
      const scrollAmount = direction === 'left' ? -300 : 300
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  return (
    <motion.div 
      className="container mx-auto py-8 px-4 md:px-6 lg:px-8"
      initial="hidden"
      animate="show"
      variants={containerVariants}
    >
      <div className="flex items-center justify-between mb-8">
        <motion.div variants={itemVariants}>
          <Button 
            variant="ghost" 
            onClick={onBack} 
            className="flex items-center gap-2 text-[#1BBFCA] hover:bg-[#1BBFCA]/10 transition-colors duration-300"
            whileHover={{ x: -5 }}
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-lg font-medium">Back to Locations</span>
          </Button>
        </motion.div>
        <motion.h1 
          className="text-2xl font-bold text-[#1BBFCA]"
          variants={itemVariants}
        >
          {locationName} Dashboard
        </motion.h1>
      </div>
      
      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        variants={containerVariants}
      >
        {/* Left Column (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Key Metrics Section */}
          <motion.div variants={itemVariants}>
            <motion.div
              whileHover="hover"
              variants={cardHoverVariants}
              className="bg-white shadow-[0px_4px_24px_rgba(0,0,0,0.15)] rounded-xl p-6 transition-all duration-300"
            >
              <h2 className="text-xl font-semibold text-[#716F6F] mb-6">Key Metrics</h2>
              
              <div className="flex items-center gap-4">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="bg-[#1BBFCA] rounded-full hover:bg-[#1BBFCA]/90 transition-colors duration-300"
                  onClick={() => scrollMetrics('left')}
                >
                  <ArrowLeft className="w-5 h-5 text-white" />
                </Button>
                
                <div 
                  ref={metricsContainerRef}
                  className="flex-1 flex gap-6 overflow-x-auto scrollbar-hide py-2"
                  style={{ scrollBehavior: 'smooth' }}
                >
                  {/* Profit Card */}
                  <motion.div 
                    className="min-w-[193px] p-4 rounded-xl bg-[rgba(122,105,254,0.2)] shadow-[4px_4px_24px_rgba(0,0,0,0.1)]"
                    whileHover={{ scale: 1.03 }}
                  >
                    <div className="flex flex-col gap-4">
                      <div className="w-14 h-14 flex items-center justify-center bg-white shadow-[2px_2px_4px_rgba(114,142,171,0.1),-6px_-6px_20px_#FFFFFF,4px_4px_20px_rgba(111,140,176,0.41),inset_-4px_-4px_9px_rgba(255,255,255,0.88)] rounded-xl">
                        <div className="w-10 h-10 bg-[#7A69FE] rounded-full flex items-center justify-center">
                          <img src={Profit} alt="Profit" className="w-6 h-6" />
                        </div>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-[#716F6F] text-lg font-medium">Profits</span>
                        <span className="text-[#7D7D7D] text-2xl font-bold">₹12,345</span>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Payout Card */}
                  <motion.div 
                    className="min-w-[241px] p-4 rounded-xl bg-[rgba(62,223,235,0.2)] shadow-[4px_4px_24px_rgba(0,0,0,0.1)]"
                    whileHover={{ scale: 1.03 }}
                  >
                    <div className="flex flex-col gap-4">
                      <div className="w-14 h-14 flex items-center justify-center bg-white shadow-[2px_2px_4px_rgba(114,142,171,0.1),-6px_-6px_20px_#FFFFFF,4px_4px_20px_rgba(111,140,176,0.41),inset_-4px_-4px_9px_rgba(255,255,255,0.88)] rounded-xl">
                        <div className="w-10 h-10 bg-[#3EDFEB] rounded-full flex items-center justify-center">
                          <img src={Pay} alt="Payout" className="w-6 h-6" />
                        </div>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-[#716F6F] text-lg font-medium">Payouts</span>
                        <span className="text-[#7D7D7D] text-2xl font-bold">₹1,234</span>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Course Card */}
                  <motion.div 
                    className="min-w-[193px] p-4 rounded-xl bg-[rgba(230,33,174,0.2)] shadow-[4px_4px_24px_rgba(0,0,0,0.1)]"
                    whileHover={{ scale: 1.03 }}
                  >
                    <div className="flex flex-col gap-4">
                      <div className="w-14 h-14 flex items-center justify-center bg-white shadow-[2px_2px_4px_rgba(114,142,171,0.1),-6px_-6px_20px_#FFFFFF,4px_4px_20px_rgba(111,140,176,0.41),inset_-4px_-4px_9px_rgba(255,255,255,0.88)] rounded-xl">
                        <div className="w-10 h-10 bg-[#E621AE] rounded-full flex items-center justify-center">
                          <img src={Course} alt="Course" className="w-6 h-6" />
                        </div>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-[#716F6F] text-lg font-medium">Courses</span>
                        <span className="text-[#7D7D7D] text-2xl font-bold">98</span>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Students Card */}
                  <motion.div 
                    className="min-w-[193px] p-4 rounded-xl bg-[rgba(255,204,0,0.2)] shadow-[4px_4px_24px_rgba(0,0,0,0.1)]"
                    whileHover={{ scale: 1.03 }}
                  >
                    <div className="flex flex-col gap-4">
                      <div className="w-14 h-14 flex items-center justify-center bg-white shadow-[2px_2px_4px_rgba(114,142,171,0.1),-6px_-6px_20px_#FFFFFF,4px_4px_20px_rgba(111,140,176,0.41),inset_-4px_-4px_9px_rgba(255,255,255,0.88)] rounded-xl">
                        <div className="w-10 h-10 bg-[#FFCC00] rounded-full flex items-center justify-center">
                          <Users className="w-5 h-5 text-white" />
                        </div>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-[#716F6F] text-lg font-medium">Students</span>
                        <span className="text-[#7D7D7D] text-2xl font-bold">1,234</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
                
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="bg-[#1BBFCA] rounded-full hover:bg-[#1BBFCA]/90 transition-colors duration-300"
                  onClick={() => scrollMetrics('right')}
                >
                  <ArrowRight className="w-5 h-5 text-white" />
                </Button>
              </div>
            </motion.div>
          </motion.div>

          {/* Tabs */}
          <motion.div 
            className="flex gap-4 mb-3"
            variants={itemVariants}
          >
            <button
              onClick={() => setActiveTab("revenue")}
              className={`px-4 py-1.5 rounded-lg shadow-md text-sm ${
                activeTab === "revenue"
                  ? "bg-gradient-to-br from-blue-400 to-blue-600 text-white"
                  : "bg-gray-100 text-gray-500 shadow-inner"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Revenue
            </button>
            <button
              onClick={() => setActiveTab("expense")}
              className={`px-4 py-1.5 rounded-lg shadow-md text-sm ${
                activeTab === "expense"
                  ? "bg-gradient-to-br from-rose-400 to-rose-600 text-white"
                  : "bg-gray-100 text-gray-500 shadow-inner"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Expense
            </button>
          </motion.div>

          {/* Statistics Card */}
          <motion.div variants={itemVariants}>
            <motion.div
              whileHover="hover"
              variants={cardHoverVariants}
            >
              <Card className="shadow-[0px_4px_24px_rgba(0,0,0,0.15)] rounded-xl transition-all duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-5">
                      <h2 className="text-xl font-semibold text-[#716F6F] capitalize">Statistics</h2>
                      <div className="flex flex-col gap-2">
                        <h3 className="text-xl font-semibold text-[#716F6F]">Earning Reports</h3>
                        <p className="text-base font-light text-[#7D7D7D] capitalize">Yearly Earnings Overview</p>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="bg-[#1BBFCA] rounded-lg hover:bg-[#1BBFCA]/90 transition-colors duration-300"
                      whileHover={{ rotate: 90 }}
                    >
                      <MoreVertical className="w-5 h-5 text-white" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="fee" onValueChange={(value) => setActiveTab(value as keyof typeof chartConfig)}>
                    <TabsList className="bg-transparent p-0 gap-5 mb-6">
                      <TabsTrigger
                        value="fee"
                        className="data-[state=active]:border-b-[3px] data-[state=active]:border-[#23AF62] p-2.5 transition-all duration-300"
                      >
                        <span className="text-[#23AF62] font-semibold text-lg capitalize hover:text-[#23AF62]/90">Fee</span>
                      </TabsTrigger>
                      <TabsTrigger
                        value="salary"
                        className="data-[state=active]:border-b-[3px] data-[state=active]:border-[#FF8400] p-2.5 transition-all duration-300"
                      >
                        <span className="text-[#FF8400] font-semibold text-lg capitalize hover:text-[#FF8400]/90">Salary</span>
                      </TabsTrigger>
                      <TabsTrigger
                        value="pendings"
                        className="data-[state=active]:border-b-[3px] data-[state=active]:border-[#CA2858] p-2.5 transition-all duration-300"
                      >
                        <span className="text-[#CA2858] font-semibold text-lg capitalize hover:text-[#CA2858]/90">Pendings</span>
                      </TabsTrigger>
                      <TabsTrigger
                        value="totalIncome"
                        className="data-[state=active]:border-b-[3px] data-[state=active]:border-[#FFCC00] p-2.5 transition-all duration-300"
                      >
                        <span className="text-[#FFCC00] font-semibold text-lg capitalize hover:text-[#FFCC00]/90">Total Income</span>
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                  <div className="h-[350px]">
                    <BarChart
                      width={700}
                      height={350}
                      data={chartData}
                      margin={{ top: 20, right: 10, left: 5, bottom: 5 }}
                      barCategoryGap="20%"
                    >
                      <CartesianGrid vertical={false} strokeDasharray="4 4" />
                      <XAxis
                        dataKey="month"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        padding={{ left: 10, right: 10 }}
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
                        radius={[4, 4, 0, 0]}
                      >
                        <LabelList
                          dataKey={activeTab}
                          position="top"
                          formatter={(value: number) => `₹${value / 1000}K`}
                          fill="#716F6F"
                          offset={10}
                        />
                      </Bar>
                    </BarChart>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
        
       {/* Right Column (1/3 width) */}
<div className="space-y-6">
  {/* Recent Activities Card with increased height */}
  <motion.div variants={itemVariants}>
    <motion.div
      whileHover="hover"
      variants={cardHoverVariants}
    >
      <Card className="shadow-lg rounded-2xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-[#716F6F]">Recent Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-[850px] overflow-y-auto pr-2"> {/* Increased from 500px to 650px */}
            {/* Activity Items with animation - Added more items */}
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item, index) => ( 
              <motion.div
                key={index}
                className={`flex items-start gap-4 p-4 rounded-lg border ${
                  index === 2 
                    ? "bg-[#1BBFCA] border-[#1BBFCA]" 
                    : "bg-white border-gray-200"
                }`}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className={`w-[59px] h-[59px] rounded-full ${
                  index === 2 ? "bg-white" : "bg-[#1BBFCA]"
                } flex-shrink-0`} />
                <div className="flex-1">
                  <span className={`text-lg font-semibold ${
                    index === 2 ? "text-white" : "text-[#716F6F]"
                  }`}>Notes Created</span>
                  <p className={`text-sm ${
                    index === 2 ? "text-white" : "text-[#7D7D7D]"
                  }`}>| Create | Rvr - Study Material Created</p>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  </motion.div>
</div>
        
        {/* Full width section for Detailed Insights and Support Tickets */}
        <div className="lg:col-span-3 space-y-6">
          {/* Detailed Insights Card */}
          <motion.div variants={itemVariants}>
            <motion.div
              whileHover="hover"
              variants={cardHoverVariants}
            >
              <Card className="shadow-lg rounded-2xl w-full transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-[#716F6F]">Detailed Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Courses Card (Active/Inactive) */}
                    <motion.div 
                      className="bg-white shadow-[0px_4px_24px_rgba(0,0,0,0.15)] rounded-xl p-6"
                      whileHover={{ y: -5 }}
                    >
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-[#716F6F] text-xl font-semibold">Courses</h3>
                        <span className="text-[#7D7D7D] text-sm font-light">Updates 1 Month Ago</span>
                      </div>

                      <div className="space-y-4">
                        {/* Active Courses */}
                        <motion.div 
                          className="flex items-center gap-4"
                          whileHover={{ x: 5 }}
                        >
                          <div className="w-14 h-14 flex items-center justify-center bg-white shadow-[2px_2px_4px_rgba(114,142,171,0.1),-6px_-6px_20px_#FFFFFF,4px_4px_20px_rgba(111,140,176,0.41),inset_-4px_-4px_9px_rgba(255,255,255,0.88)] rounded-xl">
                            <div className="w-10 h-10 bg-[#E0BFFF] rounded-full flex items-center justify-center">
                              <BookOpen className="w-5 h-5 text-[#8A2BE2]" />
                            </div>
                          </div>
                          <span className="text-[#716F6F] text-lg">Active</span>
                          <span className="ml-auto text-[#716F6F] text-2xl font-bold">22</span>
                        </motion.div>

                        {/* Inactive Courses */}
                        <motion.div 
                          className="flex items-center gap-4"
                          whileHover={{ x: 5 }}
                        >
                          <div className="w-14 h-14 flex items-center justify-center bg-white shadow-[2px_2px_4px_rgba(114,142,171,0.1),-6px_-6px_20px_#FFFFFF,4px_4px_20px_rgba(111,140,176,0.41),inset_-4px_-4px_9px_rgba(255,255,255,0.88)] rounded-xl">
                            <div className="w-10 h-10 bg-[#E0BFFF] rounded-full flex items-center justify-center">
                              <BookOpen className="w-5 h-5 text-[#8A2BE2]" />
                            </div>
                          </div>
                          <span className="text-[#716F6F] text-lg">Inactive</span>
                          <span className="ml-auto text-[#716F6F] text-2xl font-bold">03</span>
                        </motion.div>
                      </div>
                    </motion.div>

                    {/* Classes Card (Online/Offline) */}
                    <motion.div 
                      className="bg-white shadow-[0px_4px_24px_rgba(0,0,0,0.15)] rounded-xl p-6"
                      whileHover={{ y: -5 }}
                    >
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-[#716F6F] text-xl font-semibold">Classes</h3>
                        <span className="text-[#7D7D7D] text-sm font-light">Updates 1 Week Ago</span>
                      </div>

                      <div className="space-y-4">
                        {/* Online Classes */}
                        <motion.div 
                          className="flex items-center gap-4"
                          whileHover={{ x: 5 }}
                        >
                          <div className="w-14 h-14 flex items-center justify-center bg-white shadow-[2px_2px_4px_rgba(114,142,171,0.1),-6px_-6px_20px_#FFFFFF,4px_4px_20px_rgba(111,140,176,0.41),inset_-4px_-4px_9px_rgba(255,255,255,0.88)] rounded-xl">
                            <div className="w-10 h-10 bg-[#B2EBF2] rounded-full flex items-center justify-center">
                              <Users className="w-5 h-5 text-[#00BCD4]" />
                            </div>
                          </div>
                          <span className="text-[#716F6F] text-lg">Online</span>
                          <span className="ml-auto text-[#716F6F] text-2xl font-bold">230</span>
                        </motion.div>

                        {/* Offline Classes */}
                        <motion.div 
                          className="flex items-center gap-4"
                          whileHover={{ x: 5 }}
                        >
                          <div className="w-14 h-14 flex items-center justify-center bg-white shadow-[2px_2px_4px_rgba(114,142,171,0.1),-6px_-6px_20px_#FFFFFF,4px_4px_20px_rgba(111,140,176,0.41),inset_-4px_-4px_9px_rgba(255,255,255,0.88)] rounded-xl">
                            <div className="w-10 h-10 bg-[#B2EBF2] rounded-full flex items-center justify-center">
                              <Users className="w-5 h-5 text-[#00BCD4]" />
                            </div>
                          </div>
                          <span className="text-[#716F6F] text-lg">Offline</span>
                          <span className="ml-auto text-[#716F6F] text-2xl font-bold">45</span>
                        </motion.div>
                      </div>
                    </motion.div>

                    {/* Staff Card (Teaching/Non-Teaching) */}
                    <motion.div 
                      className="bg-white shadow-[0px_4px_24px_rgba(0,0,0,0.15)] rounded-xl p-6"
                      whileHover={{ y: -5 }}
                    >
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-[#716F6F] text-xl font-semibold">Staff</h3>
                        <span className="text-[#7D7D7D] text-sm font-light">Updates 1 Day Ago</span>
                      </div>

                      <div className="space-y-4">
                        {/* Teaching Staff */}
                        <motion.div 
                          className="flex items-center gap-4"
                          whileHover={{ x: 5 }}
                        >
                          <div className="w-14 h-14 flex items-center justify-center bg-white shadow-[2px_2px_4px_rgba(114,142,171,0.1),-6px_-6px_20px_#FFFFFF,4px_4px_20px_rgba(111,140,176,0.41),inset_-4px_-4px_9px_rgba(255,255,255,0.88)] rounded-xl">
                            <div className="w-10 h-10 bg-[#C8E6C9] rounded-full flex items-center justify-center">
                              <Users className="w-5 h-5 text-[#4CAF50]" />
                            </div>
                          </div>
                          <span className="text-[#716F6F] text-lg">Teaching</span>
                          <span className="ml-auto text-[#716F6F] text-2xl font-bold">66</span>
                        </motion.div>

                        {/* Non-Teaching Staff */}
                        <motion.div 
                          className="flex items-center gap-4"
                          whileHover={{ x: 5 }}
                        >
                          <div className="w-14 h-14 flex items-center justify-center bg-white shadow-[2px_2px_4px_rgba(114,142,171,0.1),-6px_-6px_20px_#FFFFFF,4px_4px_20px_rgba(111,140,176,0.41),inset_-4px_-4px_9px_rgba(255,255,255,0.88)] rounded-xl">
                            <div className="w-10 h-10 bg-[#C8E6C9] rounded-full flex items-center justify-center">
                              <Users className="w-5 h-5 text-[#4CAF50]" />
                            </div>
                          </div>
                          <span className="text-[#716F6F] text-lg">Non-Teaching</span>
                          <span className="ml-auto text-[#716F6F] text-2xl font-bold">10</span>
                        </motion.div>
                      </div>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Support Tickets Card */}
          <motion.div variants={itemVariants}>
            <motion.div
              whileHover="hover"
              variants={cardHoverVariants}
              className="w-full bg-white shadow-[0px_4px_24px_rgba(0,0,0,0.15)] rounded-xl p-6 transition-all duration-300"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-[#716F6F] text-xl font-semibold">Support Tickets</h3>
                <motion.span 
                  className="text-[#CA406F] text-2xl font-semibold"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  164
                </motion.span>
              </div>
              {/* Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* New Tickets */}
                <motion.div 
                  className="bg-white shadow-[0px_4px_24px_rgba(0,0,0,0.1)] rounded-xl p-4 h-full"
                  whileHover={{ scale: 1.03 }}
                >
                  <div className="flex flex-col h-full justify-between">
                    <div className="flex items-center gap-4">
                      <motion.div 
                        className="w-14 h-14 flex items-center justify-center bg-white shadow-[2px_2px_4px_rgba(114,142,171,0.1),-6px_-6px_20px_#FFFFFF,4px_4px_20px_rgba(111,140,176,0.41),inset_-4px_-4px_9px_rgba(255,255,255,0.88)] rounded-xl"
                        whileHover={{ rotate: 10 }}
                      >
                        <div className="w-10 h-10 bg-[#FDA1A6] rounded-full flex items-center justify-center">
                          <Ticket className="w-5 h-5 text-white" />
                        </div>
                      </motion.div>
                      <span className="text-[#716F6F] text-lg">New Tickets</span>
                    </div>
                    <span className="text-[#716F6F] text-2xl font-bold text-right">142</span>
                  </div>
                </motion.div>
                
                {/* Open Tickets */}
                <motion.div 
                  className="bg-white shadow-[0px_4px_24px_rgba(0,0,0,0.1)] rounded-xl p-4 h-full"
                  whileHover={{ scale: 1.03 }}
                >
                  <div className="flex flex-col h-full justify-between">
                    <div className="flex items-center gap-4">
                      <motion.div 
                        className="w-14 h-14 flex items-center justify-center bg-white shadow-[2px_2px_4px_rgba(114,142,171,0.1),-6px_-6px_20px_#FFFFFF,4px_4px_20px_rgba(111,140,176,0.41),inset_-4px_-4px_9px_rgba(255,255,255,0.88)] rounded-xl"
                        whileHover={{ rotate: 10 }}
                      >
                        <div className="w-10 h-10 bg-[#8A2BE2] rounded-full flex items-center justify-center">
                          <MailOpen className="w-5 h-5 text-white" />
                        </div>
                      </motion.div>
                      <span className="text-[#716F6F] text-lg">Open Tickets</span>
                    </div>
                    <span className="text-[#716F6F] text-2xl font-bold text-right">28</span>
                  </div>
                </motion.div>
                
                {/* Average Response Time */}
                <motion.div 
                  className="bg-white shadow-[0px_4px_24px_rgba(0,0,0,0.1)] rounded-xl p-4 h-full"
                  whileHover={{ scale: 1.03 }}
                >
                  <div className="flex flex-col h-full justify-between">
                    <div className="flex items-center gap-4">
                      <motion.div 
                        className="w-14 h-14 flex items-center justify-center bg-white shadow-[2px_2px_4px_rgba(114,142,171,0.1),-6px_-6px_20px_#FFFFFF,4px_4px_20px_rgba(111,140,176,0.41),inset_-4px_-4px_9px_rgba(255,255,255,0.88)] rounded-xl"
                        whileHover={{ rotate: 10 }}
                      >
                        <div className="w-10 h-10 bg-[#00BCD4] rounded-full flex items-center justify-center">
                          <MessageSquare className="w-5 h-5 text-white" />
                        </div>
                      </motion.div>
                      <span className="text-[#716F6F] text-lg">Avg Response Time</span>
                    </div>
                    <span className="text-[#716F6F] text-2xl font-bold text-right">1 Day</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}