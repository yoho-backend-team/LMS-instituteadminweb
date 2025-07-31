import React from 'react'
import { IoAdd } from "react-icons/io5";
import StatsCard from '../../../components/Usermanagement/Group/StatsCard';

function Group() {
  return (
	<>
	<div className='flex justify-between'>
		<p>Group</p>
		   {/* Add New Group Button */}
      <div className="">
        <button className="px-6 py-2 bg-[#10CFC9] text-white rounded-md hover:bg-[#0db5bb] transition text-sm font-semibold">
          + Add New Group
        </button>
      </div>
	</div>
	<div>
		{<StatsCard/>}
	</div>
	</>
  )
}

export default Group