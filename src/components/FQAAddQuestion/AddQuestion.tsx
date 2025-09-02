/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdDelete, MdEditNote } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import success from "../../assets/tick.png";
import warning from "../../assets/warning.png";
import { FaPlus } from "react-icons/fa";
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

const AddQuestion = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editUuid, setEditUuid] = useState<string | null>(null);
  const [dropdownOpenId, setDropdownOpenId] = useState<number | null>(null);
  const [modalStage, setModalStage] = useState<
    "confirm" | "processing" | "success" | "dialog" | null
  >(null);
  const [loading, setLoading] = useState(true); // Skeleton loader state

  const categories = useSelector(faqCategory);
  const dispatch = useDispatch<any>();
  const questions = useSelector(selectFaq);

  const [formData, setFormData] = useState({
    category: "",
    videoLink: "",
    status: "",
    description: "",
  });

  useEffect(() => {
    const params = {
      branchid: "90c93163-01cf-4f80-b88b-4bc5a5dd8ee4",
      instituteid: "973195c0-66ed-47c2-b098-d8989d3e4529",
      page: 1,
      perPage: 10,
    };

    setLoading(true);
    dispatch(fetchHelpCenterThunk(params)).finally(() => setLoading(false));
  }, [dispatch]);

  useEffect(() => {
    const params = {
      branchid: "90c93163-01cf-4f80-b88b-4bc5a5dd8ee4",
      instituteid: "973195c0-66ed-47c2-b098-d8989d3e4529",
      page: 1,
      perPage: 10,
    };
    dispatch(fetchFaqCategoryThunk(params));
  }, [dispatch]);

  const handleAddFAQ = async () => {
    setModalStage("processing");
    const payload = {
      category: formData.category,
      videolink: formData.videoLink,
      question: formData.status,
      answer: formData.description,
      branch_id: '"90c93163-01cf-4f80-b88b-4bc5a5dd8ee4"',
      institute_id: "67f3a26df4b2c530acd16419",
    };

    try {
      await createHelpCenter(payload);
      setModalStage("success");
      setLoading(true);
      dispatch(
        fetchHelpCenterThunk({
          branchid: "90c93163-01cf-4f80-b88b-4bc5a5dd8ee4",
          instituteid: "973195c0-66ed-47c2-b098-d8989d3e4529",
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
      setLoading(true);
      dispatch(
        fetchHelpCenterThunk({
          branchid: "90c93163-01cf-4f80-b88b-4bc5a5dd8ee4",
          instituteid: "973195c0-66ed-47c2-b098-d8989d3e4529",
          page: 1,
          perPage: 10,
        })
      ).finally(() => setLoading(false));
    } catch (error) {
      console.error("Failed to delete FAQ:", error);
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
  };

  const filteredList = questions.filter((faq: any) =>
    faq.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="text-2xl font-bold mb-4">FAQ</div>

      {/* Search + Add */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          className="border-2 font-semibold border-[#1BBFCA] px-4 py-2 appearance-none rounded-xl w-1/4"
          placeholder="Search Category"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          className="flex bg-teal-400 text-white w-42 text-lg px-4 py-2 rounded-lg ml-auto"
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
        >
          <FaPlus className="mt-1.5 mr-2" /> Add Question
        </button>
      </div>

      <div className="bg-white p-3 rounded-xl shadow-2xl overflow-visible">
        <table className="min-w-full text-[#716F6F] text-sm border-separate border-spacing-y-4 relative z-0">
          <thead className="bg-[#F8F8F8] h-18 text-left text-lg font-semibold">
            <tr className="text-xl">
              <th className="px-6 py-3 rounded-l-xl">ID</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">Video Link</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3 rounded-r-xl text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading
              ? [...Array(5)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-6 py-4">
                      <div className="h-4 bg-gray-300 rounded w-12"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-gray-300 rounded w-24"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-gray-300 rounded w-36"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-6 bg-gray-300 rounded w-40"></div>
                      <div className="h-4 bg-gray-200 rounded w-28 mt-2"></div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="h-6 w-6 bg-gray-300 rounded-full ml-auto"></div>
                    </td>
                  </tr>
                ))
              : filteredList.map((faq: any) => (
                  <tr
                    key={faq.uuid || faq.id}
                    className="bg-white/30 shadow-xl backdrop-blur-xl text-md h-22 rounded-xl font-semibold relative overflow-visible"
                  >
                    <td className="px-6 py-4 rounded-l-xl">{faq.id}</td>
                    <td className="px-6 py-4 text-lg">{faq.category}</td>
                    <td className="px-6 py-4 text-lg">
                      <a
                        href={faq.videolink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[#1BBFCA]"
                      >
                        {faq.videolink}
                      </a>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-lg font-semibold">
                          {faq.question}
                        </div>
                        <div className="text-md">{faq.answer}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 rounded-r-xl relative overflow-visible">
                      <div className="flex justify-end relative">
                        <button
                          onClick={() =>
                            setDropdownOpenId((prev) =>
                              prev === faq.id ? null : faq.id
                            )
                          }
                        >
                          <BsThreeDotsVertical
                            className="text-[#1BBFCA]"
                            size={23}
                          />
                        </button>
                        {dropdownOpenId === faq.id && (
                          <div className="absolute grid z-0 gap-2 right-5 bottom-0 mr-2 p-2 w-28 bg-white shadow-md rounded-md border">
                            <button
                              className="w-full border rounded-lg text-left px-4 py-2 hover:bg-[#1BBFCA] hover:text-white flex items-center gap-2"
                              onClick={() => handleEdit(faq)}
                            >
                              <MdEditNote /> Edit
                            </button>
                            <button
                              className="w-full border rounded-lg text-left px-4 py-2 hover:bg-[#1BBFCA] hover:text-white flex items-center gap-2"
                              onClick={() => handleDelete(faq.uuid)}
                            >
                              <MdDelete /> Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>


      {/* Modal */}
      {showModal && (
        <div
          className={`fixed inset-0 bg-black/30 backdrop-blur-md bg-opacity-50 flex items-center ${modalStage === "success" || modalStage === "dialog" || modalStage === "processing"
            ? "justify-center"
            : "justify-end"
            } z-50`}
        >
          <div className="bg-white rounded-xl w-[500px] p-6 text-center space-y-6 relative">
            {/* Form Stage */}
            {modalStage === "confirm" && (
              <div>
                <div className="flex">
                  <h2 className="text-2xl justify-start font-bold">
                    {isEditing ? "Edit Question" : "Add Question"}
                  </h2>
                  <button
                    onClick={resetForm}
                    className="ml-auto h-6 w-6 bg-gray-500 rounded-full right-4 text-black"
                  >
                    <IoMdClose size={20} className="ml-0.5" />
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
                  className="space-y-4 mt-5 text-left"
                >
                  <div>
                    <label className="block font-semibold mb-1">Category</label>
                    <select
                      required
                      className="w-full border h-18 px-4 py-2 rounded-md"
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                    >
                      <option value="" disabled>
                        Select a category
                      </option>
                      {categories?.map((cat: any) => (
                        <option key={cat.id} value={cat.name}>
                          {cat.category_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">
                      Video Link
                    </label>
                    <input
                      type="url"
                      required
                      className="w-full border h-18 px-4 py-2 rounded-md"
                      value={formData.videoLink}
                      onChange={(e) =>
                        setFormData({ ...formData, videoLink: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Question</label>
                    <input
                      type="text"
                      required
                      className="w-full border h-18 px-4 py-2 rounded-md"
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
                      className="w-full border h-18 px-4 py-2 rounded-md"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="pt-4 flex justify-end gap-4">
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

            {/* Confirmation Dialog - Updated to use UUID */}
            {modalStage === "dialog" && (
              <div className="flex flex-col items-center justify-center p-6">
                <img src={warning} alt="Warning" className="w-12 h-12 mb-4" />
                <p className="text-lg font-semibold mb-2">Are you sure?</p>
                <p className="text-sm text-gray-600 mb-6">
                  You want to update status of this question.
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={() => setModalStage("confirm")}
                    className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={async () => {
                      if (isEditing && editUuid !== null) {
                        try {
                          const updateData = {
                            category: formData.category,
                            videolink: formData.videoLink,
                            question: formData.status,
                            answer: formData.description,
                          };

                          await updateHelpCenter(updateData, editUuid);

                          dispatch(
                            fetchHelpCenterThunk({
                              branchid: "90c93163-01cf-4f80-b88b-4bc5a5dd8ee4",
                              instituteid:
                                "973195c0-66ed-47c2-b098-d8989d3e4529",
                              page: 1,
                              perPage: 10,
                            })
                          );

                          setModalStage("success");
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
                          alert("Update failed. Please try again.");
                          setModalStage("confirm");
                        }
                      }
                    }}
                    className="bg-[#2AAA94] hover:bg-[#28907f] text-white px-4 py-2 rounded-md"
                  >
                    Yes Status
                  </button>
                </div>
              </div>
            )}

            {modalStage === "processing" && (
              <div className="flex flex-col items-center justify-center p-6">
                <div className="loader mb-4"></div>
                <p className="text-lg font-semibold mb-2">Processing...</p>
                <p className="text-sm text-gray-600">
                  Please wait while we update your request.
                </p>
              </div>
            )}

            {modalStage === "success" && (
              <div className="flex flex-col items-center justify-center p-6">
                <img src={success} alt="Success" className="w-12 h-12 mb-4" />
                <p className="text-lg font-semibold mb-2">Status Updated</p>
                <p className="text-sm text-gray-600 mb-6">
                  The status has been successfully updated.
                </p>
                <button
                  onClick={resetForm} // Use resetForm to properly close modal
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
