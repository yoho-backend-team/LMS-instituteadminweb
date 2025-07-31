import React, { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

const ClassesPage: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);

  const courses = [
    {
      title: "To Path Of MERN Stack",
      studentCount: 2,
      timeRange: "4:00 AM to 12:30 PM"
    },
    {
      title: "Where Begins The Web History",
      studentCount: 2,
      timeRange: "4:00 AM to 12:30 PM"
    },
    {
      title: "MERN",
      studentCount: 2,
      timeRange: "4:00 AM to 12:30 PM"
    }
  ];

  const handleViewMore = (index: number) => {
    setSelectedCourse(index);
  };

  const handleBack = () => {
    setSelectedCourse(null);
  };

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      {selectedCourse !== null ? (
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-medium text-gray-700">Classes</h1>
            <Button 
              variant="outline" 
              onClick={handleBack}
              className="border-gray-300 text-gray-600 hover:bg-gray-50"
            >
              Back to Courses
            </Button>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-6">
              <div>
                <Label className="block text-sm font-medium text-gray-600 mb-2">Course</Label>
                <Input className="w-full" />
              </div>
              <div>
                <Label className="block text-sm font-medium text-gray-600 mb-2">Batch</Label>
                <Input className="w-full" />
              </div>
              <div>
                <Label className="block text-sm font-medium text-gray-600 mb-2">Duration</Label>
                <Input className="w-full" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div>
                <Label className="block text-sm font-medium text-gray-600 mb-2">Date</Label>
                <Input className="w-full" />
              </div>
              <div>
                <Label className="block text-sm font-medium text-gray-600 mb-2">Started At</Label>
                <Input className="w-full" />
              </div>
              <div>
                <Label className="block text-sm font-medium text-gray-600 mb-2">Ended At</Label>
                <Input className="w-full" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div>
                <Label className="block text-sm font-medium text-gray-600 mb-2">Instructor</Label>
                <Input className="w-full" />
              </div>
              <div>
                <Label className="block text-sm font-medium text-gray-600 mb-2">Class Link</Label>
                <Input className="w-full" />
              </div>
            </div>

            <hr className="my-6" />

            <div className="pt-4">
              <Button 
                variant="outline"
                className="border-[#CA406F] text-black hover:bg-pink-50 px-6 py-2"
              >
                Search Student
              </Button>
            </div>

            <div className="pt-8">
              <div className="grid grid-cols-4 gap-6 items-center bg-gray-50 py-4 px-6 rounded-t-lg">
                <Label className="text-sm font-medium text-gray-600 text-center">Student ID</Label>
                <Label className="text-sm font-medium text-gray-600 text-center">Student Name</Label>
                <Label className="text-sm font-medium text-gray-600 text-center">City</Label>
                <Label className="text-sm font-medium text-gray-600 text-center">Address</Label>
              </div>
              <div className="h-40 bg-gray-50 rounded-b-lg"></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <Card
              key={index}
              className="bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-200"
            >
              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex-grow space-y-2">
                  <h3 className="text-base font-semibold text-gray-800">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {course.studentCount} Students on this Class
                  </p>
                  <p className="text-sm text-gray-500">
                    {course.timeRange}
                  </p>
                </div>
                <div className="flex justify-end mt-4">
                  <Button 
                    className="bg-green-500 hover:bg-green-600 text-white"
                    onClick={() => handleViewMore(index)}
                  >
                    View More
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClassesPage;