import { ArrowLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const Placementview = () => {
    const location = useLocation();
    const placement = location.state?.placement;

    console.log("Placement Data:", placement);

     const navigate = useNavigate()
    return (

        <div>
             <div
                onClick={() => navigate(-1)}
                className=' text-[#1BBFCA] hover:bg-[#1BBFCA]/80 hover:text-white w-fit mb-4'>
                <ArrowLeft size={50} style={{ width: "40px", height: "40px" }} />
            </div>
            <div>welcome view page</div>
            <div className="flex justify-between p-6 bg-white shadow rounded-lg">
                <div className="w-1/2 pr-6 border-r">
                    <h2 className="text-xl font-bold mb-4">Company Details</h2>
                    <div className="grid grid-cols-[180px_10px_1fr] gap-y-2">
                        <span className="font-semibold">Company Name</span>
                        <span>:</span>
                        <span>{placement?.company?.name}</span>

                        <span className="font-semibold">Company Address</span>
                        <span>:</span>
                        <span>{placement?.company?.address}</span>
                        <span className="font-semibold">Contac Email</span>
                        <span>:</span>
                        <span>{placement?.company?.email}</span>
                        <span className="font-semibold">Contact Number</span>
                        <span>:</span>
                        <span>{placement?.company?.phone}</span>                    </div>
                </div>

                <div className="w-1/2 pl-6">
                    <h2 className="text-xl font-bold mb-4">Job Details</h2>
                    <div className="grid grid-cols-[180px_10px_1fr] gap-y-2">
                        <span className="font-semibold">Job Name</span>
                        <span>:</span>
                        <span>{placement?.job?.name}</span>
                        <span className="font-semibold">Job Description</span>
                        <span>:</span>
                        <span>{placement?.job?.description}</span>
                        <span className="font-semibold">Skills</span>
                        <span>:</span>
                        <span>{placement?.job?.skils?.join(", ")}</span>                                           </div>
                </div>
            </div>

            <hr className="text-gray-700 w-full border-4 my-6" />

            <div className="flex justify-between p-6 bg-white shadow rounded-lg">
                <div className="flex justify-between p-6 bg-white shadow rounded-lg">
                    <div className=" pr-6 border-r">
                        <h2 className="text-xl font-bold mb-4">
                            Student Details (Total-{placement?.student?.length || 0})
                        </h2>
                        <div className="max-h-64 overflow-y-auto pr-2 w-full">
                            {placement?.student?.map((stud:any) => {
                                return (
                                    <div
                                        key={stud?._id }
                                        className="grid grid-cols-[180px_10px_1fr] gap-y-2 mb-4 pb-2 border-b border-gray-200 last:border-none"
                                    >
                                        <span className="font-semibold">Student Name</span>
                                        <span>:</span>
                                        <span>{stud ? stud.full_name : "N/A"}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>



                <div className="w-1/2 pl-6">
                    <h2 className="text-xl font-bold mb-4">Interview Details</h2>
                    <div className="grid grid-cols-[180px_10px_1fr] gap-y-2">
                        <span className="font-semibold">Interview Date</span>
                        <span>:</span>
                        <span>
                            {placement?.schedule?.interviewDate
                                ? new Date(placement.schedule.interviewDate).toLocaleDateString("en-GB", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                })
                                : "N/A"}
                        </span>
                        <span className="font-semibold">Venue</span>
                        <span>:</span>
                        <span>{placement?.schedule?.venue}</span>
                        <span className="font-semibold">Address</span>
                        <span>:</span>
                        <span>{placement?.schedule?.address}</span>
                    </div>
                </div>
            </div>

            <hr className="text-gray-700 w-full border-4 my-6" />

            <div className="flex justify-between p-6 bg-white shadow rounded-lg">
                <div className="w-1/2 pr-6 border-r">
                    <h2 className="text-xl font-bold mb-4">Eligibility Criteria</h2>
                    <div className="grid grid-cols-[180px_10px_1fr] gap-y-2">
                        <span className="font-semibold">Course name</span>
                        <span>:</span>
                        <span>{placement?.eligible?.courseName}</span>
                        <span className="font-semibold">Education</span>
                        <span>:</span>
                        <span>{placement?.eligible?.education}</span>
                    </div>
                </div>
            </div>
        </div>


    )
}
export default Placementview