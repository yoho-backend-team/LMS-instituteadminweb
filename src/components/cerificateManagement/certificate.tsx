import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { downloadCertificate } from '../../components/cerificateManagement/certificateGenerator'
import { CertificateFilter } from '../../components/cerificateManagement/certificateFilter'
import { CertificateTable } from '../../components/cerificateManagement/certificateTable'
import { CertificateModal } from '../../components/cerificateManagement/certificateModal'

export interface Certificate {
  id: number
  title: string
  description: string
  branch: string
  batch: string
  student: string
  email: string
}

const initialCertificates: Certificate[] = [
  {
    id: 1,
    title: "MERN STACK 2025",
    description: "The MERN Stack is a collection of Technologies for building web application",
    branch: "OMR",
    batch: "MERN 2025",
    student: "Suruthiga",
    email: "suruthi@gmail.com",
  },
  {
    id: 2,
    title: "Python 2024",
    description: "The Python Full Stack is a collection of Technologies for building web application",
    branch: "Padur",
    batch: "Python 2024",
    student: "Vigneshwari",
    email: "vikky@gmail.com",
  },
   {
    id: 3,
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

  const handleDelete = (id: number) => {
    setCertificates(prev => prev.filter(c => c.id !== id))
  }

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

  const filteredCertificates = certificates.filter(cert => {
    return (
      (!selectedCourse || cert.description.includes(selectedCourse)) &&
      (!selectedBranch || cert.branch === selectedBranch) &&
      (!selectedBatch || cert.batch === selectedBatch) &&
      (!selectedStudent || cert.student.toLowerCase().includes(selectedStudent.toLowerCase()))
    )
  })

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
        certificates={filteredCertificates}
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