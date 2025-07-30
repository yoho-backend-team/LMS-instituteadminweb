"use client";
import { ArrowRight, Plus, X, MoreVertical } from "lucide-react";
import { useState } from "react";
import { BranchDetailsPage } from "./BranchDetailsPage";
import TrichyImg from "../../assets/trichy.png";

interface LocationCardProps {
  imageSrc: string;
  cityName: string;
  address: string;
  status: string;
  onViewDetails: () => void;
  onEdit: () => void;
}

export function LocationCard({ 
  imageSrc, 
  cityName, 
  address, 
  status: initialStatus, 
  onViewDetails,
  onEdit
}: LocationCardProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(initialStatus);

  const statusOptions = ["Active", "Inactive"];

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleStatusChange = (newStatus: string) => {
    setCurrentStatus(newStatus);
    setIsDropdownOpen(false);
  };

  return (
    <div className="flex flex-col items-end p-4 gap-2 w-full max-w-sm bg-white shadow-lg rounded-xl md:w-[410px]">
      <div className="relative w-full rounded-xl overflow-hidden">
        <img
          src={imageSrc}
          alt={cityName}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4">
          <button 
            onClick={toggleMenu}
            className="flex justify-center items-center p-2 w-10 h-10 bg-white rounded-lg hover:bg-gray-100 transition-colors"
          >
            <MoreVertical className="w-5 h-5 text-[#716F6F]" />
          </button>
          
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
              <div className="py-1">
                <button
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => {
                    setIsMenuOpen(false);
                    onEdit();
                  }}
                >
                  Edit
                </button>
                <button
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => {
                    setIsMenuOpen(false);
                  }}
                >
                  Delete
                </button>
                <button
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => {
                    onViewDetails();
                    setIsMenuOpen(false);
                  }}
                >
                  View Details
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col items-start gap-4 w-full">
        <div className="flex flex-col items-start gap-3 w-full">
          <h3 className="text-lg font-semibold capitalize text-[#716F6F]">{cityName}</h3>
          <p className="text-xs font-light capitalize text-[#7D7D7D]">{address}</p>
        </div>
        
        <div className="relative">
          <button 
            onClick={toggleDropdown}
            className="flex justify-center items-center px-4 py-2 w-[111px] h-[40px] border border-[#716F6F] rounded-lg"
          >
            <div className="flex items-center gap-[10px]">
              <span className="text-xs font-medium capitalize text-[#716F6F] font-poppins leading-[18px]">
                {currentStatus}
              </span>
              <div className="w-5 h-5 flex items-center justify-center">
                <ArrowRight 
                  className={`w-full h-full text-[#716F6F] transform ${isDropdownOpen ? 'rotate-270' : 'rotate-90'}`}
                />
              </div>
            </div>
          </button>
          
          {isDropdownOpen && (
            <div className="absolute z-10 mt-1 w-[111px] bg-white border border-[#716F6F] rounded-lg shadow-lg">
              {statusOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => handleStatusChange(option)}
                  className={`w-full px-4 py-2 text-xs text-left capitalize font-poppins ${
                    currentStatus === option 
                      ? 'bg-gray-100 text-[#716F6F] font-medium' 
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
  );
}

export function LocationCardsGrid() {
  const [locations, setLocations] = useState([
    {
      imageSrc: TrichyImg,
      cityName: "Tiruchirappalli",
      address: "No 3, Salman Complex, Tiruchirappalli, Tamil Nadu, 621014",
      status: "Active",
      phoneNumber: "9876543210",
      alternateNumber: "9876543211",
      pinCode: "621014",
      landMark: "Near Salman Complex",
    },
    {
      imageSrc: TrichyImg,
      cityName: "Chennai",
      address: "No 5, Gandhi Nagar, Chennai, Tamil Nadu, 600001",
      status: "Active",
      phoneNumber: "9876543220",
      alternateNumber: "9876543221",
      pinCode: "600001",
      landMark: "Near Gandhi Nagar",
    },
    {
      imageSrc: TrichyImg,
      cityName: "Coimbatore",
      address: "No 10, Nehru Street, Coimbatore, Tamil Nadu, 641001",
      status: "Inactive",
      phoneNumber: "9876543230",
      alternateNumber: "9876543231",
      pinCode: "641001",
      landMark: "Near Nehru Street",
    },
    {
      imageSrc: TrichyImg,
      cityName: "Madurai",
      address: "No 7, Meenakshi Road, Madurai, Tamil Nadu, 625001",
      status: "Active",
      phoneNumber: "9876543240",
      alternateNumber: "9876543241",
      pinCode: "625001",
      landMark: "Near Meenakshi Temple",
    },
    {
      imageSrc: TrichyImg,
      cityName: "Salem",
      address: "No 15, Fort Road, Salem, Tamil Nadu, 636001",
      status: "Inactive",
      phoneNumber: "9876543250",
      alternateNumber: "9876543251",
      pinCode: "636001",
      landMark: "Near Fort Road",
    },
    {
      imageSrc: TrichyImg,
      cityName: "Erode",
      address: "No 22, Bazaar Street, Erode, Tamil Nadu, 638001",
      status: "Active",
      phoneNumber: "9876543260",
      alternateNumber: "9876543261",
      pinCode: "638001",
      landMark: "Near Bazaar Street",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewingBranch, setViewingBranch] = useState<string | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditBranch = (index: number) => {
    const branch = locations[index];
    setEditingIndex(index);
    setFormData({
      branchName: branch.cityName,
      phoneNumber: branch.phoneNumber,
      alternateNumber: branch.alternateNumber,
      address: branch.address,
      pinCode: branch.pinCode,
      landMark: branch.landMark,
      city: branch.cityName.split(',')[0],
      state: 'Tamil Nadu'
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newBranch = {
      imageSrc: TrichyImg,
      cityName: formData.branchName,
      address: formData.address,
      status: "Active",
      phoneNumber: formData.phoneNumber,
      alternateNumber: formData.alternateNumber,
      pinCode: formData.pinCode,
      landMark: formData.landMark
    };

    if (editingIndex !== null) {
      // Update existing branch
      const updatedLocations = [...locations];
      updatedLocations[editingIndex] = newBranch;
      setLocations(updatedLocations);
    } else {
      // Add new branch
      setLocations([...locations, newBranch]);
    }

    // Reset form and close modal
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
    setEditingIndex(null);
  };

  const handleBackFromBranchDetails = () => {
    setViewingBranch(null);
  };

  if (viewingBranch) {
    return (
      <BranchDetailsPage 
        locationName={viewingBranch} 
        onBack={handleBackFromBranchDetails} 
      />
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div className="w-full md:w-[360px] h-[48px] relative">
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-white/0  bg-white/30 border-2 border-[#1BBFCA] rounded-lg"></div>
          <input
            type="text"
            placeholder="Search Branch"
            className="w-full h-full pl-4 pr-12 bg-transparent text-[#6C6C6C] font-poppins font-medium text-lg capitalize focus:outline-none"
          />
        </div>

        <button 
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
          className="w-full md:w-[200px] h-[48px] bg-[#1BBFCA] rounded-lg flex items-center justify-center gap-2 px-4 hover:bg-[#15a9b4] transition-colors"
        >
          <Plus className="w-6 h-6 text-white" />
          <span className="text-white font-poppins font-medium text-base capitalize">
            Add New Branch
          </span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
        {locations.map((location, index) => (
          <LocationCard 
            key={index} 
            {...location} 
            onViewDetails={() => setViewingBranch(location.cityName)}
            onEdit={() => handleEditBranch(index)}
          />
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl w-full max-w-[1022px] max-h-[90vh] overflow-y-auto">
            <div className="p-6 flex flex-col gap-6">
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-3">
                  <h2 className="text-2xl font-semibold text-[#1BBFCA] font-poppins">
                    {editingIndex !== null ? "Edit Branch" : "Create a New Branch"}
                  </h2>
                  <p className="text-lg font-light text-[#7D7D7D] font-poppins capitalize">
                    {editingIndex !== null 
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
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1 flex flex-col gap-2">
                    <label className="text-[#716F6F] font-poppins font-medium text-base capitalize">
                      Branch Name
                    </label>
                    <input
                      type="text"
                      name="branchName"
                      value={formData.branchName}
                      onChange={handleInputChange}
                      className="w-full h-12 px-4 border border-[#716F6F] rounded-lg font-poppins font-light text-lg"
                      placeholder="Enter branch name"
                      required
                    />
                  </div>
                  <div className="flex-1 flex flex-col gap-2">
                    <label className="text-[#716F6F] font-poppins font-medium text-base capitalize">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className="w-full h-12 px-4 border border-[#716F6F] rounded-lg font-poppins font-light text-lg"
                      placeholder="Enter phone number"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1 flex flex-col gap-2">
                    <label className="text-[#716F6F] font-poppins font-medium text-base capitalize">
                      Alternate Number
                    </label>
                    <input
                      type="tel"
                      name="alternateNumber"
                      value={formData.alternateNumber}
                      onChange={handleInputChange}
                      className="w-full h-12 px-4 border border-[#716F6F] rounded-lg font-poppins font-light text-lg"
                      placeholder="Enter alternate number"
                    />
                  </div>
                  <div className="flex-1 flex flex-col gap-2">
                    <label className="text-[#716F6F] font-poppins font-medium text-base capitalize">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full h-12 px-4 border border-[#716F6F] rounded-lg font-poppins font-light text-lg"
                      placeholder="Enter address"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1 flex flex-col gap-2">
                    <label className="text-[#716F6F] font-poppins font-medium text-base capitalize">
                      Pin Code
                    </label>
                    <input
                      type="text"
                      name="pinCode"
                      value={formData.pinCode}
                      onChange={handleInputChange}
                      className="w-full h-12 px-4 border border-[#716F6F] rounded-lg font-poppins font-light text-lg"
                      placeholder="Enter pin code"
                      required
                    />
                  </div>
                  <div className="flex-1 flex flex-col gap-2">
                    <label className="text-[#716F6F] font-poppins font-medium text-base capitalize">
                      Land Mark
                    </label>
                    <input
                      type="text"
                      name="landMark"
                      value={formData.landMark}
                      onChange={handleInputChange}
                      className="w-full h-12 px-4 border border-[#716F6F] rounded-lg font-poppins font-light text-lg"
                      placeholder="Enter land mark"
                    />
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1 flex flex-col gap-2">
                    <label className="text-[#716F6F] font-poppins font-medium text-base capitalize">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full h-12 px-4 border border-[#716F6F] rounded-lg font-poppins font-light text-lg"
                      placeholder="Enter city"
                      required
                    />
                  </div>
                  <div className="flex-1 flex flex-col gap-2">
                    <label className="text-[#716F6F] font-poppins font-medium text-base capitalize">
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full h-12 px-4 border border-[#716F6F] rounded-lg font-poppins font-light text-lg"
                      placeholder="Enter state"
                      required
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
                    className="px-6 py-2 border border-[#1BBFCA] text-[#1BBFCA] font-poppins font-medium rounded-lg bg-[rgba(27,191,202,0.1)]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-[#1BBFCA] text-white font-poppins font-medium rounded-lg"
                  >
                    {editingIndex !== null ? "Update Branch" : "Create Branch"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}