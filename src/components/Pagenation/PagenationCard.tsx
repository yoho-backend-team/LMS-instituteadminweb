import React from 'react'

interface props {
    page: number;
    perpage: number;
    totalpage: number;
    setpage: (data: number) => void
}

const PagenationCard: React.FC<props> = ({ page, setpage, perpage, totalpage }) => {

    const handelpages = (types: string) => {
        switch (types) {
            case "next":
                if (page <= totalpage) {
                    setpage(page + 1)
                }
                break;
            case "prev":
                if (page != 0) {
                    setpage(page - 1)
                }
                break;
            default:
                console.warn("pagenation error")
                break;
        }
    }

    return (
        <>
            <div className="flex flex-col items-center mt-2">
                <span className="text-sm text-gray-700 dark:text-gray-400">
                    Page <span className="font-semibold text-gray-900">{page}</span> to <span className="font-semibold text-gray-900 ">{totalpage}</span> of <span className="font-semibold text-gray-900">{perpage}</span> per page
                </span>
                <div className="inline-flex mt-2 xs:mt-0">
                    <button onClick={() => handelpages("prev")} className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-[#1BBFCA] rounded-s hover:bg-[#1BBFCA]">
                        <svg className="w-3.5 h-3.5 me-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4" />
                        </svg>
                        Prev
                    </button>
                    <button onClick={() => handelpages("next")} className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-[#1BBFCA]  border-0 border-s border-gray-700 rounded-e hover:bg-[#1BBFCA]">
                        Next
                        <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                    </button>
                </div>
            </div>
        </>
    )
}

export default PagenationCard