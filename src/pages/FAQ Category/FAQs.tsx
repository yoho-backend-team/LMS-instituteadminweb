"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Plus,
  ChevronDown,
  MoreVertical,
  SlidersHorizontal,
  TriangleAlert,
  CheckCircle,
  FileEdit,
  Trash2,
  X,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerClose } from "@/components/ui/drawer"

interface FAQItem {
  id: number
  name: string
  address: string
  status: string
  category: string
}

// Inlined AddFAQDrawer component
function AddFAQDrawer({
  open,
  onOpenChange,
  onSave,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (newFAQData: { title: string; description: string; category1: string; category2: string }) => void
}) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category1, setCategory1] = useState("")
  const [category2, setCategory2] = useState("")

  useEffect(() => {
    if (!open) {
      // Reset form when drawer closes
      setTitle("")
      setDescription("")
      setCategory1("")
      setCategory2("")
    }
  }, [open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({ title, description, category1, category2 })
    onOpenChange(false)
  }

  const handleCancel = () => {
    onOpenChange(false)
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction="right">
      <DrawerContent className="h-full w-full max-w-md ml-auto p-6 bg-white rounded-none shadow-lg border-l">
        <DrawerHeader className="flex items-left justify-between p-0 mb-6 relative">
          <DrawerTitle className="text-lg font-semibold">Add FAQ</DrawerTitle>
          <DrawerClose>
            <X className="w-5 h-5 bg-gray-500 text-white rounded-full p-0.5 hover:text-black absolute top-0 right-0" />
          </DrawerClose>
        </DrawerHeader>
        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          {/* Title */}
          <div className="flex flex-col">
            <Label htmlFor="faq-title">Title</Label>
            <Input id="faq-title" className="mt-1" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          {/* Description */}
          <div className="flex flex-col">
            <Label htmlFor="faq-description">Description</Label>
            <Textarea
              id="faq-description"
              className="mt-1"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          {/* Category 1 */}
          <div className="flex flex-col">
            <Label htmlFor="faq-category1">Category 1</Label>
            <Select value={category1} onValueChange={setCategory1}>
              <SelectTrigger id="faq-category1" className="mt-1 w-full">
                <SelectValue placeholder="Select category 1" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="General">General</SelectItem>
                <SelectItem value="Technical">Technical</SelectItem>
                <SelectItem value="Billing">Billing</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* Category 2 */}
          <div className="flex flex-col">
            <Label htmlFor="faq-category2">Category 2</Label>
            <Select value={category2} onValueChange={setCategory2}>
              <SelectTrigger id="faq-category2" className="mt-1 w-full">
                <SelectValue placeholder="Select category 2" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="Usage">Usage</SelectItem>
                <SelectItem value="Troubleshooting">Troubleshooting</SelectItem>
                <SelectItem value="Account">Account</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* Buttons */}
          <div className="flex justify-between mt-6">
            <Button
              type="button"
              onClick={handleCancel}
              variant="outline"
              className="border-cyan-500 text-cyan-500 hover:bg-cyan-50  bg-transparent"
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-cyan-500 hover:bg-cyan-600 text-white">
              Submit
            </Button>
          </div>
        </form>
      </DrawerContent>
    </Drawer>
  )
}

// Converted EditFAQDialog to Drawer
function EditFAQDialog({
  open,
  onOpenChange,
  faqToEdit,
  onSave,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  faqToEdit: { id: number; name: string; address: string } | null
  onSave: (id: number, updatedData: { name: string; address: string }) => void
}) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  useEffect(() => {
    if (faqToEdit) {
      setTitle(faqToEdit.name)
      setDescription(faqToEdit.address)
    } else {
      setTitle("")
      setDescription("")
    }
  }, [faqToEdit])

  const handleSubmit = () => {
    if (faqToEdit) {
      onSave(faqToEdit.id, { name: title, address: description })
      onOpenChange(false)
    }
  }

  const handleCancel = () => {
    onOpenChange(false)
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction="right">
      <DrawerContent className="h-full w-full max-w-md ml-auto p-6 bg-white rounded-none shadow-lg border-l">
        <DrawerHeader className="flex items-left justify-between p-0 mb-6 relative">
          <DrawerTitle className="text-lg font-semibold">Edit FAQ</DrawerTitle>
          <DrawerClose>
            <X className="w-5 h-5 bg-gray-500 text-white rounded-full p-0.5 hover:text-black absolute top-0 right-0" />
          </DrawerClose>
        </DrawerHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="edit-title">Title</Label>
            <Input id="edit-title" value={title} onChange={(e) => setTitle(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="edit-description">Description</Label>
            <Textarea
              id="edit-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-3 min-h-[100px]"
            />
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <Button
            variant="outline"
            className="border-cyan-500 text-cyan-500 hover:bg-cyan-50 hover:text-cyan-600 bg-transparent"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button className="bg-cyan-500 text-white hover:bg-cyan-600" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

// Converted ConfirmDialog to Drawer
function ConfirmDialog({
  open,
  onOpenChange,
  title,
  message,
  confirmButtonText,
  cancelButtonText,
  onConfirm,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  message: string
  confirmButtonText: string
  cancelButtonText: string
  onConfirm: () => void
}) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction="right">
      <DrawerContent className="h-full w-full max-w-md ml-auto p-6 bg-white rounded-none shadow-lg border-l">
        <DrawerHeader className="flex flex-col items-center gap-4">
          <TriangleAlert className="h-16 w-16 text-red-500 fill-red-500" />
          <DrawerTitle className="text-xl font-bold">{title}</DrawerTitle>
          <p className="text-gray-600">{message}</p>
        </DrawerHeader>
        <div className="flex justify-center gap-4 mt-6">
          <Button
            variant="outline"
            className="border-cyan-500 text-cyan-500 hover:bg-cyan-50 hover:text-cyan-600 bg-transparent px-6 py-2 rounded-md"
            onClick={() => onOpenChange(false)}
          >
            {cancelButtonText}
          </Button>
          <Button className="bg-green-500 text-white hover:bg-green-600 px-6 py-2 rounded-md" onClick={onConfirm}>
            {confirmButtonText}
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

// Converted SuccessDialog to Drawer
function SuccessDialog({
  open,
  onOpenChange,
  title,
  onOk,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  onOk: () => void
}) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction="right">
      <DrawerContent className="h-full w-full max-w-md ml-auto p-6 bg-white rounded-none shadow-lg border-l">
        <DrawerHeader className="flex flex-col items-center gap-4">
          <div className="flex items-center justify-center h-20 w-20 rounded-full bg-green-500">
            <CheckCircle className="h-12 w-12 text-white" />
          </div>
          <DrawerTitle className="text-xl font-bold">{title}</DrawerTitle>
        </DrawerHeader>
        <div className="flex justify-center mt-6">
          <Button className="bg-green-500 text-white hover:bg-green-600 px-6 py-2 rounded-md" onClick={onOk}>
            Ok
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default function Page() {
  const [showFilter, setShowFilter] = useState(false)
  const [isAddFAQDrawerOpen, setIsAddFAQDrawerOpen] = useState(false)
  const [isEditFAQModalOpen, setIsEditFAQModalOpen] = useState(false)
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const [currentFAQToEdit, setCurrentFAQToEdit] = useState<FAQItem | null>(null)
  const [faqToDeleteId, setFaqToDeleteId] = useState<number | null>(null)
  const [faqs, setFaqs] = useState<FAQItem[]>([
    {
      id: 1,
      name: "Chennai",
      address: "29/1, Second Floor, Sri Ambal Nagar Rd",
      status: "Active",
      category: "General, Usage", // Default category for existing item
    },
  ])

  const toggleFilter = () => {
    setShowFilter(!showFilter)
  }

  const handleAddFAQ = (newFAQData: { title: string; description: string; category1: string; category2: string }) => {
    const newId = faqs.length > 0 ? Math.max(...faqs.map((faq) => faq.id)) + 1 : 1
    const newFAQ: FAQItem = {
      id: newId,
      name: newFAQData.title,
      address: newFAQData.description, // Using description as address for display
      status: "Active", // Default status for new FAQs
      category: `${newFAQData.category1}, ${newFAQData.category2}`, // Combine categories for display
    }
    setFaqs((prevFaqs) => [...prevFaqs, newFAQ])
    setIsAddFAQDrawerOpen(false) // Close drawer after saving
  }

  const handleEditFAQ = (id: number, updatedData: { name: string; address: string }) => {
    setFaqs((prevFaqs) =>
      prevFaqs.map((faq) => (faq.id === id ? { ...faq, name: updatedData.name, address: updatedData.address } : faq)),
    )
    setIsEditFAQModalOpen(false) // Close drawer after saving
    setCurrentFAQToEdit(null) // Clear the editing state
  }

  const handleDeleteClick = (id: number) => {
    setFaqToDeleteId(id)
    setIsConfirmDeleteModalOpen(true)
  }

  const handleConfirmDelete = () => {
    if (faqToDeleteId !== null) {
      setFaqs((prevFaqs) => prevFaqs.filter((faq) => faq.id !== faqToDeleteId))
      setIsConfirmDeleteModalOpen(false)
      setFaqToDeleteId(null)
      setIsSuccessModalOpen(true) // Show success drawer after deletion
    }
  }

  const handleSuccessOk = () => {
    setIsSuccessModalOpen(false) // Close success drawer
  }

  const handleStatusChange = (id: number, newStatus: string) => {
    setFaqs((prevFaqs) => prevFaqs.map((faq) => (faq.id === id ? { ...faq, status: newStatus } : faq)))
  }

  return (
    <div className="p-6">
      {/* Main Content Area */}
      <h1 className="text-2xl font-bold mb-6">FAQ</h1>
      {/* Action Bar with "Show Filter" / "Hide" and "Add FAQ" buttons */}
      <div className="flex justify-between items-center mb-6">
        {/* "Show Filter" / "Hide" Button with teal background */}
        <Button
          onClick={toggleFilter}
          className="bg-cyan-500 text-white hover:bg-cyan-600 px-4 py-2 rounded-md flex items-center space-x-2"
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>{showFilter ? "Hide" : "Show Filter"}</span>
        </Button>
        <div className="flex gap-2">
          {/* "Add FAQ" Button */}
          <Button
            className="bg-cyan-500 text-white hover:bg-cyan-600 px-4 py-2 rounded-md flex items-center space-x-2"
            onClick={() => setIsAddFAQDrawerOpen(true)} // Open the Add FAQ drawer
          >
            <Plus className="w-4 h-4" />
            <span>Add FAQ</span>
          </Button>
        </div>
      </div>
      {/* Filter Content - Conditionally rendered */}
      {showFilter && (
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
      )}
      {/* FAQ List/Table structure */}
      <div className="max-w-6xl mx-auto bg-white rounded-lg p-6 shadow-gray-200 border bg-gray-40 shadow-md ">
        <div className="grid gap-4 shadow-gray-300 ">
          {/* Table Header Row with light gray background */}
          <div className="grid grid-cols-[0.5fr_2fr_1fr_1fr_0.5fr] gap-2 p-4 bg-gray-200 text-sm font-semibold text-gray-600 border-gray-400 rounded-lg shadow-gray">
            <div>ID</div>
            <div>FAQ Name</div>
            <div>Category</div>
            <div>Status</div>
            <div>Actions</div>
          </div>
          {/* Map over faqs state to render rows */}
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="grid grid-cols-[0.5fr_2fr_1fr_1fr_0.5fr] gap-4 p-4 items-center shadow-sm rounded-lg shadow-gray-300"
            >
              <div className="text-gray-700">{faq.id}</div>
              <div>
                <div className="font-semibold text-gray-800">{faq.name}</div>
                <div className="text-sm text-gray-500">{faq.address}</div>
              </div>
              <div className="text-gray-700">{faq.category}</div> {/* Category is now displayed */}
              {/* Status Dropdown */}
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-1 text-gray-700 hover:bg-gray-50">
                      <span>{faq.status}</span>
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="p-2 bg-white rounded-lg shadow-md flex flex-col gap-2">
                    <DropdownMenuItem
                      className="bg-cyan-500 text-white rounded-md px-4 py-2 text-center cursor-pointer hover:bg-cyan-600 focus:bg-cyan-600"
                      onClick={() => handleStatusChange(faq.id, "Active")}
                    >
                      Active
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="bg-cyan-500 text-white rounded-md px-4 py-2 text-center cursor-pointer hover:bg-cyan-600 focus:bg-cyan-600"
                      onClick={() => handleStatusChange(faq.id, "Inactive")}
                    >
                      Inactive
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              {/* Actions Kebab Menu */}
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-gray-700 hover:bg-gray-50">
                      <MoreVertical className="w-5 h-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => {
                        setCurrentFAQToEdit(faq)
                        setIsEditFAQModalOpen(true)
                      }}
                    >
                      <FileEdit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDeleteClick(faq.id)}>
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Add FAQ Drawer */}
      <AddFAQDrawer open={isAddFAQDrawerOpen} onOpenChange={setIsAddFAQDrawerOpen} onSave={handleAddFAQ} />
      {/* Edit FAQ Drawer */}
      {currentFAQToEdit && (
        <EditFAQDialog
          open={isEditFAQModalOpen}
          onOpenChange={setIsEditFAQModalOpen}
          faqToEdit={currentFAQToEdit}
          onSave={handleEditFAQ}
        />
      )}
      {/* Confirm Delete Drawer */}
      <ConfirmDialog
        open={isConfirmDeleteModalOpen}
        onOpenChange={setIsConfirmDeleteModalOpen}
        title="Confirm Action"
        message="Are you sure you want to delete this FAQ?"
        confirmButtonText="Yes, Delete"
        cancelButtonText="Cancel"
        onConfirm={handleConfirmDelete}
      />
      {/* Success Drawer */}
      <SuccessDialog
        open={isSuccessModalOpen}
        onOpenChange={setIsSuccessModalOpen}
        title="Success!"
        onOk={handleSuccessOk}
      />
    </div>
  )
}
