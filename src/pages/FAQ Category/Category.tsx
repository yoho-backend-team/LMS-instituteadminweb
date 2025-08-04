"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Plus, ChevronDown, MoreVertical } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { FileEdit, Trash2, AlertTriangle, CheckCircle } from "lucide-react"
import { useState, useEffect } from "react"

// Define a type for FAQ Category for better type safety
interface FAQCategory {
  id: number
  name: string
  author: string // For new categories, this can be a default or user input
  status: string
  description?: string
}

// Component for the Add FAQ Category Dialog
function AddFAQCategoryDialog({
  onSave,
  onCancel,
}: {
  onSave: (newCategory: Omit<FAQCategory, "id" | "author" | "status">) => void // Omit id, author, status as they'll be set by parent
  onCancel: () => void
}) {
  const [categoryName, setCategoryName] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = () => {
    if (categoryName.trim() !== "") {
      onSave({ name: categoryName, description: description })
      setCategoryName("") // Clear form after submission
      setDescription("")
    }
  }

  const handleCancelClick = () => {
    setCategoryName("") // Clear form on cancel
    setDescription("")
    onCancel()
  }

  return (
    <DialogContent className="sm:max-w-[425px] p-6 rounded-lg fixed top-[500px] -translate-y-1/2 right-0 left-auto mr-4">
      <DialogHeader className="flex flex-row justify-between pb-4 border-gray-200">
        <DialogTitle className="text-xl font-semibold">Add FAQ Category</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid gap-2">
          <label htmlFor="category" className="text-sm font-medium text-gray-700">
            Category
          </label>
          <Input
            id="category"
            placeholder="Enter category name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="rounded-md border border-gray-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
          />
        </div>
        <div className="grid gap-2">
          <label htmlFor="description" className="text-sm font-medium text-gray-700">
            Description
          </label>
          <Textarea
            id="description"
            placeholder="Enter category description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="min-h-[100px] rounded-md border border-gray-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
          />
        </div>
      </div>
      <div className="flex justify-end gap-3 pt-4 ">
        <Button
          variant="outline"
          className="border-cyan-500 text-cyan-500 hover:bg-cyan-50 hover:text-cyan-600 rounded-md px-4 py-2 bg-transparent"
          onClick={handleCancelClick}
        >
          Cancel
        </Button>
        <Button className="bg-cyan-500 hover:bg-cyan-600 text-white rounded-md px-4 py-2 " onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </DialogContent>
  )
}

// Component for the Edit FAQ Category Dialog
function EditFAQCategoryDialog({
  category,
  onSave,
  onCancel,
}: {
  category: FAQCategory | null
  onSave: (updatedCategory: FAQCategory) => void
  onCancel: () => void
}) {
  const [title, setTitle] = useState(category?.name || "")
  const [description, setDescription] = useState(category?.description || "")

  // Update local state when category prop changes (e.g., when a new category is selected for editing)
  useEffect(() => {
    setTitle(category?.name || "")
    setDescription(category?.description || "")
  }, [category])

  const handleSubmit = () => {
    if (category) {
      onSave({ ...category, name: title, description: description })
    }
  }

  return (
    <DialogContent className="sm:max-w-[425px] p-6 rounded-lg fixed top-[500px] -translate-y-1/2 right-0 left-auto mr-4">
      <DialogHeader className="flex flex-row justify-between pb-4 ">
        <DialogTitle className="text-xl font-semibold">Edit FAQ Category</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid gap-2">
          <label htmlFor="title" className="text-sm font-medium text-gray-700">
            Title
          </label>
          <Input
            id="title"
            placeholder="Enter category title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="rounded-md border border-gray-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
          />
        </div>
        <div className="grid gap-2">
          <label htmlFor="description" className="text-sm font-medium text-gray-700">
            Description
          </label>
          <Textarea
            id="description"
            placeholder="Enter category description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="min-h-[100px] rounded-md border border-gray-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
          />
        </div>
      </div>
      <div className="flex justify-end gap-3 pt-4 ">
        <Button
          variant="outline"
          className="border-cyan-500 text-cyan-500 hover:bg-cyan-50 hover:text-cyan-600 rounded-md px-4 py-2 bg-transparent"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button className="bg-cyan-500 hover:bg-cyan-600 text-white rounded-md px-4 py-2 " onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </DialogContent>
  )
}

// Component for the Success Dialog
function SuccessDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[350px] p-6 rounded-lg shadow-lg text-center fixed top-1/2 -translate-y-1/2 right-0 left-auto mr-4">
        <DialogHeader className="flex flex-col items-center justify-center gap-4">
          <CheckCircle className="h-16 w-16 text-green-500" />
          <DialogTitle className="text-2xl font-bold">Success!</DialogTitle>
        </DialogHeader>
        <DialogFooter className="flex justify-center pt-4">
          <DialogClose asChild>
            <Button className="bg-green-500 hover:bg-green-600 text-white rounded-md px-6 py-2">Ok</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Component for the Confirm Delete Dialog
function ConfirmDeleteDialog({
  open,
  onOpenChange,
  onConfirm,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[350px] p-6 rounded-lg shadow-lg text-center fixed top-1/2 -translate-y-1/2 right-0 left-auto mr-4">
        <DialogHeader className="flex flex-col items-center justify-center gap-4 ">
          <AlertTriangle className="h-16 w-16 text-red-500 " />
          <DialogTitle className="text-xl font-bold">Confirm Action</DialogTitle>
          <DialogDescription className="text-gray-500">
            Are you sure you want to delete this category?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-center gap-3 pt-4 ">
          <DialogClose asChild>
            <Button
              variant="outline"
              className="border-cyan-500 text-cyan-500 hover:bg-cyan-50 hover:text-cyan-600 rounded-md px-4 py-2 bg-transparent"
            >
              Cancel
            </Button>
          </DialogClose>
          <Button className="bg-green-500 hover:bg-green-600 text-white rounded-md px-4 py-2" onClick={onConfirm}>
            Yes, Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default function FAQCategoryPage() {
  const [faqCategories, setFaqCategories] = useState<FAQCategory[]>([
    {
      id: 1,
      name: "Certificitate Issue",
      author: "Sara",
      status: "Active",
      description: "Details about certificate problems.",
    },
    {
      id: 2,
      name: "Login Issue",
      author: "Peater",
      status: "Active",
      description: "Information regarding login difficulties.",
    },
  ])
  const [showConfirmDeleteDialog, setShowConfirmDeleteDialog] = useState(false)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [categoryToDeleteId, setCategoryToDeleteId] = useState<number | null>(null)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [editingCategory, setEditingCategory] = useState<FAQCategory | null>(null)
  const [showAddDialog, setShowAddDialog] = useState(false) // State for Add FAQ Category dialog

  const handleStatusChange = (id: number, newStatus: string) => {
    setFaqCategories((prevCategories) =>
      prevCategories.map((category) => (category.id === id ? { ...category, status: newStatus } : category)),
    )
  }

  const handleDeleteClick = (id: number) => {
    setCategoryToDeleteId(id)
    setShowConfirmDeleteDialog(true)
  }

  const handleConfirmDelete = () => {
    if (categoryToDeleteId !== null) {
      setFaqCategories((prevCategories) => prevCategories.filter((category) => category.id !== categoryToDeleteId))
      console.log(`Category with ID ${categoryToDeleteId} deleted.`)
    }
    setShowConfirmDeleteDialog(false)
    setShowSuccessDialog(true)
  }

  const handleEditClick = (category: FAQCategory) => {
    setEditingCategory(category)
    setShowEditDialog(true)
  }

  const handleEditSave = (updatedCategory: FAQCategory) => {
    setFaqCategories((prevCategories) =>
      prevCategories.map((category) => (category.id === updatedCategory.id ? updatedCategory : category)),
    )
    setShowEditDialog(false)
    console.log("Category updated:", updatedCategory)
  }

  const handleEditCancel = () => {
    setShowEditDialog(false)
    setEditingCategory(null)
  }

  const handleAddSave = (newCategoryData: Omit<FAQCategory, "id" | "author" | "status">) => {
    const newId = faqCategories.length > 0 ? Math.max(...faqCategories.map((c) => c.id)) + 1 : 1
    const newCategory: FAQCategory = {
      id: newId,
      name: newCategoryData.name,
      description: newCategoryData.description,
      author: "New User", // Default author for new categories
      status: "Active", // Default status for new categories
    }
    setFaqCategories((prevCategories) => [...prevCategories, newCategory])
    setShowAddDialog(false) // Close the add dialog after saving
    console.log("New category added:", newCategory)
  }

  const handleAddCancel = () => {
    setShowAddDialog(false) // Close the add dialog
  }

  return (
    <div className=" mx-auto bg-white ">
      <h1 className="text-2xl font-bold mb-6">FAQ Category</h1>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 ">
        <Input
          placeholder="Search Category"
          className="max-w-sm w-full rounded-lg border-2 border-gray-200 focus:border-primary-teal focus:ring-0"
        />
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          {" "}
          {/* Control add dialog visibility */}
          <DialogTrigger asChild>
            <Button className="bg-cyan-500 hover:bg-cyan-600 text-white rounded-md px-4 py-2 flex items-center gap-2 ">
              <Plus className="w-4 h-4" />
              Add FAQ Category
            </Button>
          </DialogTrigger>
          <AddFAQCategoryDialog onSave={handleAddSave} onCancel={handleAddCancel} />
        </Dialog>
      </div>
      <div className="grid gap-4 border border-gray-200 rounded-lg p-4 shadow-gray-400 shadow-xl bg-gray-50 transition-all">
        <div className="grid grid-cols-[50px_1fr_120px_60px] sm:grid-cols-[50px_1fr_120px_60px] rounded-lg bg-gray-200 items-center px-4 py-3 text-sm font-medium text-gray-500 border border-gray-200 shadow-gray-50 ">
          <div>ID</div>
          <div>Category Name</div>
          <div>Status</div>
          <div className="text-right">Actions</div>
        </div>
        {faqCategories.map((category) => (
          <Card key={category.id} className="shadow-sm rounded-lg shadow-gray-200 shadow-sm">
            <CardContent className="p-4 grid grid-cols-[50px_1fr_120px_60px] sm:grid-cols-[50px_1fr_120px_60px] items-center gap-4 bg-shadow-lg">
              <div className="text-sm font-medium">{category.id}</div>
              <div>
                <div className="font-semibold">{category.name}</div>
                <div className="text-sm text-gray-500">{category.author}</div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:bg-gray-100 h-auto px-2 py-1"
                  >
                    {category.status}
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="p-2">
                  {" "}
                  {/* Added p-2 for padding around buttons */}
                  <DropdownMenuItem
                    className="w-full bg-cyan-500 text-white rounded-md px-4 py-2 hover:bg-cyan-600 focus:bg-cyan-600 data-[highlighted]:bg-cyan-600 data-[highlighted]:text-white mb-2 cursor-pointer"
                    onClick={() => handleStatusChange(category.id, "Active")}
                  >
                    Active
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="w-full bg-cyan-500 text-white rounded-md px-4 py-2 hover:bg-cyan-600 focus:bg-cyan-600 data-[highlighted]:bg-cyan-600 data-[highlighted]:text-white cursor-pointer"
                    onClick={() => handleStatusChange(category.id, "Inactive")}
                  >
                    Inactive
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <div className="flex justify-end">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                      <span className="sr-only">Actions</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-32">
                    {/* Edit Dialog Trigger */}
                    <DropdownMenuItem
                      className="flex items-center gap-2 cursor-pointer "
                      onSelect={(e) => {
                        e.preventDefault()
                        handleEditClick(category)
                      }}
                    >
                      <FileEdit className="h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    {/* Delete Dialog Trigger */}
                    <DropdownMenuItem
                      className="flex items-center gap-2 cursor-pointer text-red-600 focus:text-red-700"
                      onClick={() => handleDeleteClick(category.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* Dialogs controlled by state */}
      <ConfirmDeleteDialog
        open={showConfirmDeleteDialog}
        onOpenChange={setShowConfirmDeleteDialog}
        onConfirm={handleConfirmDelete}
      />
      <SuccessDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog} />
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        {editingCategory && (
          <EditFAQCategoryDialog category={editingCategory} onSave={handleEditSave} onCancel={handleEditCancel} />
        )}
      </Dialog>
    </div>
  )
}
