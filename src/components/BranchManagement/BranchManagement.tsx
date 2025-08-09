"use client";
import { Plus, MoreVertical, X, ArrowRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { ConfirmationPopup } from "../BranchManagement/ConfirmationPopup";
import { BranchDetailsPage } from "./BranchDetailsPage";
import TrichyImg from "../../assets/trichy.png";
import EditIcon from "../../assets/edit.png";
import DeleteIcon from "../../assets/delete.png";
import ViewIcon from "../../assets/vieweye.png";
import ContentLoader from "react-content-loader";

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
              className={`flex items-center px-3 py-2 gap-2 w-full rounded-lg border ${hoveredButton === "view"
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
              className={`flex items-center px-3 py-2 gap-2 w-full rounded-lg border ${hoveredButton === "edit"
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
              className={`flex items-center px-3 py-2 gap-2 w-full rounded-lg border ${hoveredButton === "delete"
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
              className={`flex justify-center items-center px-4 py-2 w-[111px] h-[40px] rounded-lg ${currentStatus === "Active" || currentStatus === "Inactive"
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
                    className={`w-full h-full transform ${isStatusDropdownOpen ? "rotate-270" : "rotate-90"
                      } ${currentStatus === "Active" || currentStatus === "Inactive"
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
                    className={`w-full px-4 py-2 text-xs text-left capitalize font-poppins ${currentStatus === option
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

interface Branch {
  id: string;
  cityName: string;
  address: string;
  status: "Active" | "Inactive";
  phoneNumber: string;
  alternateNumber?: string;
  pinCode: string;
  landMark?: string;
  city: string;
  state: string;
  imageSrc?: string;
}

export function LocationCardsGrid() {
  // Mock data instead of Redux state
  const [branches, setBranches] = useState<Branch[]>([
    {
      id: "1",
      cityName: "Trichy",
      address: "123 Main St, Trichy",
      status: "Active",
      phoneNumber: "9876543210",
      pinCode: "620001",
      city: "Trichy",
      state: "Tamil Nadu",
      imageSrc: TrichyImg,
    },
    {
      id: "2",
      cityName: "Chennai",
      address: "456 Park Ave, Chennai",
      status: "Active",
      phoneNumber: "8765432109",
      pinCode: "600001",
      city: "Chennai",
      state: "Tamil Nadu",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewingBranch, setViewingBranch] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [isLoad, setisLoad] = useState(true);

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

  useEffect(() => {
    setInterval(() => {
      setisLoad(false)
    }, 1500);
  }, [])

  // Filter locations based on search term
  // const filteredLocations = searchTerm
  //   ? locations.filter(location =>
  //     location.cityName.toLowerCase().includes(searchTerm.toLowerCase())
  //   )
  //   : locations;
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((currInput) => ({
      ...currInput,
      [name]: value,
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.branchName.trim())
      newErrors.branchName = "Branch name is required";
    if (!formData.phoneNumber.trim())
      newErrors.phoneNumber = "Phone number is required";
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
      id: editingId || Date.now().toString(),
      cityName: formData.branchName,
      phoneNumber: formData.phoneNumber,
      alternateNumber: formData.alternateNumber,
      address: formData.address,
      pinCode: formData.pinCode,
      landMark: formData.landMark,
      city: formData.city,
      state: formData.state,
      status: "Active",
      imageSrc: TrichyImg,
    };

    if (editingId) {
      // Update existing branch
      setBranches(branches.map((b) => (b.id === editingId ? branchData : b)));
    } else {
      // Add new branch
      setBranches([...branches, branchData]);
    }

    setShowSuccessPopup(true);
    resetForm();
    setIsModalOpen(false);
  };

  const resetForm = () => {
    setFormData({
      branchName: "",
      phoneNumber: "",
      alternateNumber: "",
      address: "",
      pinCode: "",
      landMark: "",
      city: "",
      state: "Tamil Nadu",
    });
    setEditingId(null);
    setErrors({});
  };

  const handleEditBranch = (branchId: string) => {
    const branch = branches.find((b) => b.id === branchId);
    if (branch) {
      setFormData({
        branchName: branch.cityName,
        phoneNumber: branch.phoneNumber,
        alternateNumber: branch.alternateNumber || "",
        address: branch.address,
        pinCode: branch.pinCode,
        landMark: branch.landMark || "",
        city: branch.city,
        state: branch.state,
      });
      setEditingId(branchId);
      setIsModalOpen(true);
    }
  };

  const handleStatusChange = (id: string, newStatus: "Active" | "Inactive") => {
    setBranches(
      branches.map((branch) =>
        branch.id === id ? { ...branch, status: newStatus } : branch
      )
    );
  };

  const handleDeleteBranch = (id: string) => {
    setBranches(branches.filter((branch) => branch.id !== id));
  };

  const filteredLocations = searchTerm
    ? branches.filter((location) =>
      location.cityName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : branches;

  if (viewingBranch) {
    const branch = branches.find((b) => b.cityName === viewingBranch);
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
        <form
          onSubmit={(e) => e.preventDefault()}
          className="w-full md:w-[360px] h-[48px] relative"
        >
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

      {
        isLoad &&
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
          {
            Array(6).fill(null).map((_, index) => (
              <div className="w-full h-[340px] shadow-lg rounded-lg p-2">
                <ContentLoader
                  speed={1}
                  width="100%"
                  height="100%"
                  viewBox="0 0 390 330"
                  backgroundColor="#f3f3f3"
                  foregroundColor="#ecebeb"
                  className="w-full h-[310px] rounded-lg"
                  key={index}
                >
                  <rect x="0" y="0" rx="10" ry="10" width="400" height="200" />

                  <rect x="0" y="220" rx="8" ry="8" width="60%" height="20" />
                  <rect x="0" y="250" rx="8" ry="8" width="100%" height="28" />
                  <rect x="0" y="290" rx="8" ry="8" width="30%" height="58" />
                </ContentLoader>
              </div>
            ))
          }
        </div>
      }

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
        {!isLoad && filteredLocations.length > 0 ? (
          filteredLocations.map((location, index) => {
            const originalIndex = location.findIndex(
              loc => loc.cityName === location.cityName
            );

            return (
              <LocationCard
                key={index}
                {...location}
                onViewDetails={() => setViewingBranch(location.cityName)}
                onEdit={() => handleEditBranch(originalIndex)}
                onDelete={() => {
                  const updatedLocations = locations.filter((_, i) => i !== originalIndex);
                  setLocations(updatedLocations);
                  setShowSuccessPopup(true);
                }}
                onStatusChange={(newStatus) => {
                  const updatedLocations = [...locations];
                  updatedLocations[originalIndex].status = newStatus;
                  setLocations(updatedLocations);
                }}
              />
            );
          })
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-lg text-[#716F6F]">
              {searchTerm
                ? `No branches found matching "${searchTerm}"`
                : "No branches available"}
            </p>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl w-full max-w-[1022px] max-h-[90vh] overflow-y-auto">
            <div className="p-6 flex flex-col gap-6">
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-3">
                  <h2 className="text-2xl font-semibold text-[#1BBFCA] font-poppins">
                    {editingId ? "Edit Branch" : "Create a New Branch"}
                  </h2>
                  <p className="text-lg font-light text-[#7D7D7D] font-poppins capitalize">
                    {editingId
                      ? "Update the branch details below"
                      : "Fill in the details below to add a new branch"}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    resetForm();
                  }}
                  className="text-gray-500 hover:text-gray-700"
                  aria-label="Close modal"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor="branchName"
                      className="text-sm font-medium text-[#7D7D7D]"
                    >
                      Branch Name*
                    </label>
                    <input
                      type="text"
                      id="branchName"
                      name="branchName"
                      value={formData.branchName}
                      onChange={handleInputChange}
                      className={`px-4 py-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1BBFCA] ${errors.branchName
                        ? "border-red-500"
                        : "border-[#D9D9D9]"
                        }`}
                      placeholder="Enter branch name"
                    />
                    {errors.branchName && (
                      <p className="text-red-500 text-xs">
                        {errors.branchName}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor="phoneNumber"
                      className="text-sm font-medium text-[#7D7D7D]"
                    >
                      Phone Number*
                    </label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className={`px-4 py-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1BBFCA] ${errors.phoneNumber
                        ? "border-red-500"
                        : "border-[#D9D9D9]"
                        }`}
                      placeholder="Enter phone number"
                    />
                    {errors.phoneNumber && (
                      <p className="text-red-500 text-xs">
                        {errors.phoneNumber}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor="alternateNumber"
                      className="text-sm font-medium text-[#7D7D7D]"
                    >
                      Alternate Number
                    </label>
                    <input
                      type="tel"
                      id="alternateNumber"
                      name="alternateNumber"
                      value={formData.alternateNumber}
                      onChange={handleInputChange}
                      className="px-4 py-3 border border-[#D9D9D9] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1BBFCA]"
                      placeholder="Enter alternate number"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor="address"
                      className="text-sm font-medium text-[#7D7D7D]"
                    >
                      Address*
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className={`px-4 py-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1BBFCA] ${errors.address ? "border-red-500" : "border-[#D9D9D9]"
                        }`}
                      placeholder="Enter address"
                    />
                    {errors.address && (
                      <p className="text-red-500 text-xs">{errors.address}</p>
                    )}
                  </div>

                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor="pinCode"
                      className="text-sm font-medium text-[#7D7D7D]"
                    >
                      Pincode*
                    </label>
                    <input
                      type="text"
                      id="pinCode"
                      name="pinCode"
                      value={formData.pinCode}
                      onChange={handleInputChange}
                      className={`px-4 py-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1BBFCA] ${errors.pinCode ? "border-red-500" : "border-[#D9D9D9]"
                        }`}
                      placeholder="Enter pincode"
                    />
                    {errors.pinCode && (
                      <p className="text-red-500 text-xs">{errors.pinCode}</p>
                    )}
                  </div>

                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor="landMark"
                      className="text-sm font-medium text-[#7D7D7D]"
                    >
                      Landmark
                    </label>
                    <input
                      type="text"
                      id="landMark"
                      name="landMark"
                      value={formData.landMark}
                      onChange={handleInputChange}
                      className="px-4 py-3 border border-[#D9D9D9] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1BBFCA]"
                      placeholder="Enter landmark"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor="city"
                      className="text-sm font-medium text-[#7D7D7D]"
                    >
                      City*
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={`px-4 py-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1BBFCA] ${errors.city ? "border-red-500" : "border-[#D9D9D9]"
                        }`}
                      placeholder="Enter city"
                    />
                    {errors.city && (
                      <p className="text-red-500 text-xs">{errors.city}</p>
                    )}
                  </div>

                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor="state"
                      className="text-sm font-medium text-[#7D7D7D]"
                    >
                      State
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="px-4 py-3 border border-[#D9D9D9] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1BBFCA]"
                      placeholder="Enter state"
                      readOnly
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-4 mt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
                      resetForm();
                    }}
                    className="px-6 py-2 border border-[#1BBFCA] text-[#1BBFCA] font-poppins font-medium rounded-lg bg-[rgba(27,191,202,0.1)] hover:bg-[rgba(27,191,202,0.2)] transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-[#1BBFCA] text-white font-poppins font-medium rounded-lg hover:bg-[#15a9b4] transition-colors"
                  >
                    {editingId ? "Update Branch" : "Create Branch"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {showSuccessPopup && (
        <ConfirmationPopup
          type="success"
          message={
            editingId
              ? "Branch updated successfully!"
              : "Branch created successfully!"
          }
          onClose={() => setShowSuccessPopup(false)}
        />
      )}
    </div>
  );
}
