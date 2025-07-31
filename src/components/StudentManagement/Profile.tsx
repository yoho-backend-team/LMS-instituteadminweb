import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Badge } from "../../components/ui/badge"
import { Textarea } from "../../components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import man from "../../assets/studentmanagement/man.png"
import { useNavigate } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { useState } from "react"

export const Profile = () => {
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false)

  const handleBack = () => {
    navigate("/students") 
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  const handleSubmit = () => {
    setIsEditing(false)
  }

  // Edit Mode
  if (isEditing) {
    return (
      <div className="min-h-screen  p-6">
        <div className=" mx-auto">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-gray-800 mb-1">Student Information</h1>
            <p className="text-sm text-gray-500">Edit Student Details</p>
          </div>

          {/* Profile Section */}
     <div className=" rounded-lg shadow-md border p-6">
  {/* Profile Section */}
  <div className="mb-6">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <Avatar className="h-20 w-20 rounded-lg">
          <AvatarImage src={man || "/placeholder.svg"} alt="Kamal Einstein" className="rounded-lg" />
          <AvatarFallback className="rounded-lg">KE</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Kamal Einstein</h3>
          <p className="text-sm text-gray-500">Trainee ID: LMGFR8Z8H</p>
          <Button className="mt-2 bg-[#3AB635] hover:bg-[#3AB635]/90 text-white text-xs px-4 py-1 h-8">
            Upload Your Logo
          </Button>
        </div>
      </div>
      <Button className="bg-[#1BBFCA] hover:bg-[#1BBFCA]/90 text-white px-6">
        Reset
      </Button>
    </div>
  </div>

  {/* Form Section */}
  <div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Full Name */}
      <div className="space-y-2">
        <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
          Full Name
        </Label>
        <Input id="fullName" className="w-full h-10 border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-[18px]" />
      </div>

      {/* Last Name */}
      <div className="space-y-2">
        <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
          Last Name
        </Label>
        <Input id="lastName" className="w-full h-10 border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-[18px]" />
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium text-gray-700">
          Email
        </Label>
        <Input id="email" type="email" className="w-full h-10 border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-[18px]" />
      </div>

      {/* Date Of Birth */}
      <div className="space-y-2">
        <Label htmlFor="dateOfBirth" className="text-sm font-medium text-gray-700">
          Date Of Birth
        </Label>
        <Input id="dateOfBirth"  className="w-full h-10 border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-[18px]" />
      </div>

      {/* Gender */}
      <div className="space-y-2">
        <Label htmlFor="gender" className="text-sm font-medium text-gray-700">
          Gender
        </Label>
        <Input id="gender" className="w-full h-10 border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-[18px]" />
      </div>

      {/* Courses */}
      <div className="space-y-2">
        <Label htmlFor="courses" className="text-sm font-medium text-gray-700">
          Courses
        </Label>
        <Input id="courses" className="w-full  h-10 border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-[18px]" />
      </div>

      {/* Qualification */}
      <div className="space-y-2">
        <Label htmlFor="qualification" className="text-sm font-medium text-gray-700">
          Qualification
        </Label>
        <Input id="qualification" className="w-full h-10 border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-[18px]" />
      </div>

      {/* State */}
      <div className="space-y-2">
        <Label htmlFor="state" className="text-sm font-medium text-gray-700">
          State
        </Label>
        <Input id="state" className="w-full h-10 border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-[18px]" />
      </div>

      {/* City */}
      <div className="space-y-2">
        <Label htmlFor="city" className="text-sm font-medium text-gray-700">
          City
        </Label>
        <Input id="city" className="w-full h-10 border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-[18px]" />
      </div>

      {/* Pin Code */}
      <div className="space-y-2">
        <Label htmlFor="pinCode" className="text-sm font-medium text-gray-700">
          Pin Code
        </Label>
        <Input id="pinCode" className="w-full h-10 border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-[18px]" />
      </div>

      {/* Address Line 1 */}
      <div className="space-y-2">
        <Label htmlFor="addressLine1" className="text-sm font-medium text-gray-700">
          Address Line 1
        </Label>
        <Input id="addressLine1" className="w-full h-10 border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-[18px]" />
      </div>

      {/* Address Line 2 */}
      <div className="space-y-2">
        <Label htmlFor="addressLine2" className="text-sm font-medium text-gray-700">
          Address Line 2
        </Label>
        <Input id="addressLine2" className="w-full h-10 border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-[18px]" />
      </div>

      {/* Phone Number */}
      <div className="space-y-2">
        <Label htmlFor="phoneNumber" className="text-sm font-medium text-gray-700">
          Phone Number
        </Label>
        <Input id="phoneNumber" className="w-full h-10 border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-[18px]" />
      </div>

      {/* Alt Phone Number */}
      <div className="space-y-2">
        <Label htmlFor="altPhoneNumber" className="text-sm font-medium text-gray-700">
          Alt Phone Number
        </Label>
        <Input id="altPhoneNumber" className="w-full h-10 border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-[18px]" />
      </div>
    </div>

    {/* User Name - Full Width */}
    <div className="mt-6 space-y-2">
      <Label htmlFor="userName" className="text-sm font-medium text-gray-700">
        User Name
      </Label>
      <Input id="userName" className="w-full h-10 border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-[18px] max-w-[49%]" />
    </div>

    {/* Action Buttons */}
    <div className="flex justify-end gap-4 mt-8 pt-6">
      <Button
        onClick={handleCancel}
        variant="outline"
        className="border-[#1BBFCA] text-[#1BBFCA] hover:bg-[#1BBFCA]/10 hover:text-[#1BBFCA] px-8 bg-transparent"
      >
        Cancel
      </Button>
      <Button onClick={handleSubmit} className="bg-[#1BBFCA] hover:bg-[#1BBFCA]/90 text-white px-8">
        Submit
      </Button>
    </div>
  </div>
</div>
</div>
      </div>
    )
  }

  // Your original code exactly as you wrote it
  return (
   <div className="min-h-screen p-6">
  <div className="mx-auto space-y-6">
    {/* Back Button at the very top */}
    <div className="flex justify-between items-center">
      <Button 
        variant="outline" 
        onClick={handleBack} 
        className="flex items-center gap-2 bg-transparent"
      >
        <ArrowLeft className="h-4 w-4  " />
       
      </Button>
      
      {/* Profile Header */}
      <div className="flex-1">
        <h2 className="text-[24px] font-semibold text-gray-700 text-start ml-5">Profile Information</h2>
      </div>
      
      {/* Empty div for balance */}
      <div className="w-[104px]"></div>
    </div>

    {/* Profile Content */}
    <div className="border-b pb-4">
      <div className="flex items-center justify-between mt-6">
        <div className="flex items-center space-x-4">
          <Avatar className="h-20 w-20 rounded-md">
            <AvatarImage src={man || "/placeholder.svg"} alt="Kamal Einstein" className="rounded-md" />
            <AvatarFallback className="rounded-md">KE</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg font-semibold">Kamal Einstein</h3>
            <p className="text-sm text-gray-500">Joined on 9 Nov 2024</p>
            <p className="text-sm text-gray-500">Location: Chennai</p>
            <Badge className="mt-1 bg-[#3AB635] text-white hover:bg-[#3AB635] w-[90px] h-[38px]">Active</Badge>
          </div>
        </div>
        <Button className="bg-[#1BBFCA] text-white text-sm hover:bg-[#1BBFCA]/90 w-[104px] h-[48px]">
          ReactJs
        </Button>
      </div>
    </div>
 
        {/* Additional Details */}
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-4">Additional Details</h3>
          <Tabs defaultValue="info" className="w-full">
            <TabsList className="h-[48px] mb-6 bg-transparent p-0 flex gap-2">
              <TabsTrigger
                value="info"
                className="h-full px-6 border border-gray-300 rounded-lg
                        data-[state=active]:bg-[#3AB635] data-[state=active]:text-white
                        data-[state=active]:border-[#3AB635] data-[state=inactive]:bg-white
                        data-[state=inactive]:text-gray-700 hover:bg-gray-50"
              >
                Info
              </TabsTrigger>
              <TabsTrigger
                value="classes"
                className="h-full px-6 border border-gray-300 rounded-lg
                        data-[state=active]:bg-[#3AB635] data-[state=active]:text-white
                        data-[state=active]:border-[#3AB635] data-[state=inactive]:bg-white
                        data-[state=inactive]:text-gray-700 hover:bg-gray-50"
              >
                Classes
              </TabsTrigger>
              <TabsTrigger
                value="activity"
                className="h-full px-6 border border-gray-300 rounded-lg
                        data-[state=active]:bg-[#3AB635] data-[state=active]:text-white
                        data-[state=active]:border-[#3AB635] data-[state=inactive]:bg-white
                        data-[state=inactive]:text-gray-700 hover:bg-gray-50"
              >
                Activity
              </TabsTrigger>
            </TabsList>

            <TabsContent value="info" className="space-y-6">
              {/* Details Section */}
              <div className="bg-white p-6 rounded-lg border shadow-md">
                <h4 className="text-[24px] text-gray-700 mb-4">Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="userName" className="text-sm font-medium text-gray-600">
                      User Name
                    </Label>
                    <Input id="userName" className="w-full h-10 border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-[18px]"/>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-gray-600">
                      Email
                    </Label>
                    <Input id="email" type="email"  className="w-full h-10 border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-[18px]"/>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status" className="text-sm font-medium text-gray-600">
                      Status
                    </Label>
                    <Input id="status"  className="w-full h-10 border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-[18px]"/>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender" className="text-sm font-medium text-gray-600">
                      Gender
                    </Label>
                    <Input id="gender"  className="w-full h-10 border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-[18px]"/>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dob" className="text-sm font-medium text-gray-600">
                      DOB
                    </Label>
                    <Input id="dob"  className="w-full h-10 border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-[18px]"/>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="qualification" className="text-sm font-medium text-gray-600">
                      Qualification
                    </Label>
                    <Input id="qualification"  className="w-full h-10 border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-[18px]"/>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact" className="text-sm font-medium text-gray-600">
                      Contact
                    </Label>
                    <Input id="contact"  className="w-full h-10 border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-[18px]"/>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="altContact" className="text-sm font-medium text-gray-600">
                      Alt Contact
                    </Label>
                    <Input id="altContact"  className="w-full h-10 border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-[18px]"/>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <Label htmlFor="address" className="text-sm font-medium text-gray-600">
                    Address
                  </Label>
                  <Textarea id="address"  className="min-h-[80px] w-full h-10 border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-[18px]"/>
                </div>
              </div>

              {/* Course Details Section */}
              <div className="bg-white p-6 rounded-lg border shadow-md">
                <h4 className="text-base font-medium text-gray-700 mb-4">Course Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="courseId" className="text-sm font-medium text-gray-600">
                      Course ID
                    </Label>
                    <Input id="courseId"  className="w-full h-10 border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-[18px]"/>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="courseName" className="text-sm font-medium text-gray-600">
                      Course Name
                    </Label>
                    <Input id="courseName"  className="w-full h-10 border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-[18px]"/>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="courseDuration" className="text-sm font-medium text-gray-600">
                      Course Duration
                    </Label>
                    <Input id="courseDuration"  className="w-full h-10 border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-[18px]"/>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="coursePrice" className="text-sm font-medium text-gray-600">
                      Course Price
                    </Label>
                    <Input id="coursePrice"  className="w-full h-10 border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-[18px]"/>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <Label htmlFor="learningFormat" className="text-sm font-medium text-gray-600">
                    Learning Format
                  </Label>
                  <Textarea id="learningFormat"   className=" min-h-[80px] w-full h-10 border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-[18px]"/>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4 pt-6">
                <Button
                  variant="outline"
                  className="border-[#1BBFCA] text-[#1BBFCA] hover:bg-[#1BBFCA]/10 hover:text-[#1BBFCA] h-10 px-6 bg-transparent"
                >
                  Delete
                </Button>
                <Button onClick={handleEdit} className="bg-[#1BBFCA] hover:bg-[#1BBFCA]/90 text-white h-10 px-6">
                  Edit
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="classes">
              <div className="text-center py-30 text-gray-500">Classes content will be displayed here</div>
            </TabsContent>

            <TabsContent value="activity">
              <div className="text-center py-30 text-gray-500">Activity content will be displayed here</div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
