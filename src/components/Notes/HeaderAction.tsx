import type React from "react"

interface HeaderActionsProps {
  title: string
  onFilterToggle: () => void
  onAddClick: () => void
  filterIcon: string
  addIcon: string
  addButtonText?: string
  showFilter?: boolean
}

export const HeaderActions: React.FC<HeaderActionsProps> = ({
  title,
  onFilterToggle,
  onAddClick,
  filterIcon,
  addIcon,
  addButtonText = "Add",
  showFilter = false,
}) => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-gray-500">{title}</h1>
      <div className="flex items-center justify-between">
        <button
          onClick={onFilterToggle}
          className={`gap-2 flex items-center bg-[#CA406F] px-4 py-2 rounded-lg text-white shadow-md  ${
            showFilter ? "bg-[#CA406F]" : ""
          }`}
        >
          <img src={filterIcon || "/placeholder.svg"} alt="filter" className="h-5 w-5" />
          {showFilter? 'Hide': 'Filter'} 
        </button>
        <button
          onClick={onAddClick}
          className="gap-2 flex items-center bg-[#CA406F] px-4 py-2 rounded-lg text-white shadow-md "
        >
          <img src={addIcon || "/placeholder.svg"} alt="add" className="h-5 w-5" />
          {addButtonText}
        </button>
      </div>
    </div>
  )
}
