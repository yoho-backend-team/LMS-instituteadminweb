import React from "react";
import circle from "../../assets/navbar/circle.png";
import { fetchcommunity, GetCommunityMessageThunks } from "../../features/Community/Reducers/thunks";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
// import { selectcommunity } from "../../features/Community/Reducers/selectors";
import { getCommunityMessage } from "../../features/Community/services";
import type { AppDispatch } from "../../app/store"; 

interface Props {
  selectedBatch: string | null;
  onSelectBatch: (batch: string) => void;
  batches?: Array<{ _id: string; group: string }>;
}

const LeftSide: React.FC<Props> = ({
  selectedBatch,
  onSelectBatch,
  batches = [],
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const individualData = useSelector(getCommunityMessage);

  useEffect(() => {
    dispatch(fetchcommunity({}));
  }, [dispatch]);

  // const onSelectCommunity = async (batch: any) => {
  //   console.log("Batch selected:", batch._id);
  //   onSelectBatch(batch._id);
  //   await dispatch(GetCommunityMessageThunks(batch._id));
  //   console.log(individualData, "individual messages");
  // };

// const onSelectCommunity = (batch: any) => {
//     onSelectBatch(batch._id); // JUST tell parent which batch
//   };

const onSelectCommunity = (batch: any) => {
  console.log("Batch selected:", batch._id);
  onSelectBatch(batch); // triggers useEffect in parent
};



  return (
    <div className="w-[300px] bg-[#1BBFCA] text-white flex flex-col items-center pt-10 px-4 h-[83vh] rounded-lg overflow-y-auto">
      <div className="text-xl text-[#BBFCA] font-bold mr-auto mb-4 -mt-2">
        Batches
      </div>

      <div className="flex flex-col gap-4 w-full">
        {batches.map((batch: any) => (
          <div
            key={batch._id}
            onClick={() => onSelectCommunity(batch)}
            className={`w-[270px] h-[80px] bg-white rounded-xl shadow-md p-3 flex items-center cursor-pointer transition ${
              selectedBatch === batch._id ? "ring-2 ring-cyan-600" : ""
            }`}
          >
            <img
              src={circle}
              alt="batch"
              className="w-12 h-12 rounded-full mr-4"
            />
            <div>
              <p className="text-[#7D7D7D] font-bold text-sm">{batch?.group}</p>
              <p className="text-[#7D7D7D] text-xs">MEAN STACK2024</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeftSide;