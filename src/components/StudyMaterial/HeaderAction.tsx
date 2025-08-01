import type React from "react"
import { IoMdAdd } from "react-icons/io";

interface HeaderActionsProps {
  title: string
  onFilterToggle: () => void
  onAddClick: () => void
  filterIcon: string

  addButtonText?: string
  showFilter?: boolean
}

export const HeaderActions: React.FC<HeaderActionsProps> = ({
  title,
  onFilterToggle,
  onAddClick,
  filterIcon,

  addButtonText = "Add",
  showFilter = false,
}) => {
  return (
    <div className="space-y-6 text-[#716F6F]">
      <h1 className="text-3xl font-semibold text-[#3B3939">{title}</h1>
      <div className="flex items-center justify-between">
        <button
          onClick={onFilterToggle}
          className={`gap-2 flex items-center bg-[#1BBFCA] px-4 w-2/19 py-2 rounded-lg text-white text-md font-semibold shadow-md  ${
            showFilter ? "bg-[#1BBFCA]" : ""
          }`}
        >
          <img src={filterIcon || "/placeholder.svg"} alt="filter" className="h-5 w-5 text-white" />
          {showFilter? 'Hide Filter': 'Show Filter'} 
        </button>
        <button
          onClick={onAddClick}
          className="gap-2 flex items-center w-2/12 bg-[#1BBFCA] px-4 py-2 rounded-lg text-md font-semibold text-white shadow-md "
        >
          <IoMdAdd className=" h-8 w-6 text-lg text-white"/>
          {addButtonText}
        </button>
      </div>
    </div>
  )
}
