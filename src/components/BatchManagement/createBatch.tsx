/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { COLORS, FONTS } from "../../constants/uiConstants";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import {
  createBatches,
  getBranchService,
  getCourseService,
  getStaffService,
  getStudentBranchService,
  getStudentService,
} from "../../features/batchManagement/services";
import Select from "react-select";
import toast from "react-hot-toast";

interface CreateBatchModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

type OptionType = {
  value: string;
  label: string;
};

export const CreateBatchModal = ({
  isOpen,
  setIsOpen,
}: CreateBatchModalProps) => {

  const [courses, setCourses] = useState<any[]>([]);
  const [students, setStudents] = useState<OptionType[]>([]);
  const [staffs, setStaffs] = useState<OptionType[]>([]);
  const [branches, setBranches] = useState<any[]>([]);
  const [selectedBranch, setSelectedBranch] = useState<any>('')
  const dispatch = useDispatch<any>();

  const [courseUUID, setCourseUUID] = useState("");
  const [courseObjectId, setCourseObjectId] = useState("");


  const validationSchema = Yup.object({
    batchName: Yup.string().required("Batch name is required"),
    startDate: Yup.date().required("Start date is required"),
    endDate: Yup.date()
      .required("End date is required")
      .min(Yup.ref("startDate"), "End date must be after start date"),
    branch: Yup.string().required("Branch selection is required"),
    course: Yup.string().required("Course selection is required"),
    students: Yup.array()
      .of(Yup.string())
      .min(1, "Please select at least one student")
      .required("Student selection is required"),
    staffs: Yup.array()
      .of(Yup.string())
      .min(1, "Please select at least one teacher")
      .required("Teacher selection is required"),
  });

  const formik = useFormik<{
    batchName: string;
    startDate: string;
    endDate: string;
    branch: string;
    course: string;
    students: string[];
    staffs: string[];
  }>({
    initialValues: {
      batchName: "",
      startDate: "",
      endDate: "",
      branch: "",
      course: "",
      students: [],
      staffs: [],
    },
    validationSchema,
    onSubmit: async (values) => {
      const payload = {
        batch_name: values.batchName,
        start_date: values.startDate,
        end_date: values.endDate,
        branch_id: values.branch,
        course: values.course,
        instructor: values.staffs,
        student: values.students,
        institute_id: "973195c0-66ed-47c2-b098-d8989d3e4529",
      };

      try {
        const response = await createBatches(payload);
        if (response) {
          setIsOpen(false);
          toast.success("Batch created successfully!");
        } else {
          setIsOpen(false);
          toast.error(
            "Subscription limit reached. Update your subscription plan."
          );
        }
      } catch (error) {
        setIsOpen(false);
        toast.error("Failed to create batch. Please try again.");
      }
    },
  });


  useEffect(() => {

    const fetchAllBranches = async () => {
      try {
        const response = await getBranchService({});
        if (response) {
          setBranches(response?.data);
        }
      } catch (error) {
        console.log("Error fetching branch data:", error);
      }
    };
    const fetchAllCourses = async () => {
      try {
        const response = await getCourseService({ branch: formik.values.branch });
        if (response) {
          setCourses(response?.data);
        }
      } catch (error) {
        console.log("Error fetching course data:", error);
      }
    };
    fetchAllCourses();
    fetchAllBranches();
  }, [dispatch, formik.values.branch]);

  useEffect(() => {
    const fetchAllStaff = async () => {
      if (!courseObjectId) return;
      try {
        const response = await getStaffService({ uuid: formik.values.branch });
        if (response && Array.isArray(response.data)) {
          const mappedStaff = response.data.map((staff: any) => ({
            value: staff.uuid,
            label: staff.full_name,
          }));
          setStaffs(mappedStaff);
        } else {
          setStaffs([]);
        }
      } catch (error) {
        console.log("Error fetching staff data:", error);
      }
    };
    const fetchAllStudents = async () => {
      if (!courseUUID) return;
      try {
        const response = await getStudentBranchService();
        if (response && Array.isArray(response.data)) {
          const mappedStudents = response.data.map((student: any) => ({
            value: student.uuid,
            label: student.full_name,
          }));
          setStudents(mappedStudents);
        } else {
          setStudents([]);
        }
      } catch (error) {
        console.log("Error fetching student data:", error);
      }
    };
    fetchAllStudents();
    fetchAllStaff();
  }, [courseUUID, courseObjectId, formik.values.branch]);

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Background overlay with blur */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />

      {/* Modal content */}
      <div className="relative bg-white w-full max-w-4xl rounded-2xl shadow-2xl z-10">
        <div className="flex justify-between items-center bg-[#1BBFCA] px-6 py-4 rounded-t-2xl mb-6">
          <h2 className="!text-white" style={{ ...FONTS.heading_04_bold }}>
            Create New Batch
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white hover:text-gray-200 transition"
          >
            ✕
          </button>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
            {/* Batch Name */}
            <div className="md:col-span-2">
              <label
                style={{ ...FONTS.heading_07, color: COLORS.gray_dark_02 }}
              >
                Batch Name
              </label>
              <input
                name="batchName"
                className="w-full border rounded-md px-4 py-2"
                type="text"
                value={formik.values.batchName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.batchName && formik.errors.batchName && (
                <p className="text-[#1BBFCA] text-sm mt-1">
                  {formik.errors.batchName}
                </p>
              )}
            </div>

            {/* Start Date */}
            <div>
              <label
                style={{ ...FONTS.heading_07, color: COLORS.gray_dark_02 }}
              >
                Start Date
              </label>
              <input
                name="startDate"
                className="w-full border rounded-md px-4 py-2"
                type="date"
                value={formik.values.startDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.startDate && formik.errors.startDate && (
                <p className="text-[#1BBFCA] text-sm mt-1">
                  {formik.errors.startDate}
                </p>
              )}
            </div>

            {/* End Date */}
            <div>
              <label
                style={{ ...FONTS.heading_07, color: COLORS.gray_dark_02 }}
              >
                End Date
              </label>
              <input
                name="endDate"
                className="w-full border rounded-md px-4 py-2"
                type="date"
                value={formik.values.endDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.endDate && formik.errors.endDate && (
                <p className="text-[#1BBFCA] text-sm mt-1">
                  {formik.errors.endDate}
                </p>
              )}
            </div>

            {/* Branch */}
            <div>
              <label
                style={{ ...FONTS.heading_07, color: COLORS.gray_dark_02 }}
              >
                Branch
              </label>
              <select
                name="branch"
                className="w-full border rounded-md px-4 py-2"
                value={formik.values.branch}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">Select Branch</option>
                {branches?.map((branch: any) => (
                  <option key={branch?._id} value={branch?.uuid}>
                    {branch?.branch_identity}
                  </option>
                ))}
              </select>
              {formik.touched.branch && formik.errors.branch && (
                <p className="text-[#1BBFCA] text-sm mt-1">
                  {formik.errors.branch}
                </p>
              )}
            </div>

            {/* Course */}
            <div>
              <label
                style={{ ...FONTS.heading_07, color: COLORS.gray_dark_02 }}
              >
                Course
              </label>
              <select
                name="course"
                className="w-full border rounded-md px-4 py-2"
                value={formik.values.course}
                onChange={(e) => {
                  const selectedCourse = courses.find(
                    (c) => c.uuid === e.target.value
                  );
                  formik.handleChange(e);
                  setCourseUUID(selectedCourse?.uuid || "");
                  setCourseObjectId(selectedCourse?._id || "");
                }}
                onBlur={formik.handleBlur}
              >
                <option value="">Select Course</option>
                {courses?.map((course: any) => (
                  <option key={course?.uuid} value={course?.uuid}>
                    {course?.course_name}
                  </option>
                ))}
              </select>
              {formik.touched.course && formik.errors.course && (
                <p className="text-[#1BBFCA] text-sm mt-1">
                  {formik.errors.course}
                </p>
              )}
            </div>

            {/* Students */}
            <div>
              <label
                style={{ ...FONTS.heading_07, color: COLORS.gray_dark_02 }}
              >
                Students
              </label>
              <Select
                isMulti
                name="students"
                options={students}
                value={students.filter((option) =>
                  formik.values.students.includes(option.value)
                )}
                onChange={(selected) => {
                  formik.setFieldValue(
                    "students",
                    Array.isArray(selected)
                      ? selected.map((option) => option.value)
                      : []
                  );
                  formik.setFieldTouched("students", true, false);
                }}
              />
              {formik.touched.students && formik.errors.students && (
                <p className="text-[#1BBFCA] text-sm mt-1">
                  {formik.errors.students}
                </p>
              )}
            </div>

            {/* Teacher */}
            <div>
              <label
                style={{ ...FONTS.heading_07, color: COLORS.gray_dark_02 }}
              >
                Teacher
              </label>
              <Select
                isMulti
                name="staffs"
                options={staffs}
                value={staffs.filter((option) =>
                  formik.values.staffs.includes(option.value)
                )}
                onChange={(selected) => {
                  formik.setFieldValue(
                    "staffs",
                    Array.isArray(selected)
                      ? selected.map((option) => option.value)
                      : []
                  );
                  formik.setFieldTouched("staffs", true, false);
                }}
              />
              {formik.touched.staffs && formik.errors.staffs && (
                <p className="text-[#1BBFCA] text-sm mt-1">
                  {formik.errors.staffs}
                </p>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 mt-8 mb-4 px-4">
            <Button
              type="button"
              variant="outline"
              className="!border-[#1BBFCA] !text-[#1BBFCA] bg-[#1bbeca15]"
              onClick={() => setIsOpen(false)}
              style={{ ...FONTS.heading_07_bold }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-[#1BBFCA] text-white hover:bg-[#1BBFCA]"
              style={{ ...FONTS.heading_07_bold }}
            >
              Create Batch
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
