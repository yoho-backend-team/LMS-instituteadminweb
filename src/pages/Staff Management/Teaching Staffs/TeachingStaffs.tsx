/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import { Plus, Filter, Mail } from "lucide-react";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Avatar, AvatarImage } from "../../../components/ui/avatar";
import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";
import { useNavigate } from "react-router-dom";
import { COLORS, FONTS } from "../../../constants/uiConstants";
import { useDispatch, useSelector } from "react-redux";
import {
  selectLoading,
  selectStaff,
} from "../../../features/staff/reducers/selector";
import { getStaffDetailsData } from "../../../features/staff/reducers/thunks";
import { GetImageUrl } from "../../../utils/helper";
import { createStaff, updateStaff } from "../../../features/staff/services";
import ContentLoader from "react-content-loader";
import toast from "react-hot-toast";
// import { GetCourseThunk } from "../../../features/Refund_management/Reducer/refundThunks";
// import { GetLocalStorage } from "../../../utils/localStorage";
import { GetAllCoursesThunk } from "../../../features/Courses_mangement/Reducers/CourseThunks";
import { selectCoursesData } from "../../../features/Courses_mangement/Reducers/Selectors";
import { GetLocalStorage } from "../../../utils/localStorage";

const theme = {
  primary: {
    bg: "bg-[#1bbfca]",
    text: "text-white",
    border: "border-[#1bbfca]",
    hover: {
      bg: "hover:bg-[#1aa9b4]",
      border: "hover:border-[#1aa9b4]",
    },
  },
};

interface Staff {
  id: number;
  name: string;
  email: string;
  status: "Active" | "Inactive";
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
  bank_name?: string;
  bank_branch?: string;
  bank_account_number?: string;
  bank_IFSC?: string;
  monthly_Basic?: string;
  HRA?: string;
  Conveyance?: string;
  Travel_allowance?: string;
  Home_allowance?: string;
}

const TeachingStaffs: React.FC = () => {

  const [showFilter, setShowFilter] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [courseFilter, setCourseFilter] = useState<string>("all");

  const [showAddStaff, setShowAddStaff] = useState(false);
  const [newStaff, setNewStaff] = useState<Omit<Staff, "id" | "avatar">>({
    name: "",
    email: "",
    status: "Active",
    dateOfBirth: "",
    gender: "",
    course: "",
    designation: "",
    qualification: "",
    state: "",
    city: "",
    pinCode: "",
    addressLine1: "",
    addressLine2: "",
    phoneNumber: "",
    altPhoneNumber: "",
    bank_name: "",
    bank_branch: "",
    bank_account_number: "",
    bank_IFSC: "",
    monthly_Basic: "",
    HRA: "",
    Conveyance: "",
    Travel_allowance: "",
    Home_allowance: "",
  });

  const navigate = useNavigate();

  const handleAddStaff = async () => {
    if (newStaff.name && newStaff.email) {
      const payload = {
        branch_id: GetLocalStorage("selectedBranchId"),
        contact_info: {
          state: newStaff.state,
          city: newStaff.city,
          pincode: newStaff.pinCode,
          address1: newStaff.addressLine1,
          address2: newStaff.addressLine2,
          phone_number: newStaff.phoneNumber,
          alternate_phone_number: newStaff.altPhoneNumber,
        },
        course: newStaff.course,
        designation: newStaff.designation,
        dob: newStaff.dateOfBirth,
        email: newStaff.email,
        full_name: newStaff.name,
        gender: newStaff.gender,
        image: "staticfiles/lms/default-image.png",
        institute_id: GetLocalStorage("instituteId"),
        qualification: newStaff.qualification,
        staffId: "",
        user_details: "InstituteTeachingStaff",
        bank_name: newStaff.bank_name,
        bank_branch: newStaff.bank_branch,
        bank_account_number: newStaff.bank_account_number,
        bank_IFSC: newStaff.bank_IFSC,
        monthly_Basic: newStaff.monthly_Basic,
        HRA: newStaff.HRA,
        Conveyance: newStaff.Conveyance,
        Travel_allowance: newStaff.Travel_allowance,
        Home_allowance: newStaff.Home_allowance,
      };

      try {
        const response = await createStaff(payload);
        setNewStaff({
          name: "",
          email: "",
          status: "Active",
          dateOfBirth: "",
          gender: "",
          course: "",
          designation: "",
          qualification: "",
          state: "",
          city: "",
          pinCode: "",
          addressLine1: "",
          addressLine2: "",
          phoneNumber: "",
          altPhoneNumber: "",
          bank_name: "",
          bank_branch: "",
          bank_account_number: "",
          bank_IFSC: "",
          monthly_Basic: "",
          HRA: "",
          Conveyance: "",
          Travel_allowance: "",
          Home_allowance: "",
        });
        if (response.status == 'success') {
          toast.success("Staff created successfully!");
          setShowAddStaff(false);
          fetchClassData();
        } else {
          toast.success(response?.message);
        }
      } catch (error) {
        console.error("❌ Failed to create staff:", error);
        toast.success("failed for staff created data!");
      }
    }
  };



  const toggleStatus = async (staffId: number, status: boolean) => {
    console.log(staffId, 'toggle')


    try {

      await updateStaff({ staffId }, { is_active: status });
      fetchClassData();
      toast.success('updated successfully.....!')
    } catch (error) {
      console.error("❌ Failed to update staff status:", error);
      toast.error(' failed to update')
    }
  };


  const getStatusButtonStyle = (status: "Active" | "Inactive") => {
    if (status === "Active") {
      return `${theme.primary.bg} ${theme.primary.text} ${theme.primary.hover.bg} border ${theme.primary.border} ${theme.primary.hover.border}`;
    } else {
      return "bg-destructive text-destructive-foreground hover:bg-destructive/90";
    }
  };

  const handleProfile = (staffMember: Staff) => {
    navigate("/staffs-details", { state: { staff: staffMember } });
  };

  const dispatch = useDispatch<any>();
  const classData = useSelector(selectStaff)?.data || [];
  const fileInputRef = useRef(null);
  const loading = useSelector(selectLoading);
  const courseData = useSelector(selectCoursesData)

  const fetchClassData = (page: number = 1) => {
    dispatch(
      getStaffDetailsData({
        page: page,
      })
    );
  };

  useEffect(() => {
    fetchClassData();
  }, [dispatch]);


  useEffect(() => {

    dispatch(GetAllCoursesThunk(''))

  }, [])

  const handleFileChange = () => { };

  return (
    <div className="space-y-4 min-h-screen overflow-y-auto">
      <h1 style={{ ...FONTS.heading_02 }}>Teaching Staff</h1>

      {showAddStaff ? (
        <Card className="p-3 m-2 bg-white rounded-xl border border-gray-100 transition-shadow duration-200 shadow-[0_0_15px_rgba(0,0,0,0.1)] hover:shadow-[0_0_20px_rgba(0,0,0,0.15)]">
          <h3 className="text-xl font-semibold mb-4">Add New Teaching Staff</h3>

          <div className="flex items-center justify-between p-4 border rounded mb-6 bg-white border-gray-100 transition-shadow duration-200 shadow-[0_0_15px_rgba(0,0,0,0.1)] hover:shadow-[0_0_20px_rgba(0,0,0,0.15)]">
            <div className="flex items-center gap-4">
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
              <div>
                <p
                  style={{
                    ...FONTS.heading_05_bold,
                    color: COLORS.gray_dark_02,
                  }}
                >
                  Profile Picture
                </p>
                <p style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }}>
                  Allowed PNG or JPEG. Max size of 800k.
                </p>
              </div>
            </div>
            {/* <Button
              onClick={handleUploadClick}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              Upload Profile Picture
            </Button> */}
          </div>

          <div className="space-y-8">
            {/* Personal Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <h1 className="col-span-full text-[20px] font-semibold text-[#716F6F]">
                Personal Info
              </h1>

              <label
                style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }}
              >
                Full Name
                <Input
                  className="w-full h-10 border border-[#716F6F] focus:border-[#716F6F] focus:outline-none"
                  value={newStaff.name}
                  onChange={(e) =>
                    setNewStaff({ ...newStaff, name: e.target.value })
                  }
                />
              </label>

              <label
                style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }}
              >
                Email
                <Input
                  className="w-full h-10 border border-[#716F6F] focus:border-[#716F6F] focus:outline-none"
                  value={newStaff.email}
                  onChange={(e) =>
                    setNewStaff({ ...newStaff, email: e.target.value })
                  }
                />
              </label>

              <label
                style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }}
              >
                Date of Birth
                <Input
                  type="date"
                  className="w-full h-10 border border-[#716F6F] focus:border-[#716F6F] focus:outline-none"
                  value={newStaff.dateOfBirth}
                  onChange={(e) =>
                    setNewStaff({ ...newStaff, dateOfBirth: e.target.value })
                  }
                />
              </label>

              <label
                style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }}
              >
                Gender
                <Select
                  value={newStaff.gender}
                  onValueChange={(value) =>
                    setNewStaff({ ...newStaff, gender: value })
                  }
                >
                  <SelectTrigger className="w-full h-10 border border-[#716F6F] focus:border-[#716F6F] focus:outline-none">
                    <SelectValue placeholder="Select Gender" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </label>

              <label
                style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }}
              >
                Courses
                <Select
                  value={newStaff.course}
                  onValueChange={(value) =>
                    setNewStaff({ ...newStaff, course: value })
                  }
                >
                  <SelectTrigger className="w-full h-10 border border-[#716F6F] focus:border-[#716F6F] focus:outline-none">
                    <SelectValue placeholder="Select Course" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {courseData && courseData.length > 0 ? (
                      courseData.map((course: any) => (
                        <SelectItem key={course._id} value={course.uuid}>
                          {course.course_name}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="no-course" disabled>
                        No Courses Found
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </label>


              <label
                style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }}
              >
                Designation
                <Input
                  className="w-full h-10 border border-[#716F6F] focus:border-[#716F6F] focus:outline-none"
                  value={newStaff.designation}
                  onChange={(e) =>
                    setNewStaff({ ...newStaff, designation: e.target.value })
                  }
                />
              </label>

              <label
                style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }}
              >
                Qualification
                <Input
                  className="w-full h-10 border border-[#716F6F] focus:border-[#716F6F] focus:outline-none"
                  value={newStaff.qualification}
                  onChange={(e) =>
                    setNewStaff({ ...newStaff, qualification: e.target.value })
                  }
                />
              </label>

              <label
                style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }}
              >
                Phone Number
                <Input
                  className="w-full h-10 border border-[#716F6F] focus:border-[#716F6F] focus:outline-none"
                  value={newStaff.phoneNumber}
                  onChange={(e) =>
                    setNewStaff({ ...newStaff, phoneNumber: e.target.value })
                  }
                />
              </label>

              <label
                style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }}
              >
                Alt Phone Number
                <Input
                  className="w-full h-10 border border-[#716F6F] focus:border-[#716F6F] focus:outline-none"
                  value={newStaff.altPhoneNumber}
                  onChange={(e) =>
                    setNewStaff({ ...newStaff, altPhoneNumber: e.target.value })
                  }
                />
              </label>
            </div>

            {/* Address */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <h1 className="col-span-full text-[20px] font-semibold text-[#716F6F]">
                Address
              </h1>

              <label
                style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }}
              >
                Address Line 1
                <Input
                  className="w-full h-10 border border-[#716F6F] focus:border-[#716F6F] focus:outline-none"
                  value={newStaff.addressLine1}
                  onChange={(e) =>
                    setNewStaff({ ...newStaff, addressLine1: e.target.value })
                  }
                />
              </label>

              <label
                style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }}
              >
                Address Line 2
                <Input
                  className="w-full h-10 border border-[#716F6F] focus:border-[#716F6F] focus:outline-none"
                  value={newStaff.addressLine2}
                  onChange={(e) =>
                    setNewStaff({ ...newStaff, addressLine2: e.target.value })
                  }
                />
              </label>

              <label
                style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }}
              >
                City
                <Input
                  className="w-full h-10 border border-[#716F6F] focus:border-[#716F6F] focus:outline-none"
                  value={newStaff.city}
                  onChange={(e) =>
                    setNewStaff({ ...newStaff, city: e.target.value })
                  }
                />
              </label>

              <label
                style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }}
              >
                State
                <Input
                  className="w-full h-10 border border-[#716F6F] focus:border-[#716F6F] focus:outline-none"
                  value={newStaff.state}
                  onChange={(e) =>
                    setNewStaff({ ...newStaff, state: e.target.value })
                  }
                />
              </label>

              <label
                style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }}
              >
                Pin Code
                <Input
                  className="w-full h-10 border border-[#716F6F] focus:border-[#716F6F] focus:outline-none"
                  value={newStaff.pinCode}
                  onChange={(e) =>
                    setNewStaff({ ...newStaff, pinCode: e.target.value })
                  }
                />
              </label>
            </div>

            {/* Bank Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <h1 className="col-span-full text-[20px] font-semibold text-[#716F6F]">
                Bank Details
              </h1>

              <label
                style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }}
              >
                Bank Name
                <Input
                  className="w-full h-10 border border-[#716F6F] focus:border-[#716F6F] focus:outline-none"
                  value={newStaff.bank_name}
                  onChange={(e) =>
                    setNewStaff({ ...newStaff, bank_name: e.target.value })
                  }
                />
              </label>

              <label
                style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }}
              >
                Branch
                <Input
                  className="w-full h-10 border border-[#716F6F] focus:border-[#716F6F] focus:outline-none"
                  value={newStaff.bank_branch}
                  onChange={(e) =>
                    setNewStaff({ ...newStaff, bank_branch: e.target.value })
                  }
                />
              </label>

              <label
                style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }}
              >
                Bank IFSC
                <Input
                  className="w-full h-10 border border-[#716F6F] focus:border-[#716F6F] focus:outline-none"
                  value={newStaff.bank_IFSC}
                  onChange={(e) =>
                    setNewStaff({ ...newStaff, bank_IFSC: e.target.value })
                  }
                />
              </label>

              <label
                style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }}
              >
                Bank Account Number
                <Input
                  className="w-full h-10 border border-[#716F6F] focus:border-[#716F6F] focus:outline-none"
                  value={newStaff.bank_account_number}
                  onChange={(e) =>
                    setNewStaff({
                      ...newStaff,
                      bank_account_number: e.target.value,
                    })
                  }
                />
              </label>
            </div>

            {/* Salary Structure */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <h1 className="col-span-full text-[20px] font-semibold text-[#716F6F]">
                Salary Structure
              </h1>

              <label
                style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }}
              >
                Monthly Basic
                <Input
                  className="w-full h-10 border border-[#716F6F] focus:border-[#716F6F] focus:outline-none"
                  value={newStaff.monthly_Basic}
                  onChange={(e) =>
                    setNewStaff({
                      ...newStaff,
                      monthly_Basic: e.target.value,
                    })
                  }
                />
              </label>

              <label
                style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }}
              >
                HRA
                <Input
                  className="w-full h-10 border border-[#716F6F] focus:border-[#716F6F] focus:outline-none"
                  value={newStaff.HRA}
                  onChange={(e) =>
                    setNewStaff({
                      ...newStaff,
                      HRA: e.target.value,
                    })
                  }
                />
              </label>

              <label
                style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }}
              >
                Conveyance
                <Input
                  className="w-full h-10 border border-[#716F6F] focus:border-[#716F6F] focus:outline-none"
                  value={newStaff.Conveyance}
                  onChange={(e) =>
                    setNewStaff({
                      ...newStaff,
                      Conveyance: e.target.value,
                    })
                  }
                />
              </label>

              <label
                style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }}
              >
                Travel Allowance
                <Input
                  className="w-full h-10 border border-[#716F6F] focus:border-[#716F6F] focus:outline-none"
                  value={newStaff.Travel_allowance}
                  onChange={(e) =>
                    setNewStaff({
                      ...newStaff,
                      Travel_allowance: e.target.value,
                    })
                  }
                />
              </label>

              <label
                style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }}
              >
                Home Allowance
                <Input
                  className="w-full h-10 border border-[#716F6F] focus:border-[#716F6F] focus:outline-none"
                  value={newStaff.Home_allowance}
                  onChange={(e) =>
                    setNewStaff({
                      ...newStaff,
                      Home_allowance: e.target.value,
                    })
                  }
                />
              </label>
            </div>
          </div>

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
                <Label style={{ color: COLORS.gray_dark_02 }} htmlFor="status">
                  Status
                </Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full h-10 border border-[#716F6F]">
                    <SelectValue placeholder=" " />
                  </SelectTrigger>
                  <SelectContent className="bg-white ">
                    <SelectItem value="all" className="hover:bg-[#1BBFCA] cursor-pointer">All</SelectItem>
                    <SelectItem value="Active" className="hover:bg-[#1BBFCA] cursor-pointer">Active</SelectItem>
                    <SelectItem value="Inactive" className="hover:bg-[#1BBFCA] cursor-pointer">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label style={{ color: COLORS.gray_dark_02 }} htmlFor="course">
                  Course
                </Label>
                <Select value={courseFilter} onValueChange={setCourseFilter}>
                  <SelectTrigger className="w-full h-10 border border-[#716F6F]">
                    <SelectValue placeholder=" " />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all" className="hover:bg-[#1BBFCA] cursor-pointer">All Courses</SelectItem>
                    {courseData?.map((course: any) => (
                      <SelectItem key={course._id} value={course.course_name} className="hover:bg-[#1BBFCA] cursor-pointer">
                        {course.course_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

            </Card>
          )}

          <div className="w-full grid grid-cols-3">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 mt-4 gap-5 col-span-3">
                {[...Array(6)].map((_, index) => (
                  <ContentLoader
                    speed={1}
                    width="100%"
                    height="100%"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                    className="w-full h-[310px] p-4 rounded-2xl border shadow-md"
                    key={index}
                  >
                    <rect x="0" y="0" rx="6" ry="6" width="100" height="24" />
                    <rect x="270" y="0" rx="6" ry="6" width="80" height="24" />

                    <rect
                      x="0"
                      y="36"
                      rx="10"
                      ry="10"
                      width="100%"
                      height="120"
                    />

                    <rect x="0" y="170" rx="6" ry="6" width="60%" height="20" />

                    <rect x="0" y="200" rx="4" ry="4" width="80" height="16" />
                    <rect
                      x="280"
                      y="200"
                      rx="4"
                      ry="4"
                      width="60"
                      height="20"
                    />

                    <rect x="0" y="240" rx="6" ry="6" width="100" height="32" />

                    <rect
                      x="260"
                      y="240"
                      rx="6"
                      ry="6"
                      width="80"
                      height="32"
                    />
                  </ContentLoader>
                ))}
              </div>
            ) : (
              classData.map((member: any) => (
                <Card
                  key={member?.id}
                  className="max-w-md m-3 bg-white rounded-xl border border-gray-100 transition-shadow duration-200 shadow-[0_0_15px_rgba(0,0,0,0.1)] hover:shadow-[0_0_20px_rgba(0,0,0,0.15)]"
                >
                  <div className="divide-y">
                    <div className="p-4">
                      <div className="flex items-center gap-3 ">
                        <Avatar className="!w-[80px] !h-[80px]">
                          <AvatarImage
                            src={GetImageUrl(member?.image) ?? undefined}
                            alt={member?.full_name}
                          />
                        </Avatar>
                        <h3
                          style={{
                            ...FONTS.heading_02,
                            color: COLORS.gray_dark_02,
                          }}
                          className="text-center "
                        >
                          {member.full_name}
                        </h3>
                      </div>

                      <div className="flex items-center gap-2 mb-3 text-muted-foreground">
                        <Mail size={16} />
                        <span
                          style={{
                            ...FONTS.heading_06,
                            color: COLORS.gray_dark_02,
                          }}
                        >
                          {member.email}
                        </span>
                      </div>

                      <div className="flex items-center justify-between mb-4 bg-white">
                        <span
                          style={{
                            ...FONTS.heading_07,
                            color: COLORS.gray_dark_02,
                          }}
                        >
                          Status
                        </span>
                        <Select
                          value={member?.is_active ? "Active" : "Inactive"}
                          onValueChange={() =>
                            toggleStatus(member.uuid, !member?.is_active)
                          }
                        >
                          <SelectTrigger
                            className={`gap-2 w-[120px] bg-white ${getStatusButtonStyle(
                              member.status
                            )}`}
                          >
                            <SelectValue placeholder={member?.is_active} />
                          </SelectTrigger>
                          <SelectContent className="bg-[#1BBFCA]">
                            <SelectItem
                              value="Active"
                              className="focus:bg-white cursor-pointer"
                            >
                              Active
                            </SelectItem>
                            <SelectItem
                              value="Inactive"
                              className="focus:bg-white cursor-pointer"
                            >
                              Inactive
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <Button
                        onClick={() => handleProfile(member)}
                        className={`w-full bg-[#0400ff] ${theme.primary.text}`}
                      >
                        View Profile
                      </Button>
                    </div>
                  </div>

                  {/* {staff.length === 0 && (
                    <div className="p-8 text-center text-muted-foreground">
                      <p>No staff members found.</p>
                      <p className="text-sm mt-1">
                        Click "Add New Staff" to get started.
                      </p>
                    </div>
                  )} */}
                </Card>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default TeachingStaffs;