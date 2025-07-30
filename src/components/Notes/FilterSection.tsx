import type React from "react"
import { ChevronDownIcon } from "@heroicons/react/20/solid"

interface FilterOption {
  label: string
  value: string
  options: string[]
}

interface FilterSectionProps {
  isVisible: boolean
  filters: FilterOption[]
  values: Record<string, string>
  onChange: (key: string, value: string) => void
}

export const FilterSection: React.FC<FilterSectionProps> = ({ isVisible, filters, values, onChange }) => {
  if (!isVisible) return null

  return (
    <div className="mt-4 bg-white p-6 rounded-xl shadow-2xl flex gap-6">
      {filters.map((filter) => (
        <div key={filter.value} className="flex flex-col w-full relative">
          <label className="text-md font-semibold text-gray-600">{filter.label}</label>
          <div className="relative">
            <select
              className="appearance-none border w-full rounded-md px-3 py-2 pr-10"
              value={values[filter.value] || ""}
              onChange={(e) => onChange(filter.value, e.target.value)}
            >
              <option value=""></option>
              <option value="">All</option>
              {filter.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>
        </div>
      ))}
    </div>
  )
}
