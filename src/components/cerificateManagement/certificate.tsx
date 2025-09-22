/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { downloadCertificate } from "../../components/cerificateManagement/certificateGenerator";
import { CertificateFilter } from "../../components/cerificateManagement/certificateFilter";
import { CertificateTable } from "../../components/cerificateManagement/certificateTable";
import { CertificateModal } from "../../components/cerificateManagement/certificateModal";
import { useDispatch, useSelector } from "react-redux";
import { getStudentCertificate } from "../../features/certificateManagement/reducers/thunks";
import {
  selectCertificate,
  selectLoading,
} from "../../features/certificateManagement/reducers/selectors";
import { deleteCertificate } from "../../features/certificateManagement/services";
import { GetLocalStorage } from "../../utils/localStorage";

export interface Certificate {
  id: number;
  uuid: string;
  title: string;
  description: string;
  branch: string;
  batch: string;
  student: string;
  email: string;
  image?: string;
}

export const CertificateManager: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const certificateData = useSelector(selectCertificate);
  const loading = useSelector(selectLoading);
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const [showFilter, setShowFilter] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [courseFilter, setCourseFilter] = useState('')
  const [selectedBranch, setSelectedBranch] = useState("");
  const [branchFilter, setBranchFilter] = useState('')
  const [selectedBatch, setSelectedBatch] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingCertificate, setEditingCertificate] =
    useState<Certificate | null>(null);
  const [searchTerm, setSearchTerm] = useState('')

  // ✅ Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Fetch data
  const fetchgetStudentCertificate = async (page = 1) => {
    try {
      const params_data = {
        branchid: GetLocalStorage("selectedBranchId"),
        InstituteId: GetLocalStorage("instituteId"),
        page,
        limit: pageSize,
      };
      dispatch(getStudentCertificate(params_data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchgetStudentCertificate(currentPage);
  }, [dispatch, currentPage]);

  // ✅ Pagination functions
  const totalRecords = certificateData?.count || 0;
  const totalPages = Math.ceil(totalRecords / pageSize);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  // ============ Actions ===============
  const handleAdd = () => {
    setIsEditing(false);
    setEditingCertificate(null);
    setIsModalOpen(true);
  };

  const handleEdit = (cert: Certificate) => {
    setEditingCertificate(cert);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleView = (cert: Certificate) => {
    navigate("/certificate-view", { state: { certificate: cert } });
  };

  const handleDownload = async (cert: Certificate) => {
    setOpenDropdownId(null);
    await downloadCertificate(cert);
  };

  const handleDelete = async (certificateid: any) => {
    try {
      const data = { certificateid };
      const result = await deleteCertificate(data);
      if (result) {
        fetchgetStudentCertificate(currentPage);
      } else {
        console.error("Failed to delete certificate");
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const handleSave = () => {
    setIsModalOpen(false);
    fetchgetStudentCertificate(currentPage);
  };

 const filteredCertificates =
  certificateData?.data
    ?.filter((cert: any) => {
      if (branchFilter && cert.branch_id !== branchFilter) return false;
      if (courseFilter && cert.course !== courseFilter) return false;
      if (
        searchTerm &&
        !cert.certificate_name?.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false;
      }

      return true;
    })
    ?.flatMap((cert: any) => {
      if (!cert.student || !Array.isArray(cert.student)) return [];

      return cert.student
        .map((student: any) => {
          const fullName =
            student.full_name ||
            `${student.first_name || ""} ${student.last_name || ""}`.trim();
          const email = student.email || "N/A";

          return {
            id: cert.id,
            uuid: cert.uuid,
            title: cert?.certificate_name,
            description: cert?.description,
            branch: cert?.branch_id,
            course: cert?.course,
            batch: cert?.batch_id,
            student: fullName,
            email,
            image: student?.image,
          };
        })
        .filter(Boolean);
    }) || [];


  return (
    <div className="p-3">
     
      <CertificateFilter
        showFilter={showFilter}
        setShowFilter={setShowFilter}
        selectedCourse={selectedCourse}
        setSelectedCourse={setSelectedCourse}
        selectedBranch={selectedBranch}
        setCourseFilter={setCourseFilter}
        setBranchFilter={setBranchFilter}
        setSelectedBranch={setSelectedBranch}
        selectedBatch={selectedBatch}
        setSelectedBatch={setSelectedBatch}
        selectedStudent={selectedStudent}
        setSelectedStudent={setSelectedStudent}
        setSearchTerm={setSearchTerm}
        searchTerm={searchTerm}
        onAdd={handleAdd}
      />

     
      <CertificateTable
        certificates={filteredCertificates || []}
        openDropdownId={openDropdownId}
        setOpenDropdownId={setOpenDropdownId}
        onEdit={handleEdit}
        onView={handleView}
        onDelete={handleDelete}
        onDownload={handleDownload}
        loading={loading}
      />

      <div className="flex items-center justify-center gap-2 mt-4">
        <button
          className="px-3 py-1 border rounded disabled:opacity-50"
          onClick={handlePrev}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            className={`px-3 py-1 border rounded ${
              page === currentPage ? "bg-blue-500 text-white" : ""
            }`}
            onClick={() => handlePageClick(page)}
          >
            {page}
          </button>
        ))}

        <button
          className="px-3 py-1 border rounded disabled:opacity-50"
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {/* Modal */}
      <CertificateModal
        isOpen={isModalOpen}
        isEditing={isEditing}
        editingCertificate={editingCertificate}
        onSave={handleSave}
      />
    </div>
  );
};
