"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { COLORS, FONTS } from "../../constants/uiConstants"

export default function Component() {
  const [periodOpen, setPeriodOpen] = useState(false)

  return (
    <div className="min-h-scree p-6" >
      <div className=" mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="relative">
            <input
			  style={{...FONTS.heading_06}}
              placeholder="Branch"
              className="w-96 border-2 p-2 rounded-full border-teal-400 focus:border-teal-500 focus:ring-teal-500"
            />
          </div>
          <div className="relative">
            <button
              onClick={() => setPeriodOpen(!periodOpen)}
              className="flex items-center justify-between w-44 px-4 py-2 text-white rounded-full"
        style={{ background: COLORS.button }}
            >
              <span>Choose Period</span>
              <ChevronDown className="h-4 w-4 ml-2" />
            </button>
            {periodOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => setPeriodOpen(false)}>
                  Monthly
                </div>
                <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => setPeriodOpen(false)}>
                  Quarterly
                </div>
                <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => setPeriodOpen(false)}>
                  Yearly
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
