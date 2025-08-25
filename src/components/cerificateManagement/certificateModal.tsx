import React, {  useEffect, useState } from 'react';
import { HiMiniXMark } from 'react-icons/hi2';
import { COLORS, FONTS } from '../../constants/uiConstants';
import {
  getBranchService,
  getCourseService,
} from '../../features/batchManagement/services';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import {
  createCertificate,
  getAllBatches,
  updateCertificate,
} from '../../features/certificateManagement/services';
import { getStudentmanagement } from '../../features/StudentManagement/reducer/thunks';
import { selectStudent } from '../../features/StudentManagement/reducer/selector';

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
  certificate_name:string
   branch_id:String
    institute_id:String
}

interface CertificateModalProps {
  isOpen: boolean;
  isEditing: boolean;
  fetchgetStudentCertificate:()=>void;
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

  // Fetch all required data
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
        console.error('Error fetching certificate data:', error);
      }
    })();
    dispatch(
      getStudentmanagement({
        branch_id: '90c93163-01cf-4f80-b88b-4bc5a5dd8ee4',
        page: 1,
      })
    );
  }, [dispatch]);

  // Set students from redux
  useEffect(() => {
    if (Array.isArray(studentData)) setStudents(studentData);
  }, [studentData]);

  // Formik setup
  const formik = useFormik({
    initialValues: {
      title: editingCertificate?.title || '',
      course: editingCertificate?.course || '',
      branch: editingCertificate?.branch || '',
      batch: editingCertificate?.batch || '',
      student: editingCertificate?.student || '',
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
            description: editingCertificate?.description
          };
          await updateCertificate(payload);
          fetchgetStudentCertificate();
        } else {
          payload = {
            batch_id: values.batch,
            branch_id: values.branch,
            course: values.course,
            student: values.student,
            institute_id: '973195c0-66ed-47c2-b098-d8989d3e4529',
          };
          await createCertificate(payload);
        }
        onSave(payload);
        onClose();
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    },
  });

  if (!isOpen) return null;

  console.log(editingCertificate, 'certif')

  return (
    <div className="fixed inset-0 z-50 text-[#716F6F] flex items-center justify-end bg-black/30 backdrop-blur-md">
      <div className="w-full max-w-md h-[90vh] p-5 gap-5 rounded-lg flex flex-col shadow-xl bg-white overflow-hidden">
        <div className="flex" style={{ ...FONTS.heading_05_bold }}>
          <h2 className="text-2xl text-[#716F6F] font-semibold mb-4">
            {isEditing ? 'Edit Certificate' : 'Add Certificate'}
          </h2>
          <button
            onClick={onClose}
            className="bg-black text-white rounded-full ml-auto p-1 h-6 w-6 hover:bg-gray-800"
          >
            <HiMiniXMark className="h-6 w-6 pb-2 pr-2" />
          </button>
        </div>

        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 overflow-auto">
          {/* Conditional: Title for editing, Course for creating */}
          {isEditing ? (
            <div>
              <label style={{ ...FONTS.heading_07, color: COLORS.gray_dark_02 }}>
                Certificate Title
              </label>
              <input
                type="text"
                name="title"
                className="w-full border rounded-md px-4 py-2"
                value={formik.values.title}
                onChange={formik.handleChange}
                placeholder="Enter certificate title"
              />
            </div>
          ) : (
            <div>
              <label style={{ ...FONTS.heading_07, color: COLORS.gray_dark_02 }}>
                Course
              </label>
              <select
                name="course"
                className="w-full border rounded-md px-4 py-2"
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
            </div>
          )}

          {!isEditing && (
            <>
              <div>
                <label style={{ ...FONTS.heading_07, color: COLORS.gray_dark_02 }}>
                  Branch
                </label>
                <select
                  name="branch"
                  className="w-full border rounded-md px-4 py-2"
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

              <div>
                <label style={{ ...FONTS.heading_07, color: COLORS.gray_dark_02 }}>
                  Batch
                </label>
                <select
                  name="batch"
                  className="w-full border rounded-md px-4 py-2"
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

              <div>
                <label style={{ ...FONTS.heading_07, color: COLORS.gray_dark_02 }}>
                  Student
                </label>
                <select
                  name="student"
                  className="w-full border rounded-md px-4 py-2"
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
            </>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="bg-[#0400FF1A] text-[#0400FF] px-4 py-2 rounded-lg"
              style={{ ...FONTS.heading_08 }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#1BBFCA] text-white px-4 py-2 rounded-lg"
              style={{ ...FONTS.heading_08 }}
            >
              {isEditing ? 'Update' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
