/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { UpdateStatusFaq } from "../../features/Faq/service";

type StatusDropdownProps = {
  idx: number;
  initialStatus: string;
  options: string[];
  itemId: string; // This should be the FAQ's UUID
  onStatusChange?: () => void; // ✅ optional callback
};

export function StatusDropdown({
  initialStatus,
  options,
  itemId,
  onStatusChange,
}: StatusDropdownProps) {
  const [open, setOpen] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(initialStatus);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggle = () => setOpen((prev) => !prev);

  const handleSelect = async (option: string) => {
    setOpen(false);

    if (option === currentStatus) return;

    const previousStatus = currentStatus;
    setCurrentStatus(option); // optimistic UI update
    setError(null);

    try {
      setIsSaving(true);
      await UpdateStatusFaq({
        id: itemId,
        is_active: option === "Active",
      });

      // ✅ Call parent callback after successful update
      if (onStatusChange) onStatusChange();
    } catch (e: any) {
      console.error("Failed to update status", e);
      setCurrentStatus(previousStatus); // rollback
      setError(
        e?.response?.data?.message || "Failed to update status. Try again."
      );
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    setCurrentStatus(initialStatus);
  }, [initialStatus]);

  return (
    <div className="flex flex-col items-end">
      <div className="relative inline-block">
        <button
          onClick={toggle}
          className="px-3 py-2 rounded-xl text-white font-medium flex items-center gap-1 hover:opacity-90 transition-opacity duration-200"
          style={{ backgroundColor: "#1BBFCA" }}
          disabled={isSaving}
        >
          <span className="text-sm mr-1">
            {isSaving ? "Saving..." : currentStatus}
          </span>
          <ChevronDown
            className={`w-4 h-4 text-white transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>

        {open && (
          <>
            <div className="absolute top-full left-0 mt-2 bg-white border border-gray-300 rounded-xl shadow-lg z-10 min-w-[140px] p-3">
              <div className="space-y-2">
                {options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleSelect(option)}
                    className="w-full"
                    disabled={isSaving}
                  >
                    <span className="block px-4 py-2 rounded-xl text-black text-sm font-medium text-center border border-gray-300 hover:bg-[#1BBFCA] hover:text-white transition-colors duration-150">
                      {option}
                    </span>
                  </button>
                ))}
              </div>
            </div>
            <div className="fixed inset-0 z-0" onClick={() => setOpen(false)} />
          </>
        )}
      </div>

      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
