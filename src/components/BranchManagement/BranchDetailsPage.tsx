/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  MailOpen,
  MessageSquare,
  MoreVertical,
  Ticket,
  Users,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  LabelList,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import Courses from "../../assets/courses.png";
import Payouts from "../../assets/payout.png";
import Profit from "../../assets/profit.png";
import { getBranchIdData } from "../../features/batchManagement/reducers/thunks";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectBranchId } from "../../features/batchManagement/reducers/selectors";
import { getActivitythunks, getDashboardthunks } from "../../features/Dashboard/reducers/thunks";
import { selectActivityData, selectDashboardData } from "../../features/Dashboard/reducers/selectors";

interface BranchDetailsPageProps {
  uuid: string;
  locationName: string;
  onBack: () => void;
}

const CylinderBar = (props: any) => {
  const { x, y, width, height, value, data, dataKey } = props;
  const barX = Number.isNaN(x) ? 0 : x;
  const barY = Number.isNaN(y) ? 0 : Math.max(0, y);
  const barWidth = Number.isNaN(width) ? 30 : Math.max(0, width);
  const barHeight = Number.isNaN(height) ? 0 : Math.max(0, height);

  // Find max value in current dataset
  const maxValue = Math.max(...data.map((item: any) => item[dataKey]))

  // Colors - use #27AE60 for highest bar, #E4E1FF for others
  const baseColor = value === maxValue ? "#27AE60" : "#C4E8D0";
  const topHighlightColor = "rgba(255, 255, 255, 0.5)";
  const sideHighlightColor = "rgba(255, 255, 255, 0.2)";
  const shadowColor = "rgba(0, 0, 0, 0.2)";

  // Cylinder dimensions
  const radius = barWidth / 2;
  const curveHeight = 8; // Height of the curved top/bottom

  return (
    <g>
      {/* Main cylinder body */}
      <path
        d={`
          M${barX},${barY + curveHeight}
          L${barX},${barY + barHeight - curveHeight}
          A${radius} ${curveHeight} 0 0 0 ${barX + barWidth},${barY + barHeight - curveHeight
          }
          L${barX + barWidth},${barY + curveHeight}
          A${radius} ${curveHeight} 0 0 1 ${barX},${barY + curveHeight}
          Z
        `}
        fill={baseColor}
      />

      {/* Top curved cap */}
      <ellipse
        cx={barX + radius}
        cy={barY + curveHeight}
        rx={radius}
        ry={curveHeight}
        fill={baseColor}
      />

      {/* Top highlight */}
      <ellipse
        cx={barX + radius}
        cy={barY + curveHeight}
        rx={radius * 0.8}
        ry={curveHeight * 0.8}
        fill={topHighlightColor}
      />

      {/* Bottom curved cap */}
      <ellipse
        cx={barX + radius}
        cy={barY + barHeight - curveHeight}
        rx={radius}
        ry={curveHeight}
        fill={baseColor}
      />

      {/* Side highlight */}
      <path
        d={`
          M${barX + barWidth * 0.7},${barY + curveHeight}
          L${barX + barWidth * 0.7},${barY + barHeight - curveHeight}
          A${radius * 0.3} ${curveHeight} 0 0 0 ${barX + barWidth},${barY + barHeight - curveHeight
          }
          L${barX + barWidth},${barY + curveHeight}
          A${radius * 0.3} ${curveHeight} 0 0 1 ${barX + barWidth * 0.7},${barY + curveHeight
          }
        `}
        fill={sideHighlightColor}
        opacity="0.3"
      />

      {/* Bottom shadow */}
      <ellipse
        cx={barX + radius}
        cy={barY + barHeight - curveHeight}
        rx={radius * 0.9}
        ry={curveHeight * 0.5}
        fill={shadowColor}
        opacity="0.2"
      />
    </g>
  );
};

export function BranchDetailsPage({
  uuid,
  locationName,
  onBack,
}: BranchDetailsPageProps) {
  // const chartData = [
  //   {
  //     month: "Jan",
  //     fee: 10000,
  //     salary: 5000,
  //     pendings: 2000,
  //     totalIncome: 12000,
  //   },
  //   {
  //     month: "Feb",
  //     fee: 15000,
  //     salary: 7000,
  //     pendings: 3000,
  //     totalIncome: 18000,
  //   },
  //   {
  //     month: "Mar",
  //     fee: 20000,
  //     salary: 8000,
  //     pendings: 4000,
  //     totalIncome: 22000,
  //   },
  //   {
  //     month: "Apr",
  //     fee: 25000,
  //     salary: 10000,
  //     pendings: 5000,
  //     totalIncome: 28000,
  //   },
  //   {
  //     month: "May",
  //     fee: 15000,
  //     salary: 8000,
  //     pendings: 3000,
  //     totalIncome: 18000,
  //   },
  //   {
  //     month: "Jun",
  //     fee: 50000,
  //     salary: 20000,
  //     pendings: 10000,
  //     totalIncome: 60000,
  //   },
  //   {
  //     month: "Jul",
  //     fee: 35000,
  //     salary: 15000,
  //     pendings: 7000,
  //     totalIncome: 40000,
  //   },
  //   {
  //     month: "Aug",
  //     fee: 30000,
  //     salary: 12000,
  //     pendings: 6000,
  //     totalIncome: 35000,
  //   },
  //   {
  //     month: "Sep",
  //     fee: 36000,
  //     salary: 14000,
  //     pendings: 7500,
  //     totalIncome: 42000,
  //   },
  //   {
  //     month: "Oct",
  //     fee: 30000,
  //     salary: 13000,
  //     pendings: 6500,
  //     totalIncome: 38000,
  //   },
  //   {
  //     month: "Nov",
  //     fee: 40000,
  //     salary: 18000,
  //     pendings: 8000,
  //     totalIncome: 48000,
  //   },
  //   {
  //     month: "Dec",
  //     fee: 26000,
  //     salary: 11000,
  //     pendings: 5500,
  //     totalIncome: 30000,
  //   },
  // ];

  const [activeTab, setActiveTab] = useState<"revenue" | "expense">("revenue");
  const [startIndex, setStartIndex] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  //get branch details using Id

  const branchData = useSelector(selectBranchId);
  console.log("branchId", branchData)

  // dashboard graph data
  const dashData = useSelector(selectDashboardData);

  // activity data
  const ActivityData = useSelector(selectActivityData);

  const chartData = [
    {
      month: "Jan",
      revenue: dashData?.revenue?.[0],
      expense: dashData?.expenses?.[0],
      // pendings: 2000,
      // totalIncome: 12000,
    },
    {
      month: "Feb",
      revenue: dashData?.revenue?.[1],
      expense: dashData?.expenses?.[1],
      // pendings: 3000,
      // totalIncome: 18000,
    },
    {
      month: "Mar",
      revenue: dashData?.revenue?.[2],
      expense: dashData?.expenses?.[2],
      // pendings: 4000,
      // totalIncome: 22000,
    },
    {
      month: "Apr",
      revenue: dashData?.revenue?.[3],
      expense: dashData?.expenses?.[3],
      // pendings: 5000,
      // totalIncome: 28000,
    },
    {
      month: "May",
      revenue: dashData?.revenue?.[4],
      expense: dashData?.expenses?.[4],
      // pendings: 3000,
      // totalIncome: 18000,
    },
    {
      month: "Jun",
      revenue: dashData?.revenue?.[5],
      expense: dashData?.expenses?.[5],
      // pendings: 10000,
      // totalIncome: 60000,
    },
    {
      month: "Jul",
      revenue: dashData?.revenue?.[6],
      expense: dashData?.expenses?.[6],
      // pendings: 7000,
      // totalIncome: 40000,
    },
    {
      month: "Aug",
      revenue: dashData?.revenue?.[7],
      expense: dashData?.expenses?.[7],
      // pendings: 6000,
      // totalIncome: 35000,
    },
    {
      month: "Sep",
      revenue: dashData?.revenue?.[8],
      expense: dashData?.expenses?.[8],
      // pendings: 7500,
      // totalIncome: 42000,
    },
    {
      month: "Oct",
      revenue: dashData?.revenue?.[9],
      expense: dashData?.expenses?.[9],
      // pendings: 6500,
      // totalIncome: 38000,
    },
    {
      month: "Nov",
      revenue: dashData?.revenue?.[10],
      expense: dashData?.expenses?.[10],
      // pendings: 8000,
      // totalIncome: 48000,
    },
    {
      month: "Dec",
      revenue: dashData?.revenue?.[11],
      expense: dashData?.expenses?.[11],
      // pendings: 5500,
      // totalIncome: 30000,
    },
  ];


  // Replace the static statCards array with this dynamic version
  const statCards = [
    {
      title: "Payouts",
      value: `₹${branchData?.payouts || '0'}`,
      icon: Payouts,
      color: "#E4E1FF",
      textColor: "#000000ff",
    },
    {
      title: "Profits",
      value: `${branchData?.profits || '0'}`,
      icon: Profit,
      color: "#E4E1FF",
      textColor: "#000000ff",
    },
    {
      title: "Courses",
      value: `${branchData?.courses || '0'}`,
      icon: Courses,
      color: "#FAD3EF",
      textColor: "#000000ff",
    },
    {
      title: "Students",
      value: `${branchData?.students || '0'}`,
      icon: Courses,
      color: "#FAD3EF",
      textColor: "#000000ff",
    },
    {
      title: "Revenue",
      value: `₹${branchData?.revenue || '0'}`,
      icon: Payouts,
      color: "#FAD3EF",
      textColor: "#000000ff",
    },
  ];

  const dispatch = useDispatch<any>();

  const branchid = uuid;
  console.log("select uuid", uuid);
  //get branch by id
  useEffect(() => {
    dispatch(getBranchIdData(
      branchid
    ))
  }, [dispatch]);

  //get dash report
  useEffect(() => {
    dispatch(getDashboardthunks({ branchid }))
    dispatch(getActivitythunks({ page: 1 }));
  }, [dispatch, branchid]);


  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 1, scale: 1 },
    show: { opacity: 1, scale: 1 },
  }

  const cardHoverVariants = {
    hover: {
      y: -5,
      boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.3 },
    },
  };

  console.log("dashId", dashData)
  console.log("activity data", ActivityData)

  const visibleCards = [
    statCards[startIndex % statCards.length],
    statCards[(startIndex + 1) % statCards.length],
    statCards[(startIndex + 2) % statCards.length],
  ];

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % statCards.length)
  }


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <motion.div

      className="bg-white rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-8">
        <motion.div variants={itemVariants}>
          <Button
            variant="ghost"
            onClick={onBack}
            className="flex items-center gap-2 text-[#1BBFCA] hover:bg-[#1BBFCA]/80 hover:text-white transition-colors duration-300"
          >
            <ArrowLeft size={50} style={{ width: "40px", height: "40px" }} />
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
          {/* Key Metrics Section - Modified to always be visible */}
          <motion.div variants={itemVariants} initial="show">
            <motion.div
              whileHover="hover"
              variants={cardHoverVariants}
              className="bg-white shadow-[0px_4px_24px_rgba(0,0,0,0.15)] rounded-xl p-6 transition-all duration-300"
            >
              <h2 className="text-xl font-semibold text-[#716F6F] mb-6">Key Metrics</h2>

              <div className="relative w-full flex items-center justify-center overflow-visible">


                <div className="flex gap-6 justify-center relative z-0 w-[calc(100%-84px)] py-4">
                  <AnimatePresence initial={false} mode="popLayout">
                    {visibleCards.map((card, index) => (
                      <motion.div
                        key={card.title}
                        layout
                        initial={{ opacity: 0, y: 30, scale: 0.9 }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          scale: index === 1 ? 1.1 : 1,
                          zIndex: index === 1 ? 20 : 10,
                        }}
                        exit={{ opacity: 0, y: -30, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        className={`flex-shrink-0 ${index === 1
                          ? "w-[220px] h-[280px] rounded-3xl"
                          : "w-[200px] h-[250px] rounded-2xl"
                          } text-white shadow-lg flex items-center justify-between px-6 py-6 relative`}
                        style={{ backgroundColor: card.color }}
                        whileHover={{
                          scale: 1.05,
                          boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.2)"
                        }}
                      >
                        <div className="flex flex-col justify-between h-full w-full">
                          <div>
                            <div className="bg-white rounded-xl p-3 mb-2 w-fit shadow-[0_-6px_10px_rgba(255,255,255,0.6)]">
                              <img
                                src={card.icon}
                                alt={card.title}
                                className="h-10 w-10"
                              />
                            </div>
                            <p className="text-base font-semibold">
                              {card.title}
                            </p>
                          </div>
                          <div>
                            <p className="text-2xl font-bold">{card.value}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-[#1BBFCA] rounded-full hover:bg-[#1BBFCA]/90 transition-colors duration-300 absolute right-0 z-30"
                  onClick={handleNext}
                >
                  <ArrowRight className="w-5 h-5 text-white" />
                </Button>
              </div>
            </motion.div>
          </motion.div>

          {/* Statistics Card */}
          <motion.div variants={itemVariants}>
            <motion.div whileHover="hover" variants={cardHoverVariants}>
              <Card className="shadow-[0px_4px_24px_rgba(0,0,0,0.15)] rounded-xl transition-all duration-300">
                <CardHeader className="flex flex-col gap-4">
                  {/* Top row with Statistics title and dropdown button */}
                  <div className="flex justify-between items-center w-full">
                    <h2 className="text-xl font-semibold text-[#716F6F] capitalize">Statistics</h2>
                    <div className="relative" ref={dropdownRef}>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="bg-[#1BBFCA] rounded-lg hover:bg-[#1BBFCA]/90 transition-colors duration-300"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        whileHover={{ rotate: 90 }}
                      >
                        <MoreVertical className="w-5 h-5 text-white" />
                      </Button>

                      <AnimatePresence>
                        {isDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute right-0 top-full mt-2 w-[152px] bg-white shadow-lg rounded-xl overflow-hidden z-50"
                          >
                            <div className="w-full flex flex-col gap-2 p-4">
                              <motion.button
                                whileHover={{ backgroundColor: '#1BBFCA' }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full text-left px-4 py-3 rounded-lg bg-[#1BBFCA] text-white"
                              >
                                <span className="font-medium">Last Week</span>
                              </motion.button>
                              <motion.button
                                whileHover={{ backgroundColor: '#f5f5f5' }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full text-left px-4 py-3 border border-[#716F6F] rounded-lg text-[#716F6F]"
                              >
                                <span className="font-medium">Last Month</span>
                              </motion.button>
                              <motion.button
                                whileHover={{ backgroundColor: '#f5f5f5' }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full text-left px-4 py-3 border border-[#716F6F] rounded-lg text-[#716F6F]"
                              >
                                <span className="font-medium">Last Year</span>
                              </motion.button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Combined Earning Reports and Tabs section - now properly aligned */}
                  <div className="flex flex-row justify-between items-center w-full">
                    <div className="flex flex-col">
                      <h3 className="text-xl font-semibold text-[#716F6F]">Earning Reports</h3>
                      <p className="text-base font-light text-[#7D7D7D] capitalize">Yearly Earnings Overview</p>
                    </div>

                    <Tabs
                      defaultValue="revenue"
                      onValueChange={(value) =>
                        setActiveTab(value as "revenue" | "expense")
                      }
                    >
                      <TabsList className="bg-transparent p-0 gap-4 h-auto">
                        <TabsTrigger
                          value="revenue"
                          className="data-[state=active]:bg-transparent data-[state=active]:shadow-none px-2 py-1 relative"
                        >
                          <span className=" text-[#23AF62] font-semibold text-lg relative">
                            Revenue
                            <span
                              className="absolute bottom-0 left-0 w-0 h-[3px] bg-[#23AF62] transition-all duration-300 data-[state=active]:w-full"
                              data-state={
                                activeTab === "revenue" ? "active" : "inactive"
                              }
                            ></span>
                          </span>
                        </TabsTrigger>
                        <TabsTrigger
                          value="expense"
                          className="data-[state=active]:bg-transparent data-[state=active]:shadow-none px-2 py-1 relative"
                        >
                          <span className="text-[#FF8400] font-semibold text-lg relative">
                            Expense
                            <span
                              className="absolute bottom-0 left-0 w-0 h-[3px] bg-[#FF8400] transition-all duration-300 data-[state=active]:w-full"
                              data-state={
                                activeTab === "expense" ? "active" : "inactive"
                              }
                            ></span>
                          </span>
                        </TabsTrigger>
                        {/* <TabsTrigger
                          value="pendings"
                          className="data-[state=active]:bg-transparent data-[state=active]:shadow-none px-2 py-1 relative"
                        >
                          {/* <span className="text-[#CA2858] font-semibold text-lg relative">
                            Pendings
                            <span
                              className="absolute bottom-0 left-0 w-0 h-[3px] bg-[#CA2858] transition-all duration-300 data-[state=active]:w-full"
                              data-state={
                                activeTab === "pendings" ? "active" : "inactive"
                              }
                            ></span>
                          </span> */}
                        {/* </TabsTrigger> */}
                        {/* <TabsTrigger
                          value="totalIncome"
                          className="data-[state=active]:bg-transparent data-[state=active]:shadow-none px-2 py-1 relative"
                        >
                          <span className="text-[#FFCC00] font-semibold text-lg relative">
                            Total Income
                            <span className="absolute bottom-0 left-0 w-0 h-[3px] bg-[#FFCC00] transition-all duration-300 data-[state=active]:w-full" data-state={activeTab === "totalIncome" ? "active" : "inactive"}></span>
                          </span>
                        </TabsTrigger> */}
                      </TabsList>
                    </Tabs>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="h-[350px]">
                    <BarChart
                      width={780}
                      height={350}
                      data={chartData}
                      margin={{ top: 40, right: 10, left: 5, bottom: 5 }}
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
                        tickFormatter={(value: number) => `₹${value / 1000}K`}
                      />
                      <Bar
                        dataKey={activeTab}
                        shape={(props: any) => <CylinderBar {...props} data={chartData} dataKey={activeTab} />}
                        barSize={30}
                      >
                        <LabelList
                          dataKey={activeTab}
                          position="top"
                          formatter={(value: any) => `₹${value / 1000}K`}
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
          {/* Recent Activities Card */}
          <motion.div variants={itemVariants}>
            <motion.div whileHover="hover" variants={cardHoverVariants}>
              <Card className="shadow-lg rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-[#716F6F]">
                    Recent Activities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-[855px] overflow-y-auto pr-2">
                    {ActivityData?.map((item: any, index: number) => (
                      <motion.div
                        key={index}
                        className="group flex items-start gap-4 p-4 rounded-lg border bg-white border-gray-200"
                        whileHover={{
                          scale: 1.02,
                          backgroundColor: "#1BBFCA",
                          borderColor: "#1BBFCA",
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        {/* Circle - turns white on hover */}
                        <div className="w-[59px] h-[59px] rounded-full bg-[#1BBFCA] flex-shrink-0 group-hover:bg-white" />

                        {/* Text container - ALL text turns white on hover */}
                        <div className="flex-1 [&>*]:text-[#716F6F] [&>*]:group-hover:text-white">
                          <span className="text-lg font-semibold">
                            {item.title}
                          </span>
                          <p className="text-sm">
                            | {item.action} | {item.details}
                          </p>
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
              <Card className="shadow-lg rounded-2xl w-full transition-all duration-300 hover:shadow-xl">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-[#716F6F]">Detailed Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Courses Card (Active/Inactive) */}
                    <div className="bg-white shadow-[0px_4px_24px_rgba(0,0,0,0.15)] rounded-xl p-6">
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-[#716F6F] text-xl font-semibold">Courses</h3>
                        <span className="text-[#7D7D7D] text-sm font-light">Updates 1 Month Ago</span>
                      </div>

                      <div className="space-y-4">
                        {/* Active Courses */}
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 flex items-center justify-center bg-white shadow-[2px_2px_4px_rgba(114,142,171,0.1),-6px_-6px_20px_#FFFFFF,4px_4px_20px_rgba(111,140,176,0.41),inset_-4px_-4px_9px_rgba(255,255,255,0.88)] rounded-xl">
                            <div className="w-10 h-10 bg-[#E0BFFF] rounded-full flex items-center justify-center">
                              <BookOpen className="w-5 h-5 text-[#8A2BE2]" />
                            </div>
                          </div>
                          <span className="text-[#716F6F] text-lg">Active</span>
                          <span className="ml-auto text-[#716F6F] text-2xl font-bold">22</span>
                        </div>

                        {/* Inactive Courses */}
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 flex items-center justify-center bg-white shadow-[2px_2px_4px_rgba(114,142,171,0.1),-6px_-6px_20px_#FFFFFF,4px_4px_20px_rgba(111,140,176,0.41),inset_-4px_-4px_9px_rgba(255,255,255,0.88)] rounded-xl">
                            <div className="w-10 h-10 bg-[#E0BFFF] rounded-full flex items-center justify-center">
                              <BookOpen className="w-5 h-5 text-[#8A2BE2]" />
                            </div>
                          </div>
                          <span className="text-[#716F6F] text-lg">Inactive</span>
                          <span className="ml-auto text-[#716F6F] text-2xl font-bold">03</span>
                        </div>
                      </div>
                    </div>

                    {/* Classes Card (Online/Offline) */}
                    <div className="bg-white shadow-[0px_4px_24px_rgba(0,0,0,0.15)] rounded-xl p-6">
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-[#716F6F] text-xl font-semibold">Classes</h3>
                        <span className="text-[#7D7D7D] text-sm font-light">Updates 1 Week Ago</span>
                      </div>

                      <div className="space-y-4">
                        {/* Online Classes */}
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 flex items-center justify-center bg-white shadow-[2px_2px_4px_rgba(114,142,171,0.1),-6px_-6px_20px_#FFFFFF,4px_4px_20px_rgba(111,140,176,0.41),inset_-4px_-4px_9px_rgba(255,255,255,0.88)] rounded-xl">
                            <div className="w-10 h-10 bg-[#B2EBF2] rounded-full flex items-center justify-center">
                              <Users className="w-5 h-5 text-[#00BCD4]" />
                            </div>
                          </div>
                          <span className="text-[#716F6F] text-lg">Online</span>
                          <span className="ml-auto text-[#716F6F] text-2xl font-bold">230</span>
                        </div>

                        {/* Offline Classes */}
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 flex items-center justify-center bg-white shadow-[2px_2px_4px_rgba(114,142,171,0.1),-6px_-6px_20px_#FFFFFF,4px_4px_20px_rgba(111,140,176,0.41),inset_-4px_-4px_9px_rgba(255,255,255,0.88)] rounded-xl">
                            <div className="w-10 h-10 bg-[#B2EBF2] rounded-full flex items-center justify-center">
                              <Users className="w-5 h-5 text-[#00BCD4]" />
                            </div>
                          </div>
                          <span className="text-[#716F6F] text-lg">Offline</span>
                          <span className="ml-auto text-[#716F6F] text-2xl font-bold">45</span>
                        </div>
                      </div>
                    </div>

                    {/* Staff Card (Teaching/Non-Teaching) */}
                    <div className="bg-white shadow-[0px_4px_24px_rgba(0,0,0,0.15)] rounded-xl p-6">
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-[#716F6F] text-xl font-semibold">Staff</h3>
                        <span className="text-[#7D7D7D] text-sm font-light">Updates 1 Day Ago</span>
                      </div>

                      <div className="space-y-4">
                        {/* Teaching Staff */}
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 flex items-center justify-center bg-white shadow-[2px_2px_4px_rgba(114,142,171,0.1),-6px_-6px_20px_#FFFFFF,4px_4px_20px_rgba(111,140,176,0.41),inset_-4px_-4px_9px_rgba(255,255,255,0.88)] rounded-xl">
                            <div className="w-10 h-10 bg-[#C8E6C9] rounded-full flex items-center justify-center">
                              <Users className="w-5 h-5 text-[#4CAF50]" />
                            </div>
                          </div>
                          <span className="text-[#716F6F] text-lg">Teaching</span>
                          <span className="ml-auto text-[#716F6F] text-2xl font-bold">66</span>
                        </div>

                        {/* Non-Teaching Staff */}
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 flex items-center justify-center bg-white shadow-[2px_2px_4px_rgba(114,142,171,0.1),-6px_-6px_20px_#FFFFFF,4px_4px_20px_rgba(111,140,176,0.41),inset_-4px_-4px_9px_rgba(255,255,255,0.88)] rounded-xl">
                            <div className="w-10 h-10 bg-[#C8E6C9] rounded-full flex items-center justify-center">
                              <Users className="w-5 h-5 text-[#4CAF50]" />
                            </div>
                          </div>
                          <span className="text-[#716F6F] text-lg">Non-Teaching</span>
                          <span className="ml-auto text-[#716F6F] text-2xl font-bold">10</span>
                        </div>
                      </div>
                    </div>
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
              className="w-full bg-white shadow-[0px_4px_24px_rgba(0,0,0,0.15)] rounded-xl p-6 transition-all duration-300 hover:shadow-xl"
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
                <div className="bg-white shadow-[0px_4px_24px_rgba(0,0,0,0.1)] rounded-xl p-4 h-full">
                  <div className="flex flex-col h-full justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 flex items-center justify-center bg-white shadow-[2px_2px_4px_rgba(114,142,171,0.1),-6px_-6px_20px_#FFFFFF,4px_4px_20px_rgba(111,140,176,0.41),inset_-4px_-4px_9px_rgba(255,255,255,0.88)] rounded-xl">
                        <div className="w-10 h-10 bg-[#FDA1A6] rounded-full flex items-center justify-center">
                          <Ticket className="w-5 h-5 text-white" />
                        </div>
                      </div>
                      <span className="text-[#716F6F] text-lg">New Tickets</span>
                    </div>
                    <span className="text-[#716F6F] text-2xl font-bold text-right">142</span>
                  </div>
                </div>

                {/* Open Tickets */}
                <div className="bg-white shadow-[0px_4px_24px_rgba(0,0,0,0.1)] rounded-xl p-4 h-full">
                  <div className="flex flex-col h-full justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 flex items-center justify-center bg-white shadow-[2px_2px_4px_rgba(114,142,171,0.1),-6px_-6px_20px_#FFFFFF,4px_4px_20px_rgba(111,140,176,0.41),inset_-4px_-4px_9px_rgba(255,255,255,0.88)] rounded-xl">
                        <div className="w-10 h-10 bg-[#8A2BE2] rounded-full flex items-center justify-center">
                          <MailOpen className="w-5 h-5 text-white" />
                        </div>
                      </div>
                      <span className="text-[#716F6F] text-lg">Open Tickets</span>
                    </div>
                    <span className="text-[#716F6F] text-2xl font-bold text-right">28</span>
                  </div>
                </div>

                {/* Average Response Time */}
                <div className="bg-white shadow-[0px_4px_24px_rgba(0,0,0,0.1)] rounded-xl p-4 h-full">
                  <div className="flex flex-col h-full justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 flex items-center justify-center bg-white shadow-[2px_2px_4px_rgba(114,142,171,0.1),-6px_-6px_20px_#FFFFFF,4px_4px_20px_rgba(111,140,176,0.41),inset_-4px_-4px_9px_rgba(255,255,255,0.88)] rounded-xl">
                        <div className="w-10 h-10 bg-[#00BCD4] rounded-full flex items-center justify-center">
                          <MessageSquare className="w-5 h-5 text-white" />
                        </div>
                      </div>
                      <span className="text-[#716F6F] text-lg">Avg Response Time</span>
                    </div>
                    <span className="text-[#716F6F] text-2xl font-bold text-right">1 Day</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
