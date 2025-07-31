import React from 'react'
import { IoAdd } from "react-icons/io5";
import StatsCard from '../../../components/Usermanagement/Group/StatsCard';

function Group() {
  return (
	<>
	<div>
		<p>Group</p>
		<button><IoAdd />Add New Group</button>
	</div>
	<div>
		{<StatsCard/>}
	</div>
	</>
  )
}

export default Group