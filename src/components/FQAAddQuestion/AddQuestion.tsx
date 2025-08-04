import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdDelete, MdEditNote } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import success from '../../assets/tick.png'
import warning from '../../assets/warning.png'
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { selectAddQuestion } from "../../features/HelpManagement/AddQuestion/selector";
import { fetchAddQuestionThunk } from "../../features/HelpManagement/AddQuestion/thunks";

interface FAQItem {
  id: number;
  category: string;
  videoLink: string;
  status: string;
  description: string;
}

const AddQuestion = () => {
  const [faqList, setFaqList] = useState<FAQItem[]>([
    {
      id: 1,
      category: "Classes",
      videoLink: "https://youtu.be/sample1",
      status: "How to Learn",
      description: "Sample Video",
    },
    {
      id: 2,
      category: "Classes",
      videoLink: "https://youtu.be/sample2",
      status: "Classes",
      description: "Class videos to learn",
    },
    {
      id: 3,
      category: "Profile",
      videoLink: "https://youtu.be/9551ymfFXdA?si=5zepu6cwEMD5LT45",
      status: "How to correct",
      description: "Profile",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [dropdownOpenId, setDropdownOpenId] = useState<number | null>(null);
  const [modalStage, setModalStage] = useState<"confirm" | "processing" | "success" | "dialog"| null>(null);

  const [formData, setFormData] = useState({
    category: "",
    videoLink: "",
    status: "",
    description: "",
  });
const dispatch = useDispatch<any>();
  const faqLists = useSelector(selectAddQuestion);

  useEffect(() => {
   const paramsData = {branch: "90c93163-01cf-4f80-b88b-4bc5a5dd8ee4", page: 1}
    dispatch(fetchAddQuestionThunk(paramsData));
  }, [dispatch]);



  const handleAddFAQ = () => {
    setModalStage(null);

    setTimeout(() => {
      if (isEditing && editId !== null) {
        setFaqList((prev) =>
          prev.map((item) =>
            item.id === editId ? { ...item, ...formData } : item
          )
        );
      } else {
        const newItem: FAQItem = {
          id: faqList.length + 1,
          ...formData,
        };
        setFaqList((prev) => [...prev, newItem]);
      }

      setModalStage(null);

      setTimeout(() => {
        resetForm();
        setModalStage(null);
      }, 1500);
    }, 1000);
  };

  const handleEdit = (item: FAQItem) => {
    setIsEditing(true);
    setEditId(item.id);
    setFormData({
      category: item.category,
      videoLink: item.videoLink,
      status: item.status,
      description: item.description,
    });
    setShowModal(true);
    setDropdownOpenId(null);
    setModalStage("confirm");
  };

  const handleDelete = (id: number) => {
    setFaqList((prev) => prev.filter((item) => item.id !== id));
    setDropdownOpenId(null);
  };

  const resetForm = () => {
    setFormData({ category: "", videoLink: "", status: "", description: "" });
    setIsEditing(false);
    setEditId(null);
    setShowModal(false);
    setModalStage("confirm");
  };

  const filteredList = faqLists.filter((faq: any) =>
    faq.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="text-2xl font-bold mb-4">FAQ</div>

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
          <FaPlus className="mt-1.5 mr-2"/> Add Question
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
            {filteredList.map((faq: any) => (
              <tr
                key={faq.id}
                className="bg-white/30 shadow-xl backdrop-blur-xl text-md h-22 rounded-xl font-semibold relative overflow-visible"
              >
                <td className="px-6 py-4 rounded-l-xl">{faq.id}</td>
                <td className="px-6 py-4 text-lg">{faq.category}</td>
                <td className="px-6 py-4 text-lg">
                  <a
                    href={faq.videoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#1BBFCA]"
                  >
                    {faq.videoLink}
                  </a>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <div className="text-lg font-semibold">{faq.status}</div>
                    <div className="text-md">{faq.description}</div>
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
                          onClick={() => handleDelete(faq.id)}
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
   className={`fixed inset-0 bg-black/30 backdrop-blur-md bg-opacity-50 flex items-center ${
  modalStage === "success" || modalStage === "dialog"
    ? "justify-center"
    : "justify-end"
} z-50`}

  >
    <div className="bg-white rounded-xl w-[500px]  p-6 text-center space-y-6 relative">
      

      {/* 🟡 Stage 1: Form */}
      {modalStage === "confirm" && (
        <div>
         <div className="flex"> <h2 className="text-2xl justify-start font-bold">{isEditing ? "Edit Question" : "Add Question"}</h2>
         <button
        onClick={resetForm}
        className="ml-auto h-6 w-6 bg-gray-500 rounded-full right-4 text-black"
      >
        <IoMdClose size={20} className="ml-0.5"/>
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
              <input
                type="text"
                required
                className="w-full border h-18 px-4 py-2 rounded-md"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Video Link</label>
              <input
                type="url"
                required
                className="w-full border  h-18 px-4 py-2 rounded-md"
                value={formData.videoLink}
                onChange={(e) =>
                  setFormData({ ...formData, videoLink: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Status</label>
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
              <label className="block font-semibold mb-1">Description</label>
              <textarea
                required
                className="w-full border h-18 px-4 py-2 rounded-md"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
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
     
     {modalStage === "dialog" && (
  <div className="">
    <img src={warning} alt="" className="ml-28" />
    <h2 className="text-xl h-20 mt-5 font-bold text-gray-800">Confirm Action</h2>
    <p className="text-gray-600 mb-5">Are you sure you want to change the status</p>
    <div className="flex justify-center gap-8 pt-4">
      <button
        onClick={() => {
          setModalStage("success");
          setTimeout(() => {
            if (isEditing && editId !== null) {
              setFaqList((prev) =>
                prev.map((item) =>
                  item.id === editId ? { ...item, ...formData } : item
                )
              );
            } else {
              const newItem: FAQItem = {
                id: faqList.length + 1,
                ...formData,
              };
              setFaqList((prev) => [...prev, newItem]);
            }
          }, 500); // Just for effect, not closing anything now
        }}
        className="px-4 py-2 bg-[#1BBFCA] focus:bg-green-600 text-white rounded"
      >
        Yes Status
      </button>
      <button
        onClick={() => setModalStage("confirm")}
        className="px-4 py-2 bg-gray-300 rounded"
      >
        No
      </button>
    </div>
  </div>
)}

{modalStage === "success" && (
  <div className="text-cente p-6">
    <img
      src={success}
      alt="Success"
      className="w-16 mx-auto mb-4"
    />
    <h2 className="text-xl font-bold text-green-600 mb-2">Success!</h2>
    <p className="text-gray-500 mb-4">FAQ item saved successfully.</p>
    <button
      className="bg-green-500 text-white px-6 py-2 rounded"
      onClick={() => {
        setModalStage(null);
        resetForm(); 
      }}
    >
      OK
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
