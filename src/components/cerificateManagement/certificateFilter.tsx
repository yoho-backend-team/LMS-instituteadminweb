import React from 'react'
import { TbXboxXFilled } from "react-icons/tb"
import { FaFilter } from "react-icons/fa"
import { IoMdAdd } from "react-icons/io"
import {  FONTS } from '../../constants/uiConstants';

interface CertificateFilterProps {
  showFilter: boolean
  setShowFilter: (show: boolean) => void
  selectedCourse: string
  setSelectedCourse: (course: string) => void
  selectedBranch: string
  setSelectedBranch: (branch: string) => void
  selectedBatch: string
  setSelectedBatch: (batch: string) => void
  selectedStudent: string
  setSelectedStudent: (student: string) => void
  onAdd: () => void
}

export const CertificateFilter: React.FC<CertificateFilterProps> = ({
  showFilter,
  setShowFilter,
  selectedCourse,
  setSelectedCourse,
  selectedBranch,
  setSelectedBranch,
  selectedBatch,
  setSelectedBatch,
  selectedStudent,
  setSelectedStudent,
  onAdd
}) => {
  return (
    <>
      <div className="bg-[#1BBFCA] px-6 py-3 rounded-xl flex justify-between items-center">
        <h2 className="text-white text-lg font-semibold flex">
          <FaFilter className="mt-1 mr-2" style={{ ...FONTS.heading_06_bold }} /> FILTER
        </h2>
        <button onClick={() => setShowFilter(!showFilter)} className="bg-white w-10 h-10 p-1 rounded">
          {showFilter ? (
            <TbXboxXFilled className=" w-6 h-6 ml-1" />
          ) : (
            <span className="text-green-700 font-semibold">Go</span>
          )}
        </button>
      </div>

      {showFilter && (
        <div className="bg-white mt-5 rounded-xl p-4 shadow-md grid md:grid-cols-2 gap-3">
          <div>
            <label className="block text-lg font-medium text-[#716F6F] mb-1" style={{ ...FONTS.heading_08 }}>Course</label>
            <select
              className="w-full border h-13 px-3 py-2 rounded"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
               style={{ ...FONTS.heading_08 }}
            >
              
              <option value="">All</option>
              <option value="MERN">MERN</option>
              <option value="Python">Python</option>
            </select>
          </div>
          <div>
            <label className="block text-lg font-medium text-[#716F6F] mb-1" style={{ ...FONTS.heading_08 }}>Branch</label>
            <select
              className="w-full border h-13 px-3 py-2 rounded"
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              style={{ ...FONTS.heading_08 }}
            >
              <option value="">All</option>
              <option value="OMR">OMR</option>
              <option value="Padur">Padur</option>
            </select>
          </div>
          <div>
            <label className="block text-lg font-medium text-[#716F6F] mb-1" style={{ ...FONTS.heading_08 }}>Batch</label>
            <select
              className="w-full border h-13 px-3 py-2 rounded"
              value={selectedBatch}
              onChange={(e) => setSelectedBatch(e.target.value)}
               style={{ ...FONTS.heading_08 }}
            >
            
              <option value="">All</option>
              <option value="MERN 2025">MERN 2025</option>
              <option value="Python 2024">Python 2024</option>
            </select>
          </div>
          <div>
            <input
              type="text"
              className="w-full text-lg border mt-8 h-13 px-3 py-2 rounded"
              placeholder="Search Certificates"
              value={selectedStudent}
              onChange={(e) => setSelectedStudent(e.target.value)}
            />
          </div>
          <div className="flex my-4">
            <button
              onClick={onAdd}
              className="bg-[#1BBFCA] text-white px-4 py-2 w-2/5 flex rounded-lg"
            >
              <IoMdAdd className="pr-2 h-6 w-7" style={{ ...FONTS.heading_06_bold }} /> Add Student Certificate
            </button>
          </div>
        </div>
      )}
    </>
  )
}
