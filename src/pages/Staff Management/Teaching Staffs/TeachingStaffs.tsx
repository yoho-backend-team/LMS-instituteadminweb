import React, { useEffect, useState, useRef } from 'react';
import { Plus, Filter, Mail } from 'lucide-react';
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { Avatar, AvatarImage } from "../../../components/ui/avatar";
import { Button } from '../../../components/ui/button';
import { Card } from '../../../components/ui/card';
import { useNavigate } from 'react-router-dom';
import { COLORS, FONTS } from '../../../constants/uiConstants';
import { useDispatch, useSelector } from 'react-redux';
import { selectStaff } from '../../../features/staff/reducers/selector';
import { getStaffDetailsData } from '../../../features/staff/reducers/thunks';
import type { AppDispatch } from 'recharts/types/state/store';
import { GetImageUrl } from '../../../utils/helper';
import { createStaff, uploadFile } from '../../../features/staff/services';
import { toast } from 'react-toastify';

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
  dateOfBirth?: string;
  gender?: string;
  course?: string;
  designation?: string;
  qualification?: string;
  state?: string;
  city?: string;
  pinCode?: string;
  addressLine1?: string;
  addressLine2?: string;
  phoneNumber?: string;
  altPhoneNumber?: string;
}

const TeachingStaffs: React.FC = () => {
  const [staff, setStaff] = useState<Staff[]>([
    {
      id: 1,
      name: 'Elon Musk',
      email: 'Vecorp959@Guidex.Com',
      status: 'Active',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      dateOfBirth: '06-08-2000',
      gender: 'Male',
      course: 'MEAN STACK 2024',
      designation: 'Senior Professor',
      qualification: 'Physics',
      state: 'Texas',
      city: 'Boca Chica',
      pinCode: '78521',
      addressLine1: 'Texas: Near The SpaceX Starbase',
      addressLine2: 'Pretoria, Texas',
      phoneNumber: '3804348004',
      altPhoneNumber: '3903858390'
    }
  ]);

  const [showFilter, setShowFilter] = useState(false);
  const [showAddStaff, setShowAddStaff] = useState(false);
  const [newStaff, setNewStaff] = useState<Omit<Staff, 'id' | 'avatar'>>({
    name: '',
    email: '',
    status: 'Active',
    dateOfBirth: '',
    gender: '',
    course: '',
    designation: '',
    qualification: '',
    state: '',
    city: '',
    pinCode: '',
    addressLine1: '',
    addressLine2: '',
    phoneNumber: '',
    altPhoneNumber: ''
  });

  // File upload state
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileUploadError, setFileUploadError] = useState<string | null>(null);

  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const classData = useSelector(selectStaff)?.data || [];

  useEffect(() => {
    if (preview) {
      return () => {
        URL.revokeObjectURL(preview);
      };
    }
  }, [preview]);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Only image files (JPG, PNG) are allowed.');
      return;
    }

    try {
      setIsLoading(true);
      setFileUploadError(null);

      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);

      const formData = new FormData();
      formData.append('file', file);
      
      const response = await uploadFile(formData);
      const uploadedPath = response?.data?.file;

      if (!uploadedPath) {
        throw new Error('Upload failed: No file path returned from server.');
      }

      setUploadedFileName(file.name);
      setFileUrl(uploadedPath);
      toast.success('Profile picture uploaded successfully.');
    } catch (error: any) {
      setFileUploadError(error?.message || 'Failed to upload file');
      toast.error(error?.message || 'Failed to upload file');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddStaff = async () => {
    if (!newStaff.name || !newStaff.email) {
      toast.error('Name and Email are required fields');
      return;
    }

    if (!fileUrl) {
      toast.error('Please upload a profile picture');
      return;
    }

    const payload = {
      branch_id: "90c93163-01cf-4f80-b88b-4bc5a5dd8ee4",
      contact_info: {
        state: newStaff.state,
        city: newStaff.city,
        pincode: newStaff.pinCode,
        address1: newStaff.addressLine1,
        address2: newStaff.addressLine2,
        phone_number: newStaff.phoneNumber,
        alternate_phone_number: newStaff.altPhoneNumber
      },
      course: ['1958e331-84ce-464b-8865-eb06c6189414'],
      designation: newStaff.designation,
      dob: newStaff.dateOfBirth,
      email: newStaff.email,
      full_name: newStaff.name,
      gender: newStaff.gender,
      image: fileUrl,
      institute_id: "973195c0-66ed-47c2-b098-d8989d3e4529",
      qualification: newStaff.qualification,
      staffId: "",
      user_details: "InstituteTeachingStaff"
    };

    try {
      setIsLoading(true);
      const response = await createStaff(payload);
      console.log("Staff Created Successfully:", response);

      setNewStaff({
        name: '',
        email: '',
        status: 'Active',
        dateOfBirth: '',
        gender: '',
        course: '',
        designation: '',
        qualification: '',
        state: '',
        city: '',
        pinCode: '',
        addressLine1: '',
        addressLine2: '',
        phoneNumber: '',
        altPhoneNumber: ''
      });

      setPreview(null);
      setFileUrl(null);
      setUploadedFileName(null);
      setShowAddStaff(false);
      toast.success('Staff member added successfully!');
    } catch (error) {
      console.error("Failed to create staff:", error);
      toast.error('Failed to create staff member');
    } finally {
      setIsLoading(false);
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

  const handleProfile = (staffMember: Staff) => {
    navigate('/staffs-details', { state: { staff: staffMember } });
  };

  const fetchClassData = (page: number = 1) => {
    dispatch(getStaffDetailsData({ page: page }));
  };

  useEffect(() => {
    fetchClassData();
  }, []);

  return (
    <div className="space-y-4 min-h-screen overflow-y-auto">
      <h1 style={{...FONTS.heading_02}}>Teaching Staff</h1>
      
      {showAddStaff ? (
        <Card className="p-3 m-2 bg-white rounded-xl border border-gray-100 transition-shadow duration-200 shadow-[0_0_15px_rgba(0,0,0,0.1)] hover:shadow-[0_0_20px_rgba(0,0,0,0.15)]">
          <h3 className="text-xl font-semibold mb-4">Add New Teaching Staff</h3>

          <div className="flex items-center justify-between p-4 border rounded mb-6 bg-white border-gray-100 transition-shadow duration-200 shadow-[0_0_15px_rgba(0,0,0,0.1)] hover:shadow-[0_0_20px_rgba(0,0,0,0.15)]">
            <div className='flex items-center gap-4'>
              {preview ? (
                <img 
                  src={preview} 
                  alt="Preview" 
                  className="w-16 h-16 rounded-full object-cover"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">No Image</span>
                </div>
              )}
              <div>
                <p style={{...FONTS.heading_05_bold,color:COLORS.gray_dark_02}}>Profile Picture</p>
                <p style={{...FONTS.heading_08,color:COLORS.gray_dark_02}}>
                  {uploadedFileName || "Allowed PNG or JPEG. Max size of 800k."}
                </p>
                {fileUploadError && (
                  <p className="text-red-500 text-sm mt-1">{fileUploadError}</p>
                )}
              </div>
            </div>
            <Button
              onClick={handleUploadClick}
              className="bg-green-500 hover:bg-green-600 text-white"
              disabled={isLoading}
            >
              {isLoading ? 'Uploading...' : 'Upload Profile Picture'}
            </Button>
            <input
              type="file"
              accept=".jpg,.jpeg,.png"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <label style={{...FONTS.heading_08,color:COLORS.gray_dark_02}}>
              Full Name
              <Input 
                className="w-full h-10 border border-[#716F6F] hover:border-[#716F6F] focus:border-[#716F6F] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-[#716F6F]"
                value={newStaff.name}
                onChange={(e) => setNewStaff({...newStaff, name: e.target.value})}
              />
            </label>

            <label style={{...FONTS.heading_08,color:COLORS.gray_dark_02}}>
              Email
              <Input 
                className="w-full h-10 border border-[#716F6F] hover:border-[#716F6F] focus:border-[#716F6F] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-[#716F6F]"
                value={newStaff.email}
                onChange={(e) => setNewStaff({...newStaff, email: e.target.value})}
              />
            </label>

            <label style={{...FONTS.heading_08,color:COLORS.gray_dark_02}}>
              Date of Birth
              <Input 
                className="w-full h-10 border border-[#716F6F] hover:border-[#716F6F] focus:border-[#716F6F] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-[#716F6F]"
                type="date"
                value={newStaff.dateOfBirth}
                onChange={(e) => setNewStaff({...newStaff, dateOfBirth: e.target.value})}
              />
            </label>
           
            <label style={{...FONTS.heading_08,color:COLORS.gray_dark_02}}>
              Gender
              <Select
                value={newStaff.gender}
                onValueChange={(value) => setNewStaff({...newStaff, gender: value})}
              >
                <SelectTrigger className="w-full h-10 border border-[#716F6F] hover:border-[#716F6F] focus:border-[#716F6F] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-[#716F6F]">
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </label>

            <label style={{...FONTS.heading_08,color:COLORS.gray_dark_02}}>
              Courses
              <Select
                value={newStaff.course}
                onValueChange={(value) => setNewStaff({...newStaff, course: value})}
              >
                <SelectTrigger className="w-full h-10 border border-[#716F6F] hover:border-[#716F6F] focus:border-[#716F6F] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-[#716F6F]">
                  <SelectValue placeholder="Select Course" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="MEAN STACK 2024">MEAN STACK 2024</SelectItem>
                  <SelectItem value="React Development">React Development</SelectItem>
                </SelectContent>
              </Select>
            </label>

            <label style={{...FONTS.heading_08,color:COLORS.gray_dark_02}}>
              Designation
              <Input 
                className="w-full h-10 border border-[#716F6F] hover:border-[#716F6F] focus:border-[#716F6F] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-[#716F6F]"
                value={newStaff.designation}
                onChange={(e) => setNewStaff({...newStaff, designation: e.target.value})}
              />
            </label>
            
            <label style={{...FONTS.heading_08,color:COLORS.gray_dark_02}}>
              Qualification
              <Input 
                className="w-full h-10 border border-[#716F6F] hover:border-[#716F6F] focus:border-[#716F6F] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-[#716F6F]"
                value={newStaff.qualification}
                onChange={(e) => setNewStaff({...newStaff, qualification: e.target.value})}
              />
            </label>

            <label style={{...FONTS.heading_08,color:COLORS.gray_dark_02}}>
              State
              <Input 
                className="w-full h-10 border border-[#716F6F] hover:border-[#716F6F] focus:border-[#716F6F] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-[#716F6F]"
                value={newStaff.state}
                onChange={(e) => setNewStaff({...newStaff, state: e.target.value})}
              />
            </label>

            <label style={{...FONTS.heading_08,color:COLORS.gray_dark_02}}>
              City
              <Input 
                className="w-full h-10 border border-[#716F6F] hover:border-[#716F6F] focus:border-[#716F6F] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-[#716F6F]"
                value={newStaff.city}
                onChange={(e) => setNewStaff({...newStaff, city: e.target.value})}
              />
            </label>

            <label style={{...FONTS.heading_08,color:COLORS.gray_dark_02}}>
              Pin Code
              <Input 
                className="w-full h-10 border border-[#716F6F] hover:border-[#716F6F] focus:border-[#716F6F] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-[#716F6F]"
                value={newStaff.pinCode}
                onChange={(e) => setNewStaff({...newStaff, pinCode: e.target.value})}
              />
            </label>

            <label style={{...FONTS.heading_08,color:COLORS.gray_dark_02}}>
              Address Line 1
              <Input 
                className="w-full h-10 border border-[#716F6F] hover:border-[#716F6F] focus:border-[#716F6F] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-[#716F6F]"
                value={newStaff.addressLine1}
                onChange={(e) => setNewStaff({...newStaff, addressLine1: e.target.value})}
              />
            </label>

            <label style={{...FONTS.heading_08,color:COLORS.gray_dark_02}}>
              Address Line 2
              <Input 
                className="w-full h-10 border border-[#716F6F] hover:border-[#716F6F] focus:border-[#716F6F] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-[#716F6F]"
                value={newStaff.addressLine2}
                onChange={(e) => setNewStaff({...newStaff, addressLine2: e.target.value})}
              />
            </label>

            <label style={{...FONTS.heading_08,color:COLORS.gray_dark_02}}>
              Phone Number
              <Input 
                className="w-full h-10 border border-[#716F6F] hover:border-[#716F6F] focus:border-[#716F6F] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-[#716F6F]"
                value={newStaff.phoneNumber}
                onChange={(e) => setNewStaff({...newStaff, phoneNumber: e.target.value})}
              />
            </label>

            <label style={{...FONTS.heading_08,color:COLORS.gray_dark_02}}>
              Alt Phone Number
              <Input 
                className="w-full h-10 border border-[#716F6F] hover:border-[#716F6F] focus:border-[#716F6F] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-[#716F6F]"
                value={newStaff.altPhoneNumber}
                onChange={(e) => setNewStaff({...newStaff, altPhoneNumber: e.target.value})}
              />
            </label>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <Button 
              className="border border-[#1BBFCA] bg-[#1BBFCA]/10 text-[#1BBFCA]"
              variant="outline" 
              onClick={() => {
                setShowAddStaff(false);
                setPreview(null);
                setFileUrl(null);
                setUploadedFileName(null);
              }}
              disabled={isLoading}
            >
              Back
            </Button>
            <Button 
              className="bg-[#1BBFCA] hover:bg-teal-600 text-white"
              onClick={handleAddStaff}
              disabled={isLoading}
            >
              {isLoading ? 'Submitting...' : 'Submit'}
            </Button>
          </div>
        </Card>
      ) : (
        <>
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

          <Card className="max-w-md m-3 bg-white rounded-xl border border-gray-100 transition-shadow duration-200 shadow-[0_0_15px_rgba(0,0,0,0.1)] hover:shadow-[0_0_20px_rgba(0,0,0,0.15)]">
            <div className="divide-y">
              {classData.map((member) => (
                <div key={member?.id} className="p-4">
                  <div className="flex items-center gap-3 ">
                    <Avatar className='!w-[80px] !h-[80px]'> 
                      <AvatarImage src={GetImageUrl(member?.image)} alt={member?.full_name} />
                    </Avatar>
                    <h3 style={{...FONTS.heading_02,color:COLORS.gray_dark_02}} className="text-center ">{member.full_name}</h3>
                  </div>

                  <div className="flex items-center gap-2 mb-3 text-muted-foreground">
                    <Mail size={16} />
                    <span style={{...FONTS.heading_06,color:COLORS.gray_dark_02}}>{member.email}</span>
                  </div>

                  <div className="flex items-center justify-between mb-4 bg-white">
                    <span style={{...FONTS.heading_07,color:COLORS.gray_dark_02}}>Status</span>
                    <Select 
                      value={member?.is_active ? 'Active' : 'Inactive'}
                      onValueChange={(value: 'Active' | 'Inactive') => toggleStatus(member.id)}
                    >
                      <SelectTrigger className={`gap-2 w-[120px] bg-white ${getStatusButtonStyle(member.status)}`}>
                        <SelectValue placeholder={member?.is_active} />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1BBFCA]">
                        <SelectItem value="Active" className="focus:bg-white cursor-pointer">Active</SelectItem>
                        <SelectItem value="Inactive" className="focus:bg-white cursor-pointer">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button onClick={() => handleProfile(member)} className={`w-full bg-[#0400ff] ${theme.primary.text}`}>
                    View Profile
                  </Button>
                </div>
              ))}
            </div>

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