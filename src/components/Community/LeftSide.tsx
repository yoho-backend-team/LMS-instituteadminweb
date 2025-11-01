/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import circle from "../../assets/navbar/circle.png";
import { useDispatch, useSelector } from "react-redux";
import {
  selectcommunity,
  selectLoading,
} from "../../features/Community/Reducers/selectors";
import { fetchCommunity } from "../../features/Community/Reducers/thunks";
import { GetImageUrl } from "../../utils/helper";

interface Props {
  selectedBatch: any;
  onSelectBatch: (batch: any) => void;
  instituteId: any;
}

// Skeleton Loader Component
const BatchSkeleton = () => {
  return (
    <div className="w-[270px] h-[80px] bg-white rounded-xl shadow-md p-3 flex items-center animate-pulse">
      <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
      <div className="flex-1">
        <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>
  );
};

const LeftSide: React.FC<Props> = ({ selectedBatch, onSelectBatch }) => {
  const batches = useSelector(selectcommunity);
  const dispatch = useDispatch<any>();
  const loading = useSelector(selectLoading);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    dispatch(fetchCommunity({}));
  }, [dispatch]);

  // Check if screen is mobile size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 425);
    };

    // Initial check
    checkScreenSize();

    // Add event listener
    window.addEventListener('resize', checkScreenSize);

    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleBatchClick = (batch: any) => {
    onSelectBatch(batch);
    
    // Hide left side on mobile after selection
    if (isMobile) {
      // You can either hide this component or let the parent handle the layout
      // Option 1: Hide this component (requires parent state management)
      // Option 2: Add a CSS class to hide it
      const leftSide = document.querySelector('.left-side-container');
      if (leftSide) {
        leftSide.classList.add('hidden');
      }
    }
  };

  // If on mobile and a batch is selected, don't render the left side
  if (isMobile && selectedBatch) {
    return null;
  }

  return (
    <div className="left-side-container w-[300px] bg-[#1BBFCA] text-white flex flex-col items-center pt-5 px-4 h-[83vh] rounded-lg overflow-y-auto">
      <div className="text-xl text-[#BBFCA] font-bold mr-auto mb-4 -mt-2">
        Batches
      </div>

      <div className="flex flex-col gap-4 w-full">
        {loading ? (
          // Show skeleton loaders when loading
          Array.from({ length: 5 }).map((_, index) => (
            <BatchSkeleton key={index} />
          ))
        ) : batches.length === 0 ? (
          <div className="text-white text-center py-4">
            No batches available
          </div>
        ) : (
          batches.map((batch: any, index: number) => (
            <div
              key={index}
              onClick={() => handleBatchClick(batch)}
              className={`h-[80px] w-[270px] sm:w-[220px] lg:[270px] bg-white rounded-xl shadow-md p-3 flex items-center cursor-pointer transition ${
                selectedBatch?._id === batch._id ? "ring-2 ring-cyan-600" : ""
              }`}
            >
              <img
                src={GetImageUrl(batch?.groupimage) ?? circle}
                alt="batch"
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <p className="text-[#7D7D7D] font-bold text-sm">
                  {batch?.group}
                </p>
                <p className="text-[#7D7D7D] text-xs">{batch?.last_message?.message ?? "no message"}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LeftSide;