"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Plus, MoreVertical, X, Upload, Trash2, SlidersHorizontal, ChevronDown, FileEdit } from "lucide-react"
import { useState, useRef } from "react"
import  Image  from "../../../assets/web.png"
import  web  from "../../../assets/mern.png"



// Simulated image imports - replace with your actual imports
const webImage = "{Image}"
const mernImage = "{web}"

interface Category {
  id: string
  name: string
  image: string
  status: string
}

export default function Component() {
  const [showFilters, setShowFilters] = useState(false)
  const [showAddDrawer, setShowAddDrawer] = useState(false)
  const [showEditDrawer, setShowEditDrawer] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [activeStatusDropdown, setActiveStatusDropdown] = useState<string | null>(null)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)

  // Form states
  const [newCategoryName, setNewCategoryName] = useState("")
  const [newCategoryImage, setNewCategoryImage] = useState("")
  const [editCategoryName, setEditCategoryName] = useState("")
  const [editCategoryImage, setEditCategoryImage] = useState("")

  // File input refs
  const addFileInputRef = useRef<HTMLInputElement>(null)
  const editFileInputRef = useRef<HTMLInputElement>(null)

  // Categories state - initialized with your existing categories
  const [categories, setCategories] = useState<Category[]>([
    {
      id: "web-dev",
      name: "Mern",
      image: webImage,
      status: "",
    },
    {
      id: "mern-stack",
      name: "Mern",
      image: mernImage,
      status: "",
    },
  ])

  const toggleDropdown = (cardId: string) => {
    setActiveDropdown(activeDropdown === cardId ? null : cardId)
  }

  const toggleStatusDropdown = (cardId: string) => {
    setActiveStatusDropdown(activeStatusDropdown === cardId ? null : cardId)
  }

  const toggleFilter = () => {
    setShowFilters(!showFilters)
  }

  const handleStatusChange = (cardId: string, newStatus: string) => {
    setCategories((prev) => prev.map((cat) => (cat.id === cardId ? { ...cat, status: newStatus } : cat)))
    setActiveStatusDropdown(null)
  }

  const handleEdit = (categoryId: string) => {
    const categoryData = categories.find((cat) => cat.id === categoryId)
    if (categoryData) {
      setEditingCategory(categoryData)
      setEditCategoryName(categoryData.name)
      setEditCategoryImage(categoryData.image)
      setShowEditDrawer(true)
      setActiveDropdown(null)
    }
  }

  const handleDelete = (categoryId: string) => {
    setCategories((prev) => prev.filter((cat) => cat.id !== categoryId))
    setActiveDropdown(null)
  }

  // Handle image upload for add category
  const handleAddImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setNewCategoryImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle image upload for edit category
  const handleEditImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setEditCategoryImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // Add new category
   const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      const newCategory: Category = {
        id: `category-${Date.now()}`,
        name: newCategoryName.trim(),
        image: newCategoryImage || "/placeholder.svg?height=128&width=300&text=New+Category",
        status: "",
      }

      setCategories((prev) => [...prev, newCategory])

      // Reset form
      setNewCategoryName("")
      setNewCategoryImage("")
      setShowAddDrawer(false)

      // Reset file input
      if (addFileInputRef.current) {
        addFileInputRef.current.value = ""
      }
    }
  }
  // Save edited category
  const handleSaveEdit = () => {
    if (editingCategory && editCategoryName.trim()) {
      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === editingCategory.id
            ? {
                ...cat,
                name: editCategoryName.trim(),
                image: editCategoryImage,
              }
            : cat,
        ),
      )

      // Reset form and close drawer
      setEditingCategory(null)
      setEditCategoryName("")
      setEditCategoryImage("")
      setShowEditDrawer(false)

      // Reset file input
      if (editFileInputRef.current) {
        editFileInputRef.current.value = ""
      }
    }
  }

  return (
    <div className="">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-xl font-medium text-gray-800 mb-6">Admin User</h1>
        <div className="flex items-center justify-between">
          {/* "Show Filter" / "Hide" Button with teal background */}
          <Button
            onClick={toggleFilter}
            className="bg-cyan-500 text-white hover:bg-cyan-600 px-4 py-2 rounded-md flex items-center space-x-2"
          >
            <SlidersHorizontal className="w-6 h-6" />
            <span>{showFilters ? "Hide" : "Show Filter"}</span>
          </Button>
          <Button
            onClick={() => setShowAddDrawer(true)}
            className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-md flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add New Category
          </Button>
        </div>
      </div>

      {/* Filter Form */}
      {showFilters && (
        <div className="mb-6 space-y-4">
          {/* Search Input */}
          <div className="max-w-xs">
            <input
              type="text"
              placeholder="Search Categories"
              className="w-full px-3 py-2 border border-cyan-400 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
            />
          </div>
          {/* Filter Dropdowns */}
          <div className="p-4 bg-white rounded-lg shadow-lg border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Status</label>
                <Select>
                  <SelectTrigger className="w-full text-gray-300">
                    <SelectValue placeholder="Filter by Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="all">All</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Course</label>
                <Select>
                  <SelectTrigger className="w-full text-gray-300">
                    <SelectValue placeholder="Filter by Course" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="web-development">Web Development</SelectItem>
                    <SelectItem value="mern-stack">MERN Stack</SelectItem>
                    <SelectItem value="all">All Courses</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Category Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6  ">
        {categories.map((category) => (
          <div key={category.id} className="bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden p-2">
            <div className="relative h-32 ">
              <img
                src={Image}
                alt={`Background`}
                className="w-full h-full object-cover opacity-80 rounded-lg"
              />
              
            </div>
            <div className="p-4 ">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-cyan-500 font-medium">{category.name}</h4>
                <div className="relative">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="text-cyan-500 hover:text-gray-600 p-1  ">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEdit(category.id)}>
                        <FileEdit className="mr-2 h-4 w-4 " />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(category.id)}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Status</label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex items-center justify-between border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                    >
                      <span className="text-gray-700">{category.status}</span>
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="p-2 bg-white rounded-lg shadow-md flex flex-col gap-2">
                    <DropdownMenuItem
                      className="  text-gray-700 rounded-md px-4 py-2 text-center cursor-pointer hover:bg-cyan-500 hover:text-white hover:border-gray-500 focus:bg-cyan-500 focus:text-white border border-gray-300"
                      onClick={() => handleStatusChange(category.id, "Active")}
                    >
                      Active
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className=" text-gray-700 rounded-md px-4 py-2 text-center cursor-pointer hover:bg-cyan-500 hover:text-white hover:border-gray-500 focus:bg-cyan-500 focus:text-white border border-gray-300"
                      onClick={() => handleStatusChange(category.id, "Inactive")}
                    >
                      Inactive
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Category Drawer */}
      {showAddDrawer && (
        <>
          {/* Overlay */}
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setShowAddDrawer(false)} />
          {/* Drawer */}
          <div
            className={`fixed top-0 right-0 h-full w-96 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
              showAddDrawer ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="p-6 h-full flex flex-col">
              {/* Drawer Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-medium text-gray-800">Add Category</h2>
                  <p className="text-sm text-gray-500 mt-1">Create A New Course Category With An Image</p>
                </div>
                <button onClick={() => setShowAddDrawer(false)} className="text-gray-400 hover:text-gray-600 p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>
              {/* Form */}
              <div className="flex-1 space-y-6">
                {/* Image Preview */}
                {newCategoryImage && (
                  <div className="w-full h-40 bg-gray-200 rounded-lg overflow-hidden mb-4">
                    <img
                      src={newCategoryImage || "/placeholder.svg"}
                      alt="Category Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                {/* Category Name Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category Name</label>
                  <input
                    type="text"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                    placeholder="Enter category name"
                  />
                </div>
                {/* Upload Image Button */}
                <div>
                  <input
                    type="file"
                    ref={addFileInputRef}
                    onChange={handleAddImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <Button
                    onClick={() => addFileInputRef.current?.click()}
                    className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-md flex items-center gap-2 mb-2"
                  >
                    <Upload className="w-4 h-4" />
                    Upload Image
                  </Button>
                  <p className="text-xs text-gray-500">Recommended: 388x300 Pixels Accepted Formats: PNG, JPEG</p>
                </div>
              </div>
              {/* Drawer Footer */}
              <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200 ">
                <Button onClick={() => setShowAddDrawer(false)} variant="outline" className="px-4 py-2 text-cyan-300 bg-cyan-50  border-cyan-500">
                  Cancel
                </Button>
                <Button
                  onClick={handleAddCategory}
                  className="bg-cyan-600 hover:bg-cyan-600 text-white px-4 py-2"
                  disabled={!newCategoryName.trim()}
                >
                  Create Category
                </Button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Edit Category Drawer */}
      {showEditDrawer && (
        <>
          {/* Overlay */}
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setShowEditDrawer(false)} />
          {/* Drawer */}
          <div
            className={`fixed top-0 right-0 h-full w-96 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
              showEditDrawer ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="p-6 h-full flex flex-col">
              {/* Drawer Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-medium text-gray-800">Edit Category</h2>
                </div>
                <button onClick={() => setShowEditDrawer(false)} className="text-gray-400 hover:text-gray-600 p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>
              {/* Form */}
              <div className="flex-1 space-y-6">
                {/* Current Image Preview */}
                <div>
                  <div className="w-full h-40 bg-gray-200 rounded-lg flex items-center justify-center mb-4 overflow-hidden">
                    {editCategoryImage ? (
                      <img
                        src={editCategoryImage || "/placeholder.svg"}
                        alt="Category Image"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <div className="text-gray-400 text-center">
                        <div className="text-sm">Current Image</div>
                      </div>
                    )}
                  </div>
                  {/* Upload Image Button */}
                  <input
                    type="file"
                    ref={editFileInputRef}
                    onChange={handleEditImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <Button
                    onClick={() => editFileInputRef.current?.click()}
                    className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-md flex items-center gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    Upload Image
                  </Button>
                </div>
                {/* Category Name Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category Name</label>
                  <input
                    type="text"
                    value={editCategoryName}
                    onChange={(e) => setEditCategoryName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                  />
                </div>
              </div>
              {/* Drawer Footer */}
              <div className="flex items-center justify-end gap-3 pt-6 border-t border-cyan-500">
                <Button onClick={() => setShowEditDrawer(false)} variant="outline" className="px-4 py-2 text-cyan-300 bg-cyan-50 border-cyan-500">
                  Cancel
                </Button>
                <Button
                  onClick={handleSaveEdit}
                  className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2"
                  disabled={!editCategoryName.trim()}
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Click outside to close dropdowns */}
      {(activeDropdown || activeStatusDropdown) && (
        <div
          className="fixed inset-0 z-5"
          onClick={() => {
            setActiveDropdown(null)
            setActiveStatusDropdown(null)
          }}
        />
      )}
    </div>
  )
}
