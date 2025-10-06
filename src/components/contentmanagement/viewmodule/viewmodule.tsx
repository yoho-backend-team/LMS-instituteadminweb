import { FaStar } from "react-icons/fa";

interface ModuleCardProps {
  title: string;
  courseName: string;
  description: string;
  isActive: boolean;
  fileUrl?: string;
  fileName: string;
  branch: string;
  video?: string; 
  onStatusChange?: () => void;
}

const ViewModule = ({
  title,
  courseName,
  description,
  isActive,
  fileUrl,
  fileName,
  branch,
  video,
}: ModuleCardProps) => {
  console.log("ViewModule Props:", {
    title,
    courseName,
    description,
    isActive,
    fileUrl,
    fileName,
    branch,
    video,
  });

  // check if video is YouTube
  const isYoutube = video?.includes("youtube.com") || video?.includes("youtu.be");

  return (
    <div className="relative w-[500px] bg-white rounded-lg p-4">
      <div className="w-full h-60 bg-gray-200 rounded-md mb-4 flex items-center justify-center overflow-hidden">
        {video ? (
          isYoutube ? (
            <iframe
              src={video}
              className="w-full h-full rounded"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          ) : (
            <video
              src={video}
              controls
              className="w-full h-full rounded"
            />
          )
        ) : (
          <p className="text-gray-500">No video available</p>
        )}
      </div>

      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-1">
          {title}
          <FaStar className="text-yellow-400" />
        </h2>

        <span
          className={`w-14 h-9 text-center py-1 rounded-lg text-white ${
            isActive ? "bg-green-700" : "bg-red-600"
          }`}
        >
          {isActive ? "Active" : "Inactive"}
        </span>
      </div>

      <div className="text-sm text-gray-700 space-y-2 rounded">
        <div className="flex">
          <span className="font-semibold">Title :</span>
          <span className="px-2">{title}</span>
        </div>
        <div className="flex">
          <span className="font-semibold">Course Name :</span>
          <span className="px-2">{courseName}</span>
        </div>
        <div className="flex">
          <span className="font-semibold">Description :</span>
          <span className="px-2">{description}</span>
        </div>
      </div>
    </div>
  );
};

export default ViewModule;
