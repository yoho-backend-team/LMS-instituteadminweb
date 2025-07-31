
import { FaStar } from "react-icons/fa";

interface ModuleCardProps {
    title: string;
    courseName: string;
    description: string;
    isActive: boolean;
    fileUrl?: string;
    fileName: string;
    branch: string;
}



const ViewModule = ({

    title,
    courseName,
    description,
    isActive,
    fileUrl,
    fileName,
    branch,
}: ModuleCardProps) => {
     console.log("ViewModule Props:", {
        title,
        courseName,
        description,
        isActive,
        fileUrl,
        fileName,
        branch
    });
    return (
        <div className="relative w-[400px] bg-white rounded-lg  p-4 ">

            {/* <div className="w-full h-40 bg-gray-300 rounded-md mb-4" /> */}
            <div className="w-full h-40 bg-gray-300 rounded-md mb-4">{fileName} {fileUrl}{branch}
            </div>

            <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-1">

                    Mern
                    <FaStar className="text-yellow-400" />
                </h2>
                <p className="w-14 h-9 text-center py-1 rounded-lg bg-green-700 text-white">{isActive}Active</p>


                {/* {isActive && (
                    <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-full">
                        Active
                    </span>
                )} */}
            </div>



            <div className="text-sm text-gray-700 space-y-2  rounded">
                <div className="flex  ">
                    <span className="font-semibold ">Title :</span>
                    <span className="px-2">{title}</span>
                </div>
                <div className="flex  ">
                    <span className="font-semibold">Course Name :</span>
                    <span className="px-2">{courseName}</span>
                </div>
                <div className="flex ">
                    <span className="font-semibold">Description :</span>
                    <span className="px-2">{description}</span>
                </div>
            </div>


        </div>
    );
};

export default ViewModule;
