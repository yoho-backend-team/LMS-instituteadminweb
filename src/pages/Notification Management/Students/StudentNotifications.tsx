import { Card, CardContent } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar"
import purpleImg from "../../../assets/purple icon.png"
import greenImg from "../../../assets/green icon.png"
import classImg from "../../../assets/classimg (1).png"
import { Input } from "../../../components/ui/input"
import { Textarea } from "../../../components/ui/textarea"
import { Label } from "../../../components/ui/label"
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "../../../components/ui/select"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "../../../components/ui/drawer"
import { X } from "lucide-react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
 
  getcourse,
  getStudentnotification,
} from "../../../features/StudentNotification/reducer/thunks"
import {
  getInstituteDetails,
  getSelectedBranchId,
} from "../../../apis/httpEndpoints"
import { selectCoursedata, selectStudentNotification } from "../../../features/StudentNotification/reducer/selector"
import { createstudentnotificationdata, resendstudentnotificationdata } from "../../../features/StudentNotification/services/Notification"
import { getBranchService } from "../../../features/batchManagement/services"

interface StudentNotificationData {
  _id: string
  title: string
  body: string
  course: string
  id: number
  status: "read" | "unread"
  student: {
    full_name: string
    email: string
    image: string
  }
  uuid: any
}

interface ApiResponse {
  status: string
  message: string
  count: number
  data: StudentNotificationData[]
}

const StudentNotifications = () => {
  const [open, setOpen] = useState(false)
  const [notificationStats, setNotificationStats] = useState([
    {
      title: "Total Notifications",
      count: 0,
      color: "bg-[#DB55D233]",
      image: purpleImg,
    },
    {
      title: "Read notifications",
      count: 0,
      color: "bg-green-100",
      image: greenImg,
    },
    {
      title: "Unread Notification",
      count: 0,
      color: "bg-[#E3418F33]",
      image: classImg,
    },
  ])
  const [notificationsList, setNotificationsList] = useState<any[]>([])

  const [selectedCourse, setSelectedCourse] = useState("")
  const [selectedBatch, setSelectedBatch] = useState("")
  const [selectedStudent, setSelectedStudent] = useState<string[]>([])
  const [notificationType, setNotificationType] = useState("")
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [link, setLink] = useState("")

  

  const instituteId =
    getInstituteDetails() ?? "973195c0-66ed-47c2-b098-d8989d3e4529"
  const branchId =
    getSelectedBranchId() ?? "90c93163-01cf-4f80-b88b-4bc5a5dd8ee4"

  const reponse: ApiResponse | undefined = useSelector(selectStudentNotification)

  const dispatch = useDispatch<any>()

  const fetchStudentNotification = () => {
    dispatch(
      getStudentnotification({
        branch: branchId,
        institute: instituteId,
        page: 1,
      }),
    )
  }

  const coursedata = useSelector(selectCoursedata)?.data
  console.log(coursedata,"sow")

  const fetchCourse = () => {
    dispatch(getcourse({}))
  }
  

  useEffect(() => {
    fetchStudentNotification()
    fetchCourse()
  }, [dispatch])

  useEffect(() => {
    if (reponse && reponse.data) {
      const totalNotifications = reponse.count
      const readNotifications = reponse.data.filter(
        (n) => n.status === "read",
      ).length
      const unreadNotifications = reponse.data.filter(
        (n) => n.status === "unread",
      ).length

      setNotificationStats([
        {
          title: "Total Notifications",
          count: totalNotifications,
          color: "bg-[#DB55D233]",
          image: purpleImg,
        },
        {
          title: "Read notifications",
          count: readNotifications,
          color: "bg-green-100",
          image: greenImg,
        },
        {
          title: "Unread Notification",
          count: unreadNotifications,
          color: "bg-[#E3418F33]",
          image: classImg,
        },
      ])

      const mappedNotifications = reponse.data.map(
        (item: StudentNotificationData) => ({
          id: item.id,
          user: {
            name: item.student?.full_name || "Unknown User",
            email: item.student?.email || "No Email",
            avatar:
              item.student?.image || "/placeholder.svg?height=40&width=40",
          },
          course: item.title,
          description: item.body,
          uuid: item.uuid,
        }),
      )
      setNotificationsList(mappedNotifications)
    }
  }, [reponse])

  const handleAddNotification = async() => {
    const payload = {
      institute: instituteId,
      branch: branchId,
      course: selectedCourse,
      batch: "688deb796f788de6b9237c44",
      student: ["67f3b8feb8d2634300cc8810"], 
      type: notificationType,
      title,
      body,
      link,
    };
    try{
 
      console.log("Payload:", payload)
      await createstudentnotificationdata(payload)
          setOpen(false)
    }
    catch(error){
    console.log(error)
    }

  }
  const handleResend = async(uuid: any)=>{
    try{
      await resendstudentnotificationdata({
        id:uuid,
        notification_id:uuid
      })
    }
    catch (error){
      console.log(error)
      

    }

  }
  const [branches,setBranches] = useState<any[]>([]);

   const fetchAllBranches = async () => {
      try {
        const response = await getBranchService({});
        if (response) {
          setBranches(response?.data);
          console.log("brn",response);
        } else {
          console.log("No branch found");
        }
      } catch (error) {
        console.log("Error fetching branch data:", error);
      }
    };

    useEffect(() => {
      fetchAllBranches();
    },[])

    console.log(branches,"branches Data")

  return (
    <div className="p-6 min-h-screen">
      <div className="flex justify-end mb-6">
        <Button
          onClick={() => setOpen(true)}
          className="bg-cyan-500 hover:bg-cyan-600 text-white rounded px-4 py-2 shadow"
        >
          Add Notification
        </Button>
      </div>

      <Drawer open={open} onOpenChange={setOpen} direction="right">
        <DrawerContent className="h-full w-full max-w-md ml-auto p-6 bg-white rounded-none shadow-lg border-l">
          <DrawerHeader className="flex items-center justify-between p-0 mb-6 relative">
            <DrawerTitle className="text-lg font-semibold">
              Add Notification
            </DrawerTitle>
            <DrawerClose>
              <X className="w-5 h-5 bg-gray-500 text-white rounded-full p-0.5 hover:text-black absolute top-0 right-0" />
            </DrawerClose>
          </DrawerHeader>
          <form className="flex flex-col space-y-4">
            {/* Select Course */}
            <div className="flex flex-col">
              <Label>Select Course</Label>
              <Select
                value={selectedCourse}
                onValueChange={setSelectedCourse}
              >
                <SelectTrigger className="mt-1 w-full">
                  <SelectValue placeholder="Select Course" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {coursedata?.map((item) => (
                  <SelectItem key={item._id} value="67f3b7fcb8d2634300cc87b6">
                    {item.slug}
                  </SelectItem>
                 ))}
                </SelectContent>
              </Select>
            </div>
            {/* Batch */}
            <div className="flex flex-col">
              <Label>Batch</Label>
              <Select value={selectedBatch} onValueChange={setSelectedBatch}>
                <SelectTrigger className="mt-1 w-full">
                  <SelectValue placeholder="Select Batch" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="688deb796f788de6b9237c44">
                    Batch 1
                  </SelectItem>
                  <SelectItem value="batch2">Batch 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* Student */}
            <div className="flex flex-col">
              <Label>Student</Label>
              <Select
                value={selectedStudent[0] || ""}
                onValueChange={(value) => setSelectedStudent([value])}
              >
                <SelectTrigger className="mt-1 w-full">
                  <SelectValue placeholder="Select Student" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="67f3b8feb8d2634300cc8819">
                    Student 1
                  </SelectItem>
                  <SelectItem value="student2">Student 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* Notification Type */}
            <div className="flex flex-col w-full">
              <Label>Notification Type</Label>
              <Select
                value={notificationType}
                onValueChange={setNotificationType}
              >
                <SelectTrigger className="mt-1 w-full">
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="Alert">Alert</SelectItem>
                  <SelectItem value="Reminder">Reminder</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* Title */}
            <div className="flex flex-col">
              <Label>Title</Label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1"
              />
            </div>
            {/* Body */}
            <div className="flex flex-col">
              <Label>Body</Label>
              <Textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="mt-1"
              />
            </div>
            {/* Link */}
            <div className="flex flex-col">
              <Label>Link</Label>
              <Input
                value={link}
                onChange={(e) => setLink(e.target.value)}
                className="mt-1"
              />
            </div>
            {/* Buttons */}
            <div className="flex justify-between mt-6">
              <Button
                type="button"
                onClick={() => setOpen(false)}
                variant="outline"
                className="border-cyan-500 text-cyan-500 hover:bg-cyan-50 "
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleAddNotification}
                className="bg-cyan-500 hover:bg-cyan-600 text-white"
              >
                Add Notification
              </Button>
            </div>
          </form>
        </DrawerContent>
      </Drawer>

      {/* Summary Cards */}
      <div className="flex gap-6 flex-wrap mb-5">
        {notificationStats.map((stat, index) => (
          <Card
            key={index}
            className={`w-[250px] h-[160px] p-4 rounded-xl shadow-md ${stat.color} relative transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl`}
          >
            <div className="absolute -top-3 left-3">
              <img
                src={stat.image || "/placeholder.svg"}
                alt={stat.title}
                className="w-15 h-15 mt-3 object-contain"
              />
            </div>
            <CardContent className="pt-10">
              <p className="text-gray-700 mr-10 font-medium text-sm">
                {stat.title}
              </p>
              <p className="text-xl font-bold text-gray-800 mt-2">
                {stat.count}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Notifications Section */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Notifications
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notificationsList.map((notification, index) => (
            <Card
              key={index}
              className="bg-white shadow-lg hover:shadow-md transition-shadow flex flex-col h-[255px] border"
            >
              <CardContent className="p-6 flex flex-col flex-grow">
                {/* User Info */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage
                        src={notification.user.avatar || "/placeholder.svg"}
                        alt={notification.user.name}
                      />
                      <AvatarFallback>
                        {notification.user.name
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-gray-900">
                        {notification.user.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {notification.user.email}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">
                    ID : {notification.id}
                  </span>
                </div>
                {/* Course Info */}
                <div className="mb-4 flex-grow">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {notification.course}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {notification.description}
                  </p>
                </div>
                {/* Resend Button - Bottom Left */}
                <div className="mt-auto flex justify-end">
                  <Button
                  onClick={()=>handleResend(notification.uuid)}
                  className="bg-cyan-500 hover:bg-cyan-600 text-white">
                    Resend
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default StudentNotifications
