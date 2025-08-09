import React, { useState, useEffect } from "react";
import dropdownIcon from "../../assets/navbar/dropdown.png";
import plus from "../../assets/navbar/plus.png";
import edit from "../../assets/navbar/edit.png";
import deleteIcon from "../../assets/navbar/deleteIcon.png";
import button1 from "../../assets/navbar/button1.png";
import cancel from "../../assets/navbar/cancel.png";
import sucess from "../../assets/navbar/sucess.png";
import warning from "../../assets/navbar/warning.png";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { faqCategory } from "../../features/Faq_Category/selector";
import { fetchFaqCategoryThunk } from "../../features/Faq_Category/thunks";

type Category = {
  id: number;
  title: string;
  createdBy: string;
  status: "Active" | "Inactive";
};

const initialCategories: Category[] = [
  { id: 1, title: "Certificate Issue", createdBy: "Sara", status: "Active" },
  { id: 2, title: "Login Issue", createdBy: "Peater", status: "Inactive" },
];

const FaqCategory: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
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

  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [deleteCategoryIndex, setDeleteCategoryIndex] = useState<number | null>(
    null
  );

  const [pendingStatusIndex, setPendingStatusIndex] = useState<number | null>(
    null
  );
  const [pendingNewStatus, setPendingNewStatus] = useState<
    "Active" | "Inactive" | null
  >(null);

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

  const toggleStatus = (index: number) => {
    setOpenStatusIndex(openStatusIndex === index ? null : index);
  };

  const toggleAction = (index: number) => {
    setOpenActionIndex(openActionIndex === index ? null : index);
  };

  const handleStatusChange = (
    index: number,
    newStatus: "Active" | "Inactive"
  ) => {
    setPendingStatusIndex(index);
    setPendingNewStatus(newStatus);
    setIsDeleteConfirmOpen(true);
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
    setNewTitle(category.title);
    setNewDescription("");
    setIsFormOpen(true);
  };


  const handleSubmit = () => {
    if (newTitle.trim() === "") return;

    if (isEditing && editCategoryId !== null) {
      const updatedCategories = categories.map((cat) =>
        cat.id === editCategoryId
          ? { ...cat, title: newTitle, createdBy: cat.createdBy }
          : cat
      );
      setCategories(updatedCategories);
      setIsEditSuccessModalOpen(true);
    } else {
      const newCat: Category = {
        id: categories.length + 1,
        title: newTitle,
        createdBy: "Admin",
        status: "Active",
      };
      setCategories([...categories, newCat]);
      setIsAddSuccessModalOpen(true);
    }

    setNewTitle("");
    setNewDescription("");
    setIsFormOpen(false);
  };

  const openDeleteConfirm = (index: number) => {
    setDeleteCategoryIndex(index);
    setIsDeleteConfirmOpen(true);
    setOpenActionIndex(null);
  };

  const confirmDelete = () => {
    if (pendingStatusIndex !== null && pendingNewStatus !== null) {
      const updated = [...categories];
      updated[pendingStatusIndex].status = pendingNewStatus;
      setCategories(updated);
      setIsDeleteConfirmOpen(false);
      setPendingStatusIndex(null);
      setPendingNewStatus(null);
      return;
    }

    if (deleteCategoryIndex !== null) {
      const updated = categories.filter((_, i) => i !== deleteCategoryIndex);
      setCategories(updated);
      setIsDeleteConfirmOpen(false);
      setDeleteCategoryIndex(null);
      setIsAddSuccessModalOpen(true);
    }
  };

  const cancelDelete = () => {
    setIsDeleteConfirmOpen(false);
    setDeleteCategoryIndex(null);
    setPendingStatusIndex(null);
    setPendingNewStatus(null);
  };

  const filtered = categories.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase())
  );

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
      <div className="bg-[#FDFDFD] rounded-xl p-4 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.03),0px_-4px_24px_0px_rgba(0,0,0,0.03)]">
        <div className="grid grid-cols-4 font-semibold px-4 py-4 text-[#716F6F] bg-gray-100 text-sm rounded-md">
          <div>ID</div>
          <div>Category Name</div>
          <div>Status</div>
          <div>Actions</div>
        </div>
        <div className="flex flex-col gap-3 mt-3">
          {filtered.map((cat, index) => (
            <div
              key={cat.id}
              className="bg-white px-4 py-3 grid grid-cols-4 items-center shadow-[0px_4px_24px_0px_rgba(0,0,0,0.08),0px_-4px_24px_0px_rgba(0,0,0,0.08)]  text-[#7D7D7D]  text-sm rounded-md relative"
            >
              <div>{cat.id}</div>
              <div>
                <p className="font-semibold">{cat.title}</p>
                <p className="text-[#7D7D7D]">{cat.createdBy}</p>
              </div>

              {/* Status Dropdown */}
              <div className="relative">
                <button
                  className="flex items-center gap-1 text-sm"
                  onClick={() => toggleStatus(index)}
                >
                  {cat.status}
                  <img src={dropdownIcon} alt="dropdown" className="w-3 h-3" />
                </button>

                {openStatusIndex === index && (
                  <div className="absolute mt-2 bg-white rounded-lg shadow-md p-2 z-50 w-[120px]">
                    <button
                      onClick={() => handleStatusChange(index, "Active")}
                      className="bg-[#1BBFCA] text-white w-full py-2 rounded-lg mb-2"
                    >
                      Active
                    </button>
                    <button
                      onClick={() => handleStatusChange(index, "Inactive")}
                      className="bg-[#1BBFCA] text-white w-full py-2 rounded-lg"
                    >
                      Inactive
                    </button>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="text-left relative">
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
                      }}
                    >
                      <img src={edit} alt="Edit" className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => openDeleteConfirm(index)}
                      className="flex items-center gap-2 px-4 py-2 text-[#7D7D7D] w-full text-left hover:bg-gray-100 rounded-md mt-1"
                    >
                      <img src={deleteIcon} alt="Delete" className="w-4 h-4" />
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
        <div className="fixed inset-0 bg-[#7D7D7D] bg-opacity-40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow_0px_4px_24px_0px_#00000026 relative  ">
            <h2 className="text-xl text-[#716F6F] font-bold mb-4">
              {isEditing ? "Edit FAQ Category" : "Add FAQ Category"}
            </h2>
            <button
              className="absolute top-4 right-4"
              onClick={() => setIsFormOpen(false)}
            >
              <img src={cancel} alt="Cancel" className="h-4 w-4" />
            </button>

            <label className="block mb-2 text-sm  text-[#7D7D7D] font-medium">
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
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm text-center shadow-lg h-auto overflow-hidden">
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
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm text-center shadow-lg h-auto overflow-hidden">
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

      {/* Delete  */}
      {isDeleteConfirmOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md text-center shadow-xl relative">
            <img
              src={warning}
              alt="Warning"
              className="mx-auto w-20 h-20 mb-4"
            />
            <h2 className="text-2xl font-semibold text-[#716F6F] mb-2">
              {pendingStatusIndex !== null
                ? "Confirm Status Change"
                : "Confirm Delete"}
            </h2>
            <p className="text-[#7D7D7D] mb-6">
              {pendingStatusIndex !== null
                ? `Are you sure you want to change the status to "${pendingNewStatus}"?`
                : "Are you sure you want to delete this category?"}
            </p>
            <div className="flex justify-center gap-8">
              <button
                className="bg-[#1BBFCA] text-white  hover:bg-[#3ABE65]     rounded-xl px-6 py-2"
                onClick={confirmDelete}
              >
                Yes,Status
              </button>
              <button
                className="border border-[#1BBFCA] text-[#1BBFCA] bg-[#E6FBFD] hover:bg-[#d1f5f8] font-semibold px-6 py-2 rounded-lg"
                onClick={cancelDelete}
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
