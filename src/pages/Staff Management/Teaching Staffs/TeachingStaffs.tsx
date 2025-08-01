import React, { useState } from 'react';
import { Plus, Filter, Mail, ChevronDown } from 'lucide-react';
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { Avatar, AvatarImage } from "../../../components/ui/avatar";
import { Button } from '../../../components/ui/button';
import { Card } from '../../../components/ui/card';
import { useNavigate } from 'react-router-dom';
import { COLORS, FONTS } from '../../../constants/uiConstants';

const theme = {
  primary: {
    bg: 'bg-[#1bbfca]',
    text: 'text-white',
    border: 'border-[#1bbfca]',
    hover: {
      bg: 'hover:bg-[#1aa9b4]',
      border: 'hover:border-[#1aa9b4]'
    }
  }
};

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

  const getStatusButtonStyle = (status: 'Active' | 'Inactive') => {
    if (status === 'Active') {
      return `${theme.primary.bg} ${theme.primary.text} ${theme.primary.hover.bg} border ${theme.primary.border} ${theme.primary.hover.border}`;
    } else {
      return 'bg-destructive text-destructive-foreground hover:bg-destructive/90';
    }
  };

  const navigate = useNavigate();

  const handleProfile = () => {
    navigate('/staffs-details')
  }

  return (
    <div className="space-y-4 min-h-screen overflow-y-auto">
      <h1 style={{...FONTS.heading_02}}>Teaching Staff</h1>
      
      {showAddStaff ? (
        // Add Staff Form (only shown when showAddStaff is true)
        <Card className="p-3 m-2 bg-white rounded-xl border border-gray-100 transition-shadow duration-200 shadow-[0_0_15px_rgba(0,0,0,0.1)] hover:shadow-[0_0_20px_rgba(0,0,0,0.15)]">
          <h3 className="text-xl font-semibold mb-4">Add New Teaching Staff</h3>

          {/* Profile Picture Section */}
          {staff.map((member) => (
            <div key={member.id} className="flex items-center justify-between p-4 border rounded mb-6 bg-white border-gray-100 transition-shadow duration-200 shadow-[0_0_15px_rgba(0,0,0,0.1)] hover:shadow-[0_0_20px_rgba(0,0,0,0.15)]">
              <div className='flex items-center gap-4'>
                <Avatar className='!w-[70px] !h-[70px]'> 
                  <AvatarImage src={member.avatar} alt={member.name} />
                </Avatar>
                <div>
                  <p style={{...FONTS.heading_05_bold,color:COLORS.gray_dark_02}}>Elon Musk</p>
                  <p style={{...FONTS.heading_08,color:COLORS.gray_dark_02}}>Allowed PNG or JPEG. Max size of 800k.</p>
                </div>
              </div>
              <Button className="bg-green-500 hover:bg-green-600 text-white">
                Upload Profile Picture
              </Button>
            </div>
          ))}

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <label style={{...FONTS.heading_08,color:COLORS.gray_dark_02}} htmlFor="">
              Full Name
              <Input 
                className="w-full h-10 border border-[#716F6F] hover:border-[#716F6F] focus:border-[#716F6F] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-[#716F6F]" 
                placeholder="Full Name" 
                value={newStaff.name}
                onChange={(e) => setNewStaff({...newStaff, name: e.target.value})}
              />
            </label>

            <label style={{...FONTS.heading_08,color:COLORS.gray_dark_02}} htmlFor="">
              Email
              <Input 
                className="w-full h-10 border border-[#716F6F] hover:border-[#716F6F] focus:border-[#716F6F] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-[#716F6F]" 
                placeholder="Email" 
                value={newStaff.email}
                onChange={(e) => setNewStaff({...newStaff, email: e.target.value})}
              />
            </label>

            <label style={{...FONTS.heading_08,color:COLORS.gray_dark_02}} htmlFor="">
              Date of Birth
              <Input 
                className="w-full h-10 border border-[#716F6F] hover:border-[#716F6F] focus:border-[#716F6F] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-[#716F6F]" 
                placeholder="Date Of Birth" 
              />
            </label>
           
            <label style={{...FONTS.heading_08,color:COLORS.gray_dark_02}} htmlFor="">
              Gender
              <Select>
                <SelectTrigger className="w-full h-10 border border-[#716F6F] hover:border-[#716F6F] focus:border-[#716F6F] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-[#716F6F]">
                  <SelectValue/>
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem className="bg-white cursor-pointer hover:bg-[#1BBFCA]" value="Male">Male</SelectItem>
                  <SelectItem className="bg-white cursor-pointer hover:bg-[#1BBFCA]" value="Female">Female</SelectItem>
                  <SelectItem className="bg-white cursor-pointer hover:bg-[#1BBFCA]" value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </label>

            <label style={{...FONTS.heading_08,color:COLORS.gray_dark_02}} htmlFor="">
              Courses
              <Select>
                <SelectTrigger className="w-full h-10 border border-[#716F6F] hover:border-[#716F6F] focus:border-[#716F6F] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-[#716F6F]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem className="bg-white cursor-pointer hover:bg-[#1BBFCA]" value="Course 1">Course 1</SelectItem>
                  <SelectItem className="bg-white cursor-pointer hover:bg-[#1BBFCA]" value="Course 2">Course 2</SelectItem>
                </SelectContent>
              </Select>
            </label>

            <label style={{...FONTS.heading_08,color:COLORS.gray_dark_02}} htmlFor="">
              Designation
              <Input 
                className="w-full h-10 border border-[#716F6F] hover:border-[#716F6F] focus:border-[#716F6F] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-[#716F6F]" 
                placeholder="Designation" 
              />
            </label>
            
            <label style={{...FONTS.heading_08,color:COLORS.gray_dark_02}} htmlFor="">
              Qualification
              <Input 
                className="w-full h-10 border border-[#716F6F] hover:border-[#716F6F] focus:border-[#716F6F] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-[#716F6F]" 
                placeholder="Qualification" 
              />
            </label>

            <label style={{...FONTS.heading_08,color:COLORS.gray_dark_02}} htmlFor="">
              State
              <Input 
                className="w-full h-10 border border-[#716F6F] hover:border-[#716F6F] focus:border-[#716F6F] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-[#716F6F]" 
                placeholder="State" 
              />
            </label>

            <label style={{...FONTS.heading_08,color:COLORS.gray_dark_02}} htmlFor="">
              City
              <Input 
                className="w-full h-10 border border-[#716F6F] hover:border-[#716F6F] focus:border-[#716F6F] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-[#716F6F]" 
                placeholder="City" 
              />
            </label>

            <label style={{...FONTS.heading_08,color:COLORS.gray_dark_02}} htmlFor="">
              Pin Code
              <Input 
                className="w-full h-10 border border-[#716F6F] hover:border-[#716F6F] focus:border-[#716F6F] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-[#716F6F]" 
                placeholder="Pin Code" 
              />
            </label>

            <label style={{...FONTS.heading_08,color:COLORS.gray_dark_02}} htmlFor="">
              Address Line 1
              <Input 
                className="w-full h-10 border border-[#716F6F] hover:border-[#716F6F] focus:border-[#716F6F] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-[#716F6F]" 
                placeholder="Address Line 1" 
              />
            </label>

            <label style={{...FONTS.heading_08,color:COLORS.gray_dark_02}} htmlFor="">
              Address Line 2
              <Input 
                className="w-full h-10 border border-[#716F6F] hover:border-[#716F6F] focus:border-[#716F6F] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-[#716F6F]" 
                placeholder="Address Line 2" 
              />
            </label>

            <label style={{...FONTS.heading_08,color:COLORS.gray_dark_02}} htmlFor="">
              Phone Number
              <Input 
                className="w-full h-10 border border-[#716F6F] hover:border-[#716F6F] focus:border-[#716F6F] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-[#716F6F]" 
                placeholder="Phone Number" 
              />
            </label>

            <label style={{...FONTS.heading_08,color:COLORS.gray_dark_02}} htmlFor="">
              Alt Phone Number
              <Input 
                className="w-full h-10 border border-[#716F6F] hover:border-[#716F6F] focus:border-[#716F6F] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-[#716F6F]" 
                placeholder="Alt Phone Number" 
              />
            </label>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 mt-6">
            <Button 
              className="border border-[#1BBFCA] bg-[#1BBFCA]/10 text-[#1BBFCA]"
              variant="outline" 
              onClick={() => setShowAddStaff(false)}
            >
              Back
            </Button>
            <Button 
              className="bg-[#1BBFCA] hover:bg-teal-600 text-white"
              onClick={handleAddStaff}
            >
              Submit
            </Button>
          </div>
        </Card>
      ) : (
        // Normal View (shown when showAddStaff is false)
        <>
          {/* Header */}
          <div className="flex items-center justify-between p-4">
            <Button
              onClick={() => setShowFilter(!showFilter)}
              className={`gap-2 ${theme.primary.bg} ${theme.primary.text} ${theme.primary.hover.bg} border ${theme.primary.border} ${theme.primary.hover.border}`}
            >
              <Filter size={16} />
              Show Filter
            </Button>
            
            <Button 
              onClick={() => setShowAddStaff(true)}
              className={`gap-2 ${theme.primary.bg} ${theme.primary.text} ${theme.primary.hover.bg} border ${theme.primary.border} ${theme.primary.hover.border}`}
            >
              <Plus size={16} />
              Add New Staff
            </Button>
          </div>

          {/* Filter Dropdowns */}
          {showFilter && (
            <Card className="grid grid-cols-2 gap-4 p-4 mx-2 bg-white rounded-xl border border-gray-100 transition-shadow duration-200 shadow-[0_0_15px_rgba(0,0,0,0.1)] hover:shadow-[0_0_20px_rgba(0,0,0,0.15)]">
              <div className="space-y-2">
                <Label style={{color:COLORS.gray_dark_02}} htmlFor="status">Status</Label>
                <Select>
                  <SelectTrigger className="w-full h-10 border border-[#716F6F] hover:border-[#716F6F] focus:border-[#716F6F] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-[#716F6F]">
                    <SelectValue placeholder=" "  />
                  </SelectTrigger>
                  <SelectContent className='bg-white '>
                    <SelectItem className='hover:bg-[#1BBFCA] cursor-pointer' value="all">All</SelectItem>
                    <SelectItem className='hover:bg-[#1BBFCA] cursor-pointer' value="Active">Active</SelectItem>
                    <SelectItem className='hover:bg-[#1BBFCA] cursor-pointer' value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label style={{color:COLORS.gray_dark_02}} htmlFor="course">Course</Label>
                <Select>
                  <SelectTrigger className="w-full h-10 border border-[#716F6F] hover:border-[#716F6F] focus:border-[#716F6F] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-[#716F6F]">
                    <SelectValue placeholder=" " />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem className='hover:bg-[#1BBFCA] cursor-pointer' value="all">All Course</SelectItem>
                    <SelectItem className='hover:bg-[#1BBFCA] cursor-pointer' value="Course 1">Course 1</SelectItem>
                    <SelectItem className='hover:bg-[#1BBFCA] cursor-pointer' value="Course 2">Course 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </Card>
          )}

          {/* Staff List */}
          <Card className="max-w-md m-3 bg-white rounded-xl border border-gray-100 transition-shadow duration-200 shadow-[0_0_15px_rgba(0,0,0,0.1)] hover:shadow-[0_0_20px_rgba(0,0,0,0.15)]">
            <div className="divide-y">
              {staff.map((member) => (
                <div key={member.id} className="p-4">
                  {/* Profile Section */}
                  <div className="flex items-center gap-3 ">
                    <Avatar className='!w-[80px] !h-[80px]'> 
                      <AvatarImage src={member.avatar} alt={member.name} />
                    </Avatar>
                    <h3 style={{...FONTS.heading_02,color:COLORS.gray_dark_02}} className="text-center ">{member.name}</h3>
                  </div>

                  {/* Email Section */}
                  <div className="flex items-center gap-2 mb-3 text-muted-foreground">
                    <Mail size={16} />
                    <span style={{...FONTS.heading_06,color:COLORS.gray_dark_02}}>{member.email}</span>
                  </div>

                  {/* Status Section */}
                  <div className="flex items-center justify-between mb-4 bg-white">
                    <span style={{...FONTS.heading_07,color:COLORS.gray_dark_02}}>Status</span>
                    <Select 
                      value={member.status}
                      onValueChange={(value: 'Active' | 'Inactive') => toggleStatus(member.id)}
                      
                    >
                      <SelectTrigger className={`gap-2 w-[120px] bg-white ${getStatusButtonStyle(member.status)}`}>
                        <SelectValue placeholder={member.status} />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1BBFCA]">
                        <SelectItem value="Active" className="focus:bg-white cursor-pointer">Active</SelectItem>
                        <SelectItem value="Inactive" className="focus:bg-white cursor-pointer">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* View Profile Button */}
                  <Button onClick={handleProfile} className={`w-full bg-[#0400ff] ${theme.primary.text}`} >
                    View Profile
                  </Button>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {staff.length === 0 && (
              <div className="p-8 text-center text-muted-foreground">
                <p>No staff members found.</p>
                <p className="text-sm mt-1">Click "Add New Staff" to get started.</p>
              </div>
            )}
          </Card>
        </>
      )}
    </div>
  );
};

export default TeachingStaffs;