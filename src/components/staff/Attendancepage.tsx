
import { useState } from "react"

const Attendancepage = () => {

    const [openModal, setopenModal] = useState(false);

    const days: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

    const date: number[] = [29, 30, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 1, 2]

    return (
        <div className='w-full'>

            <div className="w-full grid grid-cols-2 mt-5">
                <p className="col-span-1 text-center text-[#716F6F] font-semibold text-[22px]">July 2025</p>
                <div className="w-full grid grid-cols-4 gap-5 **:w-full **:h-[47px] **:justify-center **:flex **:items-center **:border **:rounded-md">
                    <div className="border-[#1BBFCA] bg-[#1BBFCA1A] text-[#1BBFCA]">Monthly</div>
                    <div className="border-[#716F6F] bg-[#716F6F1A] text-[#716F6F]">Week</div>
                    <div className="border-[#716F6F] bg-[#716F6F1A] text-[#716F6F]">Day</div>
                    <div className="border-[#716F6F] bg-[#716F6F1A] text-[#716F6F]">List</div>
                </div>
            </div>

            <div className="grid grid-cols-7 h-[47px] w-full gap-5 mt-5">
                {
                    days.map((items, index) => (
                        <div key={index}
                            className="border border-[#BDC2C7BF] flex justify-center items-center rounded-md font-semibold text-lg text-[#716F6F]"
                        >
                            {items}
                        </div>
                    ))
                }
            </div>

            <div className="grid grid-cols-7 h-[47px] w-full gap-5 mt-5 **:w-full **:h-[80px]">
                {
                    date.map((items, index) => (
                        <div key={index}
                            className="border border-[#BDC2C7BF] flex justify-center items-center rounded-md font-semibold text-lg text-[#716F6F]"
                        >
                            {items}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Attendancepage;