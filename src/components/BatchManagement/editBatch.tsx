import React from "react";
import { X } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { COLORS, FONTS } from "../../constants/uiConstants";
import { Button } from "../ui/button";
import { updateBatches } from "../../features/batchManagement/services";
import toast from "react-hot-toast";

interface EditBatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
  fetchBatchData?: () => void;
}

interface FormValues {
  batchName: string;
  startDate: string;
  endDate: string;
}

const EditBatchModal: React.FC<EditBatchModalProps> = ({
  isOpen,
  onClose,
  data,
  fetchBatchData,
}) => {
  if (!isOpen) return null;

  const formik = useFormik<FormValues>({
    initialValues: {
      batchName: data?.batch_name || "",
      startDate: data?.start_date?.split("T")[0] || "",
      endDate: data?.end_date?.split("T")[0] || "",
    },
    validationSchema: Yup.object({
      batchName: Yup.string().required("Batch Name is required"),
      startDate: Yup.string().required("Start Date is required"),
      endDate: Yup.string().required("End Date is required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      const payload = {
        uuid: data?.uuid,
        batch_name: values.batchName,
        start_date: new Date(values.startDate).toISOString(),
        end_date: new Date(values.endDate).toISOString(),
        student: Array.isArray(data?.student)
          ? data.student.map((s: any) => (typeof s === "string" ? s : s._id))
          : [],
      };

      try {
        const response = await updateBatches(payload);

        if (response) {
          onClose();
          toast.success("Batch updated successfully!");

          if (fetchBatchData) {
            fetchBatchData();
          }
        }
      } catch (error) {
        console.error("Error updating batch:", error);
        toast.error("Failed to update batch");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-lg flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-[#1BBFCA] text-white rounded-t-xl py-3 px-6">
          <div className="flex justify-between items-center">
            <h2
              className="text-center flex-1"
              style={{ ...FONTS.heading_04_bold }}
            >
              Edit Batch
            </h2>
            <button
              onClick={onClose}
              className="p-1 rounded-full bg-white/20 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1 p-6">
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            {/* Batch Name */}
            <div>
              <label
                className="block mb-2"
                style={{ ...FONTS.heading_07, color: COLORS.gray_dark_02 }}
              >
                Batch Name
              </label>
              <input
                type="text"
                name="batchName"
                value={formik.values.batchName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-[#1BBFCA] focus:border-transparent"
                placeholder="Enter Batch Name"
              />
              {formik.touched.batchName && formik.errors.batchName && (
                <p className="text-[#1BBFCA] text-sm mt-1">
                  {formik.errors.batchName}
                </p>
              )}
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  className="block mb-2"
                  style={{ ...FONTS.heading_07, color: COLORS.gray_dark_02 }}
                >
                  Start Date
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formik.values.startDate}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-[#1BBFCA] focus:border-transparent"
                />
                {formik.touched.startDate && formik.errors.startDate && (
                  <p className="text-[#1BBFCA] text-sm mt-1">
                    {formik.errors.startDate}
                  </p>
                )}
              </div>

              <div>
                <label
                  className="block mb-2"
                  style={{ ...FONTS.heading_07, color: COLORS.gray_dark_02 }}
                >
                  End Date
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={formik.values.endDate}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-[#1BBFCA] focus:border-transparent"
                />
                {formik.touched.endDate && formik.errors.endDate && (
                  <p className="text-[#1BBFCA] text-sm mt-1">
                    {formik.errors.endDate}
                  </p>
                )}
              </div>
            </div>

            {/* Students Display */}
            <div>
              <label
                className="block mb-2"
                style={{ ...FONTS.heading_07, color: COLORS.gray_dark_02 }}
              >
                Students
              </label>
              <div className="w-full border border-gray-300 rounded-md px-4 py-2 flex flex-wrap gap-2 min-h-[44px]">
                {data?.student?.length > 0 ? (
                  data?.student?.map((student: any, idx: number) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
                    >
                      {student?.full_name || student}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400">No students added</p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end items-center gap-4 pt-4">
              <Button
                type="button"
                onClick={onClose}
                variant="outline"
                className="!border-[#1BBFCA] bg-white !text-[#1BBFCA] hover:bg-[#1bbeca15]"
                style={{ ...FONTS.heading_07_bold }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={formik.isSubmitting}
                className="bg-[#1BBFCA] text-white hover:bg-[#1BBFCA] hover:opacity-90"
                style={{ ...FONTS.heading_07_bold }}
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

export default EditBatchModal;
