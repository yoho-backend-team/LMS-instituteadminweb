import { useForm } from "react-hook-form";
import { X } from "lucide-react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PlacementFormData {
  companyName: string;
  companyAddress: string;
  contactEmail: string;
  contactNumber: string;
  studentSearch: string;
  jobName: string;
  jobDescription: string;
  skills: string;
  student: string;
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
    { id: "1", name: "John Doe", email: "john@example.com" },
    { id: "2", name: "Jane Smith", email: "jane@example.com" },
    { id: "3", name: "Mike Johnson", email: "mike@example.com" },
  ];
  const courses = ["Computer Science", "Electrical Engineering", "Mechanical Engineering"];
  const educationLevels = ["Diploma", "Bachelor's", "Master's", "PhD"];

  return (
    <div className="max-w-6xl mx-auto p-6">
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
    {/* Company Name - Combo Box */}
    <div className="space-y-2">
      <label className="text-sm font-medium">Company Name</label>
      <div className="relative">
        <Input
          {...register("companyName", { required: "Company name is required" })}
          placeholder="Enter or select company"
          list="companyNamesList"
        />
        <datalist id="companyNamesList">
          {companyNames.map((name) => (
            <option key={name} value={name} />
          ))}
        </datalist>
        {errors.companyName && (
          <p className="text-red-500 text-sm">{errors.companyName.message}</p>
        )}
      </div>
    </div>

    {/* Company Address - Combo Box */}
    <div className="space-y-2">
      <label className="text-sm font-medium">Company Address</label>
      <div className="relative">
        <Input
          {...register("companyAddress", { required: "Company address is required" })}
          placeholder="Enter or select address"
          list="companyAddressesList"
        />
        <datalist id="companyAddressesList">
          {companyAddresses.map((address) => (
            <option key={address} value={address} />
          ))}
        </datalist>
        {errors.companyAddress && (
          <p className="text-red-500 text-sm">{errors.companyAddress.message}</p>
        )}
      </div>
    </div>

    {/* Contact Email - Combo Box */}
    <div className="space-y-2">
      <label className="text-sm font-medium">Contact Email</label>
      <div className="relative">
        <Input
          type="email"
          {...register("contactEmail", { required: "Contact email is required" })}
          placeholder="Enter or select email"
          list="companyEmailsList"
        />
        <datalist id="companyEmailsList">
          {companyEmails.map((email) => (
            <option key={email} value={email} />
          ))}
        </datalist>
        {errors.contactEmail && (
          <p className="text-red-500 text-sm">{errors.contactEmail.message}</p>
        )}
      </div>
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
    {/* Job Name - Combo Box */}
    <div className="space-y-2">
      <label className="text-sm font-medium">Job Name</label>
      <div className="relative">
        <Input
          {...register("jobName")}
          placeholder="Enter or select job name"
          list="jobNamesList"
        />
        <datalist id="jobNamesList">
          {jobNames.map((name) => (
            <option key={name} value={name} />
          ))}
        </datalist>
        {errors.jobName && (
          <p className="text-red-500 text-sm">{errors.jobName.message}</p>
        )}
      </div>
    </div>

    {/* Job Description - Combo Box */}
    <div className="space-y-2">
      <label className="text-sm font-medium">Job Description</label>
      <div className="relative">
        <Input
          {...register("jobDescription")}
          placeholder="Enter or select job description"
          list="jobDescriptionsList"
        />
        <datalist id="jobDescriptionsList">
          {jobDescriptions.map((desc) => (
            <option key={desc} value={desc} />
          ))}
        </datalist>
        {errors.jobDescription && (
          <p className="text-red-500 text-sm">{errors.jobDescription.message}</p>
        )}
      </div>
    </div>

    {/* Skills - Combo Box */}
    <div className="space-y-2 md:col-span-2">
      <label className="text-sm font-medium">Skills</label>
      <div className="relative">
        <Input
          {...register("skills")}
          placeholder="Enter or select required skills"
          list="skillsList"
        />
        <datalist id="skillsList">
          {skillsList.map((skill) => (
            <option key={skill} value={skill} />
          ))}
        </datalist>
        {errors.skills && (
          <p className="text-red-500 text-sm">{errors.skills.message}</p>
        )}
      </div>
    </div>
  </CardContent>
</Card>

            
{/* Student Details Section */}
<Card>
  <CardHeader>
    <CardTitle className="text-lg">Student Details</CardTitle>
  </CardHeader>
  <CardContent className="space-y-6">
    {/* Students Section */}
    <div className="space-y-4">
      <h3 className="font-medium">Students</h3>
      <div className="space-y-2">
        <Select multiple>
          <SelectTrigger className="h-auto min-h-[40px]">
            <SelectValue placeholder="Select students" />
          </SelectTrigger>
          <SelectContent>
            {students.map((student) => (
              <SelectItem key={student.id} value={student.id}>
                <div className="flex items-center gap-2">
                  <span>{student.name}</span>
                  <span className="text-muted-foreground text-sm">({student.email})</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
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
          <Input {...register("venue")} placeholder="Enter venue" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Address</label>
          <Input {...register("address")} placeholder="Enter address" />
        </div>
      </CardContent>
    </Card>
  

   {/* Eligibility Criteria Section */}
<Card>
  <CardHeader>
    <CardTitle className="text-md">Eligibility Criteria</CardTitle>
  </CardHeader>
  <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
    {/* Course Name - Combo Box */}
    <div className="space-y-2">
      <label className="text-sm font-medium">Course Name</label>
      <div className="relative">
        <Input
          {...register("courseName")}
          placeholder="Enter or select course"
          list="coursesList"
        />
        <datalist id="coursesList">
          {courses.map((course) => (
            <option key={course} value={course} />
          ))}
        </datalist>
        {errors.courseName && (
          <p className="text-red-500 text-sm">{errors.courseName.message}</p>
        )}
      </div>
    </div>

    {/* Education - Combo Box */}
    <div className="space-y-2">
      <label className="text-sm font-medium">Education</label>
      <div className="relative">
        <Input
          {...register("education")}
          placeholder="Enter or select education level"
          list="educationLevelsList"
        />
        <datalist id="educationLevelsList">
          {educationLevels.map((level) => (
            <option key={level} value={level} />
          ))}
        </datalist>
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
                className="px-8"
              >
                Cancel
              </Button>
              <Button type="submit" className="px-8 bg-[#1BBFCA] hover:bg-[#1BBFCA]/90">
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