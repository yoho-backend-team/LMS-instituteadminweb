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
    className: Yup.string().required("Batch name is required"),
    startTime: Yup.date().required("Start date is required"),
    endTime: Yup.date()
      .required("End date is required")
      .min(Yup.ref("startDate"), "End date must be after start date"),
    branch: Yup.string().required("Branch selection is required"),
    course: Yup.string().required("Course selection is required"),
    Instructors: Yup.string().required("Instructors selection is required"),
   
  });

  const formik = useFormik({
    initialValues: {
      className: "",
      startTime: "",
      endTime: "",
      branch: "",
      course: "",
      classDate:"",
      instructors:"",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Batch created with values:", values);
      setIsOpen(false);
    },
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center bg-black/30 backdrop-blur-sm justify-center">
      <div className="bg-white w-full max-w-4xl   rounded-2xl shadow-2xl">
        <h2
          className="!text-white text-center bg-[#1BBFCA] px-6 py-4 rounded-t-2xl mb-6"
          style={{ ...FONTS.heading_03}}
        >
          Add Offline Class 
        </h2>

        <form onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2  px-4">
            <div className="md:col-span-2">
              <label style={{ ...FONTS.heading_07 }}>Class Name</label>
              <input
                name="className"
                className="w-full border rounded-md px-4 py-2"
                type="text"
                value={formik.values.className}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.className && formik.errors.className && (
                <p className="text-[#1BBFCA] text-sm mt-1">{formik.errors.className}</p>
              )}
            </div>

           
            <div className="md:col-span-2">
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
                Select a branch to see available branch.
              </p>
            </div>

            <div className="md:col-span-2">
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
            

        <div >
              <label style={{ ...FONTS.heading_07 }}>Start Time</label>
              <input
                name="batchName"
                className="w-full border rounded-md px-4 py-2"
                type="time"
                value={formik.values.startTime}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.startTime && formik.errors.startTime && (
                <p className="text-[#1BBFCA] text-sm mt-1">{formik.errors.startTime}</p>
              )}
            </div>
            
             <div >
              <label style={{ ...FONTS.heading_07 }}>End Time</label>
              <input
                name="batchName"
                type="time"
                className="w-full border rounded-md px-4 py-2"
                
                value={formik.values.endTime}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.endTime && formik.errors.endTime && (
                <p className="text-[#1BBFCA] text-sm mt-1">{formik.errors.endTime}</p>
              )}
            </div>
            
         <div >
              <label style={{ ...FONTS.heading_07 }}>Class Date </label>
              <input
                name="batchName"
                className="w-full border rounded-md px-4 py-2"
                type="text"
                value={formik.values.classDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.classDate && formik.errors.classDate && (
                <p className="text-[#1BBFCA] text-sm mt-1">{formik.errors.classDate}</p>
              )}
            </div>
              <div>
              <label style={{ ...FONTS.heading_07}}> Instructors</label>
              <select
                name="course"
                className="w-full border rounded-md px-4 py-2"
                value={formik.values.instructors}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">Select Instructors</option>
                <option value="course1">Kamal</option>
                <option value="course2">Elan Mask </option>
                 
                  
              </select>
              {formik.touched.instructors && formik.errors.instructors && (
                <p className="text-[#1BBFCA] text-sm mt-1">{formik.errors.instructors}
                  Please select a branch first to enable course selection.
                  </p>
                
              )}
            
            </div>

          </div>


          <div className="flex justify-end gap-4 mt-8 mb-4 px-4">
            <Button
              type="button"
              variant="outline"
              className=" !text-[#1BBFCA] border-[#1BBFCA] !bg-bray-250"
              onClick={() => setIsOpen(false)}
              style={{ ...FONTS.heading_07 }}
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-[#1BBFCA] text-white hover:bg-[#1BBFCA]" style={{ ...FONTS.heading_07 }}>
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
