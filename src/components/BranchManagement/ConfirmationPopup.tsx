"use client";
import { X } from "lucide-react";
import WarnIcon from "../../assets/warning.png"; // Assuming you have a profit icon
import SuccessIcon from "../../assets/sucess.png"; // Assuming you have a profit icon


interface ConfirmationPopupProps {
  type: "confirm" | "success";
  message: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  onClose: () => void;
}

export const ConfirmationPopup = ({
  type,
  message,
  onConfirm,
  onCancel,
  onClose
}: ConfirmationPopupProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-xl p-6 w-[300px] flex flex-col items-center shadow-lg relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-black">
          <X size={20} />
        </button>

        {type === "confirm" ? (
         <img src={WarnIcon} alt="Warning" className="w-14 h-14 mb-4" />
        ) : (
          <img src={SuccessIcon} alt="Success" className="w-14 h-14 mb-4" />
        )}

        <h2 className="text-lg font-semibold text-[#444] mb-2">{type === "confirm" ? "Confirm Action" : "Success!"}</h2>
        <p className="text-sm text-center text-[#7D7D7D] mb-6">{message}</p>

        {type === "confirm" ? (
          <div className="flex gap-3">
            <button 
              onClick={onConfirm} 
              className="px-4 py-2 bg-[#1BBFCA] text-white rounded-md text-sm font-medium"
            >
              Yes, Status
            </button>
            <button 
              onClick={onCancel} 
              className="px-4 py-2 border border-[#1BBFCA] text-[#1BBFCA] rounded-md text-sm font-medium"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button 
            onClick={onClose} 
            className="px-6 py-2 bg-[#2CC84A] text-white rounded-md text-sm font-medium"
          >
            Ok
          </button>
        )}
      </div>
    </div>
  );
};
