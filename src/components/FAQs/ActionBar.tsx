
import { Button } from "../../components/ui/button"
import { Plus, SlidersHorizontal } from "lucide-react"
import type { ReactNode } from "react"

interface FAQActionBarProps {
  showFilter: boolean
  onToggleFilter: () => void
  onAddFAQClick: () => void
}

export function FAQActionBar({ showFilter, onToggleFilter, onAddFAQClick }: FAQActionBarProps): ReactNode {
  return (
    <div className="flex justify-between items-center mb-6">
      <Button
        onClick={onToggleFilter}
        className="bg-cyan-500 text-white hover:bg-cyan-600 px-4 py-2 rounded-md flex items-center space-x-2"
      >
        <SlidersHorizontal className="w-4 h-4" />
        <span>{showFilter ? "Hide" : "Show Filter"}</span>
      </Button>
      <div className="flex gap-2">
        <Button
          className="bg-cyan-500 text-white hover:bg-cyan-600 px-4 py-2 rounded-md flex items-center space-x-2"
          onClick={onAddFAQClick}
        >
          <Plus className="w-4 h-4" />
          <span>Add FAQ</span>
        </Button>
      </div>
    </div>
  )
}
