import type React from "react"
import cancel from '../../assets/icons/Cancel.png'

interface FormFieldOption {
  label: string;
  value: string;
}

interface FormField {
  label: string;
  key: string;
  type: "input" | "select";
  options?: FormFieldOption[];
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
    <div className="fixed inset-0 z-50 flex text-[#716F6F] items-center justify-end bg-black/30 backdrop-blur-md">
      <div className="bg-white rounded-xl h-[90vh] w-full max-w-md p-6 shadow-lg relative overflow-y-auto">
        <button className="absolute top-3 right-3 text-white rounded-full p-1" onClick={onClose}>
          <img src={cancel} alt="close" />
        </button>

        <h2 className="text-2xl font-semibold text-[#716F6F] mb-4">
          {isEditing ? "Edit Study Material" : "Add Study Material"}
        </h2>

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
              <div className="relative">
                <select
                  className="appearance-none w-full border border-gray-300 rounded-md px-3 py-2 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1BBFCA]"
                  value={formData[field.key] || ""}
                  onChange={(e) => onFormChange(field.key, e.target.value)}
                >
                   <option value="">Select {field.label}</option>
               {field.options?.map((option: any) => (
  <option key={option.value} value={option.value}>
  
    {option.label}
  </option>
))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            ) : (
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1BBFCA]"
                value={formData[field.key] || ""}
                onChange={(e) => onFormChange(field.key, e.target.value)}
              />
            )}
          </div>
        ))}

        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="border border-gray-300 bg-[#1BBFCA]/10 text-[#1BBFCA] px-4 py-2 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            className="bg-[#1BBFCA] text-white px-4 py-2 rounded-md"
          >
            {isEditing ? "Update" : "Submit"}
          </button>
        </div>
      </div>
    </div>
  )
}
