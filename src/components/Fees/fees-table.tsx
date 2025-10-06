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
import { useDispatch, useSelector } from "react-redux";
import { GetAllFeesThunks } from "../../features/Payment_Managemant/salary/fees/reducers/thunks";
import { Fees1, selectLoading } from "../../features/Payment_Managemant/salary/fees/reducers/selectors";
import ContentLoader from "react-content-loader";

export const FeesTable: React.FC = () => {
  const dispatch = useDispatch();
  const [currentFeesData, setCurrentFeesData] = useState<any[]>([]);
  const loading = useSelector(selectLoading);
  const feeSelector = useSelector(Fees1)
  const [currentPage, setCurrentPage] = useState(1);


  useEffect(() => {
    const fetchFeesData = async () => {
      const result = await dispatch(GetAllFeesThunks({ page: currentPage }) as any);
      setCurrentFeesData(result?.data);
    };
    fetchFeesData();
  }, [dispatch, currentPage]);

  const [showFilter, setShowFilter] = useState(false);
  const [showEditAddDrawer, setShowEditAddDrawer] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedFees, setSelectedFees] = useState<any | null>(null);
  const [actionToPerform, setActionToPerform] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");


  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);


  const filteredFees = currentFeesData?.filter((fee) =>
    fee.student?.full_name?.toLowerCase().includes(searchQuery.toLowerCase())
  );


  const totalPages = feeSelector?.last_page;

  const paginatedFees = filteredFees;



  const handleAddFee = (newFee: Fee) => {
    setCurrentFeesData((prevData) => [newFee, ...prevData]);
    setCurrentPage(1);
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
        return `Are you sure you want to delete fee ID ${selectedFees.id.split("-")[0]
          }? This action cannot be undone.`;
      case "download":
        return `Are you sure you want to download details for fee ID ${selectedFees.id.split("-")[0]
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


  return (
    <>
      <div className="rounded-2xl p-6">
        <h2 className="text-xl font-semibold">Fees</h2>
        <div className="flex justify-between items-center mb-7 mt-7">
          <div className="flex items-center gap-4">
            <button
              className="bg-cyan-500 text-white px-4 py-2 rounded-md flex items-center gap-2"
              onClick={() => setShowFilter(!showFilter)}
            >
              <SlidersHorizontal className="text-lg" />
              {showFilter ? "Hide" : "Show Filter"}
            </button>
          </div>
          <button
            onClick={() => {
              setSelectedFees(null);
              setShowEditAddDrawer(true);
              setShowConfirmationModal(false);
              setShowSuccessModal(false);
            }}
            className="bg-cyan-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            + Add Fee
          </button>
        </div>

        {showFilter && (
          <FeesFilter
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        )}

        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-3 font-medium">ID</th>
                <th className="px-4 py-3 font-medium">Transaction ID</th>
                <th className="px-4 py-3 font-medium">Student</th>
                <th className="px-4 py-3 font-medium">Amount Paid</th>
                <th className="px-4 py-3 font-medium">Issued Date</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>

            {loading ? (
              <tbody>
                {[...Array(6)].map((_, index) => (
                  <tr key={index} className="animate-pulse">
                    {[...Array(7)].map((__, i) => (
                      <td key={i} className="px-4 py-3">
                        <ContentLoader
                          speed={2}
                          width={100}
                          height={20}
                          viewBox="0 0 100 20"
                          backgroundColor="#f3f3f3"
                          foregroundColor="#ecebeb"
                        >
                          <rect x="0" y="0" rx="4" ry="4" width="100" height="20" />
                        </ContentLoader>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            ) : filteredFees?.length ? (
              paginatedFees?.map((fee: any, index: number) => (
                <tbody key={fee.id}>
                  <FeesTableRow
                    index={index}
                    fee={fee}
                    onView={handleView}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onDownload={handleDownload}
                  />
                </tbody>
              ))
            ) : (
              <tbody>
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-6 text-center text-gray-500"
                  >
                    No fees data available
                  </td>
                </tr>
              </tbody>
            )}
          </table>
        </div>

        {/* Pagination Controls */}
        {(
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Previous
            </button>

            <span className="text-gray-700 text-sm">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Modals & Drawers */}
      <FeeDrawer
        isOpen={showEditAddDrawer}
        onClose={() => setShowEditAddDrawer(false)}
        selectedFee={selectedFees}
        onSuccess={() => setShowSuccessModal(true)}
        onAddFee={handleAddFee}
        onUpdateFee={handleUpdateFee}
      />

      <ConfirmationModal
        isOpen={showConfirmationModal}
        onClose={() => setShowConfirmationModal(false)}
        onConfirm={handleConfirm}
        title={getConfirmationTitle()}
        message={getConfirmationMessage()}
        confirmButtonText={getConfirmButtonText()}
      />

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Success!"
      />
    </>
  );
};
