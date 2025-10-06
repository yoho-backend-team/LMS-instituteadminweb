import type React from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Badge } from "../../components/ui/badge";
import { Textarea } from "../../components/ui/textarea";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Info, ShieldCheck } from "lucide-react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getclassstudentData,
  getcoursesdata,
  getLiveClassDataSet,
  getStudentActivityData,
} from "../../features/StudentManagement/reducer/thunks";
import {
  selectClassData,
  selectCoursedata,
  selectStudentActivityData,
} from "../../features/StudentManagement/reducer/selector";
import {
  deletestudentdata,
  updatestudentdata,
} from "../../features/StudentManagement/services/Student";
import { GetImageUrl } from "../../utils/helper";
import toast from "react-hot-toast";
import {
  getInstituteDetails,
  getSelectedBranchId,
} from "../../apis/httpEndpoints";
import { Card, CardContent } from "../ui/card";
import { COLORS, FONTS } from "../../constants/uiConstants";
import { RiPresentationFill } from "react-icons/ri";
import { Calendar, Clock } from 'lucide-react';

export const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch<any>();
  const studData = useSelector(selectCoursedata);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 5;

  // Get student data from navigation state
  const studentDataFromLocation = location.state?.studentData || {};

  const instituteId = getInstituteDetails();
  const branchId = getSelectedBranchId();

  const studentActivityData = useSelector(selectStudentActivityData)?.data;

  const fetchLiveData = async () => {
    try {
      await dispatch(
        getLiveClassDataSet({
          type: "live",
          branch: branchId,
          course_name: studentDataFromLocation?._id,
          insitute: instituteId,
          uuid: studentDataFromLocation?.uuid,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const fetchActivityData = async (page = 1) => {
    try {
      const res: any = await dispatch(
        getStudentActivityData({
          studentId: "67f3b8feb8d2634300cc8819",
          page,
          limit: itemsPerPage,
        })
      );

      if (res.payload && res.payload.totalCount) {
        setTotalPages(Math.ceil(res.payload.totalCount / itemsPerPage));
      } else if (res.payload && Array.isArray(res.payload)) {
        setTotalPages(Math.ceil(res.payload.length / itemsPerPage));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const ClassViewData = useSelector(selectClassData);

  useEffect(() => {
    dispatch(getclassstudentData({ studentid: '67f3b8feb8d2634300cc8819' }))
  }, [dispatch])

  useEffect(() => {
    fetchActivityData(currentPage);
  }, [currentPage, dispatch]);
  
  useEffect(() => {
    fetchLiveData();
  }, []);

  const fetchData = async () => {
    try {
      if (studentDataFromLocation?.uuid) {
        dispatch(getcoursesdata({ uuid: studentDataFromLocation.uuid }));
      }
    } catch (error) {
      console.log(error);
      setError("Failed to fetch student data");
    }
  };

  useEffect(() => {
    fetchData();
  }, [dispatch, studentDataFromLocation.uuid]);

  // State for form data
  const [formData, setFormData] = useState({
    fullName: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
    gender: "",
    courses: "",
    qualification: "",
    state: "",
    city: "",
    pinCode: "",
    addressLine1: "",
    addressLine2: "",
    phoneNumber: "",
    altPhoneNumber: "",
    userName: "",
    status: "Active",
    courseId: "",
    courseName: "",
    courseDuration: "",
    coursePrice: "",
    learningFormat: "",
    address: "",
    image: "",
  });

  // Update form data when studData changes
  useEffect(() => {
    if (studData?.data) {
      setFormData({
        fullName: studData.data.first_name || "",
        lastName: studData.data.last_name || "",
        image: studData?.data?.image,
        email: studData.data.email || "",
        dateOfBirth: studData.data.dob || "",
        gender: studData.data.gender || "",
        courses: studData.data.userDetail?.course?.course_name || "",
        qualification: studData.data.qualification || "",
        state: studData.data.contact_info?.state || "",
        city: studData.data.contact_info?.city || "",
        pinCode: studData.data.contact_info?.pincode || "",
        addressLine1: studData.data.contact_info?.address1 || "",
        addressLine2: studData.data.contact_info?.address2 || "",
        phoneNumber: studData.data.contact_info?.phone_number || "",
        altPhoneNumber:
          studData.data.contact_info?.alternate_phone_number || "",
        userName: studData.data.full_name || "",
        status: studData.data.is_active ? "Active" : "Inactive",
        courseId: studData.data.id || "",
        courseName: studData.data.userDetail?.course?.course_name || "",
        courseDuration: studData.data.userDetail?.course?.duration || "",
        coursePrice:
          studData.data.userDetail?.course?.current_price?.toString() || "",
        learningFormat:
          studData.data.userDetail?.course?.class_type?.join(", ") || "",
        address: `${studData.data.contact_info?.address1 || ""} ${studData.data.contact_info?.address2 || ""
          } ${studData.data.contact_info?.city || ""} ${studData.data.contact_info?.state || ""
          } ${studData.data.contact_info?.pincode || ""}`.trim(),
      });
    }
  }, [studData]);

  const handleBack = () => {
    navigate("/students");
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (studData?.data) {
      setFormData({
        fullName: studData.data.first_name || "",
        lastName: studData.data.last_name || "",
        email: studData.data.email || "",
        dateOfBirth: studData.data.dob || "",
        gender: studData.data.gender || "",
        courses: studData.data.userDetail?.course?.course_name || "",
        qualification: studData.data.qualification || "",
        state: studData.data.contact_info?.state || "",
        city: studData.data.contact_info?.city || "",
        pinCode: studData.data.contact_info?.pincode || "",
        addressLine1: studData.data.contact_info?.address1 || "",
        addressLine2: studData.data.contact_info?.address2 || "",
        phoneNumber: studData.data.contact_info?.phone_number || "",
        altPhoneNumber:
          studData.data.contact_info?.alternate_phone_number || "",
        userName: studData.data.full_name || "",
        status: studData.data.is_active ? "Active" : "Inactive",
        courseId: studData.data.id || "",
        image: studData?.data?.image,
        courseName: studData.data.userDetail?.course?.course_name || "",
        courseDuration: studData.data.userDetail?.course?.duration || "",
        coursePrice:
          studData.data.userDetail?.course?.current_price?.toString() || "",
        learningFormat:
          studData.data.userDetail?.course?.class_type?.join(", ") || "",
        address: `${studData.data.contact_info?.address1 || ""} ${studData.data.contact_info?.address2 || ""
          } ${studData.data.contact_info?.city || ""} ${studData.data.contact_info?.state || ""
          } ${studData.data.contact_info?.pincode || ""}`.trim(),
      });
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const updateData = {
        ...formData,
        uuid: studData?.data?.uuid,
        _id: studData?.data?._id,
        first_name: formData.fullName,
        last_name: formData.lastName,
        full_name: `${formData.fullName} ${formData.lastName}`,
        email: formData.email,
        dob: formData.dateOfBirth,
        gender: formData.gender,
        qualification: formData.qualification,
        contact_info: {
          phone_number: formData.phoneNumber,
          alternate_phone_number: formData.altPhoneNumber,
          address1: formData.addressLine1,
          address2: formData.addressLine2,
          city: formData.city,
          state: formData.state,
          pincode: formData.pinCode,
        },
        is_active: formData.status === "Active",
      };

      const response = await updatestudentdata(updateData);

      if (response) {
        await fetchData();
        setIsEditing(false);
      }
    } catch (err) {
      console.error("Update failed:", err);
      setError("Failed to update student data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await deletestudentdata({ uuid: studData?.data?.uuid });
      if (response) {
        toast.success("profile deleted successfully!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Edit Mode
  if (isEditing) {
    return (
      <div className="min-h-screen p-4 sm:p-6">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-4 sm:mb-6">
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-1">
              Student Information
            </h1>
            {error && <div className="text-red-500 mb-2 text-sm sm:text-base">{error}</div>}
          </div>

          {/* Profile Section */}
          <div className="rounded-lg shadow-md border p-4 sm:p-6">
            <div className="mb-4 sm:mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <Avatar className="h-16 w-16 sm:h-20 sm:w-20 rounded-lg">
                    <AvatarImage
                      src={GetImageUrl(studData?.data?.image) ?? undefined}
                      alt={studData?.data?.full_name || "Student"}
                      className="rounded-lg"
                    />
                    <AvatarFallback className="rounded-lg">
                      {getInitials(studData?.data?.full_name || "Student")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                      {`${studData?.data?.first_name || ""} ${studData?.data?.last_name || ""}`.trim()}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500">
                      Trainee ID: {studData?.data?.id || "N/A"}
                    </p>
                    <Button className="mt-1 sm:mt-2 bg-[#3AB635] hover:bg-[#3AB635]/90 text-white text-xs px-3 sm:px-4 py-1 h-7 sm:h-8">
                      Upload Your Logo
                    </Button>
                  </div>
                </div>
                <Button
                  onClick={handleCancel}
                  className="bg-[#1BBFCA] hover:bg-[#1BBFCA]/90 text-white px-4 sm:px-6 text-sm sm:text-base"
                >
                  Reset
                </Button>
              </div>
            </div>

            {/* Form Section */}
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {/* Full Name */}
                <div className="space-y-2">
                  <Label
                    htmlFor="fullName"
                    className="text-sm font-medium text-gray-700"
                  >
                    First Name
                  </Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full h-9 sm:h-10 border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-base sm:text-[18px]"
                  />
                </div>

                {/* Last Name */}
                <div className="space-y-2">
                  <Label
                    htmlFor="lastName"
                    className="text-sm font-medium text-gray-700"
                  >
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full h-9 sm:h-10 border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-base sm:text-[18px]"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700"
                  >
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full h-9 sm:h-10 border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-base sm:text-[18px]"
                  />
                </div>

                {/* Date Of Birth */}
                <div className="space-y-2">
                  <Label
                    htmlFor="dateOfBirth"
                    className="text-sm font-medium text-gray-700"
                  >
                    Date Of Birth
                  </Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className="w-full h-9 sm:h-10 border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-base sm:text-[18px]"
                  />
                </div>

                {/* Gender */}
                <div className="space-y-2">
                  <Label
                    htmlFor="gender"
                    className="text-sm font-medium text-gray-700"
                  >
                    Gender
                  </Label>
                  <Input
                    id="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full h-9 sm:h-10 border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-base sm:text-[18px]"
                  />
                </div>

                {/* Courses */}
                <div className="space-y-2">
                  <Label
                    htmlFor="courses"
                    className="text-sm font-medium text-gray-700"
                  >
                    Courses
                  </Label>
                  <Input
                    id="courses"
                    value={formData.courses}
                    onChange={handleInputChange}
                    className="w-full h-9 sm:h-10 border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-base sm:text-[18px]"
                  />
                </div>

                {/* Qualification */}
                <div className="space-y-2">
                  <Label
                    htmlFor="qualification"
                    className="text-sm font-medium text-gray-700"
                  >
                    Qualification
                  </Label>
                  <Input
                    id="qualification"
                    value={formData.qualification}
                    onChange={handleInputChange}
                    className="w-full h-9 sm:h-10 border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-base sm:text-[18px]"
                  />
                </div>

                {/* State */}
                <div className="space-y-2">
                  <Label
                    htmlFor="state"
                    className="text-sm font-medium text-gray-700"
                  >
                    State
                  </Label>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full h-9 sm:h-10 border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-base sm:text-[18px]"
                  />
                </div>

                {/* City */}
                <div className="space-y-2">
                  <Label
                    htmlFor="city"
                    className="text-sm font-medium text-gray-700"
                  >
                    City
                  </Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full h-9 sm:h-10 border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-base sm:text-[18px]"
                  />
                </div>

                {/* Pin Code */}
                <div className="space-y-2">
                  <Label
                    htmlFor="pinCode"
                    className="text-sm font-medium text-gray-700"
                  >
                    Pin Code
                  </Label>
                  <Input
                    id="pinCode"
                    value={formData.pinCode}
                    onChange={handleInputChange}
                    className="w-full h-9 sm:h-10 border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-base sm:text-[18px]"
                  />
                </div>

                {/* Address Line 1 */}
                <div className="space-y-2">
                  <Label
                    htmlFor="addressLine1"
                    className="text-sm font-medium text-gray-700"
                  >
                    Address Line 1
                  </Label>
                  <Input
                    id="addressLine1"
                    value={formData.addressLine1}
                    onChange={handleInputChange}
                    className="w-full h-9 sm:h-10 border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-base sm:text-[18px]"
                  />
                </div>

                {/* Address Line 2 */}
                <div className="space-y-2">
                  <Label
                    htmlFor="addressLine2"
                    className="text-sm font-medium text-gray-700"
                  >
                    Address Line 2
                  </Label>
                  <Input
                    id="addressLine2"
                    value={formData.addressLine2}
                    onChange={handleInputChange}
                    className="w-full h-9 sm:h-10 border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-base sm:text-[18px]"
                  />
                </div>

                {/* Phone Number */}
                <div className="space-y-2">
                  <Label
                    htmlFor="phoneNumber"
                    className="text-sm font-medium text-gray-700"
                  >
                    Phone Number
                  </Label>
                  <Input
                    id="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="w-full h-9 sm:h-10 border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-base sm:text-[18px]"
                  />
                </div>

                {/* Alt Phone Number */}
                <div className="space-y-2">
                  <Label
                    htmlFor="altPhoneNumber"
                    className="text-sm font-medium text-gray-700"
                  >
                    Alt Phone Number
                  </Label>
                  <Input
                    id="altPhoneNumber"
                    value={formData.altPhoneNumber}
                    onChange={handleInputChange}
                    className="w-full h-9 sm:h-10 border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-base sm:text-[18px]"
                  />
                </div>
              </div>

              {/* User Name - Responsive */}
              <div className="mt-4 sm:mt-6 space-y-2">
                <Label
                  htmlFor="userName"
                  className="text-sm font-medium text-gray-700"
                >
                  User Name
                </Label>
                <Input
                  id="userName"
                  value={formData.userName}
                  onChange={handleInputChange}
                  className="w-full h-9 sm:h-10 border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-base sm:text-[18px] max-w-full md:max-w-[49%]"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 mt-6 sm:mt-8 pt-4 sm:pt-6">
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  className="border-[#1BBFCA] text-[#1BBFCA] hover:bg-[#1BBFCA]/10 hover:text-[#1BBFCA] h-9 sm:h-10 px-4 sm:px-8 bg-transparent order-2 sm:order-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmit}
                  className="bg-[#1BBFCA] hover:bg-[#1BBFCA]/90 text-white h-9 sm:h-10 px-4 sm:px-8 order-1 sm:order-2"
                  disabled={isLoading}
                >
                  {isLoading ? "Updating..." : "Submit"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // View Mode
  return (
    <div className="min-h-screen p-4 sm:p-6">
      <div className="mx-auto max-w-7xl space-y-4 sm:space-y-6">
        {/* Header Section */}
        <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center gap-4">
          <div className="flex items-center w-full xs:w-auto justify-between xs:justify-start">
            <Button
              onClick={handleBack}
              className="flex items-center gap-2 text-[#1BBFCA] hover:bg-[#1BBFCA]/80 hover:text-white transition-colors duration-300 p-2"
              size="sm"
            >
              <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </Button>
            <div className="xs:hidden flex-1 text-center">
              <h2 className="text-lg font-semibold text-gray-700">
                Profile Information
              </h2>
            </div>
          </div>
          
          <div className="hidden xs:flex flex-1">
            <h2 className="text-lg sm:text-[24px] font-semibold text-gray-700 text-start ml-3 sm:ml-5">
              Profile Information
            </h2>
          </div>
          
          <div className="hidden xs:block w-[40px] sm:w-[104px]"></div>
        </div>

        {/* Profile Content */}
        <div className="border-b pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 sm:mt-6 gap-4">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <Avatar className="h-16 w-16 sm:h-20 sm:w-20 rounded-md">
                <AvatarImage
                  src={GetImageUrl(studData?.data?.image) ?? undefined}
                  alt={studData?.data?.full_name || "Student"}
                  className="rounded-md"
                />
                <AvatarFallback className="rounded-md">
                  {getInitials(studData?.data?.full_name || "Student")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-base sm:text-lg font-semibold">
                  {`${studData?.data?.first_name || ""} ${studData?.data?.last_name || ""}`.trim()}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500">
                  Joined on {formatDate(studData?.data?.createdAt) || "N/A"}
                </p>
                <p className="text-xs sm:text-sm text-gray-500">
                  Location:{" "}
                  {studData?.data?.contact_info?.city ||
                    "Location not specified"}
                </p>
                <Badge
                  className={`mt-1 ${studData?.data?.is_active ? "bg-[#3AB635]" : "bg-gray-500"
                    } text-white hover:bg-[#3AB635] w-[80px] sm:w-[90px] h-[32px] sm:h-[38px] text-xs`}
                >
                  {studData?.data?.is_active ? "Active" : "Inactive"}
                </Badge>
              </div>
            </div>
            <Button className="bg-[#1BBFCA] text-white text-xs sm:text-sm hover:bg-[#1BBFCA]/90 w-full sm:w-[150px] h-[40px] sm:h-[48px]">
              {studData?.data?.userDetail?.course?.course_name || "No Course"}
            </Button>
          </div>
        </div>

        {/* Additional Details */}
        <div>
          <h3 className="text-base sm:text-lg font-medium text-gray-700 mb-4">
            Additional Details
          </h3>
          <Tabs defaultValue="info" className="w-full">
            <TabsList className="h-[40px] sm:h-[48px] mb-4 sm:mb-6 bg-transparent p-0 flex gap-1 sm:gap-2 overflow-x-auto">
              <TabsTrigger
                value="info"
                className="h-full px-3 sm:px-6 flex items-center gap-2 border border-gray-300 rounded-lg 
               data-[state=active]:bg-[#3AB635] data-[state=active]:text-white 
               data-[state=active]:border-[#3AB635] 
               data-[state=inactive]:bg-white data-[state=inactive]:text-gray-700 
               hover:bg-gray-50 text-xs sm:text-sm whitespace-nowrap"
              >
                <Info className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Info</span>
              </TabsTrigger>

              <TabsTrigger
                value="classes"
                className="h-full px-3 sm:px-6 flex items-center gap-2 border border-gray-300 rounded-lg 
               data-[state=active]:bg-[#3AB635] data-[state=active]:text-white 
               data-[state=active]:border-[#3AB635] 
               data-[state=inactive]:bg-white data-[state=inactive]:text-gray-700 
               hover:bg-gray-50 text-xs sm:text-sm whitespace-nowrap"
              >
                <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Classes</span>
              </TabsTrigger>

              <TabsTrigger
                value="activity"
                className="h-full px-3 sm:px-6 flex items-center gap-2 border border-gray-300 rounded-lg 
               data-[state=active]:bg-[#3AB635] data-[state=active]:text-white 
               data-[state=active]:border-[#3AB635] 
               data-[state=inactive]:bg-white data-[state=inactive]:text-gray-700 
               hover:bg-gray-50 text-xs sm:text-sm whitespace-nowrap"
              >
                <RiPresentationFill className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Activity</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="info" className="space-y-4 sm:space-y-6">
              {/* Details Section */}
              <div className="bg-white p-4 sm:p-6 rounded-lg border shadow-md">
                <h4 className="text-lg sm:text-[24px] text-gray-700 mb-3 sm:mb-4">Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="userName"
                      className="text-sm font-medium text-gray-600"
                    >
                      Full Name
                    </Label>
                    <Input
                      id="userName"
                      value={`${studData?.data?.first_name || ""} ${studData?.data?.last_name || ""}`.trim()}
                      readOnly
                      className="w-full h-9 sm:h-10 border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-base sm:text-[18px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-sm font-medium text-gray-600"
                    >
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={studData?.data?.email || ""}
                      readOnly
                      className="w-full h-9 sm:h-10 border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-base sm:text-[18px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="status"
                      className="text-sm font-medium text-gray-600"
                    >
                      Status
                    </Label>
                    <Input
                      id="status"
                      value={studData?.data?.is_active ? "Active" : "Inactive"}
                      readOnly
                      className="w-full h-9 sm:h-10 border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-base sm:text-[18px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="gender"
                      className="text-sm font-medium text-gray-600"
                    >
                      Gender
                    </Label>
                    <Input
                      id="gender"
                      value={studData?.data?.gender || ""}
                      readOnly
                      className="w-full h-9 sm:h-10 border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-base sm:text-[18px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="dob"
                      className="text-sm font-medium text-gray-600"
                    >
                      DOB
                    </Label>
                    <Input
                      id="dob"
                      value={formatDate(studData?.data?.dob) || ""}
                      readOnly
                      className="w-full h-9 sm:h-10 border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-base sm:text-[18px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="qualification"
                      className="text-sm font-medium text-gray-600"
                    >
                      Qualification
                    </Label>
                    <Input
                      id="qualification"
                      value={studData?.data?.qualification || ""}
                      readOnly
                      className="w-full h-9 sm:h-10 border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-base sm:text-[18px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="contact"
                      className="text-sm font-medium text-gray-600"
                    >
                      Contact
                    </Label>
                    <Input
                      id="contact"
                      value={studData?.data?.contact_info?.phone_number || ""}
                      readOnly
                      className="w-full h-9 sm:h-10 border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-base sm:text-[18px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="altContact"
                      className="text-sm font-medium text-gray-600"
                    >
                      Alt Contact
                    </Label>
                    <Input
                      id="altContact"
                      value={
                        studData?.data?.contact_info?.alternate_phone_number ||
                        ""
                      }
                      readOnly
                      className="w-full h-9 sm:h-10 border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-base sm:text-[18px]"
                    />
                  </div>
                </div>
                <div className="mt-3 sm:mt-4 space-y-2">
                  <Label
                    htmlFor="address"
                    className="text-sm font-medium text-gray-600"
                  >
                    Address
                  </Label>
                  <Textarea
                    id="address"
                    value={
                      `${studData?.data?.contact_info?.address1 || ""} ${studData?.data?.contact_info?.address2 || ""
                        } ${studData?.data?.contact_info?.city || ""} ${studData?.data?.contact_info?.state || ""
                        } ${studData?.data?.contact_info?.pincode || ""
                        }`.trim() || "Address not specified"
                    }
                    readOnly
                    className="min-h-[60px] sm:min-h-[80px] w-full border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-base sm:text-[18px]"
                  />
                </div>
              </div>

              {/* Course Details Section */}
              <div className="bg-white p-4 sm:p-6 rounded-lg border shadow-md">
                <h4 className="text-base font-medium text-gray-700 mb-3 sm:mb-4">
                  Course Details
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="courseId"
                      className="text-sm font-medium text-gray-600"
                    >
                      Course ID
                    </Label>
                    <Input
                      id="courseId"
                      value={studData?.data?.id || ""}
                      readOnly
                      className="w-full h-9 sm:h-10 border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-base sm:text-[18px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="courseName"
                      className="text-sm font-medium text-gray-600"
                    >
                      Course Name
                    </Label>
                    <Input
                      id="courseName"
                      value={
                        studData?.data?.userDetail?.course?.course_name || ""
                      }
                      readOnly
                      className="w-full h-9 sm:h-10 border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-base sm:text-[18px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="courseDuration"
                      className="text-sm font-medium text-gray-600"
                    >
                      Course Duration
                    </Label>
                    <Input
                      id="courseDuration"
                      value={studData?.data?.userDetail?.course?.duration || ""}
                      readOnly
                      className="w-full h-9 sm:h-10 border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-base sm:text-[18px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="coursePrice"
                      className="text-sm font-medium text-gray-600"
                    >
                      Course Price
                    </Label>
                    <Input
                      id="coursePrice"
                      value={
                        studData?.data?.userDetail?.course?.current_price?.toString() ||
                        ""
                      }
                      readOnly
                      className="w-full h-9 sm:h-10 border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-base sm:text-[18px]"
                    />
                  </div>
                </div>
                <div className="mt-3 sm:mt-4 space-y-2">
                  <Label
                    htmlFor="learningFormat"
                    className="text-sm font-medium text-gray-600"
                  >
                    Learning Format
                  </Label>
                  <Textarea
                    id="learningFormat"
                    value={
                      studData?.data?.userDetail?.course?.class_type?.join(
                        ", "
                      ) || ""
                    }
                    readOnly
                    className="min-h-[60px] sm:min-h-[80px] w-full border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-base sm:text-[18px]"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 pt-4 sm:pt-6">
                <Button
                  variant="outline"
                  onClick={handleDelete}
                  className="border-[#1BBFCA] text-[#1BBFCA] hover:bg-[#1BBFCA]/10 hover:text-[#1BBFCA] h-9 sm:h-10 px-4 sm:px-6 bg-transparent order-2 sm:order-1"
                >
                  Delete
                </Button>
                <Button
                  onClick={handleEdit}
                  className="bg-[#1BBFCA] hover:bg-[#1BBFCA]/90 text-white h-9 sm:h-10 px-4 sm:px-6 order-1 sm:order-2"
                >
                  Edit
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="classes">
              <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {ClassViewData && ClassViewData.length > 0 ? (
                  ClassViewData.map((classItem: any) => {
                    const classDate = classItem.start_date
                      ? new Date(classItem.start_date).toLocaleDateString('en-US', {
                        weekday: 'short',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })
                      : 'No date set';

                    const formatTimeFromDateTime = (datetimeString: string) => {
                      if (!datetimeString) return 'No time set';

                      try {
                        const timePart = datetimeString.includes('T')
                          ? datetimeString.split('T')[1]
                          : datetimeString;

                        const [hours, minutes] = timePart.split(':');
                        const time = `${hours}:${minutes}`;

                        const [hour, minute] = time.split(':');
                        const hourNum = parseInt(hour, 10);
                        const period = hourNum >= 12 ? 'PM' : 'AM';
                        const hour12 = hourNum % 12 || 12;

                        return `${hour12}:${minute} ${period}`;
                      } catch (error) {
                        console.error('Error formatting time:', error);
                        return 'Invalid time';
                      }
                    };

                    const startTime = formatTimeFromDateTime(classItem.start_time);
                    const endTime = formatTimeFromDateTime(classItem.end_time);

                    return (
                      <Card
                        key={classItem.uuid || classItem._id}
                        className="bg-white w-full rounded-xl border border-gray-100 transition-shadow duration-200 shadow-[0_0_15px_rgba(0,0,0,0.1)] hover:shadow-[0_0_20px_rgba(0,0,0,0.15)]"
                      >
                        <CardContent className="p-4 sm:p-6 flex flex-col h-full">
                          <div className="flex-grow space-y-2 sm:space-y-3">
                            {/* Class Name */}
                            <h1
                              className="text-lg sm:text-xl font-bold text-black-600 truncate"
                              style={{
                                ...FONTS.heading_07,
                                color: COLORS.gray_dark_02,
                              }}
                            >
                              {classItem.course?.course_name || 'No course assigned'}
                            </h1>

                            <h3
                              className="text-base sm:text-lg font-semibold truncate"
                              style={{
                                ...FONTS.heading_06,
                                color: COLORS.gray_dark_02,
                              }}
                            >
                              {classItem.class_name || 'Unnamed Class'}
                            </h3>

                            <div className="flex items-center space-x-2">
                              <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
                              <span
                                className="text-xs sm:text-sm"
                                style={{
                                  ...FONTS.heading_08,
                                  color: COLORS.gray_dark_02,
                                }}
                              >
                                {classDate}
                              </span>
                            </div>

                            {/* Time - Start and End */}
                            <div className="flex items-center space-x-2">
                              <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
                              <span
                                className="text-xs sm:text-sm"
                                style={{
                                  ...FONTS.heading_08,
                                  color: COLORS.gray_dark_02,
                                }}
                              >
                                {startTime} - {endTime}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })
                ) : (
                  <div className="col-span-full flex items-center justify-center py-8 sm:py-12">
                    <div className="text-center">
                      <p className="text-gray-500 text-base sm:text-lg">No classes found</p>
                      <p className="text-gray-400 text-sm">This student is not enrolled in any classes yet.</p>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="activity">
              <div className="bg-white p-4 sm:p-6 min-h-screen">
                <h1
                  style={{ ...FONTS.heading_04, color: COLORS.gray_dark_02 }}
                  className="text-lg sm:text-xl mb-4 sm:mb-6"
                >
                  User Activity Timeline
                </h1>

                <div className="relative">
                  {studentActivityData?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((item: any) => (
                    <div key={item.id || item._id} className="flex items-start relative">
                      <div className="flex flex-col items-center mr-4 sm:mr-6">
                        <span className="bg-[#1BBFCA] text-white text-xs font-semibold px-2 sm:px-3 py-1 rounded-lg shadow">
                          {item?.action || "Activity"}
                        </span>
                        <span className="w-2 h-2 bg-[#1BBFCA] rounded-full mt-1"></span>
                        <div className="w-px h-20 sm:h-30 bg-[#1BBFCA]"></div>
                      </div>

                      {/* Card */}
                      <div className="bg-white rounded-xl shadow-md px-3 sm:px-5 py-3 sm:py-4 w-full max-w-[280px] sm:max-w-[350px] mb-6 sm:mb-10">
                        <h3 className="text-gray-800 font-semibold text-xs sm:text-sm mb-1 truncate">
                          {item?.title || "Untitled Activity"}
                        </h3>

                        {item?.details && <p className="text-xs text-gray-600 line-clamp-2">{item.details}</p>}
                        {item?.model && <p className="text-xs text-gray-600 italic">{item.model}</p>}

                        <p className="text-[10px] text-gray-400 mt-2">
                          {new Date(item?.createdAt).toLocaleString("en-US", {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })}
                        </p>
                      </div>
                    </div>
                  ))}

                  {/* Pagination Controls */}
                  {totalPages > 1 && (
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mt-6 sm:mt-8">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="w-full sm:w-auto"
                      >
                        Previous
                      </Button>

                      <span className="text-sm text-gray-600 text-center">
                        Page {currentPage} of {totalPages}
                      </span>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="w-full sm:w-auto"
                      >
                        Next
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};