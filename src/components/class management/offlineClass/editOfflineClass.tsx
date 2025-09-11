import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { COLORS, FONTS } from "../../../constants/uiConstants";
import { Button } from "../../ui/button";
import { X } from "lucide-react";
import makeAnimated from "react-select/animated";
import toast from "react-hot-toast";
import Select from "react-select";
import { updateOfflineClass } from "../../../features/Class Management/offlineClass/services";

interface EditBatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  classData: any;
  fetchAllofflineClasses?: () => void;
}

interface FormValues {
  className: string;
  startTime: string;
  endTime: string;
  classDate: string;
  instructors: string;
}

interface InstructorOption {
  value: string;
  label: string;
}

const animatedComponents = makeAnimated();

const EditOfflineClass: React.FC<EditBatchModalProps> = ({
  isOpen,
  onClose,
  classData,
  fetchAllofflineClasses,
}) => {
  const [instructorOptions, setInstructorOptions] = useState<
    InstructorOption[]
  >([]);
  const [selectedInstructors, setSelectedInstructors] = useState<
    InstructorOption[]
  >([]);

  // Format time to 12-hour format for display
  const formatTimeTo12Hour = (timeString: string) => {
    if (!timeString || !timeString.includes("T")) return "";
    const timePart = timeString.split("T")[1].split(":");
    let hours = parseInt(timePart[0], 10);
    const minutes = timePart[1];
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${hours}:${minutes} ${ampm}`;
  };

  // Convert 12-hour format to 24-hour format for API
  const convertTo24Hour = (time12h: string) => {
    if (!time12h) return "";
    const [time, modifier] = time12h.split(" ");
    let [hours, minutes] = time.split(":");

    if (hours === "12") {
      hours = "00";
    }

    if (modifier === "PM") {
      hours = String(parseInt(hours, 10) + 12);
    }

    return `${hours.padStart(2, "0")}:${minutes}`;
  };

  useEffect(() => {
    if (classData && classData.instructors) {
      const options = classData.instructors.map((instructor: any) => ({
        value: instructor._id,
        label: instructor.full_name,
      }));

      setInstructorOptions(options);
      setSelectedInstructors(options);

      formik.setValues({
        className: classData?.class_name || "",
        startTime: formatTimeTo12Hour(classData?.start_time) || "",
        endTime: formatTimeTo12Hour(classData?.end_time) || "",
        classDate: classData?.start_date?.split("T")[0] || "",
        instructors: classData.instructors.map((i: any) => i._id) || [],
      });
    }
  }, [classData]);

  const formik = useFormik<FormValues>({
    initialValues: {
      className: "",
      startTime: "",
      endTime: "",
      classDate: "",
      instructors: "",
    },
    validationSchema: Yup.object({
      className: Yup.string().required("Class Name is required"),
      classDate: Yup.string().required("Class Date is required"),
      startTime: Yup.string()
        .required("Start Time is required")
        .test("valid-time", "Invalid time format (HH:MM AM/PM)", (value) => {
          if (!value) return false;
          return /^(0?[1-9]|1[0-2]):[0-5][0-9] [AP]M$/i.test(value);
        }),
      endTime: Yup.string()
        .required("End Time is required")
        .test("valid-time", "Invalid time format (HH:MM AM/PM)", (value) => {
          if (!value) return false;
          return /^(0?[1-9]|1[0-2]):[0-5][0-9] [AP]M$/i.test(value);
        })
        .test(
          "is-after-start",
          "End Time must be after Start time",
          function (value) {
            const { startTime } = this.parent;
            if (!startTime || !value) return true;

            try {
              const start24 = convertTo24Hour(startTime);
              const end24 = convertTo24Hour(value);

              return (
                new Date(`1970-01-01T${end24}`) >
                new Date(`1970-01-01T${start24}`)
              );
            } catch (e) {
              return false;
            }
          }
        ),
      instructors: Yup.array()
        .min(1, "At least one instructor is required")
        .required("Instructor is required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const params_data = {
          class_name: values.className,
          start_date: `${values.classDate}T00:00:00.000Z`,
          start_time: `${values.classDate}T${convertTo24Hour(
            values.startTime
          )}:00`,
          end_time: `${values.classDate}T${convertTo24Hour(values.endTime)}:00`,
          instructors: values.instructors,
          branch_id: classData.branch,
          course_id: classData.course,
          batch_id: classData.batch?._id,
          uuid: classData.uuid,
        };

        const response = await updateOfflineClass(params_data);
        if (response) {
          toast.success("Offline Class updated successfully");
          if (fetchAllofflineClasses) fetchAllofflineClasses();
          onClose();
        }
      } catch (error) {
        console.error("Update error:", error);
        toast.error("Failed to update offline class");
      } finally {
        setSubmitting(false);
      }
    },
  });

  // Handle instructor selection change
  const handleInstructorChange = (selectedOptions: any) => {
    setSelectedInstructors(selectedOptions);
    formik.setFieldValue(
      "instructors",
      selectedOptions.map((option: any) => option.value)
    );
  };

  // Handle time input change
  const handleTimeChange = (field: "startTime" | "endTime", value: string) => {
    // Allow empty value
    if (value === "") {
      formik.setFieldValue(field, "");
      return;
    }

    // Basic validation - allow digits, colon, and AM/PM
    const validCharsRegex = /^[0-9:apmAPM\s]*$/i;
    if (!validCharsRegex.test(value)) return;

    // Update the field value directly
    formik.setFieldValue(field, value);
  };

  // Format time on blur
  const handleTimeBlur = (field: "startTime" | "endTime", value: string) => {
    if (!value) {
      formik.setFieldTouched(field, true);
      return;
    }

    // Try to parse and format the time
    try {
      // Remove all whitespace and make uppercase
      let cleanValue = value.replace(/\s/g, "").toUpperCase();

      // Extract numbers only
      const numbers = cleanValue.replace(/[^0-9]/g, "");

      // If we have at least 1 number
      if (numbers.length > 0) {
        let hours = numbers.slice(0, 2);
        let minutes = numbers.slice(2, 4);
        let period = cleanValue.includes("PM") ? "PM" : "AM";

        // Validate hours (1-12)
        const hoursNum = parseInt(hours, 10);
        if (hoursNum > 12) {
          hours = "12";
          period = "PM";
        } else if (hoursNum < 1) {
          hours = "12";
          period = "AM";
        } else {
          hours = String(hoursNum);
        }

        // Validate minutes (00-59)
        const minutesNum = minutes ? parseInt(minutes, 10) : 0;
        if (minutesNum > 59) minutes = "59";
        else if (minutesNum < 10)
          minutes = minutes ? minutes.padStart(2, "0") : "00";

        // If no period specified, use AM
        if (!cleanValue.includes("AM") && !cleanValue.includes("PM")) {
          period = "AM";
        }

        // Format the final value
        const formattedTime = `${hours}:${minutes || "00"} ${period}`;
        formik.setFieldValue(field, formattedTime);
      }
    } catch (e) {
      // If formatting fails, keep the original value (validation will catch it)
    }

    // Trigger formik's blur handler
    formik.setFieldTouched(field, true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-lg flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-[#1BBFCA] text-white rounded-t-xl py-3 px-6 flex justify-between items-center">
          <h2
            className="text-center flex-1"
            style={{ ...FONTS.heading_05_bold }}
          >
            Edit Offline Class
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/20 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 space-y-6">
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            {/* Class Name */}
            <div>
              <label className="block mb-2" style={{ ...FONTS.heading_07 }}>
                Class Name
              </label>
              <input
                type="text"
                name="className"
                value={formik.values.className}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-[#1BBFCA] focus:border-transparent"
                placeholder="Enter Class Name"
              />
              {formik.touched.className && formik.errors.className && (
                <p className="text-[#1BBFCA] text-sm mt-1">
                  {formik.errors.className}
                </p>
              )}
            </div>

            {/* Class Date */}
            <div>
              <label className="block mb-2" style={{ ...FONTS.heading_07 }}>
                Class Date
              </label>
              <input
                type="date"
                name="classDate"
                value={formik.values.classDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-[#1BBFCA] focus:border-transparent"
              />
              {formik.touched.classDate && formik.errors.classDate && (
                <p className="text-[#1BBFCA] text-sm mt-1">
                  {formik.errors.classDate}
                </p>
              )}
            </div>

            {/* Times */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  className="block mb-1"
                  style={{
                    ...FONTS.heading_07_bold,
                    color: COLORS.gray_dark_02,
                  }}
                >
                  Start Time
                </label>
                <input
                  type="text"
                  name="startTime"
                  value={formik.values.startTime}
                  onChange={(e) =>
                    handleTimeChange("startTime", e.target.value)
                  }
                  onBlur={(e) => handleTimeBlur("startTime", e.target.value)}
                  className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-[#1BBFCA] focus:border-transparent"
                  style={{
                    ...FONTS.heading_08_bold,
                    color: COLORS.gray_dark_01,
                  }}
                  placeholder="HH:MM AM/PM"
                />
                {formik.touched.startTime && formik.errors.startTime && (
                  <p className="text-[#1BBFCA] text-sm mt-1">
                    {formik.errors.startTime}
                  </p>
                )}
              </div>

              <div>
                <label
                  className="block mb-1"
                  style={{
                    ...FONTS.heading_07_bold,
                    color: COLORS.gray_dark_02,
                  }}
                >
                  End Time
                </label>
                <input
                  type="text"
                  name="endTime"
                  value={formik.values.endTime}
                  onChange={(e) => handleTimeChange("endTime", e.target.value)}
                  onBlur={(e) => handleTimeBlur("endTime", e.target.value)}
                  className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-[#1BBFCA] focus:border-transparent"
                  style={{
                    ...FONTS.heading_08_bold,
                    color: COLORS.gray_dark_01,
                  }}
                  placeholder="HH:MM AM/PM"
                />
                {formik.touched.endTime && formik.errors.endTime && (
                  <p className="text-[#1BBFCA] text-sm mt-1">
                    {formik.errors.endTime}
                  </p>
                )}
              </div>
            </div>

            {/* Instructors - Multi-select */}
            <div>
              <label
                style={{
                  ...FONTS.heading_07_bold,
                  color: COLORS.gray_dark_02,
                }}
              >
                Instructors
              </label>
              <Select
                isMulti
                name="instructors"
                options={instructorOptions}
                components={animatedComponents}
                className="mt-1"
                classNamePrefix="select"
                value={selectedInstructors}
                onChange={handleInstructorChange}
                onBlur={() => formik.setFieldTouched("instructors", true)}
              />
              {formik.touched.instructors && formik.errors.instructors && (
                <p className="text-[#1BBFCA] text-sm mt-1">
                  {Array.isArray(formik.errors.instructors)
                    ? formik.errors.instructors.join(", ")
                    : formik.errors.instructors}
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end items-center gap-4 mt-6">
              <Button
                type="button"
                onClick={onClose}
                variant="outline"
                className="!border-[#1BBFCA] bg-white !text-[#1BBFCA] hover:bg-[#1bbeca15]"
                style={{
                  ...FONTS.heading_07_bold,
                  color: COLORS.gray_dark_02,
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-[#1BBFCA] text-white hover:bg-[#1BBFCA] hover:opacity-90"
                style={{
                  ...FONTS.heading_07_bold,
                  color: COLORS.white,
                }}
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? "Updating..." : "Update"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditOfflineClass;
