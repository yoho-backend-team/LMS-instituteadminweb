import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdDelete, MdEditNote } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import success from "../../assets/tick.png";
import warning from "../../assets/warning.png";
import { FaPlus, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { faqCategory } from "../../features/Faq_Category/selector";
import { fetchHelpCenterThunk } from "../../features/HelpCenter/thunks";
import { selectFaq } from "../../features/HelpCenter/selector";
import {
  createHelpCenter,
  deleteHelpCenter,
  updateHelpCenter,
} from "../../features/HelpCenter/service";
import { fetchFaqCategoryThunk } from "../../features/Faq_Category/thunks";
import { GetLocalStorage } from "../../utils/localStorage";
import toast from "react-hot-toast";

const AddQuestion = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editUuid, setEditUuid] = useState<string | null>(null);
  const [dropdownOpenId, setDropdownOpenId] = useState<number | null>(null);
  const [modalStage, setModalStage] = useState<
    "confirm" | "processing" | "success" | "dialog" | null
  >(null);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const categories = useSelector(faqCategory);
  const dispatch = useDispatch<any>();
  const questions = useSelector(selectFaq);
  const [videoLinkError, setVideoLinkError] = useState("");




  const [formData, setFormData] = useState({
    category: "",
    videoLink: "",
    status: "",
    description: "",
  });

  const overall_branch_id = GetLocalStorage("selectedBranchId");
  const overall_istitute_id = GetLocalStorage("instituteId");
  const overall_institute_id = GetLocalStorage("institute_Id");

  const isValidVideoLink = (url: string) => {
  // Example pattern: allow YouTube, Vimeo, etc.
  const videoPattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be|vimeo\.com)\/.+$/i;
  return videoPattern.test(url);
};


  useEffect(() => {
    const params = {
      branchid: overall_branch_id,
      instituteid: overall_istitute_id,
      page: 1,
      perPage: 10,
    };
    setLoading(true);
    dispatch(fetchHelpCenterThunk(params)).finally(() => setLoading(false));
  }, [dispatch]);

  useEffect(() => {
    const params = {
      branchid: overall_branch_id,
      instituteid: overall_istitute_id,
      page: 1,
      perPage: 10,
    };
    dispatch(fetchFaqCategoryThunk(params));
  }, [dispatch]);

  const handleAddFAQ = async () => {
  if (!isValidVideoLink(formData.videoLink)) {
    setVideoLinkError("Please enter a valid YouTube or Vimeo link.");
    return;
  } else {
    setVideoLinkError("");
  }

  setModalStage("processing");
    const payload = {
      category: formData.category,
      videolink: formData.videoLink,
      question: formData.status,
      answer: formData.description,
      branch_id: overall_branch_id,
      institute_id: overall_institute_id,
    };

    try {
      await createHelpCenter(payload);
      setSuccessMessage("Question Added Successfully!");
      setModalStage("success");
      setLoading(true);
      dispatch(
        fetchHelpCenterThunk({
          branchid: overall_branch_id,
          instituteid: overall_istitute_id,
          page: 1,
          perPage: 10,
        })
      ).finally(() => setLoading(false));
    } catch (err) {
      console.error("Error creating FAQ:", err);
      alert("Failed to create FAQ.");
      setModalStage("confirm");
    }
  };

  const handleEdit = (item: any) => {
    setIsEditing(true);
    setEditUuid(item.uuid);
    setFormData({
      category: item.category,
      videoLink: item.videolink,
      status: item.question,
      description: item.answer,
    });
    setShowModal(true);
    setDropdownOpenId(null);
    setModalStage("confirm");
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteHelpCenter(id);
       toast.success("FAQ deleted successfully!");
      setLoading(true);
      dispatch(
        fetchHelpCenterThunk({
          branchid: overall_branch_id,
          instituteid: overall_istitute_id,
          page: 1,
          perPage: 10,
        })
      ).finally(() => setLoading(false));
    } catch (error) {
      console.error("Failed to delete FAQ:", error);
       toast.error("Failed to delete FAQ. Please try again."); 
    } finally {
      setDropdownOpenId(null);
    }
  };

  const resetForm = () => {
    setFormData({ category: "", videoLink: "", status: "", description: "" });
    setIsEditing(false);
    setEditUuid(null);
    setShowModal(false);
    setModalStage("confirm");
    setSuccessMessage("");
  };

 const handleUpdateQuestion = async () => {
  if (!isValidVideoLink(formData.videoLink)) {
    setVideoLinkError("Please enter a valid link.");
    return;
  } else {
    setVideoLinkError("");
  }
    if (isEditing && editUuid !== null) {
      try {
        const updateData = {
          category: formData.category,
          videolink: formData.videoLink,
          question: formData.status,
          answer: formData.description,
        };

        await updateHelpCenter(updateData, editUuid);
        toast.success("Question updated successfully!");
        setSuccessMessage("Question Updated Successfully!");
        setModalStage("success");

        dispatch(
          fetchHelpCenterThunk({
            branchid: overall_branch_id,
            instituteid: overall_istitute_id,
            page: 1,
            perPage: 10,
          })
        );

        setIsEditing(false);
        setEditUuid(null);
        setFormData({
          category: "",
          status: "",
          description: "",
          videoLink: "",
        });
      } catch (error) {
        console.error("Update failed:", error);
        toast.error("Update failed. Please try again.");
        alert("Update failed. Please try again.");
        setModalStage("confirm");
      }
    }
  };

  const filteredList = questions.filter((faq: any) =>
    faq.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

 
  const totalPages = Math.ceil(filteredList.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredList.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

 
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  return (
    <div className="px-4 py-6 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <div className="text-2xl font-bold mb-4">FAQ</div>

     
      <div className="flex flex-wrap sm:flex-nowrap gap-4 mb-6">
        <input
          type="text"
          className="border-2 font-semibold border-[#1BBFCA] px-4 py-2 rounded-xl flex-grow min-w-[180px]"
          placeholder="Search Category"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          className="flex bg-teal-400 text-white text-lg px-4 py-2 rounded-lg ml-auto layout"
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
        >
          <FaPlus className="mt-1.5 mr-2" /> Add Question
        </button>
      </div>

      <div className="bg-white p-3 sm:p-4 md:p-6 rounded-xl shadow-lg overflow-x-scroll relative">
        <table className="min-w-full md:min-w-[640px] lg:w-full text-[#716F6F] text-sm sm:text-base border-separate border-spacing-y-4">
          <thead className="bg-[#F8F8F8] text-left text-base sm:text-lg font-semibold">
            <tr>
              <th className="px-4 sm:px-6 py-3">ID</th>
              <th className="px-4 sm:px-6 py-3">Category</th>
              <th className="px-4 sm:px-6 py-3">Video Link</th>
              <th className="px-4 sm:px-6 py-3">Question</th>
              <th className="px-4 sm:px-6 py-3">Answer</th>
              <th className="px-4 sm:px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              [...Array(5)].map((_, i) => (
                <tr key={i} className="animate-pulse relative">
                  <td className="px-4 sm:px-6 py-4">
                    <div className="h-4 bg-gray-300 rounded w-12"></div>
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <div className="h-4 bg-gray-300 rounded w-24"></div>
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <div className="h-4 bg-gray-300 rounded w-36"></div>
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <div className="h-6 bg-gray-300 rounded w-40"></div>
                    <div className="h-4 bg-gray-200 rounded w-28 mt-2"></div>
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <div className="h-4 bg-gray-300 rounded w-40"></div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 text-right">
                    <div className="h-6 w-6 bg-gray-300 rounded-full ml-auto"></div>
                  </td>
                </tr>
              ))
            ) : currentItems.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 sm:px-6 py-8 text-center">
                  <div className="text-gray-500 text-lg font-semibold">No Data Found</div>
                </td>
              </tr>
            ) : (
              currentItems.map((faq: any) => (
                <tr
                  key={faq.uuid || faq.id}
                  className="relative bg-white shadow-sm rounded-lg"
                >
                  <td className="px-4 sm:px-6 py-4">{faq.id}</td>
                  <td className="px-4 sm:px-6 py-4 break-words">{faq.category}</td>
                  <td className="px-4 sm:px-6 py-4 break-words max-w-[160px]">
                  <a
                    href={faq.videolink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#1BBFCA] block"
                  >
                    {faq.videolink}
                  </a>
                </td>
                  <td className="px-4 sm:px-6 py-4 break-words">
                  <div className="font-semibold">{faq.question}</div>
                </td>
                  <td className="px-4 sm:px-6 py-4 max-w-[200px] break-words ">
                    <div className="text-sm">{faq.answer}</div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 text-right relative">
                    <div className="flex justify-end">
                      <button
                        onClick={() =>
                          setDropdownOpenId((prev) => (prev === faq.id ? null : faq.id))
                        }
                        className="p-1"
                      >
                        <BsThreeDotsVertical className="text-[#1BBFCA]" size={20} />
                      </button>

                      {/* Dropdown */}
                      {dropdownOpenId === faq.id && (
                        <div className="absolute z-50 right-4 top-full mt-2 w-40 bg-white border rounded-md shadow-xl">
                          <button
                            onClick={() => handleEdit(faq)}
                            className="block w-full text-left px-4 py-2 hover:bg-[#1BBFCA] hover:text-white flex items-center gap-2"
                          >
                            <MdEditNote size={18} /> Edit
                          </button>
                          <button
                            onClick={() => handleDelete(faq.uuid)}
                            className="block w-full text-left px-4 py-2 hover:bg-[#1BBFCA] hover:text-white flex items-center gap-2"
                          >
                            <MdDelete size={18} /> Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination */}
        {!loading && filteredList.length > 0 && (
          <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
            <div className="text-sm text-gray-600">
              Showing {startIndex + 1} to {Math.min(endIndex, filteredList.length)} of {filteredList.length} entries
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className={`p-2 rounded ${
                  currentPage === 1 
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                }`}
              >
                <FaChevronLeft size={14} />
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-1 rounded ${
                    currentPage === page
                      ? "bg-[#1BBFCA] text-white"
                      : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                  }`}
                >
                  {page}
                </button>
              ))}
              
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`p-2 rounded ${
                  currentPage === totalPages
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                }`}
              >
                <FaChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center z-50 px-4"
        >
          <div className="bg-white rounded-xl w-full max-w-md sm:max-w-lg lg:max-w-xl p-6 mx-auto space-y-6">
            {modalStage === "confirm" && (
              <div>
                <div className="flex items-center">
                  <h2 className="text-2xl font-bold">
                    {isEditing ? "Edit Question" : "Add Question"}
                  </h2>
                  <button
                    onClick={resetForm}
                    className="ml-auto h-8 w-8 flex items-center justify-center bg-gray-300 rounded-full"
                  >
                    <IoMdClose size={20} />
                  </button>
                </div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (isEditing) {
                      setModalStage("dialog");
                    } else {
                      handleAddFAQ();
                    }
                  }}
                  className="space-y-4 mt-4"
                >
                  <div>
                    <label className="block font-semibold mb-1">Category</label>
                    <select
                      required
                      className="w-full border px-3 py-2 rounded-md"
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                    >
                      <option value="" disabled>
                        Select a category
                      </option>
                      {categories?.map((cat: any) => (
                        <option key={cat.id} value={cat.category_name}>
                          {cat.category_name}
                        </option>
                      ))}
                    </select>
                  </div>
                 <div>
  <label className="block font-semibold mb-1">Video Link</label>
  <input
    type="url"
    required
    className={`w-full border px-3 py-2 rounded-md ${
      videoLinkError ? "border-red-500" : "border-gray-300"
    }`}
    value={formData.videoLink}
    onChange={(e) => {
      const value = e.target.value;
      setFormData({ ...formData, videoLink: value });

      // Validate link
      if (!isValidVideoLink(value)) {
        setVideoLinkError("Please enter a valid link.");
      } else {
        setVideoLinkError("");
      }
    }}
  />

  {/* ✅ Show error below input */}
  {videoLinkError && (
    <p className="text-red-500 text-sm mt-1">{videoLinkError}</p>
  )}
</div>

                  <div>
                    <label className="block font-semibold mb-1">Question</label>
                    <input
                      type="text"
                      required
                      className="w-full border px-3 py-2 rounded-md"
                      value={formData.status}
                      onChange={(e) =>
                        setFormData({ ...formData, status: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Answer</label>
                    <textarea
                      required
                      className="w-full border px-3 py-2 rounded-md resize-none"
                      rows={4}
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="flex justify-end gap-4 pt-4">
                    <button
                      type="button"
                      onClick={resetForm}
                      className="bg-gray-200 text-gray-800 px-4 py-2 rounded"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-[#1BBFCA] text-white px-4 py-2 rounded"
                    >
                      {isEditing ? "Update" : "Submit"}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {modalStage === "dialog" && (
              <div className="flex flex-col items-center">
                <img src={warning} alt="Warning" className="w-12 h-12 mb-4" />
                <p className="text-lg font-semibold mb-2">Are you sure?</p>
                <p className="text-sm text-gray-600 mb-6">
                  You want to update this question.
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={() => setModalStage("confirm")}
                    className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdateQuestion}
                    className="bg-[#2AAA94] hover:bg-[#28907f] text-white px-4 py-2 rounded-md"
                  >
                    Yes, Update
                  </button>
                </div>
              </div>
            )}

            {modalStage === "processing" && (
              <div className="flex flex-col items-center">
                <div className="loader mb-4"></div>
                <p className="text-lg font-semibold mb-2">Processing...</p>
                <p className="text-sm text-gray-600">
                  Please wait while we process your request.
                </p>
              </div>
            )}

            {modalStage === "success" && (
              <div className="flex flex-col items-center">
                <img src={success} alt="Success" className="w-12 h-12 mb-4" />
                <p className="text-lg font-semibold mb-2">{successMessage}</p>
                <p className="text-sm text-gray-600 mb-6">
                  {isEditing
                    ? "The question has been successfully updated."
                    : "The question has been successfully added."}
                </p>
                <button
                  onClick={resetForm}
                  className="bg-[#2AAA94] hover:bg-[#28907f] text-white px-4 py-2 rounded-md"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AddQuestion;