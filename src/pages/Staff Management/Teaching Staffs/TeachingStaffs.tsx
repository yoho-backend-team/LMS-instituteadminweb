import React, { useState } from 'react';
import { Plus, Filter, Mail, ChevronDown } from 'lucide-react';
import { Card } from '../../../components/ui/card';

interface Staff {
  id: number;
  name: string;
  email: string;
  status: 'Active' | 'Inactive';
  avatar: string;
}

const TeachingStaffs: React.FC = () => {
  const [staff, setStaff] = useState<Staff[]>([
    {
      id: 1,
      name: 'Elon Musk',
      email: 'Vecorp959@Guidex.Com',
      status: 'Active',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    }
  ]);

  const [showFilter, setShowFilter] = useState(false);
  const [showAddStaff, setShowAddStaff] = useState(false);
  const [newStaff, setNewStaff] = useState({
    name: '',
    email: '',
    status: 'Active' as 'Active' | 'Inactive'
  });

  const handleAddStaff = () => {
    if (newStaff.name && newStaff.email) {
      const newStaffMember: Staff = {
        id: staff.length + 1,
        ...newStaff,
        avatar: `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000000000)}?w=150&h=150&fit=crop&crop=face`
      };
      setStaff([...staff, newStaffMember]);
      setNewStaff({ name: '', email: '', status: 'Active' });
      setShowAddStaff(false);
    }
  };

  const toggleStatus = (id: number) => {
    setStaff(staff.map(member => 
      member.id === id 
        ? { ...member, status: member.status === 'Active' ? 'Inactive' : 'Active' }
        : member
    ));
  };

  return (
    <div>
 

		{/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <button 
            onClick={() => setShowFilter(!showFilter)}
            className="flex items-center gap-2 px-3 py-1.5 !bg-[#1BBFCA] text-white rounded-md text-sm font-medium hover:bg-teal-600 transition-colors"
          >
            <Filter size={16} />
            Show Filter
          </button>
          
          <button 
            onClick={() => setShowAddStaff(!showAddStaff)}
            className="flex items-center gap-2 px-3 py-1.5 !bg-[#1BBFCA] text-white rounded-md text-sm font-medium hover:!border-none hover:bg-teal-600 transition-colors"
          >
            <Plus size={16} />
            Add New Staff
          </button>
        </div>
             {/* Filter Dropdowns */}
{showFilter && (
  <div className="grid grid-cols-2 gap-4 p-4 bg-white shadow-sm rounded-md mt-4">
    <div className="flex flex-col w-full md:w-1/2">
      <label className="text-sm font-medium text-gray-700 mb-1">Status</label>
      <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
        <option value="">All</option>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>
    </div>

    <div className="flex flex-col w-full md:w-1/2">
      <label className="text-sm font-medium text-gray-700 mb-1">Course</label>
      <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
        <option value="">All Courses</option>
        <option value="Course 1">Course 1</option>
        <option value="Course 2">Course 2</option>
      </select>
    </div>
  </div>
)}
      <Card className="max-w-md mx-auto bg-white rounded-lg shadow-sm">
        

       

        {/* Staff List */}
        <div className="divide-y divide-gray-200">
          {staff.map((member) => (
            <div key={member.id} className="p-4">
              {/* Profile Section */}
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{member.name}</h3>
                </div>
              </div>

              {/* Email Section */}
              <div className="flex items-center gap-2 mb-3 text-gray-600">
                <Mail size={16} />
                <span className="text-sm">{member.email}</span>
              </div>

              {/* Status Section */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-600">Status</span>
                <div className="relative">
                  <button
                    onClick={() => toggleStatus(member.id)}
                    className={`flex items-center gap-2 px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                      member.status === 'Active'
                        ? 'bg-teal-100 text-teal-700 hover:bg-teal-200'
                        : 'bg-red-100 text-red-700 hover:bg-red-200'
                    }`}
                  >
                    {member.status}
                    <ChevronDown size={14} />
                  </button>
                </div>
              </div>

              {/* View Profile Button */}
              <button className="w-full bg-blue-600 text-white py-2.5 rounded-md font-medium hover:bg-blue-700 transition-colors">
                View Profile
              </button>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {staff.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            <p>No staff members found.</p>
            <p className="text-sm mt-1">Click "Add New Staff" to get started.</p>
          </div>
        )}
      </Card>
       {/* Add Staff Form */}
        {showAddStaff && (
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Add New Staff</h3>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Full Name"
                value={newStaff.name}
                onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <input
                type="email"
                placeholder="Email Address"
                value={newStaff.email}
                onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <select
                value={newStaff.status}
                onChange={(e) => setNewStaff({ ...newStaff, status: e.target.value as 'Active' | 'Inactive' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <div className="flex gap-2">
                <button
                  onClick={handleAddStaff}
                  className="flex-1 bg-teal-500 text-white py-2 rounded-md hover:bg-teal-600 transition-colors"
                >
                  Add Staff
                </button>
                <button
                  onClick={() => setShowAddStaff(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

    </div>
  );
};

export default TeachingStaffs;