/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { MoreVertical, FileEdit, Trash2 } from "lucide-react";
import { FAQActionBar } from "../../components/FAQs/ActionBar";
import { FAQFilter } from "../../components/FAQs/FaqFilter";
import { AddFAQDrawer } from "../../components/FAQs/AddQuestion";
import { EditFAQDrawer } from "../../components/FAQs/Edit";
import { ConfirmDialog } from "../../components/FAQs/Confirm";
import { SuccessDialog } from "../../components/FAQs/Succes";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFaq,
  selectLoading,
} from "../../features/Faq/reducers/selectors";
import { getAllFaqsThunk } from "../../features/Faq/reducers/thunks";
import { StatusDropdown } from "../../components/FAQs/StatusDropdown";
import { deleteFaq } from "../../features/Faq/service";
import { GetLocalStorage } from "../../utils/localStorage";

// Skeleton Loader Components
const FAQSkeletonRow = () => {
  return (
    <div className="grid grid-cols-[0.5fr_2fr_1fr_1fr_0.5fr] gap-4 p-4 items-center shadow-sm rounded-lg shadow-gray-300 animate-pulse">
      <div className="h-4 bg-gray-200 rounded"></div>
      <div>
        <div className="h-5 bg-gray-200 rounded mb-2 w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
      </div>
      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
      <div className="h-8 bg-gray-200 rounded w-3/4"></div>
      <div className="h-8 bg-gray-200 rounded w-8"></div>
    </div>
  );
};


const FAQSkeleton = () => {
  return (
    <div className="max-w-6xl mx-auto bg-white rounded-lg p-6 shadow-gray-200 border bg-gray-40 shadow-md">
      <div className="grid gap-4 shadow-gray-300">
        <div className="grid grid-cols-[0.5fr_2fr_1fr_1fr_0.5fr] gap-2 p-4 bg-gray-200 text-sm font-semibold text-gray-600 border-gray-400 rounded-lg shadow-gray">
          <div>ID</div>
          <div>FAQ Name</div>
          <div>Category</div>
          <div>Status</div>
          <div>Actions</div>
        </div>

        {Array.from({ length: 3 }).map((_, index) => (
          <FAQSkeletonRow key={index} />
        ))}
      </div>
    </div>
  );
};

export default function FAQPage() {
  const [showFilter, setShowFilter] = useState(false);
  const [isAddFAQDrawerOpen, setIsAddFAQDrawerOpen] = useState(false);
  const [isEditFAQDrawerOpen, setIsEditFAQDrawerOpen] = useState(false);
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
    useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [currentFAQToEdit, setCurrentFAQToEdit] = useState<any | null>(null);
  const [faqToDeleteId, setFaqToDeleteId] = useState<string | null>(null);
  const [searchInput, setsearchInput] = useState<string>("");
  const [selectCat, setselectCat] = useState<string>("");
  const [FilterData, setFilterData] = useState<any[]>([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const dispatch = useDispatch<any>();
  const faqselect: any[] = useSelector(selectFaq);
  const [currentPage] = useState(1);
  const loading = useSelector(selectLoading);

  const overall_branch_id = GetLocalStorage("selectedBranchId")
  const overall_istitute_id = GetLocalStorage("instituteId")
  // Function to refresh FAQ list
  const refreshFAQList = () => {
    const ParamsData = {
      branchid: overall_branch_id,
      instituteId: overall_istitute_id,
      page: currentPage,
      perPage: 10,
    };

    dispatch(getAllFaqsThunk(ParamsData));
  };

  useEffect(() => {
    refreshFAQList();
  }, [dispatch, currentPage, overall_branch_id, overall_istitute_id, refreshTrigger]);

  const toggleFilter = () => setShowFilter(!showFilter);

  const handleDeleteClick = (uuid: string) => {
    setFaqToDeleteId(uuid);
    setIsConfirmDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!faqToDeleteId) return;

    try {
      await deleteFaq({ uuid: faqToDeleteId });

      // Close confirmation modal
      setIsConfirmDeleteModalOpen(false);

      // Show success
      setIsSuccessModalOpen(true);

      // Refresh FAQ list
      setRefreshTrigger(prev => prev + 1);
    } catch (error: any) {
      console.error("Failed to delete FAQ:", error.message);
      alert("Failed to delete FAQ: " + error.message);
    }
  };

  const handleSuccessOk = () => {
    setIsSuccessModalOpen(false);
  };

  useEffect(() => {
    (() => {
      if (selectCat !== "" && searchInput !== "") {
        const data = faqselect?.filter((item) => item?.category_id?._id === selectCat && (item?.description?.includes(searchInput) || item?.title?.includes(searchInput)) ? item : null)
        setFilterData(data)
      } else if (selectCat !== "" && searchInput === "") {
        const data = faqselect?.filter((item) => item?.category_id?._id === selectCat ? item : null)
        setFilterData(data)
      } else if (selectCat === "" && searchInput !== "") {
        const data = faqselect?.filter((item) => item?.description?.includes(searchInput) || item?.title?.includes(searchInput) ? item : null)
        setFilterData(data)
      } else {
        setFilterData(faqselect)
      }
    })()
  }, [faqselect, searchInput, selectCat]);
  // Handler for when FAQ is added successfully

  // Handler for when FAQ is edited successfully
  const handleFAQEdited = () => {
    setIsEditFAQDrawerOpen(false);
    setCurrentFAQToEdit(null);
    // Immediately refresh FAQ list to show updated FAQ
    refreshFAQList();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">FAQ</h1>

      <FAQActionBar
        showFilter={showFilter}
        onToggleFilter={toggleFilter}
        onAddFAQClick={() => setIsAddFAQDrawerOpen(true)}
      />

      {showFilter && <FAQFilter
        inputData={searchInput}
        setSearch={setsearchInput}
        setCat={setselectCat}
      />}

      {loading ? (
        <FAQSkeleton />
      ) : (
        <div className=" mx-auto bg-white rounded-lg p-6 shadow-gray-200 border bg-gray-40 shadow-md ">
          <div className="grid gap-4 shadow-gray-300 ">
            {/* Table Header */}
            <div className="grid grid-cols-[0.5fr_2fr_1fr_1fr_0.5fr] gap-2 p-4 bg-gray-200 text-sm font-semibold text-gray-600 border-gray-400 rounded-lg shadow-gray">
              <div>ID</div>
              <div>FAQ Name</div>
              <div>Category</div>
              <div className="text-center">Status</div>
              <div className="text-center">Actions</div>
            </div>

            {/* Table Rows */}
            {FilterData?.length > 0 ? (
              FilterData.map((faq: any, index: number) => (
                <div
                  key={index}
                  className="grid grid-cols-[0.5fr_2fr_1fr_1fr_0.5fr] gap-4 p-4 items-center shadow-sm rounded-lg shadow-gray-300"
                >
                  <div className="text-gray-700">{index + 1}</div>
                  <div>
                    <div className="font-semibold text-gray-800">{faq.title}</div>
                    <div className="text-sm text-gray-500">{faq.description}</div>
                  </div>
                  <div className="text-gray-700">{faq.category_id?.category_name || 'N/A'}</div>

                  {/* Status Centered */}
                  <div className="flex items-center justify-center">
                    <StatusDropdown
                      idx={faq._id}
                      initialStatus={faq.is_active ? "Active" : "Inactive"}
                      options={["Active", "Inactive"]}
                      itemId={faq.uuid}
                      onStatusChange={refreshFAQList}
                    />
                  </div>

                  {/* Actions Centered */}
                  <div className="flex items-center justify-center">
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
                        <DropdownMenuItem
                          onClick={() => handleDeleteClick(faq.uuid)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                No FAQs found. Click "Add FAQ" to create your first FAQ.
              </div>
            )}
          </div>
        </div>
      )}

      <AddFAQDrawer
        open={isAddFAQDrawerOpen}
        onOpenChange={(open) => {
          setIsAddFAQDrawerOpen(open);
          if (!open) {
            // When drawer closes, refresh the list to show any new FAQ
            setTimeout(() => {
              refreshFAQList();
            }, 500);
          }
        }}
      />

      {currentFAQToEdit && (
        <EditFAQDrawer
          open={isEditFAQDrawerOpen}
          onOpenChange={(open) => {
            setIsEditFAQDrawerOpen(open);
            if (!open) {
              setCurrentFAQToEdit(null);
              // When drawer closes, refresh the list to show any updates
              setTimeout(() => {
                refreshFAQList();
              }, 500);
            }
          }}
          faqToEdit={currentFAQToEdit}
          onSuccess={handleFAQEdited}
          onFAQUpdated={refreshFAQList}
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