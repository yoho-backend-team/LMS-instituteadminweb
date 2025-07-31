import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdDelete, MdEditNote } from "react-icons/md";
import { IoMdClose } from "react-icons/io";

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

  const [formData, setFormData] = useState({
    category: "",
    videoLink: "",
    status: "",
    description: "",
  });

  const handleAddFAQ = () => {
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
    resetForm();
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
  };

  const filteredList = faqList.filter((faq) =>
    faq.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="text-2xl font-bold mb-4">FAQ</div>

      <div className="flex gap-4 mb-6">
        <input
          type="text"
          className="border-2 border-[#1BBFCA] px-4 py-2 appearance-none rounded-xl w-1/4"
          placeholder="Search Category"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          className="bg-teal-400 text-white px-4 py-2 rounded-lg ml-auto"
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
        >
          + Add Question
        </button>
      </div>

      <div className="bg-white p-3 rounded-xl shadow-2xl overflow-visible">
        <table className="min-w-full     text-[#716F6F] text-sm border-separate border-spacing-y-4 relative z-0">
          <thead className="bg-[#F8F8F8] h-16 text-left text-lg font-semibold">
            <tr>
              <th className="px-6 py-3 rounded-l-xl">ID</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">Video Link</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3 rounded-r-xl text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredList.map((faq) => (
              <tr
                key={faq.id}
                className="bg-white/30 shadow-xl backdrop-blur-xl text-md h-24 rounded-xl font-semibold relative overflow-visible"
              >
                <td className="px-6 py-4 rounded-l-xl">{faq.id}</td>
                <td className="px-6 py-4 text-lg">{faq.category}</td>
                <td className="px-6 py-4  underline">
                  <a
                    href={faq.videoLink}
                    target="_blank"
                    rel="noopener noreferrer"
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
                      <div className="absolute grid z-0 gap-2 right-5    bottom-0  mr-2 p-2 w-28 bg-white shadow-md rounded-md border">
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

      {showModal && (
        <div className="fixed inset-0 text-[#716F6F] bg-black bg-opacity-50 flex items-center justify-end z-50">
          <div className="bg-white rounded-xl h-[90vh] p-6 w-[500px] space-y-4 relative">
            <button
              onClick={resetForm}
              className="absolute top-10 right-7 text-gray-500 bg-black rounded-full"
            >
              <IoMdClose size={25} />
            </button>

            <h2 className="text-2xl font-bold">
              {isEditing ? "Edit FAQ" : "Add FAQ"}
            </h2>

            <div className="flex pt-6 flex-col">
              <label className="text-md font-medium">Question</label>
              <input
                type="text"
                className="border border-[#716F6F] w-full mt-2 h-20 px-3 py-2 rounded"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-md font-medium">Answer</label>
              <input
                type="text"
                className="border w-full mt-2 border-[#716F6F] h-20 px-3 py-2 rounded"
                value={formData.videoLink}
                onChange={(e) =>
                  setFormData({ ...formData, videoLink: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-md font-medium">Video Link</label>
              <input
                type="text"
                className="border w-full mt-2 border-[#716F6F] h-20 px-3 py-2 rounded"
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-md font-medium">Category</label>
              <select
                className="border w-full mt-2 border-[#716F6F] h-12 px-3 py-2 rounded"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              >
                <option value=""></option>
                <option value="General">General</option>
                <option value="Technical">Technical</option>
                <option value="Admissions">Admissions</option>
                <option value="Fees">Fees</option>
              </select>
            </div>

            <div className="flex justify-end gap-8 pt-8">
              <button
                onClick={resetForm}
                className="w-28 text-[#1BBFCA] bg-[#1BBFCA1A] font-semibold px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAddFAQ}
                className="bg-[#1BBFCA] text-white w-24 px-4 py-2 font-semibold rounded"
              >
                {isEditing ? "Update" : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddQuestion;
