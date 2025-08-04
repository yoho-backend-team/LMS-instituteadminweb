export const SuccessModal = ({ message, onClose }: { message: string; onClose: () => void }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-[300px] flex flex-col items-center gap-4">
        <img src="/assets/success-icon.png" alt="Success" className="w-14 h-14" />
        <h3 className="font-bold text-lg text-[#716F6F] text-center">Success!</h3>
        <p className="text-sm text-[#7D7D7D] text-center">{message}</p>
        <button
          onClick={onClose}
          className="px-6 py-2 bg-[#1BBFCA] text-white rounded-lg text-sm mt-2"
        >
          Ok
        </button>
      </div>
    </div>
  );
};
