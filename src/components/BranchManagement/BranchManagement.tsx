"use client";
import { Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  fetchBranch,
  createBranch,
  updateBranch,
  deleteBranchAction,
} from "../../features/Branch_Management/reducers/branchThunks";
import TrichyImg from "../../assets/trichy.png";
import ContentLoader from "react-content-loader";
import { ConfirmationPopup } from "../BranchManagement/ConfirmationPopup";
import { LocationCard } from "../BranchManagement/Location-card";

interface Branch {
  _id: string;
  branch_identity: string;
  contact_info: {
    phone_no: string;
    alternate_no?: string;
    address: string;
    pin_code: string;
    landmark?: string;
  };
  is_active: boolean;
}

interface FormData {
  branchName: string;
  phoneNumber: string;
  alternateNumber: string;
  address: string;
  pinCode: string;
  landMark: string;
  city: string;
  state: string;
}

export function LocationCardsGrid() {
  const dispatch = useDispatch();
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingBranch, setEditingBranch] = useState<Branch | null>(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState<boolean>(false);

  const [formData, setFormData] = useState<FormData>({
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
    const loadBranches = async () => {
      setLoading(true);
      try {
        const result = await dispatch(fetchBranch({ instituteId: "YOUR_INSTITUTE_ID" }) as any);
        if (result.payload) {
          setBranches(result.payload);
        }
      } catch (err: any) {
        setError(err.message || "Failed to load branches");
      } finally {
        setLoading(false);
      }
    };
    loadBranches();
  }, [dispatch]);

  const filteredBranches = searchTerm
    ? branches.filter(branch =>
        branch.branch_identity?.toLowerCase().includes(searchTerm.toLowerCase()))
    : branches;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.trim());
  };

  const handleEditBranch = (branch: Branch) => {
    setEditingBranch(branch);
    setFormData({
      branchName: branch.branch_identity || '',
      phoneNumber: branch.contact_info?.phone_no || '',
      alternateNumber: branch.contact_info?.alternate_no || '',
      address: branch.contact_info?.address || '',
      pinCode: branch.contact_info?.pin_code || '',
      landMark: branch.contact_info?.landmark || '',
      city: branch.branch_identity?.split(',')[0] || '',
      state: 'Tamil Nadu'
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const branchData = {
      imageSrc: TrichyImg,
      branch_identity: formData.branchName,
      contact_info: {
        phone_no: formData.phoneNumber,
        alternate_no: formData.alternateNumber,
        address: formData.address,
        pin_code: formData.pinCode,
        landmark: formData.landMark
      },
      is_active: true
    };

    try {
      setLoading(true);
      if (editingBranch) {
        await dispatch(updateBranch({ 
          id: editingBranch._id, 
          data: branchData 
        }) as any);
      } else {
        await dispatch(createBranch({ 
          instituteId: "YOUR_INSTITUTE_ID", 
          data: branchData 
        }) as any);
      }
      // Refresh branches after update
      const result = await dispatch(fetchBranch({ instituteId: "YOUR_INSTITUTE_ID" }) as any);
      if (result.payload) {
        setBranches(result.payload);
      }
      setShowSuccessPopup(true);
      setIsModalOpen(false);
    } catch (error: any) {
      setError(error.message || "Operation failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBranch = async (branchId: string) => {
    try {
      setLoading(true);
      await dispatch(deleteBranchAction(branchId) as any);
      // Refresh branches after delete
      const result = await dispatch(fetchBranch({ instituteId: "YOUR_INSTITUTE_ID" }) as any);
      if (result.payload) {
        setBranches(result.payload);
      }
      setShowSuccessPopup(true);
    } catch (error: any) {
      setError(error.message || "Failed to delete branch");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (branchId: string, newStatus: string) => {
    try {
      setLoading(true);
      await dispatch(updateBranch({ 
        id: branchId, 
        data: { is_active: newStatus === "Active" } 
      }) as any);
      // Refresh branches after status change
      const result = await dispatch(fetchBranch({ instituteId: "YOUR_INSTITUTE_ID" }) as any);
      if (result.payload) {
        setBranches(result.payload);
      }
    } catch (error: any) {
      setError(error.message || "Failed to update status");
    } finally {
      setLoading(false);
    }
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
    setEditingBranch(null);
  };

  return (
    <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
      {/* Search & Add Button */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <form onSubmit={(e) => e.preventDefault()} className="w-full md:w-[360px] h-[48px] relative">
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-white/0 bg-white/30 border-2 border-[#1BBFCA] rounded-lg pointer-events-none"></div>
          <input
            type="text"
            placeholder="Search Branch by Name"
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

      {/* Loading */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
          {Array(6).fill(null).map((_, index) => (
            <div className="w-full h-[340px] shadow-lg rounded-lg p-2" key={index}>
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
      {error && <div className="text-red-500 text-center py-4">Error: {error}</div>}

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
        {!loading && filteredBranches.length > 0 ? (
          filteredBranches.map((branch) => (
            <LocationCard
              key={branch._id}
              id={branch._id}
              imageSrc={TrichyImg}
              cityName={branch.branch_identity}
              address={branch.contact_info?.address}
              status={branch.is_active ? "Active" : "Inactive"}
              phoneNumber={branch.contact_info?.phone_no}
              onEdit={() => handleEditBranch(branch)}
              onDelete={() => handleDeleteBranch(branch._id)}
              onStatusChange={(newStatus) => handleStatusChange(branch._id, newStatus)}
            />
          ))
        ) : (
          !loading && (
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

      {/* Success Popup */}
      {showSuccessPopup && (
        <ConfirmationPopup
          type="success"
          message={editingBranch ? "Branch updated successfully!" : "Branch created successfully!"}
          onClose={() => setShowSuccessPopup(false)}
        />
      )}
    </div>
  );
}