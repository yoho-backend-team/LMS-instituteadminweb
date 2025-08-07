import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { downloadCertificate } from '../../components/cerificateManagement/certificateGenerator'
import { CertificateFilter } from '../../components/cerificateManagement/certificateFilter'
import { CertificateTable } from '../../components/cerificateManagement/certificateTable'
import { CertificateModal } from '../../components/cerificateManagement/certificateModal'
import { useDispatch, useSelector } from "react-redux"
import { getStudentCertificate } from "../../features/certificateManagement/reducers/thunks"
import { selectCertificate } from "../../features/certificateManagement/reducers/selectors"
import { GetImageUrl } from "../../utils/helper"
import { deleteCertificate } from "../../features/certificateManagement/services"

export interface Certificate {
  id: number
  uuid:string
  title: string
  description: string
  branch: string
  batch: string
  student: string
  email: string
   image?: string
}

const initialCertificates: Certificate[] = [
  {
    id: 1,
    uuid:'',
    title: "MERN STACK 2025",
    description: "The MERN Stack is a collection of Technologies for building web application",
    branch: "OMR",
    batch: "MERN 2025",
    student: "Suruthiga",
    email: "suruthi@gmail.com",
  },
  {
    id: 2,
    uuid:'',
    title: "Python 2024",
    description: "The Python Full Stack is a collection of Technologies for building web application",
    branch: "Padur",
    batch: "Python 2024",
    student: "Vigneshwari",
    email: "vikky@gmail.com",
  },
   {
    id: 3,
    uuid:'',
    title: "MEAN STACK 2025",
    description: "The MERN Stack is a collection of Technologies for building web application",
    branch: "OMR",
    batch: "MERN 2025",
    student: "Sowmiya",
    email: "somi@gmail.com",
  },
]

export const CertificateManager: React.FC = () => {
  const navigate = useNavigate()
  const dispatch= useDispatch<any>()
  const certificateData = useSelector(selectCertificate)

  const [certificates, setCertificates] = useState(initialCertificates)
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null)
  const [showFilter, setShowFilter] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState("")
  const [selectedBranch, setSelectedBranch] = useState("")
  const [selectedBatch, setSelectedBatch] = useState("")
  const [selectedStudent, setSelectedStudent] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editingCertificate, setEditingCertificate] = useState<Certificate | null>(null)

  const fetchgetStudentCertificate = async () =>{
  try{
     const params_data ={
      branchid:'90c93163-01cf-4f80-b88b-4bc5a5dd8ee4',
      InstituteId:'973195c0-66ed-47c2-b098-d8989d3e4529',
      page:1,
     };
     dispatch(getStudentCertificate (params_data))
  }
  catch(error){
console.log(error)
  }
}
  useEffect(()=>{
    fetchgetStudentCertificate()
  },[dispatch])
console.log(certificateData,'certificate management...................')

  const handleAdd = () => {
    setIsEditing(false)
    setEditingCertificate(null)
    setIsModalOpen(true)
  }

  const handleEdit = (cert: Certificate) => {
    setEditingCertificate(cert)
    setIsEditing(true)
    setIsModalOpen(true)
  }

  const handleView = (cert: Certificate) => {
    navigate("/certificate-view", { state: { certificate: cert } })
  }

  const handleDownload = async (cert: Certificate) => {
    setOpenDropdownId(null)
    await downloadCertificate(cert)
  }

  const handleDelete = async (certificateid:any) => {
    try {
      console.log(certificateid,'iddddddddddddddddddd')
      const data = {
      certificateid,
        InstituteId: "973195c0-66ed-47c2-b098-d8989d3e4529",
        branchid: "90c93163-01cf-4f80-b88b-4bc5a5dd8ee4",    
      };
      const result = await deleteCertificate(data);
      if (result) {
        fetchgetStudentCertificate(); 
      } else {
        console.error("Failed to delete certificate");
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const handleSave = (formData: Partial<Certificate>) => {
    if (isEditing && editingCertificate) {
      setCertificates(prev =>
        prev.map(item =>
          item.id === editingCertificate.id ? { ...item, title: formData.title || item.title } : item
        )
      )
    } else {
      const newCert: Certificate = {
        id: Date.now(),
        title: formData.title || "",
        description:
          (formData.title?.split(" ")[0] || "") +
          " Stack is a collection of Technologies for building web application",
        branch: formData.branch || "",
        batch: formData.batch || "",
        student: formData.student || "",
        email: formData.student?.toLowerCase().replace(" ", "") + "@example.com" || "",
      }
      setCertificates(prev => [...prev, newCert])
    }
    setIsModalOpen(false)
  }
  const filteredCertificates = certificateData?.data?.flatMap((cert: any) => 
    {
    if (!cert.student || !Array.isArray(cert.student)) return [];

    console.log(cert, 'cert')

    return cert.student.map((student: any) => {
      const fullName = student.full_name || `${student.first_name || ""} ${student.last_name || ""}`.trim();
      const email = student.email || "N/A";

      const mapped: Certificate = {
        id: cert.id,
        uuid: cert.uuid,
        title: cert?.certificate_name,
        description: cert?.description,
        branch: cert?.branch_id,
        batch: cert?.batch_id,
        student: fullName,
        email: email,
        image: cert?.student[0]?.image
      };

      const matchesFilter =
        (!selectedCourse || cert.description?.toLowerCase().includes(selectedCourse.toLowerCase())) &&
        (!selectedBranch || cert.branch_id === selectedBranch) &&
        (!selectedBatch || cert.batch_id === selectedBatch) &&
        (!selectedStudent || fullName.toLowerCase().includes(selectedStudent.toLowerCase()));

      return matchesFilter ? mapped : null;
    }).filter(Boolean);
  }) || [];



  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest(".dropdown-action")) {
        setOpenDropdownId(null)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="p-3">
      <CertificateFilter
        showFilter={showFilter}
        setShowFilter={setShowFilter}
        selectedCourse={selectedCourse}
        setSelectedCourse={setSelectedCourse}
        selectedBranch={selectedBranch}
        setSelectedBranch={setSelectedBranch}
        selectedBatch={selectedBatch}
        setSelectedBatch={setSelectedBatch}
        selectedStudent={selectedStudent}
        setSelectedStudent={setSelectedStudent}
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
      />

      <CertificateModal
        isOpen={isModalOpen}
        isEditing={isEditing}
        editingCertificate={editingCertificate}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />
    </div>
  )
}