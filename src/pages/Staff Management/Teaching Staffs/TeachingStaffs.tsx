import React, { useState } from 'react';
import { Plus, Filter, Mail, ChevronDown } from 'lucide-react';
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { Avatar, AvatarImage } from "../../../components/ui/avatar";
import { Button } from '../../../components/ui/button';
import { Card } from '../../../components/ui/card';
import { useNavigate } from 'react-router-dom';

// Define your theme colors in one place for easy maintenance
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

  // Status button style based on status
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
    <div className="space-y-4 overflow-y-auto">
      {/* Header - Always visible */}
      <div className="flex items-center justify-between p-4">
        <Button
          onClick={() => setShowFilter(!showFilter)}
          className={`gap-2 ${theme.primary.bg} ${theme.primary.text} ${theme.primary.hover.bg} border ${theme.primary.border} ${theme.primary.hover.border}`}
          disabled={showAddStaff} // Disable when form is open
        >
          <Filter size={16} />
          Show Filter
        </Button>
        
        <Button 
          onClick={() => setShowAddStaff(true)}
          className={`gap-2 ${theme.primary.bg} ${theme.primary.text} ${theme.primary.hover.bg} border ${theme.primary.border} ${theme.primary.hover.border}`}
          disabled={showAddStaff} // Disable when form is open
        >
          <Plus size={16} />
          Add New Staff
        </Button>      </div>

      {/* Conditional rendering - either show form or show the rest */}
      {showAddStaff ? (
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">Add New Teaching Staff</h3>

          {/* Profile Picture Section */}
          <div className="flex items-center justify-between p-4 border rounded mb-6">
            <div>
              <p className="font-medium">Profile Picture</p>
              <p className="text-xs text-muted-foreground">Allowed PNG or JPEG. Max size of 800k.</p>
            </div>
            <Button className="bg-green-500 hover:bg-green-600 text-white">
              Upload Profile Picture
            </Button>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <label htmlFor="">Full Name
            <Input placeholder="Full Name" 
              value={newStaff.name}
              onChange={(e) => setNewStaff({...newStaff, name: e.target.value})}
            />
            </label>

            <label htmlFor="">Email
            <Input placeholder="Email" 
              value={newStaff.email}
              onChange={(e) => setNewStaff({...newStaff, email: e.target.value})}
            /></label>


            <label htmlFor="">Date of Birth
            <Input placeholder="Date Of Birth" />
            </label>
           
           <label htmlFor="">Gender
            <Select>
              <SelectTrigger>
                <SelectValue/>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
            </label>

            <label htmlFor="">Courses
            <Select>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Course 1">Course 1</SelectItem>
                <SelectItem value="Course 2">Course 2</SelectItem>
              </SelectContent>
            </Select>
            </label>

            <label htmlFor="">Designation
              <Input placeholder="Designation" />
            </label>
            
            <label htmlFor="">Qualification
            <Input placeholder="Qualification" /></label>

            <label htmlFor="">State
            <Input placeholder="State" /></label>

            <label htmlFor="">City
            <Input placeholder="City" /></label>

            <label htmlFor="">Pin Code
            <Input placeholder="Pin Code" /></label>

            <label htmlFor="">Address Line 1
            <Input placeholder="Address Line 1" /></label>

            <label htmlFor="">Address Line 2
            <Input placeholder="Address Line 2" /></label>

            <label htmlFor="">Phone Number
            <Input placeholder="Phone Number" /></label>

            <label htmlFor="">Alt Phone Number
            <Input placeholder="Alt Phone Number" /></label>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 mt-6">
            <Button 
              variant="outline" 
              onClick={() => setShowAddStaff(false)}
            >
              Back
            </Button>
            <Button 
              className="bg-teal-500 hover:bg-teal-600 text-white"
              onClick={handleAddStaff}
            >
              Submit
            </Button>
          </div>
        </Card>
      ) : (
        <>
          {/* Filter Dropdowns */}
          {showFilter && (
            <Card className="grid grid-cols-2 gap-4 p-4">
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select>
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder="All"  />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="course">Course</Label>
                <Select>
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder="All Courses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Courses</SelectItem>
                    <SelectItem value="Course 1">Course 1</SelectItem>
                    <SelectItem value="Course 2">Course 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </Card>
          )}

          {/* Staff List */}
          <Card className="max-w-md">
            <div className="divide-y">
              {staff.map((member) => (
                <div key={member.id} className="p-4">
                  {/* Profile Section */}
                  <Avatar>
                      <AvatarImage src={member.avatar} alt={member.name} />
                    </Avatar>
                    <div className="flex-1 ">
                      <h3 className="font-medium text-center">{member.name}</h3>
                    </div>

                  {/* Email Section */}
                  <div className="flex items-center gap-2 mb-3 text-muted-foreground">
                    <Mail size={16} />
                    <span className="text-sm">{member.email}</span>
                  </div>

                  {/* Status Section */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-muted-foreground">Status</span>
                    <Button
                      onClick={() => toggleStatus(member.id)}
                      className={`gap-2 ${getStatusButtonStyle(member.status)}`}
                      size="sm"
                    >
                      {member.status}
                      <ChevronDown size={14} />
                    </Button>
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