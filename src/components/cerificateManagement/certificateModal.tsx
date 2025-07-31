import React from 'react'
import { HiMiniXMark } from "react-icons/hi2";

export interface Certificate {
  id: number
  title: string
  description: string
  branch: string
  batch: string
  student: string
  email: string
}

interface CertificateModalProps {
  isOpen: boolean
  isEditing: boolean
  editingCertificate: Certificate | null
  onClose: () => void
  onSave: (formData: Partial<Certificate>) => void
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  isEditing,
  editingCertificate,
  onClose,
  onSave
}) => {
  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const formData = {
      title: (form.elements.namedItem("title") as HTMLInputElement).value,
      branch: (form.elements.namedItem("branch") as HTMLSelectElement)?.value,
      batch: (form.elements.namedItem("batch") as HTMLSelectElement)?.value,
      student: (form.elements.namedItem("student") as HTMLInputElement)?.value,
    }
    onSave(formData)
  }

  return (
    <div className="fixed inset-0 z-50 text-[#716F6F] flex items-center justify-end bg-black/30 backdrop-blur-md">
      <div className="w-full max-w-md h-[90vh] p-5 gap-5 rounded-lg flex flex-col shadow-xl bg-white overflow-hidden">
        <div className="flex">
          <h2 className="text-2xl text-[#716F6F] font-semibold mb-4">
            {isEditing ? "Edit Study Material" : "Add Certificate"}
          </h2>
          <button
            onClick={onClose}
            className="bg-black text-white rounded-full ml-auto p-1 h-6 w-6 hover:bg-gray-800"
          >
            <HiMiniXMark className="h-6 w-6 pb-2 pr-2" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-lg font-medium mb-1">Select Courses</label>
            <input
              name="title"
              className="w-full border h-13 px-3 py-2 rounded"
              placeholder="Enter Course"
              defaultValue={editingCertificate?.title || ""}
              required
            />
          </div>
          {!isEditing && (
            <>
              <div className="mb-4">
                <label className="block text-lg font-medium mb-1">Select Branch</label>
                <select name="branch" className="w-full border h-13 px-3 py-2 rounded" required>
                  <option value="">Select</option>
                  <option value="OMR">OMR</option>
                  <option value="Padur">Padur</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-lg font-medium mb-1">Batch</label>
                <select name="batch" className="w-full border h-13 px-3 py-2 rounded" required>
                  <option value="">Select</option>
                  <option value="January 2025">January 2025</option>
                  <option value="Aril 2025">April 2025</option>
                  <option value="October 2024">October 2024</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-lg font-medium mb-1">Student Name</label>
                <input
                  name="student"
                  className="w-full border h-13 px-3 py-2 rounded"
                  placeholder="Enter student name"
                  required
                />
              </div>
            </>
          )}
          <div className="flex justify-end gap-8 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="bg-[#0400FF1A] text-[#0400FF] px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
            <button type="submit" className="bg-[#1BBFCA] text-white px-4 py-2 rounded-lg">
              {isEditing ? "Update" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
