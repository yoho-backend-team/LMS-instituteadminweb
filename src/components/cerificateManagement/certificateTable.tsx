import React from 'react'
import { BsThreeDotsVertical } from "react-icons/bs"
import { FaEye } from "react-icons/fa"
import { MdEditDocument, MdDelete } from "react-icons/md"
import { IoMdDownload } from "react-icons/io"

export interface Certificate {
  id: number
  title: string
  description: string
  branch: string
  batch: string
  student: string
  email: string
}

interface CertificateTableProps {
  certificates: Certificate[]
  openDropdownId: number | null
  setOpenDropdownId: (id: number | null) => void
  onEdit: (cert: Certificate) => void
  onView: (cert: Certificate) => void
  onDelete: (id: number) => void
  onDownload: (cert: Certificate) => void
}

export const CertificateTable: React.FC<CertificateTableProps> = ({
  certificates,
  openDropdownId,
  setOpenDropdownId,
  onEdit,
  onView,
  onDelete,
  onDownload
}) => {
  return (
    <div className="bg-white shadow-2xl p-4 mt-5 rounded-2xl">
      <div className="bg-white rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#F8F8F8] text-[#716F6F] text-lg h-15">
            <tr>
              <th className="px-6 py-4 text-left" >ID</th>
              <th className="px-6 py-4 text-left">User</th>
              <th className="px-6 py-4 text-left">Title</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {certificates.map((cert) => (
              <tr key={cert.id} className="text-[#716F6F]">
                <td className="px-6 py-4">{cert.id}</td>
                <td className="px-6 py-4 flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-[#1BBFCA] text-white flex items-center justify-center font-semibold">
                    
                  </div>
                  <div>
                    <div className="font-bold text-lg">{cert.student}</div>
                    <div className="text-sm">{cert.email}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="font-semibold text-lg">{cert.title}</div>
                  <div className="text-sm">{cert.description}</div>
                </td>
                <td className="px-6 py-4 text-right relative dropdown-action">
                  <button
                    onClick={() => setOpenDropdownId(openDropdownId === cert.id ? null : cert.id)}
                    className="p-2 text-[#1BBFCA] text-xl"
                  >
                    <BsThreeDotsVertical />
                  </button>
                  {openDropdownId === cert.id && (
                    <div className="fixed right-0 mt-2 w-40 gap-2 grid p-3 bg-white border rounded-lg shadow-lg z-10">
                      <button
                        className="w-full flex text-left hover:bg-[#1BBFCA] hover:text-white px-4 py-2 border rounded-md"
                        onClick={() => {
                          onEdit(cert)
                          setOpenDropdownId(null)
                        }}
                      >
                        <MdEditDocument className="mt-1 mr-2" />
                        Edit
                      </button>
                      <button
                        className="w-full flex text-left px-4 py-2 rounded-md border hover:bg-[#1BBFCA] hover:text-white"
                        onClick={() => onView(cert)}
                      >
                        <FaEye className="mt-1 mr-2" />
                        View
                      </button>
                      <button
                        className="w-full flex text-left px-4 py-2 rounded-md border hover:bg-[#1BBFCA] hover:text-white"
                        onClick={() => {
                          onDelete(cert.id)
                          setOpenDropdownId(null)
                        }}
                      >
                        <MdDelete className="mt-1 mr-2" />
                        Delete
                      </button>
                      <button
                        className="w-full flex text-left px-4 py-2 rounded-md border hover:bg-[#1BBFCA] hover:text-white"
                        onClick={() => onDownload(cert)}
                      >
                        <IoMdDownload className="mt-1 mr-2" />
                        Download
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
