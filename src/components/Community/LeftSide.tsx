/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import circle from "../../assets/navbar/circle.png";
import { fetchcommunity } from "../../features/Community/Reducers/thunks";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectcommunity } from "../../features/Community/Reducers/selectors";

interface Props {
  selectedBatch: string;
  onSelectBatch: (batch: string) => void;
  instituteId: string;
}



const LeftSide: React.FC<Props> = ({ selectedBatch, onSelectBatch }) => {


  const batches = useSelector(selectcommunity)

  const dispatch = useDispatch<any>()
  useEffect(() => {
    dispatch(fetchcommunity({}));
  }, [dispatch]);
  return (
    <div className="w-[300px] bg-[#1BBFCA] text-white flex flex-col items-center pt-10 px-4 h-[83vh] rounded-lg overflow-y-auto">
      <div className="text-xl text-[#BBFCA] font-bold mr-auto mb-4 -mt-2">
        Batches
      </div>

      <div className="flex flex-col gap-4 w-full">
        {batches.map((batch: string, index: number) => (
          <div
            key={index}
            onClick={() => onSelectBatch(batch)}
            className={`w-[270px] h-[80px] bg-white rounded-xl shadow-md p-3 flex items-center cursor-pointer transition ${selectedBatch === batch ? "ring-2 ring-cyan-600" : ""
              }`}
          >
            <img
              src={circle}
              alt="batch"
              className="w-12 h-12 rounded-full mr-4"
            />
            <div>
              <p className="text-[#7D7D7D] font-bold text-sm">{batch?.group}</p>
              <p className="text-[#7D7D7D] text-xs">Batch Description</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeftSide;
