import { GoPlus } from "react-icons/go";
import { BsSliders } from "react-icons/bs";
import { useState } from "react";
import AddNotes from "../../../components/ContentMangement/Notes/AddNotes";

const Notes = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [showPanel, setShowPanel] = useState(false);

  return (
    <div className=" relative flex flex-col h-fit max-h-fit w-full gap-6">
		 {showPanel && (
        <div
          className="absolute h-[85vh] inset-0 flex justify-end "
          onClick={() => setShowPanel(false)}
        >
          <div
            className="h-[85vh] w-1/3 bg-white shadow-xl rounded-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <AddNotes
			 onClose={() => setShowPanel(false)}
			 />
          </div>
        </div>
      )}
		
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold">Notes</h3>

        <div className="w-full flex justify-between gap-4 items-center text-lg font-semibold">
          {/* Show Filter Button */}
          <div className="bg-[#1BBFCA] text-white p-3 rounded-xl flex gap-4 justify-center items-center ">
            <BsSliders size={20} />
            <button
              onClick={() => setShowFilter((prev) => !prev)}
              className="bg-transparent focus:outline-none"
            >
              {showFilter ? "Hide Filter" : "Show Filter"}
            </button>
          </div>

          {/* Add New Batch Button */}
          <div className="bg-[#1BBFCA] text-white flex items-center justify-center p-3 rounded-xl">
            <button className="flex items-center gap-3 bg-transparent focus:outline-none"
			onClick={() => setShowPanel(true)}>
              <GoPlus size={20} />
              Add New Batch
            </button>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      {showFilter && (
        <div className="flex gap-5 bg-white p-4 justify-between shadow-xl rounded-xl">
          {/* First Filter */}
          <div className="flex-1 p-1 flex flex-col gap-2">
            <label htmlFor="status1">Status</label>
            <select id="status1" className="border h-10 rounded-lg px-2">
              <option value="">Select Status</option>
              <option value="dummy">Dummy</option>
            </select>
          </div>

          {/* Second Filter */}
          <div className="flex-1 p-1 flex flex-col gap-2">
            <label htmlFor="status2">Courses</label>
            <select id="status2" className="border h-10 rounded-lg px-2">
              <option value="">Select Status</option>
              <option value="dummy">Dummy</option>
            </select>
          </div>
        </div>
      )}


	  <div>

	  </div>
    </div>
  );
};

export default Notes;
