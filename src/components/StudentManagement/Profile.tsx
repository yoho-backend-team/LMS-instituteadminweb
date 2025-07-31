import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Badge } from "../../components/ui/badge"
import { Textarea } from "../../components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import man from "../../assets/studentmanagement/man.png"

export const Profile = () => {
  return (
    <div className="min-h-screen p-6">
      
      <div className="mx-auto space-y-6">
        {/* Profile Header */}
        <div className="border-b pb-4">
          <div>
            <h2 className="text-[24px] font-semibold text-gray-700">Profile Information</h2>
          </div>
          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center space-x-4">
             <Avatar className="h-20 w-20 rounded-md">
  <AvatarImage src={man} alt="Kamal Einstein" className="rounded-md" />
  <AvatarFallback className="rounded-md">KE</AvatarFallback>
</Avatar>

              <div>
                <h3 className="text-lg font-semibold">Kamal Einstein</h3>
                <p className="text-sm text-gray-500">Joined on 9 Nov 2024</p>
                <p className="text-sm text-gray-500">Location: Chennai</p>
                <Badge className="mt-1 bg-[#3AB635] text-white hover:bg-[#3AB635] w-[90px] h-[38px] ">Active</Badge>
              </div>
            </div>
            <Button className="bg-[#1BBFCA] text-white text-sm hover:bg-[#1BBFCA]/90 w-[104px] h-[48px]">ReactJs</Button>
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
                <h4 className="text-base font-medium text-gray-700 mb-4">Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="userName" className="text-sm font-medium text-gray-600">
                      User Name
                    </Label>
                    <Input id="userName"  />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-gray-600">
                      Email
                    </Label>
                    <Input id="email" type="email"  />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status" className="text-sm font-medium text-gray-600">
                      Status
                    </Label>
                    <Input id="status" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender" className="text-sm font-medium text-gray-600">
                      Gender
                    </Label>
                    <Input id="gender"  />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dob" className="text-sm font-medium text-gray-600">
                      DOB
                    </Label>
                    <Input id="dob"  />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="qualification" className="text-sm font-medium text-gray-600">
                      Qualification
                    </Label>
                    <Input id="qualification"  />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact" className="text-sm font-medium text-gray-600">
                      Contact
                    </Label>
                    <Input id="contact"  />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="altContact" className="text-sm font-medium text-gray-600">
                      Alt Contact
                    </Label>
                    <Input id="altContact"  />
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <Label htmlFor="address" className="text-sm font-medium text-gray-600">
                    Address
                  </Label>
                  <Textarea id="address"  className="min-h-[80px]" />
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
                    <Input id="courseId"  />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="courseName" className="text-sm font-medium text-gray-600">
                      Course Name
                    </Label>
                    <Input id="courseName"  />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="courseDuration" className="text-sm font-medium text-gray-600">
                      Course Duration
                    </Label>
                    <Input id="courseDuration" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="coursePrice" className="text-sm font-medium text-gray-600">
                      Course Price
                    </Label>
                    <Input id="coursePrice"  />
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <Label htmlFor="learningFormat" className="text-sm font-medium text-gray-600">
                    Learning Format
                  </Label>
                  <Textarea id="learningFormat"  className="min-h-[80px]" />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4 pt-6">
  <Button 
    variant="outline" 
    className="border-[#1BBFCA] text-[#1BBFCA] hover:bg-[#1BBFCA]/10 hover:text-[#1BBFCA] h-10 px-6"
  >
   Delete
  </Button>
  <Button 
    className="bg-[#1BBFCA] hover:bg-[#1BBFCA]/90 text-white h-10 px-6"
  >
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
