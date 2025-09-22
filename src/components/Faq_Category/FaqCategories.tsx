/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import dropdownIcon from "../../assets/navbar/dropdown.png";
import plus from "../../assets/navbar/plus.png";
import edit from "../../assets/navbar/edit.png";
import deleteIcon from "../../assets/navbar/deleteIcon.png";
import button1 from "../../assets/navbar/button1.png";
import cancel from "../../assets/navbar/Cancel.png";
import sucess from "../../assets/navbar/sucess.png";
import warning from "../../assets/navbar/warning.png";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { faqCategory } from "../../features/Faq_Category/selector";
import { fetchFaqCategoryThunk } from "../../features/Faq_Category/thunks";
import {
  createFaqCategories,
  deleteFaqCategories,
  updateFaqCategories,
} from "../../features/Faq_Category/service";
import { GetLocalStorage } from "../../utils/localStorage";

type Category = {
  id: number;
  uuid: string;
  title: string;
  category_name: string;
  description: string;
  is_active: boolean;
  createdBy?: string;
  status?: "Active" | "Inactive";
};

const FaqCategory: React.FC = () => {
  const [openStatusIndex, setOpenStatusIndex] = useState<number | null>(null);
  const [openActionIndex, setOpenActionIndex] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isAddSuccessModalOpen, setIsAddSuccessModalOpen] = useState(false);
  const [isEditSuccessModalOpen, setIsEditSuccessModalOpen] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState<number | null>(null);

  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [selectedUUid, setSelectedUUId] = useState<any>();

  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [deleteCategoryUuid, setDeleteCategoryUuid] = useState<string | null>(
    null
  );

  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch<any>();
  const category = useSelector(faqCategory);

  useEffect(() => {
    if (
      isFormOpen ||
      isAddSuccessModalOpen ||
      isEditSuccessModalOpen ||
      isDeleteConfirmOpen
    ) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [
    isFormOpen,
    isAddSuccessModalOpen,
    isEditSuccessModalOpen,
    isDeleteConfirmOpen,
  ]);

  useEffect(() => {
    const params = {
      branchid: GetLocalStorage("selectedBranchId"),
      instituteid: GetLocalStorage("instituteId"),
      page: 1,
      perPage: 10,
    };

    setLoading(true);
    dispatch(fetchFaqCategoryThunk(params)).finally(() => setLoading(false));
  }, [dispatch]);

  const toggleStatus = (index: number) => {
    setOpenStatusIndex(openStatusIndex === index ? null : index);
  };

  const toggleAction = (index: number) => {
    setOpenActionIndex(openActionIndex === index ? null : index);
  };

  const overall_branch_id = GetLocalStorage("selectedBranchId");
  const overall_istitute_id = GetLocalStorage("instituteId");
  console.log(overall_branch_id, "branch id ");
  console.log(overall_istitute_id, "institute id");

  const handleStatusChange = async (
    newStatus: "Active" | "Inactive",
    uuid: string
  ) => {
    const payload = { is_active: newStatus === "Active" };
    try {
      await updateFaqCategories(uuid, payload);
      dispatch(
        fetchFaqCategoryThunk({
          branchid: overall_branch_id,
          instituteid: overall_istitute_id,
          page: 1,
          perPage: 10,
        })
      );
    } catch (error) {
      console.error("Failed to update status:", error);
      alert("Failed to update status. Please try again.");
    }
    setOpenStatusIndex(null);
  };

  const openAddForm = () => {
    setIsEditing(false);
    setEditCategoryId(null);
    setNewTitle("");
    setNewDescription("");
    setIsFormOpen(true);
  };

  const openEditForm = (category: Category) => {
    setIsEditing(true);
    setEditCategoryId(category.id);
    setNewTitle(category.category_name || "");
    setNewDescription(category.description || "");
    setSelectedUUId(category.uuid);
    setIsFormOpen(true);
  };

  useEffect(() => {
    const params = {
      branchid: overall_branch_id,
      instituteid: overall_istitute_id,
      page: 1,
      perPage: 10,
    };

    setLoading(true);
    dispatch(fetchFaqCategoryThunk(params)).finally(() => setLoading(false));
  }, [dispatch, overall_branch_id, overall_istitute_id]);

  const handleSubmit = async () => {
    if (newTitle.trim() === "") return;

    if (isEditing && editCategoryId !== null) {
      const uuid = selectedUUid;
      await updateFaqCategories(uuid, {
        category_name: newTitle,
        description: newDescription,
      });
      setIsEditSuccessModalOpen(true);
      setSelectedUUId(null);
    } else {
      const payload = {
        category_name: newTitle,
        description: newDescription,
        branchid: overall_branch_id,
        institute_id:
          "67f3a26df4b2c530acd16419" /*973195c0-66ed-47c2-b098-d8989d3e4529 institute
         id in console --> but here different isntitute id that'y didn't replace*/,
      };
      try {
        await createFaqCategories(payload);
        dispatch(
          fetchFaqCategoryThunk({
            branchid: overall_branch_id,
            instituteid: overall_istitute_id,
            page: 1,
            perPage: 10,
          })
        );
        setIsAddSuccessModalOpen(true);
      } catch (error) {
        console.error("Failed to add FAQ category:", error);
        alert("Failed to add FAQ category. Please try again.");
      }
    }

    setNewTitle("");
    setNewDescription("");
    setIsFormOpen(false);
  };

  const openDeleteConfirm = (uuid: string) => {
    setDeleteCategoryUuid(uuid);
    setIsDeleteConfirmOpen(true);
    setOpenActionIndex(null);
  };

  const confirmDelete = async () => {
    if (!deleteCategoryUuid) return;
    try {
      await deleteFaqCategories(deleteCategoryUuid);
      dispatch(
        fetchFaqCategoryThunk({
          branchid: overall_branch_id,
          instituteid: overall_istitute_id,
          page: 1,
          perPage: 10,
        })
      );
      setIsAddSuccessModalOpen(true);
    } catch (error) {
      console.error("Delete failed:", error);
    }
    setIsDeleteConfirmOpen(false);
    setDeleteCategoryUuid(null);
  };

  const cancelDelete = () => {
    setIsDeleteConfirmOpen(false);
    setDeleteCategoryUuid(null);
  };

  const filtered = Array.isArray(category)
    ? category.filter((c: any) =>
      c?.category_name?.toLowerCase()?.includes(search.toLowerCase())
    )
    : [];

  return (
    <div className="w-full h-fit bg-white font-poppins py-6 px-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <h1 className="text-2xl font-bold">FAQ Category</h1>
        <button
          className="bg-[#1BBFCA] text-white px-4 py-2 rounded-md text-sm flex items-center gap-2"
          onClick={openAddForm}
        >
          <img src={plus} alt="Add" className="w-4 h-4" />
          Add FAQ Category
        </button>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search Category"
        className="border border-[#1BBFCA] px-4 py-2 rounded-md w-full max-w-xs mb-4 focus:outline-none"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Table */}
      <div className="bg-[#FDFDFD] rounded-xl p-4 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.08),0px_-4px_24px_0px_rgba(0,0,0,0.08)]">
        <div className="grid grid-cols-4 font-semibold px-4 py-4 text-[#716F6F] bg-gray-100 text-sm rounded-md">
          <div>ID</div>
          <div className="">Category Name</div>
          <div className=""> Status</div>
          <div className="text-right">Actions</div>
        </div>
        <div className="flex flex-col gap-3 mt-3">
          {loading
            ? Array.from({ length: 5 }).map((_, idx) => (
              <div
                key={idx}
                className="bg-white px-4 py-3 grid grid-cols-4 items-center shadow text-sm rounded-md animate-pulse"
              >
                <div className="h-4 w-6 bg-gray-200 rounded"></div>
                <div>
                  <div className="h-4 w-32 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 w-24 bg-gray-200 rounded"></div>
                </div>
                <div className="h-4 w-20 bg-gray-200 rounded"></div>
                <div className="h-4 w-16 bg-gray-200 rounded"></div>
              </div>
            ))
            : filtered.map((cat: any, index: any) => (
              <div
                key={cat.id}
                className="bg-white px-4 py-3 grid grid-cols-4 items-center shadow text-[#7D7D7D] text-sm rounded-md relative"
              >
                <div>{cat.id}</div>
                <div>
                  <p className="font-semibold">{cat.category_name}</p>
                  <p className="text-[#7D7D7D]">{cat.description}</p>
                </div>

                {/* Status Dropdown */}
                <div className="relative">
                  <button
                    className={`flex items-center gap-1 text-sm ${cat.is_active ? "text-green-600" : "text-red-600"
                      }`}
                    onClick={() => toggleStatus(index)}
                  >
                    {cat.is_active ? "Active" : "Inactive"}
                    <img
                      src={dropdownIcon}
                      alt="dropdown"
                      className="w-3 h-3"
                    />
                  </button>

                  {openStatusIndex === index && (
                    <div className="absolute mt-2 bg-white rounded-lg shadow-md p-2 z-50 w-[120px]">
                      <button
                        onClick={() =>
                          handleStatusChange("Active", cat?.uuid)
                        }
                        className="bg-[#1BBFCA] text-white w-full py-2 rounded-lg mb-2"
                      >
                        Active
                      </button>
                      <button
                        onClick={() =>
                          handleStatusChange("Inactive", cat.uuid)
                        }
                        className="bg-[#1BBFCA] text-white w-full py-2 rounded-lg"
                      >
                        Inactive
                      </button>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="text-right relative ">
                  <img
                    src={button1}
                    alt="options"
                    className="w-5 h-5 inline-block cursor-pointer"
                    onClick={() => toggleAction(index)}
                  />
                  {openActionIndex === index && (
                    <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-md p-2 z-50 w-[150px]">
                      <button
                        className="flex items-center gap-2 px-4 py-2 text-[#7D7D7D] w-full text-left hover:bg-gray-100 rounded-md"
                        onClick={() => {
                          openEditForm(cat);
                          setOpenActionIndex(null);
                          setSelectedUUId(cat.uuid);
                        }}
                      >
                        <img src={edit} alt="Edit" className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => openDeleteConfirm(cat.uuid)}
                        className="flex items-center gap-2 px-4 py-2 text-[#7D7D7D] w-full text-left hover:bg-gray-100 rounded-md mt-1"
                      >
                        <img
                          src={deleteIcon}
                          alt="Delete"
                          className="w-4 h-4"
                        />
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-[#7D7D7D] bg-opacity-40 flex items-center justify-end z-50 px-4 ">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow relative  h-[90%]">
            <h2 className="text-xl text-[#716F6F] font-bold mb-4">
              {isEditing ? "Edit FAQ Category" : "Add FAQ Category"}
            </h2>
            <button
              className="absolute top-4 right-4"
              onClick={() => setIsFormOpen(false)}
            >
              <img src={cancel} alt="Cancel" className="h-4 w-4" />
            </button>
            <label className="block mb-2 text-sm text-[#7D7D7D] font-medium">
              Category
            </label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="border border-gray-400 w-full px-4 py-2 rounded mb-4"
            />
            <label className="block mb-2 text-sm text-[#7D7D7D] font-medium">
              Description
            </label>
            <input
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              className="border border-gray-400 w-full px-4 py-2 rounded mb-6"
            />
            <div className="flex justify-end gap-4">
              <button onClick={() => setIsFormOpen(false)}></button>
              <button
                onClick={handleSubmit}
                className="bg-[#1BBFCA] text-white px-6 py-2 rounded"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Success Modal */}
      {isAddSuccessModalOpen && (
        <div className="fixed inset-0 w-screen h-screen bg-black bg-opacity-40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm text-center shadow-lg h-[90%]">
            <img
              src={sucess}
              alt="Success"
              className="mx-auto w-20 h-20 mb-4"
            />
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              FAQ Category Added!
            </h2>
            <button
              onClick={() => setIsAddSuccessModalOpen(false)}
              className="bg-green-500 text-white px-6 py-2 rounded"
            >
              Ok
            </button>
          </div>
        </div>
      )}

      {/* Edit Success Modal */}
      {isEditSuccessModalOpen && (
        <div className="fixed inset-0 w-screen h-screen bg-black bg-opacity-40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm text-center shadow-lg mt-10">
            <img
              src={sucess}
              alt="Success"
              className="mx-auto w-20 h-20 mb-4"
            />
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              FAQ Category Updated!
            </h2>
            <button
              onClick={() => setIsEditSuccessModalOpen(false)}
              className="bg-green-500 text-white px-6 py-2 rounded"
            >
              Ok
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteConfirmOpen && (
        <div className="fixed inset-0 w-screen h-screen bg-black bg-opacity-40 flex items-center justify-center z-50 px-4">
          {" "}
          <div className="bg-white rounded-2xl p-6 w-full max-w-md text-center shadow-xl relative">
            <img
              src={warning}
              alt="Warning"
              className="mx-auto w-20 h-20 mb-4"
            />
            <h2 className="text-2xl font-semibold text-[#716F6F] mb-2">
              Confirm Delete
            </h2>
            <p className="text-[#7D7D7D] mb-6">
              Are you sure you want to delete this category?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmDelete}
                className="bg-red-500 hover:bg-[#3ABE65] text-white font-semibold px-6 py-2 rounded-lg"
              >
                Yes, Delete
              </button>
              <button
                onClick={cancelDelete}
                className="border border-[#1BBFCA] text-[#1BBFCA] bg-[#E6FBFD] hover:bg-[#d1f5f8] font-semibold px-6 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FaqCategory;
