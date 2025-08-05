import React from "react";

interface ConfirmationModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  message,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-[300px] flex flex-col items-center gap-4">
        <img src="/assets/warning.png" alt="Warning" className="w-14 h-14" />
        <h3 className="font-bold text-lg text-[#716F6F] text-center">Confirm Action</h3>
        <p className="text-sm text-[#7D7D7D] text-center">{message}</p>
        <div className="flex gap-4 mt-4">
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-[#1BBFCA] text-white rounded-lg text-sm"
          >
            Yes, Confirm
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-[#1BBFCA] text-[#1BBFCA] rounded-lg text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
