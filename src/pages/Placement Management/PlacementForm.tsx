import { Controller, useForm } from "react-hook-form";
import { X } from "lucide-react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ReactSelect from 'react-select'; 
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


interface PlacementFormData {
  companyName: string;
  companyAddress: string;
  contactEmail: string;
  contactNumber: string;
  studentSearch: string;
  jobName: string;
  jobDescription: string;
  skills: string[];
  selectedStudents: { value: number; label: string }[]; // Added this line
  interviewDate: string;
  venue: string;
  address: string;
  courseName: string;
  education: string;
}

interface PlacementFormProps {
  mode?: "add" | "edit";
  onClose: () => void;
  onSubmit: (data: PlacementFormData) => void;
  initialData?: PlacementFormData;
}

const PlacementForm = ({ mode = "add", onClose, onSubmit, initialData }: PlacementFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<PlacementFormData>();

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const onFormSubmit = (data: PlacementFormData) => {
    onSubmit(data);
    onClose();
    reset();
  };

  const companyNames = ["TCS", "Infosys", "Wipro", "Accenture", "Google"];
  const companyEmails = ["hr@tcs.com", "careers@infosys.com", "contact@wipro.com"];
  const companyAddresses = [
    "Bangalore, India",
    "Chennai, India",
    "Pune, India",
    "Hyderabad, India",
  ];

  const jobNames = ["Software Engineer", "Data Analyst", "System Administrator"];
  const jobDescriptions = [
    "Develop and maintain web applications",
    "Analyze and interpret complex data",
    "Manage and support IT systems",
  ];
  const skillsList = ["JavaScript", "React", "Node.js", "Python", "SQL"];
 const students = [
  {
    id: 1,
    studentName: "Kamaleesh",
    email: "kamaleesh@example.com",
   
  },
  {
    id: 2,
    studentName: "Samantha",
    email: "samantha@example.com",
 
  },
  {
    id: 3,
    studentName: "Vijay",
    email: "vijay@example.com",
 
  },
 
  {
    id: 4,
    studentName: "Ana de Armas",
    email: "ana.dearmas@example.com",
 
  }]
const VENUE_LIST = [
  "TechHub Innovation Center",
  "Downtown Business Plaza",
  "Silicon Valley Campus",
  "Metropolitan Conference Hall",
  "Global Tech Park",
];

const ADDRESS_LIST = [
  "123 Tech Street, San Francisco, CA 94107",
  "500 Business Ave, New York, NY 10001",
  "1 Innovation Way, Austin, TX 78701",
  "88 Conference Blvd, Chicago, IL 60601",
  "2000 Park Lane, Seattle, WA 98101",
];
  const courses = ["Computer Science", "Electrical Engineering", "Mechanical Engineering"];
  const educationLevels = ["Diploma", "Bachelor's", "Master's", "PhD"];

  return (
    <div className="max-w-10xl mx-auto p-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl">
              {mode === "add" ? "Add Placement Details" : "Edit Placement Details"}
            </CardTitle>
            <Button
              type="button"
              onClick={onClose}
              variant="ghost"
              size="icon"
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
            {/* Company Details Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Company Details</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Company Name - Select Dropdown */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Company Name</label>
                  <select
                    {...register("companyName", { required: "Company name is required" })}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select a company</option>
                    {companyNames.map((name) => (
                      <option key={name} value={name}>
                        {name}
                      </option>
                    ))}
                  </select>
                  {errors.companyName && (
                    <p className="text-red-500 text-sm">{errors.companyName.message}</p>
                  )}
                </div>

                {/* Company Address - Select Dropdown */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Company Address</label>
                  <select
                    {...register("companyAddress", { required: "Company address is required" })}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select an address</option>
                    {companyAddresses.map((address) => (
                      <option key={address} value={address}>
                        {address}
                      </option>
                    ))}
                  </select>
                  {errors.companyAddress && (
                    <p className="text-red-500 text-sm">{errors.companyAddress.message}</p>
                  )}
                </div>

                {/* Contact Email - Select Dropdown */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Contact Email</label>
                  <select
                    {...register("contactEmail", { required: "Contact email is required" })}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select an email</option>
                    {companyEmails.map((email) => (
                      <option key={email} value={email}>
                        {email}
                      </option>
                    ))}
                  </select>
                  {errors.contactEmail && (
                    <p className="text-red-500 text-sm">{errors.contactEmail.message}</p>
                  )}
                </div>

                {/* Contact Number - Regular Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Contact Number</label>
                  <Input
                    type="tel"
                    {...register("contactNumber", { required: "Contact number is required" })}
                    placeholder="Enter contact number"
                  />
                  {errors.contactNumber && (
                    <p className="text-red-500 text-sm">{errors.contactNumber.message}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Job Details Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Job Details</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Job Name - Select Dropdown */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Job Name</label>
                  <select
                    {...register("jobName")}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select a job</option>
                    {jobNames.map((name) => (
                      <option key={name} value={name}>
                        {name}
                      </option>
                    ))}
                  </select>
                  {errors.jobName && (
                    <p className="text-red-500 text-sm">{errors.jobName.message}</p>
                  )}
                </div>

                {/* Job Description - Select Dropdown */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Job Description</label>
                  <select
                    {...register("jobDescription")}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select a description</option>
                    {jobDescriptions.map((desc) => (
                      <option key={desc} value={desc}>
                        {desc}
                      </option>
                    ))}
                  </select>
                  {errors.jobDescription && (
                    <p className="text-red-500 text-sm">{errors.jobDescription.message}</p>
                  )}
                </div>

                {/* Skills - Enhanced Multiple Select */}
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium">Required Skills</label>
                  <Controller
                    name="skills"
                    control={control}
                    render={({ field }) => (
                      <ReactSelect
                        {...field}
                        isMulti
                        options={skillsList.map(skill => ({ value: skill, label: skill }))}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        placeholder="Select required skills..."
                        closeMenuOnSelect={false}
                      />
                    )}
                  />
                  {errors.skills && (
                    <p className="text-red-500 text-sm">{errors.skills.message}</p>
                  )}
                </div>
              </CardContent>
            </Card>
            
           
{/* Student Details Section */}
<Card>
  <CardHeader>
    <CardTitle className="text-lg">Student Details</CardTitle>
  </CardHeader>
  <CardContent className="space-y-6">
    <div className="space-y-2 md:col-span-2">
      <label className="text-sm font-medium">Select Students</label>
      <Controller
        name="selectedStudents"
        control={control}
        render={({ field }) => (
          <ReactSelect
            {...field}
            isMulti
            options={students.map(student => ({ 
              value: student.id, 
              label: `${student.studentName} (${student.email})`
            }))}
            className="basic-multi-select"
            classNamePrefix="select"
            placeholder="Select students..."
            closeMenuOnSelect={false}
          />
        )}
      />
      {errors.selectedStudents && (
        <p className="text-red-500 text-sm">{errors.selectedStudents.message}</p>
      )}
    </div>
  </CardContent>
</Card>

            {/* Interview Details Section */}
 <Card>
  <CardHeader>
    <CardTitle className="text-md">Interview Details</CardTitle>
  </CardHeader>
  <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
    <div className="space-y-2">
      <label className="text-sm font-medium">Interview Date</label>
      <Input type="date" {...register("interviewDate")} />
    </div>
    <div className="space-y-2">
      <label className="text-sm font-medium">Venue</label>
      <select 
        {...register("venue")} 
        className="w-full p-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        <option value="">Select a venue</option>
        {VENUE_LIST.map((venue) => (
          <option key={venue} value={venue}>{venue}</option>
        ))}
      </select>
    </div>
    <div className="space-y-2">
      <label className="text-sm font-medium">Address</label>
      <select 
        {...register("address")} 
        className="w-full p-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        <option value="">Select an address</option>
        {ADDRESS_LIST.map((address) => (
          <option key={address} value={address}>{address}</option>
        ))}
      </select>
    </div>
  </CardContent>
</Card>

            {/* Eligibility Criteria Section */}
           <Card>
  <CardHeader>
    <CardTitle className="text-md">Eligibility Criteria</CardTitle>
  </CardHeader>
  <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
    {/* Course Name - Dropdown */}
    <div className="space-y-2">
      <label className="text-sm font-medium">Course Name</label>
      <div className="relative">
        <select
          {...register("courseName")}
          className="w-full p-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="">Select a course</option>
          {courses.map((course) => (
            <option key={course} value={course}>
              {course}
            </option>
          ))}
        </select>
        {errors.courseName && (
          <p className="text-red-500 text-sm">{errors.courseName.message}</p>
        )}
      </div>
    </div>

    {/* Education - Dropdown */}
    <div className="space-y-2">
      <label className="text-sm font-medium">Education</label>
      <div className="relative">
        <select
          {...register("education")}
          className="w-full p-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="">Select education level</option>
          {educationLevels.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
        {errors.education && (
          <p className="text-red-500 text-sm">{errors.education.message}</p>
        )}
      </div>
    </div>
  </CardContent>
</Card>

            {/* Form Actions */}
            <div className="flex justify-end gap-4 pt-4">
              <Button
                type="button"
                onClick={onClose}
                variant="outline"
               className='!border-[#1BBFCA] !text-[#1BBFCA]'
              >
                Cancel
              </Button>
              <Button type="submit"   className="bg-[#1BBFCA] hover:bg-[#1BBFCA] text-white px-4 flex items-center gap-2">
                {mode === "add" ? "Add Student" : "Update Placement"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlacementForm;