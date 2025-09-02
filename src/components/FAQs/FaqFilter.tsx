import { Label } from "../..//components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"

export function FAQFilter() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div>
        <Label htmlFor="search-faqs" className="block text-sm font-medium text-gray-700 mb-1">
          Search FAQs
        </Label>
        <Select>
          <SelectTrigger id="search-faqs" className="w-full">
            <SelectValue placeholder="" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="faq1">FAQ 1: What is Vercel?</SelectItem>
            <SelectItem value="faq2">FAQ 2: How to deploy?</SelectItem>
            <SelectItem value="faq3">FAQ 3: Pricing details</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="filter-category" className="block text-sm font-medium text-gray-700 mb-1">
          Filter Category
        </Label>
        <Select>
          <SelectTrigger id="filter-category" className="w-full">
            <SelectValue placeholder="" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="category1">Category 1</SelectItem>
            <SelectItem value="category2">Category 2</SelectItem>
            <SelectItem value="category3">Category 3</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
