import { ArrowLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const Placementview = () => {
    const location = useLocation();
    const placement = location.state?.placement;
    const navigate = useNavigate();

    return (
        <div className="p-4 sm:p-6 space-y-6">
            {/* Back Button */}
            <div
                onClick={() => navigate(-1)}
                className='text-[#1BBFCA] hover:bg-[#1BBFCA]/80 hover:text-white w-fit p-2 rounded-lg transition-colors duration-200 cursor-pointer'
            >
                <ArrowLeft size={24} className="sm:w-10 sm:h-10" />
            </div>

            {/* Company & Job Details */}
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Company Details */}
                <div className="bg-white shadow rounded-lg p-4 sm:p-6 flex-1">
                    <h2 className="text-lg sm:text-xl font-bold mb-4">Company Details</h2>
                    <div className="space-y-3 sm:space-y-2">
                        <div className="grid grid-cols-1 sm:grid-cols-[140px_10px_1fr] gap-1 sm:gap-2 items-start">
                            <span className="font-semibold text-sm sm:text-base">Company Name</span>
                            <span className="hidden sm:inline">:</span>
                            <span className="text-sm sm:text-base">{placement?.company?.name || "N/A"}</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-[140px_10px_1fr] gap-1 sm:gap-2 items-start">
                            <span className="font-semibold text-sm sm:text-base">Company Address</span>
                            <span className="hidden sm:inline">:</span>
                            <span className="text-sm sm:text-base">{placement?.company?.address || "N/A"}</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-[140px_10px_1fr] gap-1 sm:gap-2 items-start">
                            <span className="font-semibold text-sm sm:text-base">Contact Email</span>
                            <span className="hidden sm:inline">:</span>
                            <span className="text-sm sm:text-base break-all">{placement?.company?.email || "N/A"}</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-[140px_10px_1fr] gap-1 sm:gap-2 items-start">
                            <span className="font-semibold text-sm sm:text-base">Contact Number</span>
                            <span className="hidden sm:inline">:</span>
                            <span className="text-sm sm:text-base">{placement?.company?.phone || "N/A"}</span>
                        </div>
                    </div>
                </div>

                {/* Job Details */}
                <div className="bg-white shadow rounded-lg p-4 sm:p-6 flex-1">
                    <h2 className="text-lg sm:text-xl font-bold mb-4">Job Details</h2>
                    <div className="space-y-3 sm:space-y-2">
                        <div className="grid grid-cols-1 sm:grid-cols-[100px_10px_1fr] gap-1 sm:gap-2 items-start">
                            <span className="font-semibold text-sm sm:text-base">Job Name</span>
                            <span className="hidden sm:inline">:</span>
                            <span className="text-sm sm:text-base">{placement?.job?.name || "N/A"}</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-[100px_10px_1fr] gap-1 sm:gap-2 items-start">
                            <span className="font-semibold text-sm sm:text-base">Job Description</span>
                            <span className="hidden sm:inline">:</span>
                            <span className="text-sm sm:text-base">{placement?.job?.description || "N/A"}</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-[100px_10px_1fr] gap-1 sm:gap-2 items-start">
                            <span className="font-semibold text-sm sm:text-base">Skills</span>
                            <span className="hidden sm:inline">:</span>
                            <span className="text-sm sm:text-base">{placement?.job?.skils?.join(", ") || "N/A"}</span>
                        </div>
                    </div>
                </div>
            </div>

            <hr className="border-gray-300 my-4 sm:my-6" />

            {/* Student & Interview Details */}
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Student Details */}
                <div className="bg-white shadow rounded-lg p-4 sm:p-6 flex-1">
                    <h2 className="text-lg sm:text-xl font-bold mb-4">
                        Student Details (Total-{placement?.student?.length || 0})
                    </h2>
                    <div className="max-h-64 overflow-y-auto space-y-3">
                        {placement?.student?.map((stud: any) => (
                            <div
                                key={stud?._id}
                                className="pb-3 border-b border-gray-200 last:border-none"
                            >
                                <div className="grid grid-cols-1 sm:grid-cols-[140px_10px_1fr] gap-1 sm:gap-2 items-start">
                                    <span className="font-semibold text-sm sm:text-base">Student Name</span>
                                    <span className="hidden sm:inline">:</span>
                                    <span className="text-sm sm:text-base">{stud ? stud.full_name : "N/A"}</span>
                                </div>
                            </div>
                        ))}
                        {(!placement?.student || placement.student.length === 0) && (
                            <p className="text-gray-500 text-sm">No students assigned</p>
                        )}
                    </div>
                </div>

                {/* Interview Details */}
                <div className="bg-white shadow rounded-lg p-4 sm:p-6 flex-1">
                    <h2 className="text-lg sm:text-xl font-bold mb-4">Interview Details</h2>
                    <div className="space-y-3 sm:space-y-2">
                        <div className="grid grid-cols-1 sm:grid-cols-[140px_10px_1fr] gap-1 sm:gap-2 items-start">
                            <span className="font-semibold text-sm sm:text-base">Interview Date</span>
                            <span className="hidden sm:inline">:</span>
                            <span className="text-sm sm:text-base">
                                {placement?.schedule?.interviewDate
                                    ? new Date(placement.schedule.interviewDate).toLocaleDateString("en-GB", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                    })
                                    : "N/A"}
                            </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-[140px_10px_1fr] gap-1 sm:gap-2 items-start">
                            <span className="font-semibold text-sm sm:text-base">Venue</span>
                            <span className="hidden sm:inline">:</span>
                            <span className="text-sm sm:text-base">{placement?.schedule?.venue || "N/A"}</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-[140px_10px_1fr] gap-1 sm:gap-2 items-start">
                            <span className="font-semibold text-sm sm:text-base">Address</span>
                            <span className="hidden sm:inline">:</span>
                            <span className="text-sm sm:text-base">{placement?.schedule?.address || "N/A"}</span>
                        </div>
                    </div>
                </div>
            </div>

            <hr className="border-gray-300 my-4 sm:my-6" />

            {/* Eligibility Criteria */}
            <div className="bg-white shadow rounded-lg p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-bold mb-4">Eligibility Criteria</h2>
                <div className="space-y-3 sm:space-y-2">
                    <div className="grid grid-cols-1 sm:grid-cols-[120px_10px_1fr] gap-1 sm:gap-2 items-start">
                        <span className="font-semibold text-sm sm:text-base">Course name</span>
                        <span className="hidden sm:inline">:</span>
                        <span className="text-sm sm:text-base">{placement?.eligible?.courseName || "N/A"}</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-[120px_10px_1fr] gap-1 sm:gap-2 items-start">
                        <span className="font-semibold text-sm sm:text-base">Education</span>
                        <span className="hidden sm:inline">:</span>
                        <span className="text-sm sm:text-base">
                            {Array.isArray(placement?.eligible?.education) 
                                ? placement.eligible.education.join(", ")
                                : placement?.eligible?.education || "N/A"}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Placementview;