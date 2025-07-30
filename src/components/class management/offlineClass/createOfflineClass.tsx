import type { Dispatch, SetStateAction } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FONTS } from "../../../constants/uiConstants";
import { Button } from "../../ui/button";

interface CreateBatchModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const CreateOfflineClassModal = ({ isOpen, setIsOpen }: CreateBatchModalProps) => {
  if (!isOpen) return null;

  const validationSchema = Yup.object({
    batchName: Yup.string().required("Batch name is required"),
    startDate: Yup.date().required("Start date is required"),
    endDate: Yup.date()
      .required("End date is required")
      .min(Yup.ref("startDate"), "End date must be after start date"),
    branch: Yup.string().required("Branch selection is required"),
    course: Yup.string().required("Course selection is required"),
    students: Yup.string().required("Student selection is required"),
    teacher: Yup.string().required("Teacher selection is required"),
  });

  const formik = useFormik({
    initialValues: {
      batchName: "",
      startDate: "",
      endDate: "",
      branch: "",
      course: "",
      students: "",
      teacher: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Batch created with values:", values);
      setIsOpen(false);
    },
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl">
        <h2
          className="!text-white text-center bg-[#1BBFCA] px-6 py-4 rounded-t-2xl mb-6"
          style={{ ...FONTS.heading_03}}
        >
          Add Offline Class 
        </h2>

        <form onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
            <div className="md:col-span-2">
              <label style={{ ...FONTS.heading_07 }}>Class Name</label>
              <input
                name="batchName"
                className="w-full border rounded-md px-4 py-2"
                type="text"
                value={formik.values.batchName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.batchName && formik.errors.batchName && (
                <p className="text-[#1BBFCA] text-sm mt-1">{formik.errors.batchName}</p>
              )}
            </div>

           
            <div>
              <label style={{ ...FONTS.heading_07 }}> Branch</label>
              <select
                name="branch"
                className="w-full border rounded-md px-4 py-2"
                value={formik.values.branch}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">Select Branch</option>
                <option value="branch1">Branch 1</option>
                <option value="branch2">Branch 2</option>
                <option value="branch2">Branch 3</option>
                <option value="branch2">Branch 4</option>
               <option value="branch2">Branch 5</option>
              </select>
              {formik.touched.branch && formik.errors.branch && (
                <p className="text-[#1BBFCA] text-sm mt-1">{formik.errors.branch}</p>
              )}
              <p className="text-xs text-gray-500 mt-1" style={{ ...FONTS.heading_07}}>
                Select a branch to see available courses.
              </p>
            </div>

            <div>
              <label style={{ ...FONTS.heading_07}}> Course</label>
              <select
                name="course"
                className="w-full border rounded-md px-4 py-2"
                value={formik.values.course}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">Select Course</option>
                <option value="course1">MEAN stack</option>
                <option value="course2">MERN stack </option>
                 <option value="course2">Full stack </option>
                  <option value="course2">Python </option>
                  
              </select>
              {formik.touched.course && formik.errors.course && (
                <p className="text-[#1BBFCA] text-sm mt-1">{formik.errors.course}</p>
              )}
              <p className="text-xs text-gray-500 mt-1" style={{ ...FONTS.heading_07 }}>
                Please select a branch first to enable course selection.
              </p>
            </div>

            <div>
              <label style={{ ...FONTS.heading_07 }}>Students</label>
              <select
                name="students"
                className="w-full border rounded-md px-4 py-2"
                value={formik.values.students}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">Select Students</option>
                <option value="student1">Student 1</option>
              </select>
              {formik.touched.students && formik.errors.students && (
                <p className="text-[#1BBFCA] text-sm mt-1">{formik.errors.students}</p>
              )}
              <p className="text-xs text-gray-500 mt-1" style={{ ...FONTS.heading_07 }}>
                Please select a course to view and select students.
              </p>
            </div>

            <div>
              <label style={{ ...FONTS.heading_07 }}>Teacher</label>
              <select
                name="teacher"
                className="w-full border rounded-md px-4 py-2"
                value={formik.values.teacher}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">Select Teacher</option>
                <option value="teacher1">Teacher 1</option>
              </select>
              {formik.touched.teacher && formik.errors.teacher && (
                <p className="text-[#1BBFCA] text-sm mt-1">{formik.errors.teacher}</p>
              )}
              <p className="text-xs text-gray-500 mt-1" style={{ ...FONTS.heading_07}}>
                Please select a course to view and select Teacher.
              </p>
            </div>
          </div>


          <div className="flex justify-end gap-4 mt-8 mb-4 px-4">
            <Button
              type="button"
              variant="outline"
              className="!border-[#0400FF] !text-[#0400FF] !bg-blue-50"
              onClick={() => setIsOpen(false)}
              style={{ ...FONTS.heading_03 }}
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-[#1BBFCA] text-white hover:bg-[#1BBFCA]" style={{ ...FONTS.heading_03 }}>
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
