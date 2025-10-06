import { Controller, useForm } from "react-hook-form";
import { useEffect } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import ReactSelect from "react-select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import { getStudentsThunk } from "../../features/placementManagement/Reducer/thunk";

export interface PlacementFormData {
  companyName: string;
  companyAddress: string;
  contactEmail: string;
  contactNumber: string;
  jobName: string;
  jobDescription: string;
  skills: string;
  selectedStudents: { value: number; label: string }[];
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

const PlacementForm = ({
  mode = "add",
  onClose,
  onSubmit,
  initialData,
}: PlacementFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<PlacementFormData>();

  const dispatch = useDispatch<any>();
  const students = useSelector((state: any) =>
    Array.isArray(state.placements.students)
      ? state.placements.students
      : state.placements.students?.data || []
  );

  useEffect(() => {
    dispatch(getStudentsThunk(""));
  }, [dispatch]);

  useEffect(() => {
    if (initialData) reset(initialData);
  }, [initialData, reset]);


  const onFormSubmit = (data: PlacementFormData) => {
    onSubmit(data);
    onClose();
    reset();
  };
  const isEditMode = mode === "edit";

  return (
    <div className="max-w-7xl mx-auto p-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl">
              {mode === "add"
                ? "Add Placement Details"
                : "Edit Placement Details"}
            </CardTitle>
            {/* <Button type="button" onClick={onClose} variant="ghost" size="icon" className="h-8 w-8">
              <X className="h-4 w-4" />
            </Button> */}
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Company Details</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Company Name</label>
                  <Input
                    type="text"
                    {...register("companyName", {
                      required: "Company name is required",
                    })}
                    readOnly={isEditMode}
                  />
                  {errors.companyName && (
                    <p className="text-red-500 text-sm">
                      {errors.companyName.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Company Address</label>
                  <Input
                    type="text"
                    {...register("companyAddress", {
                      required: "Company address is required",
                    })}
                    readOnly={isEditMode}
                  />
                  {errors.companyAddress && (
                    <p className="text-red-500 text-sm">
                      {errors.companyAddress.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Contact Email</label>
                  <Input
                    type="email"
                    {...register("contactEmail", {
                      required: "Contact email is required",
                    })}
                    readOnly={isEditMode}
                  />
                  {errors.contactEmail && (
                    <p className="text-red-500 text-sm">
                      {errors.contactEmail.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Contact Number</label>
                  <Input
                    type="tel"
                    {...register("contactNumber", {
                      required: "Contact number is required",
                    })}
                    readOnly={isEditMode}
                  />
                  {errors.contactNumber && (
                    <p className="text-red-500 text-sm">
                      {errors.contactNumber.message}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Job Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Job Details</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Job Name</label>
                  <Input
                    type="text"
                    {...register("jobName", {
                      required: "Job name is required",
                    })}
                    readOnly={isEditMode}
                  />
                  {errors.jobName && (
                    <p className="text-red-500 text-sm">
                      {errors.jobName.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Job Description</label>
                  <Input
                    type="text"
                    {...register("jobDescription", {
                      required: "Job description is required",
                    })}
                    readOnly={isEditMode}
                  />
                  {errors.jobDescription && (
                    <p className="text-red-500 text-sm">
                      {errors.jobDescription.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium">Required Skills</label>
                  <Input
                    type="text"
                    {...register("skills", { required: "Skills are required" })}
                    readOnly={isEditMode}
                  />
                  {errors.skills && (
                    <p className="text-red-500 text-sm">
                      {errors.skills.message}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Student Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Student Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Select Students</label>
                  <Controller
                    name="selectedStudents"
                    control={control}
                    rules={{
                      required: "At least one student must be selected",
                    }}
                    render={({ field }) => (
                      <ReactSelect
                        {...field}
                        isMulti
                        options={students.map((student: any) => ({
                          value: student._id,
                          label: student.full_name,
                        }))}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        placeholder="Select students..."
                        closeMenuOnSelect={false}
                      />
                    )}
                  />
                  {errors.selectedStudents && (
                    <p className="text-red-500 text-sm">
                      {errors.selectedStudents.message}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Interview Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Interview Details</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Interview Date</label>
                  <Input
                    type="date"
                    {...register("interviewDate", {
                      required: "Interview date is required",
                    })}
                    readOnly={isEditMode}
                  />
                  {errors.interviewDate && (
                    <p className="text-red-500 text-sm">
                      {errors.interviewDate.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Venue</label>
                  <Input
                    type="text"
                    {...register("venue", { required: "Venue is required" })}
                    readOnly={isEditMode}
                  />
                  {errors.venue && (
                    <p className="text-red-500 text-sm">
                      {errors.venue.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Address</label>
                  <Input
                    type="text"
                    {...register("address", {
                      required: "Address is required",
                    })}
                    readOnly={isEditMode}
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm">
                      {errors.address.message}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Eligibility Criteria */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Eligibility Criteria</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Course Name</label>
                  <Input
                    type="text"
                    {...register("courseName", {
                      required: "Course name is required",
                    })}
                    readOnly={isEditMode}
                  />
                  {errors.courseName && (
                    <p className="text-red-500 text-sm">
                      {errors.courseName.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Education Level</label>
                  <Input
                    type="text"
                    {...register("education", {
                      required: "Education level is required",
                    })}
                    readOnly={isEditMode}
                  />
                  {errors.education && (
                    <p className="text-red-500 text-sm">
                      {errors.education.message}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
            {/* Actions */}
            <div className="flex justify-end gap-4 pt-4">
              <Button
                type="button"
                onClick={onClose}
                variant="outline"
                className="!border-[#1BBFCA] !text-[#1BBFCA]"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-[#1BBFCA] hover:bg-[#17abb4] text-white px-4"
              >
                {mode === "add" ? "Add Placement" : "Update Placement"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlacementForm;
