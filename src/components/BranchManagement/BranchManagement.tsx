"use client";
import { Plus, MoreVertical, X, ArrowRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { ConfirmationPopup } from "../BranchManagement/ConfirmationPopup";
import { BranchDetailsPage } from "./BranchDetailsPage";
import TrichyImg from "../../assets/trichy.png";
import EditIcon from "../../assets/edit.png";
import DeleteIcon from "../../assets/delete.png";
import ViewIcon from "../../assets/vieweye.png";
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../app/store';
import { updateBranchStatus, deleteBranch, fetchBranches, createNewBranch } from '../../featuresbranch/branch/branchSlice';

interface Branch {
  id: string;
  imageSrc?: string;
  cityName: string;
  address: string;
  status: "Active" | "Inactive";
  phoneNumber: string;
  pinCode: string;
  city: string;
  state: string;
  alternateNumber?: string;
  landMark?: string;
}

// Sample branches data
const sampleBranches: Branch[] = [
  {
    id: "sample-1",
    cityName: "Chennai",
    address: "123 Mount Road, Chennai",
    status: "Active",
    phoneNumber: "9876543210",
    pinCode: "600001",
    city: "Chennai",
    state: "Tamil Nadu",
    imageSrc: TrichyImg,
    alternateNumber: "9876543211",
    landMark: "Near Spencer Plaza"
  },
  {
    id: "sample-2",
    cityName: "Coimbatore",
    address: "456 Gandhipuram, Coimbatore",
    status: "Active",
    phoneNumber: "8765432109",
    pinCode: "641001",
    city: "Coimbatore",
    state: "Tamil Nadu",
    imageSrc: TrichyImg,
    landMark: "Opposite to Bus Stand"
  },
  {
    id: "sample-3",
    cityName: "Madurai",
    address: "789 Temple Road, Madurai",
    status: "Inactive",
    phoneNumber: "7654321098",
    pinCode: "625001",
    city: "Madurai",
    state: "Tamil Nadu",
    imageSrc: TrichyImg,
    alternateNumber: "7654321099"
  }
];

interface LocationCardProps {
  id: string;
  imageSrc?: string;
  cityName: string;
  address: string;
  status: "Active" | "Inactive";
  onViewDetails: () => void;
  onEdit: () => void;
}

export function LocationCard({ 
  id,
  imageSrc, 
  cityName, 
  address, 
  status: initialStatus, 
  onViewDetails,
  onEdit,
}: LocationCardProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(initialStatus);
  const [hoveredButton, setHoveredButton] = useState<"view" | "edit" | "delete" | null>(null);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [pendingStatus, setPendingStatus] = useState<"Active" | "Inactive" | null>(null);
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
      // Only dispatch to Redux if it's not a sample branch
      if (!id.startsWith("sample-")) {
        dispatch(updateBranchStatus({ id, status: pendingStatus }));
      }
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
    // Only dispatch to Redux if it's not a sample branch
    if (!id.startsWith("sample-")) {
      dispatch(deleteBranch(id));
    }
    setShowDeleteConfirm(false);
    setShowSuccessPopup(true);
  };
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
      if (statusRef.current && !statusRef.current.contains(event.target as Node)) {
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
                  filter: hoveredButton === "view" 
                    ? "brightness(0) invert(1)" 
                    : "brightness(0) invert(44%) sepia(3%) saturate(675%) hue-rotate(314deg)"
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
                  filter: hoveredButton === "edit" 
                    ? "brightness(0) invert(1)" 
                    : "brightness(0) invert(44%) sepia(3%) saturate(675%) hue-rotate(314deg)"
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
                  filter: hoveredButton === "delete" 
                    ? "brightness(0) invert(1)" 
                    : "brightness(0) invert(44%) sepia(3%) saturate(675%) hue-rotate(314deg)"
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
            <h3 className="text-lg font-semibold capitalize text-[#716F6F]">{cityName}</h3>
            <p className="text-xs font-light capitalize text-[#7D7D7D]">{address}</p>
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
                      isStatusDropdownOpen ? 'rotate-270' : 'rotate-90'
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
                        ? 'bg-[#1BBFCA] text-white font-medium' 
                        : 'text-[#7D7D7D] hover:bg-gray-50'
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

export function LocationCardsGrid() {
  const dispatch = useDispatch<AppDispatch>();
  const { branches: reduxBranches, loading, error } = useSelector((state: RootState) => state.branch);

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewingBranch, setViewingBranch] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    branchName: '',
    phoneNumber: '',
    alternateNumber: '',
    address: '',
    pinCode: '',
    landMark: '',
    city: '',
    state: 'Tamil Nadu'
  });

  const instituteId = '973195c0-66ed-47c2-b098-d8989d3e4529';

  useEffect(() => {
    dispatch(fetchBranches({ instituteId }));
  }, [dispatch, instituteId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((currInput) => ({
      ...currInput,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.branchName.trim()) newErrors.branchName = "Branch name is required";
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.pinCode.trim()) newErrors.pinCode = "Pincode is required";
    if (!formData.city.trim()) newErrors.city = "City is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.trim());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const branchData = {
      cityName: formData.branchName,
      phoneNumber: formData.phoneNumber,
      alternateNumber: formData.alternateNumber,
      address: formData.address,
      pinCode: formData.pinCode,
      landMark: formData.landMark,
      city: formData.city,
      state: formData.state,
      imageSrc: TrichyImg
    };

    if (editingId) {
      // Handle update logic here if needed
    } else {
      dispatch(createNewBranch({ instituteId, branchData }));
    }

    setShowSuccessPopup(true);
    resetForm();
    setIsModalOpen(false);
  };

  const resetForm = () => {
    setFormData({
      branchName: '',
      phoneNumber: '',
      alternateNumber: '',
      address: '',
      pinCode: '',
      landMark: '',
      city: '',
      state: 'Tamil Nadu'
    });
    setEditingId(null);
    setErrors({});
  };

  const handleEdit = (branchId: string) => {
    const branch = reduxBranches.find(b => b.id === branchId);
    if (branch) {
      setFormData({
        branchName: branch.cityName,
        phoneNumber: branch.phoneNumber,
        alternateNumber: branch.alternateNumber || '',
        address: branch.address,
        pinCode: branch.pinCode,
        landMark: branch.landMark || '',
        city: branch.city,
        state: branch.state
      });
      setEditingId(branchId);
      setIsModalOpen(true);
    }
  };

  const filteredLocations = searchTerm
    ? reduxBranches.filter(location =>
        location.cityName.toLowerCase().includes(searchTerm.toLowerCase()))
    : reduxBranches;

  if (viewingBranch) {
    const branch = reduxBranches.find(b => b.cityName === viewingBranch);
    return (
      <BranchDetailsPage 
        locationName={viewingBranch} 
        onBack={() => setViewingBranch(null)}
        branchDetails={branch}
      />
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <form onSubmit={(e) => e.preventDefault()} className="w-full md:w-[360px] h-[48px] relative">
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-white/0 bg-white/30 border-2 border-[#1BBFCA] rounded-lg pointer-events-none"></div>
          <input
            type="text"
            placeholder="Search Branch by City"
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full h-full pl-4 pr-12 bg-transparent text-[#6C6C6C] font-poppins font-medium text-lg capitalize focus:outline-none relative z-10"
            aria-label="Search branches"
          />
        </form>

        <button 
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
          className="w-full md:w-[200px] h-[48px] bg-[#1BBFCA] rounded-lg flex items-center justify-center gap-2 px-4 hover:bg-[#15a9b4] transition-colors"
          aria-label="Add new branch"
        >
          <Plus className="w-6 h-6 text-white" />
          <span className="text-white font-poppins font-medium text-base capitalize">
            Add New Branch
          </span>
        </button>
      </div>

      {loading && (
        <div className="col-span-full text-center py-10">
          <p className="text-lg text-[#716F6F]">Loading branches...</p>
        </div>
      )}

      {error && (
        <div className="col-span-full text-center py-10 text-red-500">
          <p className="text-lg">Error: {error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
        {!loading && !error && filteredLocations.length > 0 ? (
          filteredLocations.map((location) => (
            <LocationCard 
              key={location.id}
              id={location.id}
              imageSrc={location.imageSrc}
              cityName={location.cityName}
              address={location.address}
              status={location.status}
              onViewDetails={() => setViewingBranch(location.cityName)}
              onEdit={() => handleEdit(location.id)}
            />
          ))
        ) : (
          !loading && !error && (
            <div className="col-span-full text-center py-10">
              <p className="text-lg text-[#716F6F]">
                {searchTerm 
                  ? `No branches found matching "${searchTerm}"` 
                  : "No branches available"}
              </p>
            </div>
          )
        )}
      </div>

      {isModalOpen && (
        <YourModalComponent 
          formData={formData}
          errors={errors}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          resetForm={resetForm}
          editingId={editingId}
          closeModal={() => setIsModalOpen(false)}
        />
      )}

      {showSuccessPopup && (
        <ConfirmationPopup 
          type="success" 
          message={editingId ? "Branch updated successfully!" : "Branch created successfully!"} 
          onClose={() => setShowSuccessPopup(false)}
        />
      )}
    </div>
  );
}