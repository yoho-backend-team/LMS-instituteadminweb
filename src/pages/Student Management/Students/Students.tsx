import React from 'react';
import {
  Card,
  CardContent,
  CardFooter,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import location from '../../../assets/studentmanagement/location.jpeg';
import call from '../../../assets/studentmanagement/call.png';
import msg from '../../../assets/studentmanagement/msg.png';
import person from '../../../assets/studentmanagement/person.png';
import send from '../../../assets/studentmanagement/send.png';

const studentData = [
  {
    name: "Elon Musk",
    email: "elonmusk@gmail.com",
    location: "Boca Chica, Undefined",
  },
  {
    name: "Elon Musk",
    email: "elonmusk@gmail.com",
    location: "Hello, Chennai",
  },
  {
    name: "Elon Musk",
    email: "elonmusk@gmail.com",
    location: "Boca Chica, Undefined",
  },
];

const Students = () => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-xl font-semibold">Student</h4>
      </div>

      {/* Button Row */}
      <div className="flex justify-between items-center mb-4">
        <Button variant="outline" className="px-4 py-2">
          Show Filter
        </Button>
        <Button className="px-4 py-2 text-black">
          Add New Student
        </Button>
      </div>

      {/* Scrollable Row of Cards */}
      <div className="flex flex-nowrap gap-6 overflow-x-auto pb-4">
        {studentData.map((student, index) => (
          <Card
            key={index}
            className="min-w-[300px] max-w-[300px] flex-shrink-0 shadow-md"
          >
            <CardContent className="p-4">
              <div className="bg-gray-300 h-32 rounded-md mb-4" />
              <h5 className="text-lg font-semibold">{student.name}</h5>
              <p className="text-sm text-gray-500">{student.email}</p>
              <div className="flex items-center mt-2 text-sm text-gray-700 gap-2">
                <img className="w-5 h-5" src={location} alt="Location" />
                <span>{student.location}</span>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center px-4 pb-4">
              <img className='w-8 h-8' src={call} alt="Call" />
              <img className='w-8 h-8' src={msg} alt="Message" />
              <img className='w-8 h-8' src={person} alt="Profile" />
              <img className='w-8 h-8' src={send} alt="Send" />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Students;