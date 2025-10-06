import React, { useEffect, useState } from "react";
import { HiMiniXMark } from "react-icons/hi2";
import { COLORS, FONTS } from "../../constants/uiConstants";
import {
  getBranchService,
  getCourseService,
} from "../../features/batchManagement/services";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
} from "../../features/batchManagement/services";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import {
  createCertificate,
  getAllBatches,
  updateCertificate,
} from "../../features/certificateManagement/services";
import { getStudentmanagement } from "../../features/StudentManagement/reducer/thunks";
import { selectStudent } from "../../features/StudentManagement/reducer/selector";

export interface Certificate {
  id: number;
  title: string;
  description: string;
  branch: string;
  batch: string;
  student: string;
  email: string;
  course?: string;
  certificateid: string;
  uuid: string;
  batch_id: string;
  certificate_name: string;
}

interface CertificateModalProps {
  isOpen: boolean;
  isEditing: boolean;
  fetchgetStudentCertificate: () => void;
  editingCertificate: Certificate | null;
  onClose: () => void;
  onSave: (formData: Partial<Certificate>) => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  isEditing,
  editingCertificate,
  onClose,
  onSave,
  fetchgetStudentCertificate,
}) => {
  const dispatch = useDispatch<any>();

  const [courses, setCourses] = useState<any[]>([]);
  const [branches, setBranches] = useState<any[]>([]);
  const [allBatches, setAllBatches] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const studentData = useSelector(selectStudent)?.data;

  useEffect(() => {
    (async () => {
      try {
        const [coursesRes, branchesRes, batchesRes] = await Promise.all([
          getCourseService({}),
          getBranchService({}),
          getAllBatches({}),
        ]);
        setCourses(coursesRes?.data || []);
        setBranches(branchesRes?.data || []);
        setAllBatches(batchesRes?.data || []);
      } catch (error) {
        console.error("Error fetching certificate data:", error);
      }
    })();

    dispatch(
      getStudentmanagement({
        branch_id: "90c93163-01cf-4f80-b88b-4bc5a5dd8ee4",
        page: 1,
      })
    );
  }, [dispatch]);

  useEffect(() => {
    if (Array.isArray(studentData)) setStudents(studentData);
  }, [studentData]);

  const formik = useFormik({
    initialValues: {
      title: editingCertificate?.title || "",
      course: editingCertificate?.course || "",
      branch: editingCertificate?.branch || "",
      batch: editingCertificate?.batch || "",
      student: editingCertificate?.student || "",
      title: editingCertificate?.title || "",
      course: editingCertificate?.course || "",
      branch: editingCertificate?.branch || "",
      batch: editingCertificate?.batch || "",
      student: editingCertificate?.student || "",
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        let payload: any;
        if (isEditing) {
          payload = {
            certificate_name: values.title,
            certificate_name: values.title,
            id: editingCertificate?.id,
            certificateid: editingCertificate?.uuid,
            description: editingCertificate?.description,
            description: editingCertificate?.description,
          };
          await updateCertificate(payload);
          fetchgetStudentCertificate();
        } else {
          payload = {
            batch_id: values.batch,
            branch_id: values.branch,
            course: values.course,
            student: values.student,
            institute_id: "973195c0-66ed-47c2-b098-d8989d3e4529",
          };
          await createCertificate(payload);
        }
        onSave?.(payload);
        onClose();
      } catch (error) {
        console.error("Error submitting form:", error);
        console.error("Error submitting form:", error);
      }
    },
  });

  // Fetch all required data
  useEffect(() => {
    (async () => {
      try {
        const [coursesRes, branchesRes, batchesRes] = await Promise.all([
          getCourseService({ branch: formik.values.branch }),
          getBranchService({}),
          getAllBatches({}),
        ]);
        setCourses(coursesRes?.data || []);
        setBranches(branchesRes?.data || []);
        setAllBatches(batchesRes?.data || []);
      } catch (error) {
        console.error("Error fetching certificate data:", error);
      }
    })();
    dispatch(
      getStudentmanagement({
        branch_id: "90c93163-01cf-4f80-b88b-4bc5a5dd8ee4",
        page: 1,
      })
    );
  }, [dispatch, formik.values.branch]);

  // Set students from redux
  useEffect(() => {
    if (Array.isArray(studentData)) setStudents(studentData);
  }, [studentData]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4 md:p-6">
      <div
        className="
          bg-white rounded-lg sm:rounded-xl md:rounded-2xl shadow-xl overflow-hidden
          w-full
          max-w-[calc(100%-1.5rem)] 
          xs:max-w-[90%] 
          sm:max-w-[500px] 
          md:max-w-[600px] 
          lg:max-w-[700px] 
          xl:max-w-[750px] 
          2xl:max-w-[800px]
          max-h-[92vh] sm:max-h-[90vh] md:max-h-[88vh]
          flex flex-col
        "
      >
        {/* Header */}
        <div className="
          flex items-center justify-between 
          px-4 sm:px-5 md:px-6 lg:px-7 xl:px-8
          py-3 sm:py-3.5 md:py-4 lg:py-4.5 xl:py-5
          border-b border-gray-200
        ">
          <h2 className="
            text-base sm:text-lg md:text-xl lg:text-2xl 
            font-semibold text-gray-800
            truncate pr-2
          ">
            {isEditing ? "Edit Certificate" : "Add Certificate"}
          </h2>
          <button
            onClick={onClose}
            className="
              bg-gray-900 text-white rounded-full 
              p-1.5 sm:p-1.5 md:p-2
              hover:bg-gray-700 transition-colors
              flex-shrink-0
            "
            aria-label="Close modal"
          >
            <HiMiniXMark className="h-4 w-4 sm:h-5 sm:w-5 md:h-5 md:w-5" />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={formik.handleSubmit}
          className="
            flex-1 overflow-y-auto
            px-4 sm:px-5 md:px-6 lg:px-7 xl:px-8
            py-4 sm:py-5 md:py-6
          "
        >
          <div className="space-y-4 sm:space-y-5 md:space-y-6">
            {/* Title / Course Field */}
            <div>
              <label className="
                block text-xs sm:text-sm md:text-base 
                font-medium text-gray-700 mb-1.5 sm:mb-2
              ">
                {isEditing ? "Certificate Title" : "Course"}
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="title"
                  className="
                    w-full border border-gray-300 rounded-md 
                    px-3 py-2 sm:px-3.5 sm:py-2.5 md:px-4 md:py-2.5
                    text-sm sm:text-base 
                    focus:ring-2 focus:ring-[#1BBFCA] focus:border-transparent focus:outline-none
                    transition-all
                  "
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  placeholder="Enter certificate title"
                />
              ) : (
                <select
                  name="course"
                  className="
                    w-full border border-gray-300 rounded-md 
                    px-3 py-2 sm:px-3.5 sm:py-2.5 md:px-4 md:py-2.5
                    text-sm sm:text-base 
                    focus:ring-2 focus:ring-[#1BBFCA] focus:border-transparent focus:outline-none
                    transition-all bg-white
                  "
                  value={formik.values.course}
                  onChange={formik.handleChange}
                >
                  <option value="">Select Course</option>
                  {courses.map((course) => (
                    <option key={course.uuid} value={course.uuid}>
                      {course.course_name}
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* Responsive Grid for Branch, Batch, Student */}
            {!isEditing && (
              <div className="
                grid 
                grid-cols-1 
                sm:grid-cols-2 
                lg:grid-cols-3 
                gap-4 sm:gap-4 md:gap-5 lg:gap-6
              ">
                {/* Branch */}
                <div className="w-full">
                  <label className="
                    block text-xs sm:text-sm md:text-base 
                    font-medium text-gray-700 mb-1.5 sm:mb-2
                  ">
                    Branch
                  </label>
                  <select
                    name="branch"
                    className="
                      w-full border border-gray-300 rounded-md 
                      px-3 py-2 sm:px-3.5 sm:py-2.5 md:px-4 md:py-2.5
                      text-sm sm:text-base 
                      focus:ring-2 focus:ring-[#1BBFCA] focus:border-transparent focus:outline-none
                      transition-all bg-white
                    "
                    value={formik.values.branch}
                    onChange={formik.handleChange}
                  >
                    <option value="">Select Branch</option>
                    {branches.map((branch) => (
                      <option key={branch._id} value={branch.uuid}>
                        {branch.branch_identity}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Batch */}
                <div className="w-full">
                  <label className="
                    block text-xs sm:text-sm md:text-base 
                    font-medium text-gray-700 mb-1.5 sm:mb-2
                  ">
                    Batch
                  </label>
                  <select
                    name="batch"
                    className="
                      w-full border border-gray-300 rounded-md 
                      px-3 py-2 sm:px-3.5 sm:py-2.5 md:px-4 md:py-2.5
                      text-sm sm:text-base 
                      focus:ring-2 focus:ring-[#1BBFCA] focus:border-transparent focus:outline-none
                      transition-all bg-white
                    "
                    value={formik.values.batch}
                    onChange={formik.handleChange}
                  >
                    <option value="">Select Batch</option>
                    {allBatches.map((batch) => (
                      <option key={batch._id} value={batch._id}>
                        {batch.batch_name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Student */}
                <div className="w-full sm:col-span-2 lg:col-span-1">
                  <label className="
                    block text-xs sm:text-sm md:text-base 
                    font-medium text-gray-700 mb-1.5 sm:mb-2
                  ">
                    Student
                  </label>
                  <select
                    name="student"
                    className="
                      w-full border border-gray-300 rounded-md 
                      px-3 py-2 sm:px-3.5 sm:py-2.5 md:px-4 md:py-2.5
                      text-sm sm:text-base 
                      focus:ring-2 focus:ring-[#1BBFCA] focus:border-transparent focus:outline-none
                      transition-all bg-white
                    "
                    value={formik.values.student}
                    onChange={formik.handleChange}
                  >
                    <option value="">Select Student</option>
                    {students.map((student) => (
                      <option key={student._id} value={student._id}>
                        {student.full_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Footer Buttons */}
          <div className="
            flex flex-col-reverse sm:flex-row justify-end 
            gap-3 sm:gap-3 md:gap-4 
            pt-5 sm:pt-6 md:pt-7 lg:pt-8
            mt-5 sm:mt-6 md:mt-7
            border-t border-gray-200
          ">
            <button
              type="button"
              onClick={onClose}
              className="
                bg-[#0400FF1A] text-[#0400FF] 
                px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-2.5
                rounded-lg 
                text-sm sm:text-base 
                font-medium 
                hover:bg-[#0400FF26] 
                transition-colors
                w-full sm:w-auto sm:min-w-[100px] md:min-w-[120px]
              "
            >
              Cancel
            </button>
            <button
              type="submit"
              className="
                bg-[#1BBFCA] text-white 
                px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-2.5
                rounded-lg 
                text-sm sm:text-base 
                font-medium 
                hover:bg-[#17aeb8] 
                transition-colors
                w-full sm:w-auto sm:min-w-[100px] md:min-w-[120px]
              "
            >
              {isEditing ? "Update" : "Submit"}
              {isEditing ? "Update" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};