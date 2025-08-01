
import React from "react";
import circle from "../../assets/navbar/circle.png";

interface Props {
  batches: string[];
  selectedBatch: string | null;
  onSelectBatch: (batch: string) => void;
}

const LeftSide: React.FC<Props> = ({ selectedBatch, onSelectBatch }) => {
  const batch = "MERN 2025"; 

  return (
    <div className="w-[300px] bg-[#1BBFCA]  fixed  text-white flex flex-col items-center pt-6 px-4 h-[79vh] rounded-lg overflow-hidden top-6  mt-18 ">
      <div className="text-xl  text-[#BBFCA] font-bold  mr-47 ">Batches</div>

      <div
  onClick={() => onSelectBatch(batch)}
  className={`w-[270px] h-[80px] bg-white rounded-xl shadow-md p-3 flex items-center cursor-pointer transition ${
    selectedBatch === batch ? "ring-2 ring-cyan-600" : ""
  }`}
>
        <img
                src={circle}
                alt="batch"
                className="w-12 h-12 rounded-full mr-4"
              />
        <div>
          <p className="text-gray-800 font-bold  text-sm">{batch}</p>
                <p className="text-gray-500 text-xs">
                  {batch === "MERN 2025" ? "MEAN STACK 2024" : "MERN 2025"}
                </p>
        </div>
      </div>
    </div>
  );
};

export default LeftSide;
