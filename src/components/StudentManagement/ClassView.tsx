import { ArrowLeft } from "lucide-react";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";


export default function ClassView() {
  const navigate = useNavigate();

  

  const handleBack = () => {
    navigate(-1);
  };
  return (
    <div className="min-h-screen  p-4 sm:p-6 lg:p-8">
      <div className="  rounded-lg  ">
        {/* Header */}
        <div className="flex items-center mb-6 ">
          <Button
            variant="outline"
            onClick={handleBack}
            className="flex items-center gap-2 bg-transparent mr-5"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-semibold text-gray-800">Class</h1>
        </div>

        {/* First row of information cards */}
        <Card className="p-4 rounded-lg shadow-md mb-4">
          <CardContent className="p-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Course</p>
              <p className="text-lg font-semibold text-gray-800">
                MEAN STACK 202
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Batch</p>
              <p className="text-lg font-semibold text-gray-800">2025-05-99</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Duration</p>
              <p className="text-lg font-semibold text-gray-800">2025-05-12</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Date</p>
              <p className="text-lg font-semibold text-gray-800">
                2025-06-12T:00:00:00.000Z
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Second row of information cards */}
        <Card className="p-4 rounded-lg shadow-md mb-8">
          <CardContent className="p-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Sorted At</p>
              <p className="text-lg font-semibold text-gray-800">2025-05-99</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Ended At</p>
              <p className="text-lg font-semibold text-gray-800">2025-05-12</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Instructor</p>
              <p className="text-lg font-semibold text-gray-800">
                MEAN STACK 202
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Class Link</p>
              <p className="text-lg font-semibold text-gray-800">
                2025-06-12T:00:00:00.000Z
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Search Student Input */}
        <div className="mb-6">
          <Input
            type="text"
            placeholder="Search Student"
            className="w-full max-w-md border-2 border-gray-300  focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>

        {/* Student Table Header */}
        <div className="bg-gray-100 rounded-md p-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-gray-700 font-medium text-sm">
          <div className="col-span-1">Student ID</div>
          <div className="col-span-1">Student Name</div>
          <div className="col-span-1">City</div>
          <div className="col-span-1">Address</div>
        </div>

        {/* Placeholder for Student Table Body */}
        <div className="mt-4 text-gray-500 text-center">
          {/* Student data would go here */}
        </div>
      </div>
    </div>
  );
}
