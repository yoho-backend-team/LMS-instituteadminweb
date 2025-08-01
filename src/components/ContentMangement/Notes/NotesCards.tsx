import { useEffect, useRef, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { IoIosEye } from "react-icons/io";
import { IoDocument } from "react-icons/io5";
import { MdCastForEducation } from "react-icons/md";
import { SlOptionsVertical } from "react-icons/sl";

const NoteCard = ({
  title,
  isActive,
  fileName,
  index,
  openIndex,
  setOpenIndex,
  onEdit,
  onDelete,
  onView
}: {
  title: string;
  course: string;
  isActive: boolean;
  index: number;
  fileName: string;
  openIndex: number | null;
  setOpenIndex: (i: number | null) => void;
  onEdit: () => void;
  onDelete: () => void;
  onView: () => void;
}) => {
  const [active, setActive] = useState(isActive);
  const optionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        optionsRef.current &&
        !optionsRef.current.contains(event.target as Node)
      ) {
        setOpenIndex(null);
      }
    };

    if (openIndex === index) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openIndex, index, setOpenIndex]);

  return (
    <div className="relative border p-4 rounded-xl bg-white shadow-lg flex flex-col gap-3">
      <div className="flex justify-end">
        <button
          onClick={() => setOpenIndex(openIndex === index ? null : index)}
        >
          <SlOptionsVertical className="text-[#1BBFCA]" />
        </button>

        {openIndex === index && (
          <div
            className="absolute top-10 right-2 bg-white rounded-xl shadow-xl p-4 w-50 z-10 text-[#716F6F]"
            ref={optionsRef}
          >
            <div
              className="hover:bg-[#00CFFF] hover:text-white border px-4 py-2 rounded-md cursor-pointer mb-2 flex items-center gap-2"
              onClick={() => {
                onView(); 
                setOpenIndex(null); 
              }}
            >
              <IoIosEye size={20} />
              <p> View Notes</p>
            </div>

            <div
              className="border px-4 py-2 rounded-md hover:bg-[#00CFFF] hover:text-white cursor-pointer mb-2 flex items-center gap-2"
              onClick={onEdit}
            >
              <FaEdit size={20} />
              Edit Notes
            </div>
            <div
              className="border px-4 py-2 rounded-md hover:bg-[#00CFFF] hover:text-white cursor-pointer flex items-center gap-2"
              onClick={onDelete}
            >
              <FaTrash size={20} />
              Delete Notes
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 text-[#716F6F]">
        <IoDocument />
        <p className="font-semibold">{fileName?.split('/').pop() || "No file uploaded"}</p>
      </div>

      <div className="flex items-center gap-2 text-[#716F6F]">
        <MdCastForEducation />
        <p>{title}</p>
      </div>

      <div className="flex justify-between items-center pt-2">
        <div className="flex items-center gap-2">
          <p
            className={`text-sm font-medium ${
              active ? "text-[#3ABE65]" : "text-red-500"
            }`}
          >
            {active ? "Active" : "Inactive"}
          </p>

          <span
            className={`w-3 h-3 rounded-full ${
              active ? "bg-[#3ABE65] " : "bg-red-500"
            }`}
          />
        </div>

        <label className="relative inline-block w-11 h-6 cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={active}
            onChange={() => setActive(!active)}
          />
          <div className="w-full h-full bg-gray-200 rounded-full peer-checked:bg-green-500 transition-colors duration-300" />
          <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 peer-checked:translate-x-2.5" />
        </label>
      </div>
    </div>
  );
};

export default NoteCard;
