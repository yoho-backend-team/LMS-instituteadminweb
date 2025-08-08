
import type React from "react"
import { useEffect, useState } from "react"
import { SlidersHorizontal } from "lucide-react"
import { FeesFilter } from "../../components/Fees/fees-filter"
import { FeesTableRow } from "../../components/Fees/fees-table-row"
import { FeeDrawer } from "../../components/Fees/fee-drawer"
import { ConfirmationModal } from "../../components/Fees/confirmation-modal"
import { SuccessModal } from "../../components/Fees/success-modal"
import type { Fee } from "../../components/Fees/types"
import { useDispatch } from "react-redux"
import { GetAllFeesThunks } from "../../features/Payment_Managemant/salary/fees/reducers/thunks"

export const FeesTable: React.FC = () => {
  const dispatch = useDispatch()
  const [currentFeesData, setCurrentFeesData] = useState<any[]>([])

  useEffect(() => {
    const fetchFeesData = async () => {
      const result = await dispatch(GetAllFeesThunks({}) as any)
      console.log(result, "data for fees comming")
      setCurrentFeesData(result)

    }
    fetchFeesData()
  }, [])

  const [showFilter, setShowFilter] = useState(false)
  const [showEditAddDrawer, setShowEditAddDrawer] = useState(false)
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [selectedFees, setSelectedFees] = useState<any | null>(null)
  const [actionToPerform, setActionToPerform] = useState<| null>(null)

  const handleAddFee = (newFee: Fee) => {
    setCurrentFeesData((prevData) => [...prevData, newFee])
  }

  const handleUpdateFee = (updatedFee: Fee) => {
    setCurrentFeesData((prevData) =>
      prevData.map((fee) => (fee.id === updatedFee.id ? updatedFee : fee))
    )
  }

  const handleEdit = (selectedFee: any) => {
    setSelectedFees(selectedFee)
    setShowEditAddDrawer(true)
    setShowConfirmationModal(false)
    setShowSuccessModal(false)

  }

  const handleView = (fee: any) => {
    setSelectedFees(fee)
    setShowEditAddDrawer(false)
    setShowConfirmationModal(false)
    setShowSuccessModal(false)
  }

  const handleDelete = (fee: Fee) => {
    setSelectedFees(fee)
    setActionToPerform("delete")
    setShowConfirmationModal(true)
  }

  const handleDownload = (fee: Fee) => {
    setSelectedFees(fee)
    console.log("Downloading fee:", fee)
  }

  const handleConfirm = () => {
    setShowConfirmationModal(false)
    if (!selectedFees || !actionToPerform) return

    switch (actionToPerform) {
      case "delete":
        console.log("Deleting fee:", selectedFees)
        setCurrentFeesData((prevData) =>
          prevData.filter((feeItem) => feeItem.id !== selectedFees.id)
        )
        setShowSuccessModal(true)
        break
    }

    setActionToPerform(null)
  }

  const getConfirmationMessage = () => {
    if (!actionToPerform || !selectedFees) return ""
    switch (actionToPerform) {
      case "edit":
        return `Are you sure you want to edit fee ID ${selectedFees.id}?`
      case "delete":
        return `Are you sure you want to delete fee ID ${selectedFees.id.split("-")[0]}? This action cannot be undone.`
      case "download":
        return `Are you sure you want to download details for fee ID ${selectedFees.id.split("-")[0]}?`
      default:
        return "Are you sure you want to proceed with this action?"
    }
  }

  const getConfirmationTitle = () => {
    if (!actionToPerform) return "Confirm Action"
    switch (actionToPerform) {
      case "edit":
        return "Confirm Edit"
      case "delete":
        return "Confirm Deletion"
      case "download":
        return "Confirm Download"
      default:
        return "Confirm Action"
    }
  }

  const getConfirmButtonText = () => {
    if (!actionToPerform) return "Yes"
    switch (actionToPerform) {
      case "edit":
        return "Yes, Edit"
      case "delete":
        return "Yes, Delete"
      case "download":
        return "Yes, Download"
      default:
        return "Yes"
    }
  }

  const [searchQuery, setSearchQuery] = useState("")

  const filteredFees = currentFeesData.filter((fee) =>
    fee.student?.full_name?.toLowerCase().includes(searchQuery.toLowerCase())
  )



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
              setSelectedFees(null)
              setShowEditAddDrawer(true)
              setShowConfirmationModal(false)
              setShowSuccessModal(false)
            }}
            className="bg-cyan-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            + Add Fee
          </button>
        </div>
        {showFilter && <FeesFilter searchQuery={searchQuery}
          onSearchChange={setSearchQuery} />}
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
            <tbody>
              {filteredFees.map((fee: any) => (
                <FeesTableRow
                  key={fee.id}
                  fee={fee}
                  onView={handleView}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onDownload={handleDownload}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

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
  )
}
