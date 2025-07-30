
import { useState } from 'react';
import ClassBatch from '../../../components/class management/offlineClass/studentbatchcard';
import { Button } from "../../../components/ui/button";
import { FONTS } from "../../../constants/uiConstants";
import plus from "../../../assets/Add.png";
import filter from "../../../assets/Filter.png";
import { CreateOfflineClassModal } from '../../../components/class management/offlineClass/createOfflineClass';
import  {  BatchClassCard } from '../../../components/class management/offlineClass/classcard'
const OfflineClasses = () => {
 const [showFilter, setShowFilter] = useState(false);
 const [showCreateModal, setShowCreateModal] = useState(false);

	return <div>
	

         <div
      className="min-h-screen bg-cover bg-no-repeat bg-center p-4"
      // style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="mb-8">
        <h2 className=" mb-6" style={{...FONTS.heading_01}}>Offline Class</h2>

        <div className="flex justify-between items-center">
          <Button
            onClick={() => setShowFilter(!showFilter)}
            className="bg-[#1BBFCA] hover:bg-[#1BBFCA]  text-white  px-4 flex items-center gap-2"style={{...FONTS.heading_07}}
          >
            <img src={filter} className="w-4 h-4" />
            {showFilter ? "Hide Filter" : "Show Filter"}
          </Button>

          <Button className="bg-[#1BBFCA] hover:bg-[#1BBFCA] text-white  px-4 flex items-center gap-2" style={{...FONTS.heading_07}}
          onClick={() => setShowCreateModal(true)}>
            <img src={plus} className="w-4 h-4" />
            Add OfflineClass 
          </Button>
        </div>
      </div>


      {showFilter && (
        <div className="bg-[white] p-6 rounded-2xl shadow mb-8">
          <h3 className=" mb-4"style={{...FONTS.heading_04}}>Filter</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-1"style={{...FONTS.heading_07}}>Status</label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
                <option value=""> Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
			 <div>
              <label className="block mb-1"style={{...FONTS.heading_07}}>Batches</label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
                <option value="">Select Batchs</option>
                <option value="active">Batch 1</option>
                <option value="inactive">Batch 2</option>
				 <option value="inactive">Batch 3</option>
				  <option value="inactive">Batch 4</option>
				   <option value="inactive">Batch 5</option>
              </select>
            </div>

            <div>
              <label className="block mb-1"style={{...FONTS.heading_07}}>Search class</label>
              <input type="text" placeholder="Undefined" className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" />
            </div>
          </div>
        </div>
      )}

         <div className="flex gap-6 flex-wrap">
               <BatchClassCard
                 title="MERN 2025"
                 subtitle="MERN STACK 2024"
                 students={2}
                 startDate="April 7, 2025"
                 endDate="April 7, 2025"
                 status="Active"
               />
               <BatchClassCard
                 title="MERN 2025"
                 subtitle="MERN STACK 2024"
                 students={2}
                 startDate="April 7, 2025"
                 endDate="April 7, 2025"
                 status="Active"
               />
             </div>
      <CreateOfflineClassModal isOpen={showCreateModal} setIsOpen={setShowCreateModal} />
      
    </div>

		<div><ClassBatch/></div>
	</div>;
};

export default OfflineClasses;
