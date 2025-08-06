import { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { ChevronDown, MoreVertical, FileEdit, Trash2 } from "lucide-react";
import { FAQActionBar } from "../../components/FAQs/ActionBar";
import { FAQFilter } from "../../components/FAQs/FaqFilter";
import { AddFAQDrawer } from "../../components/FAQs/AddQuestion";
import { EditFAQDrawer } from "../../components/FAQs/Edit";
import { ConfirmDialog } from "../../components/FAQs/Confirm";
import { SuccessDialog } from "../../components/FAQs/Succes";
import { useDispatch, useSelector } from "react-redux";
import { selectFaq } from "../../features/Faq/reducers/selectors";
import { getAllFaqsThunk } from "../../features/Faq/reducers/thunks";
import { StatusDropdown } from "../../components/FAQs/StatusDropdown";
import { deleteFaq } from "../../features/Faq/service";

export default function FAQPage() {
  const [showFilter, setShowFilter] = useState(false);
  const [isAddFAQDrawerOpen, setIsAddFAQDrawerOpen] = useState(false);
  const [isEditFAQDrawerOpen, setIsEditFAQDrawerOpen] = useState(false);
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
    useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [currentFAQToEdit, setCurrentFAQToEdit] = useState<any | null>(null);
 const [faqToDeleteId, setFaqToDeleteId] = useState<string | null>(null);


  const dispatch = useDispatch<any>();
  const faqselect = useSelector(selectFaq);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const ParamsData = {
      branchid: "90c93163-01cf-4f80-b88b-4bc5a5dd8ee4",
      instituteId: "973195c0-66ed-47c2-b098-d8989d3e4529",
      page: currentPage,
      perPage: 10,
    };

    dispatch(getAllFaqsThunk(ParamsData));
  }, [dispatch, currentPage]);

  const toggleFilter = () => setShowFilter(!showFilter);

  const handleAddFAQ = (newFAQData: any) => {
    // Ideally dispatch a thunk to POST to backend
    setIsAddFAQDrawerOpen(false);
  };

  const handleEditFAQ = (id: number, updatedData: any) => {
    // Ideally dispatch a thunk to PUT to backend
    setIsEditFAQDrawerOpen(false);
    setCurrentFAQToEdit(null);
  };

 const handleDeleteClick = (uuid: string) => {
  setFaqToDeleteId(uuid);
  setIsConfirmDeleteModalOpen(true);
};

console.log(faqToDeleteId,'id')

const handleConfirmDelete = async () => {
  if (!faqToDeleteId) return;

  try {
    await deleteFaq({uuid: faqToDeleteId}); 

    // Close confirmation modal
    setIsConfirmDeleteModalOpen(false);

    // Show success
    setIsSuccessModalOpen(true);

    // Refetch FAQs from Redux
    const ParamsData = {
      branchid: "90c93163-01cf-4f80-b88b-4bc5a5dd8ee4",
      instituteId: "973195c0-66ed-47c2-b098-d8989d3e4529",
      page: currentPage,
      perPage: 10,
    };

    dispatch(getAllFaqsThunk(ParamsData));
  } catch (error: any) {
    console.error("Failed to delete FAQ:", error.message);
    alert("Failed to delete FAQ: " + error.message); // or show toast
  }
};

  const handleSuccessOk = () => {
    setIsSuccessModalOpen(false);
  };

  const handleStatusChange = (id: number, newStatus: string) => {
    // Ideally dispatch a thunk to update status
  };
  

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">FAQ</h1>

      <FAQActionBar
        showFilter={showFilter}
        onToggleFilter={toggleFilter}
        onAddFAQClick={() => setIsAddFAQDrawerOpen(true)}
      />

      {showFilter && <FAQFilter />}

      <div className="max-w-6xl mx-auto bg-white rounded-lg p-6 shadow-gray-200 border bg-gray-40 shadow-md ">
        <div className="grid gap-4 shadow-gray-300 ">
          <div className="grid grid-cols-[0.5fr_2fr_1fr_1fr_0.5fr] gap-2 p-4 bg-gray-200 text-sm font-semibold text-gray-600 border-gray-400 rounded-lg shadow-gray">
            <div>ID</div>
            <div>FAQ Name</div>
            <div>Category</div>
            <div>Status</div>
            <div>Actions</div>
          </div>

          {faqselect.map((faq: any) => (
            <div
              key={faq.id}
              className="grid grid-cols-[0.5fr_2fr_1fr_1fr_0.5fr] gap-4 p-4 items-center shadow-sm rounded-lg shadow-gray-300"
            >
              <div className="text-gray-700">{faq.id}</div>
              <div>
                <div className="font-semibold text-gray-800">{faq.title}</div>
                <div className="text-sm text-gray-500">{faq.description}</div>
              </div>
              <div className="text-gray-700">{faq.category}</div>
              {/* <div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-1 text-gray-700 hover:bg-gray-50">
                      <span>{faq.status}</span>Active
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="p-2 bg-white rounded-lg shadow-md flex flex-col gap-2">
                    <DropdownMenuItem onClick={() => handleStatusChange(faq.id, "Active")}>Active</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleStatusChange(faq.id, "Inactive")}>Inactive</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div> */}
              <div className="mr-22">
                <StatusDropdown
                  idx={faq._id}
                  initialStatus={faq.is_active ? "Active" : "Inactive"}
                  options={["Active", "Inactive"]}
                  itemId={faq.uuid}
                />
              </div>

              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-700 hover:bg-gray-50"
                    >
                      <MoreVertical className="w-5 h-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => {
                        setCurrentFAQToEdit(faq);
                        setIsEditFAQDrawerOpen(true);
                      }}
                    >
                      <FileEdit className="mr-2 h-4 w-4" /> Edit
                    </DropdownMenuItem>
                   <DropdownMenuItem onClick={() => handleDeleteClick(faq.uuid)}>
  <Trash2 className="mr-2 h-4 w-4" /> Delete
</DropdownMenuItem>

                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AddFAQDrawer
        open={isAddFAQDrawerOpen}
        onOpenChange={setIsAddFAQDrawerOpen}
        onSave={handleAddFAQ}
      />

      {currentFAQToEdit && (
        <EditFAQDrawer
          open={isEditFAQDrawerOpen}
          onOpenChange={setIsEditFAQDrawerOpen}
          faqToEdit={currentFAQToEdit}
          onSave={handleEditFAQ}
        />
      )}

      <ConfirmDialog
        open={isConfirmDeleteModalOpen}
        onOpenChange={setIsConfirmDeleteModalOpen}
        title="Confirm Action"
        message="Are you sure you want to delete this FAQ?"
        confirmButtonText="Yes, Delete"
        cancelButtonText="Cancel"
        onConfirm={handleConfirmDelete}
      />

      <SuccessDialog
        open={isSuccessModalOpen}
        onOpenChange={setIsSuccessModalOpen}
        title="Success!"
        onOk={handleSuccessOk}
      />
    </div>
  );
}
