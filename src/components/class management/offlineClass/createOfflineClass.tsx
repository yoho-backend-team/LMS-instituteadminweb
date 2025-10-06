/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useEffect,
  useState,
  useCallback,
  type Dispatch,
  type SetStateAction,
} from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { COLORS, FONTS } from "../../../constants/uiConstants";
import { Button } from "../../ui/button";
import { getStaffService } from "../../../features/batchManagement/services";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import {
  getAllBatches,
  getAllBranches,
  getAllCourses,
} from "../../../features/Class Management/Live Class/services";
import { createOfflineClass } from "../../../features/Class Management/offlineClass/services";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

interface CreateBatchModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  fetchAllOfflineClasses?: () => void;
}

interface FormValues {
  className: string;
  branch: string;
  course: string;
  batch: string;
  classDate: string;
  startTime: string;
  endTime: string;
  instructors: string[];
}

export const CreateOfflineClassModal = ({
  isOpen,
  setIsOpen,
  fetchAllOfflineClasses,
}: CreateBatchModalProps) => {
  const [allCourses, setAllCourses] = useState<any[]>([]);
  const [allBatches, setAllBatches] = useState<any[]>([]);
  const [allBranches, setAllBranches] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [availableInstructors, setAvailableInstructors] = useState<any[]>([]);
  const [] = useState<string>("");

  // Initial form values
  const initialValues: FormValues = {
    className: "",
    branch: "",
    course: "",
    batch: "",
    classDate: "",
    startTime: "",
    endTime: "",
    instructors: [],
  };

  // Validation schema
  const validationSchema = Yup.object().shape({
    className: Yup.string().required("Class name is required"),
    branch: Yup.string().required("Branch selection is required"),
    course: Yup.string().required("Course selection is required"),
    batch: Yup.string().required("Batch selection is required"),
    classDate: Yup.date()
      .required("Class date is required")
      .min(new Date(), "Class date cannot be in the past"),
    startTime: Yup.string().required("Start time is required"),
    endTime: Yup.string()
      .required("End time is required")
      .test("is-greater", "End time must be after start time", function (value) {
        const { startTime } = this.parent;
        if (!startTime || !value) return true;
        return (
          new Date(`1970-01-01T${value}`) >
          new Date(`1970-01-01T${startTime}`)
        );
      }),
    instructors: Yup.array()
      .min(1, "At least one instructor is required")
      .required("Instructor selection is required"),
  });

  // Formik
  const formik = useFormik<FormValues>({
    initialValues,
    validationSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: useCallback(
      async (values, { resetForm }) => {
        setIsSubmitting(true);
        try {
          const startDateTime = new Date(
            `${values.classDate}T${values.startTime}`
          );
          const endDateTime = new Date(
            `${values.classDate}T${values.endTime}`
          );

          const classData = {
            class_name: values.className,
            branch: values.branch,
            course: values.course,
            batch: values.batch,
            start_date: startDateTime.toISOString(),
            start_time: startDateTime,
            end_time: endDateTime,
            institute: "973195c0-66ed-47c2-b098-d8989d3e4529",
            instructors: values.instructors,
            coordinators: [],
          };

          const response = await createOfflineClass(classData);
          if (response) {
            toast.success("Offline class created successfully!");
            fetchAllOfflineClasses?.();
            setIsOpen(false);
            resetForm();
          } else {
            toast.error("Failed to create offline class");
          }
        } catch (error) {
          console.error("Error creating offline class:", error);
          toast.error("Failed to create offline class");
        } finally {
          setIsSubmitting(false);
        }
      },
      [setIsOpen, fetchAllOfflineClasses]
    ),
  });

  // Remove instructor chip
  const removeInstructor = useCallback(
    (instructorId: string) => {
      formik.setFieldValue(
        "instructors",
        formik.values.instructors.filter((id) => id !== instructorId)
      );
    },
    [formik]
  );

  const handleCloseModal = useCallback(() => {
    setIsOpen(false);
    formik.resetForm();
  }, [formik, setIsOpen]);

  // Fetch branches when modal opens
  useEffect(() => {
    if (isOpen) {
      (async () => {
        try {
          const response = await getAllBranches();
          if (response?.data) setAllBranches(response.data);
        } catch (error) {
          console.error("Error fetching branches:", error);
          toast.error("Failed to load branches");
        }
      })();
    }
  }, [isOpen]);

  // Fetch courses & instructors when branch changes
  useEffect(() => {
    (async () => {
      if (!formik.values.branch) return;
      try {
        const response = await getAllCourses(formik.values.branch);
        if (response?.data) setAllCourses(response.data);

        const staffRes = await getStaffService({ uuid: formik.values.branch });
        if (staffRes?.data) setAvailableInstructors(staffRes.data);
      } catch (error) {
        console.error("Error fetching courses/instructors:", error);
        toast.error("Failed to load courses or instructors");
      }
    })();
  }, [formik.values.branch]);

  // Fetch batches when course changes
  useEffect(() => {
    (async () => {
      if (!formik.values.branch || !formik.values.course) return;
      try {
        const response = await getAllBatches({
          branch: formik.values.branch,
          course: formik.values.course,
        });
        if (response?.data) setAllBatches(response.data);
      } catch (error) {
        console.error("Error fetching batches:", error);
        toast.error("Failed to load batches");
      }
    })();
  }, [formik.values.branch, formik.values.course]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 py-8">
        {/* Overlay */}
        <div className="fixed inset-0 bg-black/50" aria-hidden="true"></div>

        {/* Modal */}
        <div className="relative bg-white rounded-lg shadow-xl sm:max-w-3xl w-full">
          <div className="bg-[#1BBFCA] rounded-t-md p-3">
            <h2
              style={{
                ...FONTS.heading_05_bold,
                color: COLORS.white,
                textAlign: "center",
              }}
            >
              Add Offline Class
            </h2>
          </div>

          <form onSubmit={formik.handleSubmit} noValidate>
            <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto p-4">
              {/* --- Class Name --- */}
              <div>
                <label style={{ ...FONTS.heading_07, color: COLORS.gray_dark_02 }}>
                  Class Name
                </label>
                <input
                  name="className"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 mt-2"
                  type="text"
                  value={formik.values.className}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.className && formik.errors.className && (
                  <p className="mt-1 text-sm text-[#1BBFCA]">
                    {formik.errors.className}
                  </p>
                )}
              </div>

              {/* --- Branch --- */}
              <div>
                <label style={{ ...FONTS.heading_07, color: COLORS.gray_dark_02 }}>
                  Select Branch
                </label>
                <select
                  name="branch"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 mt-2"
                  value={formik.values.branch}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="">Select Branch</option>
                  {allBranches.map((branch) => (
                    <option key={branch._id} value={branch.uuid}>
                      {branch.branch_identity}
                    </option>
                  ))}
                </select>
                {formik.touched.branch && formik.errors.branch && (
                  <p className="mt-1 text-sm text-[#1BBFCA]">
                    {formik.errors.branch}
                  </p>
                )}
              </div>

              {/* --- Course --- */}
              <div>
                <label style={{ ...FONTS.heading_07, color: COLORS.gray_dark_02 }}>
                  Select Course
                </label>
                <select
                  name="course"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 mt-2"
                  value={formik.values.course}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={!formik.values.branch}
                >
                  <option value="">Select Course</option>
                  {allCourses.map((course) => (
                    <option key={course._id} value={course.uuid}>
                      {course.course_name}
                    </option>
                  ))}
                </select>
                {formik.touched.course && formik.errors.course && (
                  <p className="mt-1 text-sm text-[#1BBFCA]">
                    {formik.errors.course}
                  </p>
                )}
                {!formik.values.branch && (
                  <p className="mt-1 text-xs text-gray-500">
                    Please select a branch first
                  </p>
                )}
              </div>

              {/* --- Batch --- */}
              <div>
                <label style={{ ...FONTS.heading_07, color: COLORS.gray_dark_02 }}>
                  Select Batch
                </label>
                <select
                  name="batch"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 mt-2"
                  value={formik.values.batch}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={!formik.values.course}
                >
                  <option value="">Select Batch</option>
                  {allBatches?.map((batch) => (
                    <option key={batch._id} value={batch._id}>
                      {batch.batch_name}
                    </option>
                  ))}
                </select>
                {formik.touched.batch && formik.errors.batch && (
                  <p className="mt-1 text-sm text-[#1BBFCA]">
                    {formik.errors.batch}
                  </p>
                )}
                {!formik.values.course && (
                  <p className="mt-1 text-xs text-gray-500">
                    Please select a course first
                  </p>
                )}
              </div>

              {/* --- Date & Time --- */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label style={{ ...FONTS.heading_07, color: COLORS.gray_dark_02 }}>
                    Class Date
                  </label>
                  <input
                    name="classDate"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 mt-2"
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    value={formik.values.classDate}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.classDate && formik.errors.classDate && (
                    <p className="mt-1 text-sm text-[#1BBFCA]">
                      {formik.errors.classDate}
                    </p>
                  )}
                </div>

                <div>
                  <label style={{ ...FONTS.heading_07, color: COLORS.gray_dark_02 }}>
                    Start Time
                  </label>
                  <input
                    name="startTime"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 mt-2"
                    type="time"
                    value={formik.values.startTime}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.startTime && formik.errors.startTime && (
                    <p className="mt-1 text-sm text-[#1BBFCA]">
                      {formik.errors.startTime}
                    </p>
                  )}
                </div>

                <div>
                  <label style={{ ...FONTS.heading_07, color: COLORS.gray_dark_02 }}>
                    End Time
                  </label>
                  <input
                    name="endTime"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 mt-2"
                    type="time"
                    value={formik.values.endTime}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.endTime && formik.errors.endTime && (
                    <p className="mt-1 text-sm text-[#1BBFCA]">
                      {formik.errors.endTime}
                    </p>
                  )}
                </div>
              </div>

              {/* --- Instructors --- */}
              <div>
                <label style={{ ...FONTS.heading_07, color: COLORS.gray_dark_02 }}>
                  Instructors
                </label>

                {/* Chips */}
                <div className="flex flex-wrap gap-2 mb-2 mt-2">
                  {formik.values.instructors.map((instructorId) => {
                    const instructor = availableInstructors.find(
                      (i) => i._id === instructorId
                    );
                    return instructor ? (
                      <div
                        key={instructorId}
                        className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full text-sm"
                      >
                        <span>{instructor.full_name}</span>
                        <button
                          type="button"
                          onClick={() => removeInstructor(instructorId)}
                          className="text-gray-500 hover:text-red-500"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ) : null;
                  })}
                </div>

                {/* Dropdown */}
                <Select
                  onValueChange={(value) => {
                    if (!formik.values.instructors.includes(value)) {
                      formik.setFieldValue("instructors", [
                        ...formik.values.instructors,
                        value,
                      ]);
                    }
                  }}
                  disabled={!formik.values.classDate || !formik.values.course}
                >
                  <SelectTrigger className="w-full cursor-pointer" size="default">
                    <SelectValue placeholder="Select Instructor" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {availableInstructors?.map((instructor) => (
                      <SelectItem className={`cursor-pointer hover:bg-[${COLORS.primary}]`} key={instructor._id} value={instructor._id}>
                        {instructor.full_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {formik.touched.instructors && formik.errors.instructors && (
                  <p className="mt-1 text-sm text-[#1BBFCA]">
                    {formik.errors.instructors as string}
                  </p>
                )}

                {(!formik.values.classDate || !formik.values.course) && (
                  <p className="mt-1 text-xs text-gray-500">
                    Please select a course and class date first
                  </p>
                )}
              </div>
            </div>

            {/* Footer buttons */}
            <div className="mt-6 flex justify-end space-x-3 p-4">
              <Button
                type="button"
                variant="outline"
                className="!border-[#1BBFCA] !text-[#1BBFCA] !bg-[#1bbeca15]"
                onClick={handleCloseModal}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-[#1BBFCA] text-white hover:bg-[#1BBFCA]"
                disabled={isSubmitting || !formik.isValid}
              >
                {isSubmitting ? "Creating..." : "Submit"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
