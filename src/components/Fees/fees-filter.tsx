"use client"
import type React from "react"

const FeesFilter: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow p-4 border-gray mb-6 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
        <div className="col-span-1 w-[33%]">
          <label className="block text-sm text-gray-700 mb-1">Search</label>
          <input
            type="text"
            placeholder="Search by Status"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Batches</label>
            <select className="w-full border border-gray-300 rounded-md px-3 py-2">
              <option>Select Batch</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Start Date</label>
            <input type="date" className="w-full border border-gray-300 rounded-md px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">End Date</label>
            <input type="date" className="w-full border border-gray-300 rounded-md px-3 py-2" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeesFilter
