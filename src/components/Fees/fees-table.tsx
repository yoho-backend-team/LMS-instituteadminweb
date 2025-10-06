/* eslint-disable @typescript-eslint/no-explicit-any */

import type React from "react";
import { useEffect, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { FeesFilter } from "../../components/Fees/fees-filter";
import { FeesTableRow } from "../../components/Fees/fees-table-row";
import { FeeDrawer } from "../../components/Fees/fee-drawer";
import { ConfirmationModal } from "../../components/Fees/confirmation-modal";
import { SuccessModal } from "../../components/Fees/success-modal";
import type { Fee } from "../../components/Fees/types";
import { useDispatch } from "react-redux";
import { GetAllFeesThunks } from "../../features/Payment_Managemant/salary/fees/reducers/thunks";
import { useSelector } from "react-redux";
import { selectLoading } from "../../features/Payment_Managemant/salary/fees/reducers/selectors";
import ContentLoader from "react-content-loader";

export const FeesTable: React.FC = () => {
  const dispatch = useDispatch();
  const [currentFeesData, setCurrentFeesData] = useState<any[]>([]);
  const loading = useSelector(selectLoading);

  useEffect(() => {
    const fetchFeesData = async () => {
      const result = await dispatch(GetAllFeesThunks({}) as any);
      setCurrentFeesData(result);
    };
    fetchFeesData();
  }, [dispatch]);

  const [showFilter, setShowFilter] = useState(false);
  const [showEditAddDrawer, setShowEditAddDrawer] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedFees, setSelectedFees] = useState<any | null>(null);
  const [actionToPerform, setActionToPerform] = useState<null>(null);

  const handleAddFee = (newFee: Fee) => {
    setCurrentFeesData((prevData) => [...prevData, newFee]);
  };

  const handleUpdateFee = (updatedFee: Fee) => {
    setCurrentFeesData((prevData) =>
      prevData.map((fee) => (fee.id === updatedFee.id ? updatedFee : fee))
    );
  };

  const handleEdit = (selectedFee: any) => {
    setSelectedFees(selectedFee);
    setShowEditAddDrawer(true);
    setShowConfirmationModal(false);
    setShowSuccessModal(false);
  };

  const handleView = (fee: any) => {
    setSelectedFees(fee);
    setShowEditAddDrawer(false);
    setShowConfirmationModal(false);
    setShowSuccessModal(false);
  };

  const handleDelete = (fee: Fee) => {
    setSelectedFees(fee);
    setActionToPerform("delete");
    setShowConfirmationModal(true);
  };

  const handleDownload = (fee: Fee) => {
    setSelectedFees(fee);
  };

  const handleConfirm = () => {
    setShowConfirmationModal(false);
    if (!selectedFees || !actionToPerform) return;

    switch (actionToPerform) {
      case "delete":
        setCurrentFeesData((prevData) =>
          prevData.filter((feeItem) => feeItem.id !== selectedFees.id)
        );
        setShowSuccessModal(true);
        break;
    }

    setActionToPerform(null);
  };

  const getConfirmationMessage = () => {
    if (!actionToPerform || !selectedFees) return "";
    switch (actionToPerform) {
      case "edit":
        return `Are you sure you want to edit fee ID ${selectedFees.id}?`;
      case "delete":
        return `Are you sure you want to delete fee ID ${
          selectedFees.id.split("-")[0]
        }? This action cannot be undone.`;
      case "download":
        return `Are you sure you want to download details for fee ID ${
          selectedFees.id.split("-")[0]
        }?`;
      default:
        return "Are you sure you want to proceed with this action?";
    }
  };

  const getConfirmationTitle = () => {
    if (!actionToPerform) return "Confirm Action";
    switch (actionToPerform) {
      case "edit":
        return "Confirm Edit";
      case "delete":
        return "Confirm Deletion";
      case "download":
        return "Confirm Download";
      default:
        return "Confirm Action";
    }
  };

  const getConfirmButtonText = () => {
    if (!actionToPerform) return "Yes";
    switch (actionToPerform) {
      case "edit":
        return "Yes, Edit";
      case "delete":
        return "Yes, Delete";
      case "download":
        return "Yes, Download";
      default:
        return "Yes";
    }
  };

  const [searchQuery, setSearchQuery] = useState("");

  const filteredFees = currentFeesData.filter((fee) =>
    fee.student?.full_name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="rounded-2xl p-4 sm:p-6">
        <h2 className="text-lg md:text-xl font-semibold text-pretty">Fees</h2>
        <div className="flex flex-col items-stretch gap-3 mt-6 mb-6 sm:mt-7 sm:mb-7 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              className="bg-cyan-500 text-white px-3 py-2 sm:px-4 rounded-md flex items-center justify-center gap-2 text-sm md:text-base"
              onClick={() => setShowFilter(!showFilter)}
              aria-label={showFilter ? "Hide filters" : "Show filters"}
            >
              <SlidersHorizontal className="h-4 w-4" />
              <span className="max-[424px]:sr-only">
                {showFilter ? "Hide Filter" : "Show Filter"}
              </span>
            </button>
          </div>
          <button
            onClick={() => {
              setSelectedFees(null);
              setShowEditAddDrawer(true);
              setShowConfirmationModal(false);
              setShowSuccessModal(false);
            }}
            className="w-full sm:w-auto bg-cyan-500 text-white px-3 py-2 sm:px-4 rounded-lg flex items-center justify-center gap-2 text-sm md:text-base"
          >
            <span aria-hidden className="text-lg leading-none">
              +
            </span>
            <span className="max-[424px]:sr-only">Add Fee</span>
          </button>
        </div>
        {showFilter && (
          <FeesFilter
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        )}
        <div className="overflow-x-auto rounded-xl border border-gray-200 max-h-[70vh] md:max-h-[80vh]">
          <table className="min-w-[900px] md:min-w-full table-auto text-xs md:text-sm text-left">
            <thead className="bg-gray-100 text-gray-700 sticky top-0 z-10">
              <tr>
                <th className="px-3 md:px-4 py-2 md:py-3 font-medium whitespace-nowrap align-middle w-24">
                  ID
                </th>
                <th className="px-3 md:px-4 py-2 md:py-3 font-medium whitespace-nowrap align-middle w-48">
                  Transaction ID
                </th>
                <th className="px-3 md:px-4 py-2 md:py-3 font-medium whitespace-nowrap align-middle w-56">
                  Student
                </th>
                <th className="px-3 md:px-4 py-2 md:py-3 font-medium whitespace-nowrap align-middle w-32">
                  Amount Paid
                </th>
                <th className="px-3 md:px-4 py-2 md:py-3 font-medium whitespace-nowrap align-middle w-32">
                  Issued Date
                </th>
                <th className="px-3 md:px-4 py-2 md:py-3 font-medium whitespace-nowrap align-middle w-28">
                  Status
                </th>
                <th className="px-3 md:px-4 py-2 md:py-3 font-medium whitespace-nowrap align-middle w-36">
                  Actions
                </th>
              </tr>
            </thead>
            {loading ? (
              <tbody>
                {[...Array(6)].map((_, index) => (
                  <tr key={index} className="animate-pulse">
                    <td className="px-4 py-3">
                      <ContentLoader
                        speed={2}
                        width={80}
                        height={20}
                        viewBox="0 0 80 20"
                        backgroundColor="#f3f3f3"
                        foregroundColor="#ecebeb"
                      >
                        <rect
                          x="0"
                          y="0"
                          rx="4"
                          ry="4"
                          width="80"
                          height="20"
                        />
                      </ContentLoader>
                    </td>
                    <td className="px-4 py-3">
                      <ContentLoader
                        speed={2}
                        width={120}
                        height={20}
                        viewBox="0 0 120 20"
                        backgroundColor="#f3f3f3"
                        foregroundColor="#ecebeb"
                      >
                        <rect
                          x="0"
                          y="0"
                          rx="4"
                          ry="4"
                          width="120"
                          height="20"
                        />
                      </ContentLoader>
                    </td>
                    <td className="px-4 py-3">
                      <ContentLoader
                        speed={2}
                        width={150}
                        height={20}
                        viewBox="0 0 150 20"
                        backgroundColor="#f3f3f3"
                        foregroundColor="#ecebeb"
                      >
                        <rect
                          x="0"
                          y="0"
                          rx="4"
                          ry="4"
                          width="150"
                          height="20"
                        />
                      </ContentLoader>
                    </td>
                    <td className="px-4 py-3">
                      <ContentLoader
                        speed={2}
                        width={100}
                        height={20}
                        viewBox="0 0 100 20"
                        backgroundColor="#f3f3f3"
                        foregroundColor="#ecebeb"
                      >
                        <rect
                          x="0"
                          y="0"
                          rx="4"
                          ry="4"
                          width="100"
                          height="20"
                        />
                      </ContentLoader>
                    </td>
                    <td className="px-4 py-3">
                      <ContentLoader
                        speed={2}
                        width={100}
                        height={20}
                        viewBox="0 0 100 20"
                        backgroundColor="#f3f3f3"
                        foregroundColor="#ecebeb"
                      >
                        <rect
                          x="0"
                          y="0"
                          rx="4"
                          ry="4"
                          width="100"
                          height="20"
                        />
                      </ContentLoader>
                    </td>
                    <td className="px-4 py-3">
                      <ContentLoader
                        speed={2}
                        width={80}
                        height={20}
                        viewBox="0 0 80 20"
                        backgroundColor="#f3f3f3"
                        foregroundColor="#ecebeb"
                      >
                        <rect
                          x="0"
                          y="0"
                          rx="4"
                          ry="4"
                          width="80"
                          height="20"
                        />
                      </ContentLoader>
                    </td>
                    <td className="px-4 py-3">
                      <ContentLoader
                        speed={2}
                        width={120}
                        height={20}
                        viewBox="0 0 120 20"
                        backgroundColor="#f3f3f3"
                        foregroundColor="#ecebeb"
                      >
                        <rect
                          x="0"
                          y="0"
                          rx="4"
                          ry="4"
                          width="120"
                          height="20"
                        />
                      </ContentLoader>
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <tbody>
                {filteredFees.map((fee) => (
                  <FeesTableRow
                    key={fee.id}
                    fee={fee}
                    onEdit={handleEdit}
                    onView={handleView}
                    onDelete={handleDelete}
                    onDownload={handleDownload}
                  />
                ))}
              </tbody>
            )}
          </table>
        </div>
        {showEditAddDrawer && (
          <FeeDrawer
            selectedFee={selectedFees}
            onClose={() => setShowEditAddDrawer(false)}
            onAdd={handleAddFee}
            onUpdate={handleUpdateFee}
          />
        )}
        {showConfirmationModal && (
          <ConfirmationModal
            title={getConfirmationTitle()}
            message={getConfirmationMessage()}
            onConfirm={handleConfirm}
            onClose={() => setShowConfirmationModal(false)}
            confirmButtonText={getConfirmButtonText()}
          />
        )}
        {showSuccessModal && (
          <SuccessModal
            message="Action completed successfully!"
            onClose={() => setShowSuccessModal(false)}
          />
        )}
      </div>
    </>
  );
};
