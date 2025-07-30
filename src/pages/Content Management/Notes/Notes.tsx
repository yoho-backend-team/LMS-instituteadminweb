import { GoPlus } from "react-icons/go";
import { BsSliders } from "react-icons/bs";

const Notes = () => {
  return (
	<div className='flex flex-col gap-3 '>
		<h3>Notes</h3>
		<div className='w-full flex justify-between gap-4 border items-center'>
			<div className='bg-[#1BBFCA] text-white w-25'>
				<button className='flex items-center gap-3 '>
					<BsSliders/>
					Show Filter
				</button>
			</div>
			<div className='bg-[#1BBFCA] text-white w-15'>
				<button className='flex items-center gap-3 '>
					<GoPlus />
					Add New Batch
				</button>
			</div>
		</div>
	</div>
  )
}

export default Notes