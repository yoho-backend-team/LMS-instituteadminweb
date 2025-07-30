import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FONTS } from "../../../constants/uiConstants";
import { Button } from "../../ui/button";

interface EditBatchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormValues {
  className: string;
  startTime: string;
  endTime: string;
  classDate:string;
  instructors:string;
}

const EditOfflineClass: React.FC<EditBatchModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;



  const formik = useFormik<FormValues>({
    initialValues: {
      className: "",
      startTime: "",
      endTime: "",
      classDate:"",
      instructors:"",
    },
    validationSchema: Yup.object({
      ClassName: Yup.string().required("class Name is required"),
        ClassDate: Yup.string().required("class Date is required"),
      startTime: Yup.string().required("Start Time is required"),
      endTime: Yup.string()
        .required("End Time is required")
        .test(
          "is-after-start",
          "End Time must be after Start time",
          function (value:any) {
            return !value || !this.parent.startDate || value >= this.parent.startDate;
          }
        ),
    }),
    onSubmit: (values) => {
      console.log("Form Data", values);
      onClose();
    },
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white w-full max-w-2xl h-[70vh] rounded-2xl shadow-lg">
        <div className="bg-[#1BBFCA] text-white rounded-t-xl py-3 px-6">
          <h2 className="text-center" style={{ ...FONTS.heading_03 }}>Edit Batch</h2>
        </div>

        <form onSubmit={formik.handleSubmit} className="mt-6 px-6 space-y-4">
          {/* Batch Name */}
          <div>
            <label className="block mb-1" style={{ ...FONTS.heading_07 }}>Class Name</label>
            <input
              type="text"
              name="batchName"
              value={formik.values.className}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full border rounded-md px-4 py-2"
              placeholder="Enter Batch Name"
            />
            {formik.touched.className && formik.errors.className && (
              <p className="text-[#1BBFCA] text-sm mt-1">{formik.errors.className}</p>
            )}
          </div>
           <div>
            <label className="block mb-1" style={{ ...FONTS.heading_07 }}>Class Date</label>
            <input
              type="text"
              name="batchName"
              value={formik.values.classDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full border rounded-md px-4 py-2"
              placeholder="Enter Batch Name"
            />
            {formik.touched.classDate && formik.errors.classDate && (
              <p className="text-[#1BBFCA] text-sm mt-1">{formik.errors.classDate}</p>
            )}
          </div>

          {/* Dates */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block mb-1" style={{ ...FONTS.heading_07 }}>Start Time</label>
              <input
                type="time"
                name="startDate"
                value={formik.values.startTime}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full border rounded-md px-4 py-2"
              />
              {formik.touched.startTime && formik.errors.startTime && (
                <p className="text-[#1BBFCA] text-sm mt-1">{formik.errors.startTime}</p>
              )}
            </div>

            <div className="flex-1">
              <label className="block mb-1" style={{ ...FONTS.heading_07 }}>End Time</label>
              <input
                type="time"
                name="endDate"
                value={formik.values.endTime}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full border rounded-md px-4 py-2"
              />
              {formik.touched.endTime && formik.errors.endTime && (
                <p className="text-[#1BBFCA] text-sm mt-1">{formik.errors.endTime}</p>
              )}
            </div>
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
         
          {/* Action Buttons */}
          <div className="flex justify-end items-center gap-4 mt-6 mb-4">
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
              className="!border-[#1BBFCA] !text-[#1BBFCA]"
              style={{ ...FONTS.heading_07 }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-[#1BBFCA] text-white hover:bg-[#1BBFCA]"
              style={{ ...FONTS.heading_07}}
            >
              Update
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditOfflineClass;
