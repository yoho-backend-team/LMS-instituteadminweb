import React, { useEffect, useState } from "react";
import { HiMiniXMark } from "react-icons/hi2";
import { COLORS, FONTS } from "../../constants/uiConstants";
import {
  getBranchService,
  getCourseService,
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
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        let payload;
        if (isEditing) {
          payload = {
            certificate_name: values.title,
            id: editingCertificate?.id,
            certificateid: editingCertificate?.uuid,
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
        onSave(payload);
        onClose();
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
      <div
        className="
          bg-white rounded-2xl shadow-xl overflow-hidden
          w-[95%] sm:w-[85%] md:w-[70%] lg:w-[55%] xl:w-[45%] 2xl:w-[40%]
          max-h-[90vh] flex flex-col
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
            {isEditing ? "Edit Certificate" : "Add Certificate"}
          </h2>
          <button
            onClick={onClose}
            className="bg-gray-900 text-white rounded-full p-1 hover:bg-gray-700"
          >
            <HiMiniXMark className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={formik.handleSubmit}
          className="flex-1 overflow-y-auto px-6 py-5 space-y-6"
        >
          {/* Title / Course */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {isEditing ? "Certificate Title" : "Course"}
            </label>
            {isEditing ? (
              <input
                type="text"
                name="title"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#1BBFCA] focus:outline-none"
                value={formik.values.title}
                onChange={formik.handleChange}
              />
            ) : (
              <select
                name="course"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#1BBFCA] focus:outline-none"
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

          {/* Responsive Grid */}
          {!isEditing && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {/* Branch */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Branch
                </label>
                <select
                  name="branch"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#1BBFCA] focus:outline-none"
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Batch
                </label>
                <select
                  name="batch"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#1BBFCA] focus:outline-none"
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Student
                </label>
                <select
                  name="student"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#1BBFCA] focus:outline-none"
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

          {/* Footer */}
          <div className="flex justify-end gap-4 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="bg-[#0400FF1A] text-[#0400FF] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#0400FF26]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#1BBFCA] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#17aeb8]"
            >
              {isEditing ? "Update" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
