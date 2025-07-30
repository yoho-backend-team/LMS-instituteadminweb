import type React from "react"
import { XMarkIcon } from "@heroicons/react/20/solid"

interface FormField {
  label: string
  key: string
  type: "input" | "select" | "password"
  options?: string[]
}

interface NoteModalProps {
  isOpen: boolean
  isEditing: boolean
  formData: Record<string, string>
  uploadedFile: File | null
  uploadIcon: string
  onClose: () => void
  onSubmit: () => void
  onFormChange: (key: string, value: string) => void
  onFileChange: (file: File | null) => void
  fields: FormField[]
}

export const NoteModal: React.FC<NoteModalProps> = ({
  isOpen,
  isEditing,
  formData,
  uploadedFile,
  uploadIcon,
  onClose,
  onSubmit,
  onFormChange,
  onFileChange,
  fields,
}) => {
  if (!isOpen) return null

  const filteredFields = isEditing
    ? fields.filter((field) => field.key === "title" || field.key === "description")
    : fields

  return (
    <div className="fixed inset-0 z-50 flex  items-center justify-end bg-black/30 backdrop-blur-md">
      <div className="bg-white rounded-xl h-[90vh] w-full max-w-md p-6 shadow-lg relative">
        <button className="absolute top-3 right-3 bg-black text-white rounded-full p-1" onClick={onClose}>
          <XMarkIcon className="h-5 w-5" />
        </button>

        <h2 className="text-2xl font-semibold text-gray-600 mb-4">{isEditing ? "Edit Note" : "Add Note"}</h2>

        
        <div
          className="border border-dashed border-gray-300 rounded-md text-center py-6 mb-4 cursor-pointer"
          onClick={() => document.getElementById("fileInput")?.click()}
        >
          <input
            id="fileInput"
            type="file"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0]
              onFileChange(file || null)
            }}
          />
          <p className="text-sm text-gray-500">
            <img src={uploadIcon || "/placeholder.svg"} alt="upload" className="mx-auto mb-2" />
            {uploadedFile ? uploadedFile.name : "Drop Files Here Or Click To Upload"}
          </p>
        </div>

     
        {filteredFields.map((field) => (
          <div key={field.key} className="mb-4">
            <label className="block mb-1 text-sm text-gray-600">{field.label}</label>
            {field.type === "select" ? (
              <select
                className="w-full border rounded-md px-3 py-2"
                
                onChange={(e) => onFormChange(field.key, e.target.value)}
              >
                <option value="">Select {field.label}</option>
                {field.options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                className="w-full border rounded-md px-3 py-2"
               
                onChange={(e) => onFormChange(field.key, e.target.value)}
              />
            )}
          </div>
        ))}

        <div className="mt-6 flex justify-end gap-4">
          <button onClick={onClose} className="border border-gray-300 bg-[#0400FF1A] text-[#0400FF] px-4 py-2 rounded-md">
            Cancel
          </button>
          <button onClick={onSubmit} className="bg-[#CA406F] text-white px-4 py-2 rounded-md">
            {isEditing ? "Update" : "Submit"}
          </button>
        </div>
      </div>
    </div>
  )
}
