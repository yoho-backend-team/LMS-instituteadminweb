import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaEye } from "react-icons/fa";
import { MdEditDocument, MdDelete } from "react-icons/md";
import { IoMdDownload } from "react-icons/io";
import { FONTS } from "../../constants/uiConstants";
import { GetImageUrl } from "../../utils/helper";

export interface Certificate {
  id: number;
  uuid: string;
  title: string;
  description: string;
  branch: string;
  batch: string;
  student: string;
  email: string;
}

interface CertificateTableProps {
  certificates: Certificate[];
  openDropdownId: number | null;
  setOpenDropdownId: (id: number | null) => void;
  onEdit: (cert: Certificate) => void;
  onView: (cert: Certificate) => void;
  onDelete: (uuid: number) => void;
  onDownload: (cert: Certificate) => void;
  loading: boolean;
}

const SkeletonRow: React.FC = () => {
  return (
    <tr className="text-[#716F6F] animate-pulse">
      <td className="px-3 sm:px-6 py-3 sm:py-4">
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </td>
      <td className="px-3 sm:px-6 py-3 sm:py-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-200"></div>
        <div className="flex-1">
          <div className="h-5 bg-gray-200 rounded mb-2 w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </td>
      <td className="px-3 sm:px-6 py-3 sm:py-4">
        <div className="h-5 bg-gray-200 rounded mb-2 w-2/3"></div>
        <div className="h-4 bg-gray-200 rounded w-4/5"></div>
      </td>
      <td className="px-3 sm:px-6 py-3 sm:py-4 text-right">
        <div className="inline-block p-2 text-gray-200">
          <BsThreeDotsVertical />
        </div>
      </td>
    </tr>
  );
};

export const CertificateTable: React.FC<CertificateTableProps> = ({
  certificates,
  openDropdownId,
  setOpenDropdownId,
  onEdit,
  onView,
  onDelete,
  onDownload,
  loading,
}) => {
  return (
    <div className="bg-white shadow-2xl p-3 sm:p-4 mt-3 sm:mt-5 rounded-2xl overflow-x-auto">
      <div className="bg-white rounded-xl min-w-[600px] sm:min-w-0">
        <table className="w-full text-sm">
          <thead className="bg-[#F8F8F8] text-[#716F6F] text-base sm:text-lg h-12 sm:h-15">
            <tr>
              <th
                className="px-3 sm:px-6 py-3 sm:py-4 text-left"
                style={{ ...FONTS.heading_05_bold }}
              >
                ID
              </th>
              <th
                className="px-3 sm:px-6 py-3 sm:py-4 text-left"
                style={{ ...FONTS.heading_05_bold }}
              >
                User
              </th>
              <th
                className="px-3 sm:px-6 py-3 sm:py-4 text-left"
                style={{ ...FONTS.heading_05_bold }}
              >
                Title
              </th>
              <th
                className="px-3 sm:px-6 py-3 sm:py-4 text-right"
                style={{ ...FONTS.heading_05_bold }}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 3 }).map((_, index) => (
                <SkeletonRow key={index} />
              ))
            ) : certificates.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-3 sm:px-6 py-8 text-center text-gray-800">
                  No certificates available
                </td>
              </tr>
            ) : (
              certificates.map((cert: any, index: number) => (
                <tr
                  key={index}
                  className="text-[#716F6F] border-b hover:bg-gray-50 transition"
                >
                  <td className="px-3 sm:px-6 py-3 sm:py-4" style={{ ...FONTS.heading_08 }}>
                    {index + 1}
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 flex items-center gap-2 sm:gap-3">
                    <img
                      src={GetImageUrl(cert.image) ?? undefined}
                      alt={cert.student}
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
                    />
                    <div>
                      <div
                        className="font-bold text-sm sm:text-lg"
                        style={{ ...FONTS.heading_07_bold }}
                      >
                        {cert.student}
                      </div>
                      <div
                        className="text-xs sm:text-sm break-words max-w-[100px] sm:max-w-none"
                        style={{ ...FONTS.heading_08 }}
                      >
                        {cert.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4">
                    <div
                      className="font-semibold text-sm sm:text-lg"
                      style={{ ...FONTS.heading_07_bold }}
                    >
                      {cert.title}
                    </div>
                    <div
                      className="text-xs sm:text-sm !line-clamp-1"
                      style={{ ...FONTS.heading_08 }}
                    >
                      {cert.description}
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 text-right relative dropdown-action">
                    <button
                      onClick={() =>
                        setOpenDropdownId(
                          openDropdownId === cert.id ? null : cert.id
                        )
                      }
                      className="p-1 sm:p-2 text-[#1BBFCA] text-lg sm:text-xl"
                    >
                      <BsThreeDotsVertical />
                    </button>

                    {openDropdownId === cert.id && (
                      <div className="absolute right-0 sm:right-14 top-10 sm:top-0 mt-2 w-36 sm:w-40 gap-2 grid p-2 sm:p-3 bg-white border rounded-lg shadow-lg z-[999]">
                        <button
                          className="w-full flex text-left hover:bg-[#1BBFCA] hover:text-white px-3 sm:px-4 py-2 border rounded-md text-sm sm:text-base"
                          onClick={() => {
                            onEdit(cert);
                            setOpenDropdownId(null);
                          }}
                        >
                          <MdEditDocument className="mt-0.5 mr-2" />
                          Edit
                        </button>
                        <button
                          className="w-full flex text-left hover:bg-[#1BBFCA] hover:text-white px-3 sm:px-4 py-2 border rounded-md text-sm sm:text-base"
                          onClick={() => onView(cert)}
                        >
                          <FaEye className="mt-0.5 mr-2" />
                          View
                        </button>
                        <button
                          className="w-full flex text-left hover:bg-[#1BBFCA] hover:text-white px-3 sm:px-4 py-2 border rounded-md text-sm sm:text-base"
                          onClick={() => {
                            onDelete(cert.uuid);
                            setOpenDropdownId(null);
                          }}
                        >
                          <MdDelete className="mt-0.5 mr-2" />
                          Delete
                        </button>
                        <button
                          className="w-full flex text-left hover:bg-[#1BBFCA] hover:text-white px-3 sm:px-4 py-2 border rounded-md text-sm sm:text-base"
                          onClick={() => onDownload(cert)}
                        >
                          <IoMdDownload className="mt-0.5 mr-2" />
                          Download
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
