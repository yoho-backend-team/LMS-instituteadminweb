import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import { Plus, MoreVertical } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../components/ui/dropdown-menu"

export default function Category() {
  const categories = [
    {
      id: 1,
      name: "Certificitate Issue",
      subName: "Sara",
      status: "Active",
    },
    {
      id: 1, // Assuming this is a typo in the image and should be 2, but replicating as is.
      name: "Login Issue",
      subName: "Peater",
      status: "Active",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Header Bar */}
      <div className="h-16 bg-primary-teal flex items-center justify-end px-6">
        {/* Placeholder for user avatar/menu if needed, based on the original image's top right corner */}
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 rounded-full bg-white/20"></div>
          <div className="w-8 h-8 rounded-full bg-white/20"></div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">FAQ Category</h1>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <Input
            placeholder="Search Category"
            className="max-w-sm w-full rounded-lg border-2 border-gray-200 focus:border-primary-teal focus:ring-0"
          />
          <Button className="bg-primary-teal hover:bg-primary-teal/90 text-white rounded-lg px-6 py-2 flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add FAQ Category
          </Button>
        </div>

        <div className="grid gap-4">
          {/* Table Header */}
          <div className="grid grid-cols-[0.5fr_2fr_1fr_0.5fr] items-center px-6 py-3 text-sm font-medium text-gray-500 border-b border-gray-200">
            <div>ID</div>
            <div>Category Name</div>
            <div>Status</div>
            <div className="text-right">Actions</div>
          </div>

          {/* Category Rows */}
          {categories.map((category, index) => (
            <div
              key={index}
              className="grid grid-cols-[0.5fr_2fr_1fr_0.5fr] items-center bg-white rounded-xl shadow-sm p-6"
            >
              <div className="text-sm font-medium text-gray-700">{category.id}</div>
              <div className="flex flex-col">
                <div className="font-bold text-gray-800">{category.name}</div>
                <div className="text-sm text-gray-500">{category.subName}</div>
              </div>
              <div>
                <Select defaultValue={category.status.toLowerCase()}>
                  <SelectTrigger className="w-[120px] rounded-lg border-gray-200 text-gray-700">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreVertical className="h-4 w-4 text-gray-500" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
