import React from 'react'
import { BsThreeDotsVertical } from "react-icons/bs"
import { FaEye } from "react-icons/fa"
import { MdEditDocument, MdDelete } from "react-icons/md"
import { IoMdDownload } from "react-icons/io"
import {  FONTS } from '../../constants/uiConstants';
import { GetImageUrl } from '../../utils/helper'

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
              <th className="px-6 py-4 text-left" style={{ ...FONTS.heading_05_bold}}>ID</th>
              <th className="px-6 py-4 text-left" style={{ ...FONTS.heading_05_bold}}>User</th>
              <th className="px-6 py-4 text-left" style={{ ...FONTS.heading_05_bold}}>Title</th>
              <th className="px-6 py-4 text-right" style={{ ...FONTS.heading_05_bold}}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {certificates.map((cert:any) => (
              <tr key={cert.id} className="text-[#716F6F]">
                <td className="px-6 py-4" style={{ ...FONTS.heading_08}}>{cert.id}</td>
                <td className="px-6 py-4 flex items-center gap-3">
                  <img src={GetImageUrl(cert.image) ?? undefined} alt={cert.student} className='w-10 h-10 rounded-full object-cover' />
                  <div>
                    <div className="font-bold text-lg" style={{ ...FONTS.heading_07_bold}}>{cert.student}</div>
                    <div className="text-sm" style={{ ...FONTS.heading_08}}>{cert.email}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="font-semibold text-lg" style={{ ...FONTS.heading_07_bold}}>{cert.title}</div>
                  <div className="text-sm" style={{ ...FONTS.heading_08}}>{cert.description}</div>
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
