"use client"

import type React from "react"

interface SuccessModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
}

export const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose, title }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm mx-4">
        <div className="flex flex-col items-center text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">{title}</h3>
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-md bg-green-500 text-white hover:bg-green-600 transition-colors"
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  )
}
