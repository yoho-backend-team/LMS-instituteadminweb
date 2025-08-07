"use client";
import { Plus, X, MoreVertical, ArrowRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import TrichyImg from "../../assets/trichy.png";
import ViewIcon from "../../assets/vieweye.png";
import EditIcon from "../../assets/editicon.png";
import DeleteIcon from "../../assets/delete.png";
import { ConfirmationPopup } from "../../components/BranchManagement/ConfirmationPopup";

interface LocationCardProps {
  id: string;
  imageSrc?: string;
  cityName: string;
  address: string;
  status: "Active" | "Inactive";
  onViewDetails: () => void;
  onEdit: () => void;
  onStatusChange: (id: string, newStatus: "Active" | "Inactive") => void;
  onDelete: (id: string) => void;
}

export function LocationCard({
  id,
  imageSrc,
  cityName,
  address,
  status: initialStatus,
  onViewDetails,
  onEdit,
  onStatusChange,
  onDelete,
}: LocationCardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(initialStatus);
  const [hoveredButton, setHoveredButton] = useState<
    "view" | "edit" | "delete" | null
  >(null);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [pendingStatus, setPendingStatus] = useState<
    "Active" | "Inactive" | null
  >(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  const statusOptions: ("Active" | "Inactive")[] = ["Active", "Inactive"];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsStatusDropdownOpen(false);
  };

  const toggleStatusDropdown = () => {
    setIsStatusDropdownOpen(!isStatusDropdownOpen);
    setIsMenuOpen(false);
  };

  const requestStatusChange = (newStatus: "Active" | "Inactive") => {
    setPendingStatus(newStatus);
    setShowConfirmPopup(true);
  };

  const confirmStatusChange = () => {
    if (pendingStatus) {
      setCurrentStatus(pendingStatus);
      onStatusChange(id, pendingStatus);
      setShowConfirmPopup(false);
      setShowSuccessPopup(true);
      setPendingStatus(null);
    }
  };

  const handleDelete = () => {
    setShowDeleteConfirm(true);
    setIsMenuOpen(false);
  };

  const confirmDelete = () => {
    onDelete(id);
    setShowDeleteConfirm(false);
    setShowSuccessPopup(true);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
      if (
        statusRef.current &&
        !statusRef.current.contains(event.target as Node)
      ) {
        setIsStatusDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="flex flex-col items-end p-4 gap-2 w-full max-w-sm bg-white shadow-lg rounded-xl md:w-[410px] relative">
        <div className="w-full rounded-xl overflow-hidden relative h-48">
          <img
            src={imageSrc || TrichyImg}
            alt={cityName}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = TrichyImg;
            }}
          />
          <div className="absolute top-4 right-2">
            <button
              onClick={toggleMenu}
              className="flex justify-center items-center p-2 w-10 h-10 bg-white rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              <MoreVertical className="w-5 h-5 text-[#716F6F]" />
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div
            ref={menuRef}
            className="flex flex-col items-start p-3 gap-4 w-[170px] bg-white rounded-xl absolute right-4 top-16 shadow-lg z-20"
          >
            <button
              className={`flex items-center px-3 py-2 gap-2 w-full rounded-lg border ${
                hoveredButton === "view"
                  ? "bg-[#1BBFCA] border-transparent text-white"
                  : "border-[#716F6F] bg-white text-[#716F6F]"
              } transition-colors`}
              onClick={() => {
                setIsMenuOpen(false);
                onViewDetails();
              }}
              onMouseEnter={() => setHoveredButton("view")}
              onMouseLeave={() => setHoveredButton(null)}
              aria-label="View branch details"
            >
              <img
                src={ViewIcon}
                alt="View"
                className="w-5 h-5"
                style={{
                  filter:
                    hoveredButton === "view"
                      ? "brightness(0) invert(1)"
                      : "brightness(0) invert(44%) sepia(3%) saturate(675%) hue-rotate(314deg)",
                }}
              />
              <span className="font-[Poppins] text-[15px] font-medium leading-[22px]">
                View
              </span>
            </button>

            <button
              className={`flex items-center px-3 py-2 gap-2 w-full rounded-lg border ${
                hoveredButton === "edit"
                  ? "bg-[#1BBFCA] border-transparent text-white"
                  : "border-[#716F6F] bg-white text-[#716F6F]"
              } transition-colors`}
              onClick={() => {
                setIsMenuOpen(false);
                onEdit();
              }}
              onMouseEnter={() => setHoveredButton("edit")}
              onMouseLeave={() => setHoveredButton(null)}
              aria-label="Edit branch"
            >
              <img
                src={EditIcon}
                alt="Edit"
                className="w-5 h-5"
                style={{
                  filter:
                    hoveredButton === "edit"
                      ? "brightness(0) invert(1)"
                      : "brightness(0) invert(44%) sepia(3%) saturate(675%) hue-rotate(314deg)",
                }}
              />
              <span className="font-[Poppins] text-[15px] font-medium leading-[22px]">
                Edit
              </span>
            </button>

            <button
              className={`flex items-center px-3 py-2 gap-2 w-full rounded-lg border ${
                hoveredButton === "delete"
                  ? "bg-[#1BBFCA] border-transparent text-white"
                  : "border-[#716F6F] bg-white text-[#716F6F]"
              } transition-colors`}
              onClick={handleDelete}
              onMouseEnter={() => setHoveredButton("delete")}
              onMouseLeave={() => setHoveredButton(null)}
              aria-label="Delete branch"
            >
              <img
                src={DeleteIcon}
                alt="Delete"
                className="w-5 h-5"
                style={{
                  filter:
                    hoveredButton === "delete"
                      ? "brightness(0) invert(1)"
                      : "brightness(0) invert(44%) sepia(3%) saturate(675%) hue-rotate(314deg)",
                }}
              />
              <span className="font-[Poppins] text-[15px] font-medium leading-[22px]">
                Delete
              </span>
            </button>
          </div>
        )}

        <div className="flex flex-col items-start gap-4 w-full">
          <div className="flex flex-col items-start gap-3 w-full">
            <h3 className="text-lg font-semibold capitalize text-[#716F6F]">
              {cityName}
            </h3>
            <p className="text-xs font-light capitalize text-[#7D7D7D]">
              {address}
            </p>
          </div>

          <div className="relative" ref={statusRef}>
            <button
              onClick={toggleStatusDropdown}
              className={`flex justify-center items-center px-4 py-2 w-[111px] h-[40px] rounded-lg ${
                currentStatus === "Active" || currentStatus === "Inactive"
                  ? "bg-[#1BBFCA] text-white"
                  : "border border-[#716F6F] text-[#716F6F]"
              }`}
              aria-label="Change status"
              aria-expanded={isStatusDropdownOpen}
            >
              <div className="flex items-center gap-[10px]">
                <span className="text-xs font-medium capitalize font-poppins leading-[18px]">
                  {currentStatus}
                </span>
                <div className="w-5 h-5 flex items-center justify-center">
                  <ArrowRight
                    className={`w-full h-full transform ${
                      isStatusDropdownOpen ? "rotate-270" : "rotate-90"
                    } ${
                      currentStatus === "Active" || currentStatus === "Inactive"
                        ? "text-white"
                        : "text-[#716F6F]"
                    }`}
                  />
                </div>
              </div>
            </button>

            {isStatusDropdownOpen && (
              <div className="absolute z-10 mt-1 w-[111px] bg-white border border-[#716F6F] rounded-lg shadow-lg overflow-hidden">
                {statusOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => requestStatusChange(option)}
                    className={`w-full px-4 py-2 text-xs text-left capitalize font-poppins ${
                      currentStatus === option
                        ? "bg-[#1BBFCA] text-white font-medium"
                        : "text-[#7D7D7D] hover:bg-gray-50"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {showConfirmPopup && (
        <ConfirmationPopup
          type="confirm"
          message="Are you sure you want to change the status?"
          onConfirm={confirmStatusChange}
          onCancel={() => setShowConfirmPopup(false)}
          onClose={() => setShowConfirmPopup(false)}
        />
      )}

      {showDeleteConfirm && (
        <ConfirmationPopup
          type="confirm"
          message="Are you sure you want to delete this branch?"
          onConfirm={confirmDelete}
          onCancel={() => setShowDeleteConfirm(false)}
          onClose={() => setShowDeleteConfirm(false)}
        />
      )}

      {showSuccessPopup && (
        <ConfirmationPopup
          type="success"
          message="Operation completed successfully."
          onClose={() => setShowSuccessPopup(false)}
        />
      )}
    </>
  );
}