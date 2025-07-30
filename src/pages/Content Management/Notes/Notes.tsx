import { GoPlus } from "react-icons/go";
import { BsSliders } from "react-icons/bs";
import { useState } from "react";

const Notes = () => {
  const [showFilter, setShowFilter] = useState(false);
  return (
    <div className="flex flex-col gap-3 ">
      <div className="flex flex-col gap-4">
        <h3>Notes</h3>
        <div className="w-full flex justify-between gap-4  items-center ">
          <div className="bg-[#1BBFCA] text-white w-45 items-center  p-2 rounded-xl flex gap-4 justify-center">
            <BsSliders />
            <button onClick={() => setShowFilter((prev) => !prev)}>
              {showFilter ? "Hide Filter" : "Show Filter"}
            </button>
          </div>
          <div className="bg-[#1BBFCA] text-white w-45 flex items-center justify-center p-2 rounded-xl">
            <button className="flex items-center gap-3 w-full  ">
              <GoPlus size={20} />
              Add New Batch
            </button>
          </div>
        </div>
      </div>

	  {showFilter&&(
		 <div className="flex gap-5 bg-white p-2 rounded-sm">
			<div className="flex-1 p-1 flex flex-col gap-2">
				<label htmlFor="">

				</label>
			</div>

		</div>
	  )}
    </div>
  );
};

export default Notes;
