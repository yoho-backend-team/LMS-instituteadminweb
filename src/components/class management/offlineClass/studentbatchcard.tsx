import React, { useState } from 'react';

interface Student {
  id: number;
  name: string;
  email: string;
  avatar: string;
}

interface Instructor {
  id: number;
  name: string;
  avatar: string;
}

const ClassBatch: React.FC = () => {
  const [searchStudent, setSearchStudent] = useState('');

  const instructors: Instructor[] = [
    { id: 1, name: 'Elon Musk', avatar: '/avatar.jpg' },
    { id: 2, name: 'Elon Musk', avatar: '/avatar.jpg' },
    { id: 3, name: 'Elon Musk', avatar: '/avatar.jpg' },
  ];

  const students: Student[] = [
    { id: 1, name: 'Kamal', email: 'kamal.yoho@gmail.com', avatar: '/avatar.jpg' },
    { id: 2, name: 'Kamal', email: 'kamal.yoho@gmail.com', avatar: '/avatar.jpg' },
  ];

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchStudent.toLowerCase())
  );

  return (
    <div className="p-6 bg-white min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Batch 21</h2>
        <div className="flex gap-4">
          <span className="text-sm text-gray-500">Duration: 6 Months</span>
          <button className="text-sm text-green-600 font-medium">Offline</button>
        </div>
      </div>

      {/* Course Info */}
     <div className="bg-gray-50 mt-6 p-6 rounded-xl shadow grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-700">
                <div>
                    <p className="font-semibold text-gray-500">Course</p>
                    <p className="font-medium text-gray-800">MEAN STACK 202</p>
                </div>
                <div>
                    <p className="font-semibold text-gray-500">Started At</p>
                    <p className="font-medium text-gray-800">2025-05-99</p>
                </div>
                <div>
                    <p className="font-semibold text-gray-500">Ended At</p>
                    <p className="font-medium text-gray-800">2025-05-12</p>
                </div>
                <div>
                    <p className="font-semibold text-gray-500">Date</p>
                    <p className="font-medium text-gray-800">2025-06-12T00:00:00.000Z</p>
                </div>
                </div>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Faculty Section */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Faculty & Coordinators</h3>
          {instructors.map(instr => (
            <div key={instr.id} className="flex items-center bg-white p-4 mb-3 shadow rounded-md">
              <img src={instr.avatar} alt={instr.name} className="w-12 h-12 rounded-full mr-4" />
              <div>
                <p className="font-medium">{instr.name}</p>
                <p className="text-sm text-gray-500">Instructor</p>
              </div>
            </div>
          ))}
        </div>

        {/* Enrolled Students Section */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Enrolled Students</h3>
          <input
            type="text"
            placeholder="Search Student"
            value={searchStudent}
            onChange={(e) => setSearchStudent(e.target.value)}
            className="mb-4 w-full px-3 py-2 border rounded focus:outline-none"
          />
          {filteredStudents.map(student => (
            <div key={student.id} className="flex items-center bg-white p-4 mb-3 shadow rounded-md">
              <img src={student.avatar} alt={student.name} className="w-12 h-12 rounded-full mr-4" />
              <div>
                <p className="font-medium">{student.name}</p>
                <p className="text-sm text-gray-500">{student.email}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClassBatch;
