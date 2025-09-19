/* eslint-disable @typescript-eslint/no-explicit-any */
import { Plus, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GetAllBranchesThunk,
  AddBranchThunk,
  DeleteBranchThunk,
  EditBranchThunk,
  UpdateBranchStatusThunk,
} from "../../features/Branch_Management/reducers/branchThunks";
import { BranchDetailsPage } from "./BranchDetailsPage";
import TrichyImg from "../../assets/trichy.png";
import ContentLoader from "react-content-loader";
import { ConfirmationPopup } from "../BranchManagement/ConfirmationPopup";
import { LocationCard } from "../BranchManagement/Location-card";
import { selectLoading } from "../../features/Branch_Management/reducers/selector";
import type { RootState } from "../../store/store";
import { GetLocalStorage } from "../../utils/localStorage";
import toast from "react-hot-toast";

export function LocationCardsGrid() {
  const dispatch = useDispatch<any>();
  const { branches, error } = useSelector((state: RootState) => state.branches);
  const loading = useSelector(selectLoading);

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewingBranch, setViewingBranch] = useState<any>(null);
  const [editingBranch, setEditingBranch] = useState<any>(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const [formData, setFormData] = useState({
    branchName: "",
    phoneNumber: "",
    alternateNumber: "",
    address: "",
    pinCode: "",
    landMark: "",
    city: "",
    state: "Tamil Nadu",
    branchuuid: "",
  });

  useEffect(() => {
    dispatch(GetAllBranchesThunk());
  }, [dispatch]);

  const filteredBranches = searchTerm
    ? branches.filter((branch: any) =>
      branch.cityName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : branches;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.trim());
  };

  const handleEditBranch = (branch: any) => {
    setEditingBranch(branch);
    setFormData({
      branchName: branch.branch_identity,
      phoneNumber: branch.contact_info.phone_no,
      alternateNumber: branch.contact_info.alternate_no || "",
      address: branch.contact_info.address,
      pinCode: branch.contact_info.pincode || "",
      landMark: branch.contact_info.landmark || "",
      city: branch.branch_identity.split(",")[0],
      state: "Tamil Nadu",
      branchuuid: branch?.uuid,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const branchData = {
      branch_identity: formData.branchName,
      contact_info: {
        phone_no: parseInt(formData.phoneNumber),
        address: formData.address,
        alternate_no: formData.alternateNumber,
        pincode: formData.pinCode,
        landmark: formData.landMark,
        city: formData?.city,
        state: formData?.state,
      },
    };

    try {
      if (editingBranch) {
        await dispatch(
          EditBranchThunk({
            branchuuid: formData?.branchuuid,
            data: branchData,
          })
        );
        toast.success("edit branch success")
      } else {
        await dispatch(
          AddBranchThunk(branchData)
        );
        setShowSuccessPopup(true);
      }

      resetForm();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to save branch:", error);
    }
  };

  const handleDeleteBranch = async (branch: any) => {
    try {
      await dispatch(
        DeleteBranchThunk({
          instituteId: GetLocalStorage("instituteId"),
          branchUuid: branch._id,
        })
      )

      setShowSuccessPopup(true);
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const handleStatusChange = (branch_id: string, newStatus: string) => {
    dispatch(UpdateBranchStatusThunk({ branch_id, status: newStatus }));
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
      branchuuid: "",
    });
    setEditingBranch(null);
  };

  const handleBackFromBranchDetails = () => {
    setViewingBranch(null);
  };

  if (viewingBranch) {
    return (
      <BranchDetailsPage
        uuid={viewingBranch.uuid}
        locationName={viewingBranch.cityName}
        onBack={handleBackFromBranchDetails}
      />
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
      {/* Search & Add Button */}
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
          />
        </form>

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

      {/* Loading Skeleton */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
          {Array(6)
            .fill(null)
            .map((_, index) => (
              <div
                className="w-full h-[340px] shadow-lg rounded-lg p-2"
                key={index}
              >
                <ContentLoader
                  speed={1}
                  width="100%"
                  height="100%"
                  viewBox="0 0 390 330"
                  backgroundColor="#f3f3f3"
                  foregroundColor="#ecebeb"
                  className="w-full h-[310px] rounded-lg"
                >
                  <rect x="0" y="0" rx="10" ry="10" width="400" height="200" />
                  <rect x="0" y="220" rx="8" ry="8" width="60%" height="20" />
                  <rect x="0" y="250" rx="8" ry="8" width="100%" height="28" />
                  <rect x="0" y="290" rx="8" ry="8" width="30%" height="58" />
                </ContentLoader>
              </div>
            ))}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="text-red-500 text-center py-4">
          Error loading branches: {error}
        </div>
      )}

      {/* Branch Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {!loading && filteredBranches.length > 0
          ? filteredBranches.map((branch: any, index: number) => (
            <div key={index} className="w-full">
              <LocationCard
                id={branch?.uuid}
                imageSrc={TrichyImg}
                cityName={branch?.branch_identity}
                address={branch?.contact_info?.address}
                status={branch?.is_active ? "Active" : "Inactive"}
                onViewDetails={() => setViewingBranch(branch)}
                onEdit={() => handleEditBranch(branch)}
                onDelete={handleDeleteBranch}
                onStatusChange={(newStatus) =>
                  handleStatusChange(branch?._id, newStatus)
                }
              />
            </div>
          ))
          : !loading && (
            <div className="col-span-full text-center py-10">
              <p className="text-lg text-[#716F6F]">
                {searchTerm
                  ? `No branches found matching "${searchTerm}"`
                  : "No branches available"}
              </p>
            </div>
          )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <BranchModal
          isEditing={!!editingBranch}
          formData={formData}
          onChange={handleInputChange}
          onCancel={() => {
            setIsModalOpen(false);
            resetForm();
          }}
          onSubmit={handleSubmit}
        />
      )}

      {/* Success Popup */}
      {showSuccessPopup && (
        <ConfirmationPopup
          type="success"
          message={
            editingBranch
              ? "Branch updated successfully!"
              : "Branch created successfully!"
          }
          onClose={() => setShowSuccessPopup(false)}
        />
      )}
    </div>
  );
}

function BranchModal({
  isEditing,
  formData,
  onChange,
  onCancel,
  onSubmit,
}: any) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div
        className="bg-white rounded-xl overflow-y-auto"
        style={{
          width: "1022px",
          height: "617px",
          borderRadius: "12px",
          padding: "16px",
        }}
      >
        <div className="flex flex-col gap-[30px] h-full">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-3">
              <h2 className="text-2xl font-semibold text-[#1BBFCA] font-poppins">
                {isEditing ? "Edit Branch" : "Create a New Branch"}
              </h2>
              <p className="text-lg font-light text-[#7D7D7D] font-poppins capitalize">
                {isEditing
                  ? "Update the branch details below"
                  : "Fill in the details below to add a new branch"}
              </p>
            </div>
            <button
              onClick={onCancel}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={onSubmit} className="flex-1 flex flex-col">
            <div className="grid grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="flex flex-col gap-6">
                <FormField
                  label="Branch Name"
                  name="branchName"
                  value={formData.branchName}
                  onChange={onChange}
                  required
                />
                <FormField
                  label="Phone Number"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={onChange}
                  required
                />
                <FormField
                  label="Alternate Number"
                  name="alternateNumber"
                  value={formData.alternateNumber}
                  onChange={onChange}
                />
                <FormField
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={onChange}
                  required
                />
              </div>

              {/* Right Column */}
              <div className="flex flex-col gap-6">
                <FormField
                  label="Pin Code"
                  name="pinCode"
                  value={formData.pinCode}
                  onChange={onChange}
                  required
                />
                <FormField
                  label="Land Mark"
                  name="landMark"
                  value={formData.landMark}
                  onChange={onChange}
                />
                <FormField
                  label="City"
                  name="city"
                  value={formData.city}
                  onChange={onChange}
                  required
                />
                <FormField
                  label="State"
                  name="state"
                  value={formData.state}
                  onChange={onChange}
                  required
                />
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex justify-end gap-4 mt-auto pt-6">
              <button
                type="button"
                onClick={onCancel}
                className="px-6 py-2 border border-[#1BBFCA] text-[#1BBFCA] font-poppins font-medium rounded-lg bg-[rgba(27,191,202,0.1)] hover:bg-[rgba(27,191,202,0.2)] transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-[#1BBFCA] text-white font-poppins font-medium rounded-lg hover:bg-[#15a9b4] transition-colors"
              >
                {isEditing ? "Update Branch" : "Create Branch"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// Helper component for form fields
function FormField({ label, name, value, onChange, required = false }: any) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[#716F6F] font-poppins font-medium text-base capitalize">
        {label}
      </label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className="w-full h-12 px-4 border border-[#716F6F] rounded-lg font-poppins font-light text-lg focus:outline-none focus:ring-1 focus:ring-[#1BBFCA]"
        placeholder={`Enter ${label.toLowerCase()}`}
        required={required}
      />
    </div>
  );
}
