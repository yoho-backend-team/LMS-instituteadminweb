import { GoPlus } from "react-icons/go";
import { BsSliders } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
import AddModule from "../../../components/contentmanagement/addmodule/addmodule";
import EditModule from "../../../components/contentmanagement/editmodule/editmodule";
import { FaFileAlt, FaGraduationCap, FaEllipsisV } from "react-icons/fa";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import ViewModule from "../../../components/contentmanagement/viewmodule/viewmodule";
import { useDispatch, useSelector } from "react-redux";
import {
  GetModule,
  selectLoading,
} from "../../../features/Content_Management/reducers/selectors";
import {
  DeletemoduleThunks,
  GetallModuleThunks,
  UpdateModuleStatusThunk,
} from "../../../features/Content_Management/reducers/thunks";
import ContentLoader from "react-content-loader";
import { GetLocalStorage } from "../../../utils/localStorage";

interface ModuleCardProps {
  id: string;
  uuid: string;
  title: string;
  courseName?: string;
  description?: string;
  isActive: boolean;
  fileUrl?: string;
  fileName: string;
  branch?: string;
  course?: {
    course_name: string;
  };
  video: string;
  file?: File | null;
}

const Modules = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const [showEditPanel, setShowEditPanel] = useState(false);
  const [openCardId, setOpenCardId] = useState<number | string | null>(null);
  const [showViewModule, setShowViewModule] = useState(false);
  const [selectedModule, setSelectedModule] = useState<ModuleCardProps | null>(
    null
  );
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [toggleStatusMap, setToggleStatusMap] = useState<{
    [key: string]: boolean;
  }>({});
  const [statusFilter, setStatusFilter] = useState<string>("");

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenCardId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const dispatch = useDispatch<any>();
  const Module = useSelector(GetModule);
  const loading = useSelector(selectLoading);
  useEffect(() => {
    const paramsData = {
      branch_id: GetLocalStorage("selectedBranchId"),
      institute_id: GetLocalStorage("instituteId"),
      page: 1,
    };
    dispatch(GetallModuleThunks(paramsData));
  }, [dispatch]);

  const handleViewClick = (card: any) => {
    setSelectedModule(card);
    setShowViewModule(true);
  };

  const handleDelete = (id: string, uuid: string) => {
    if (selectedModule?.id === id) {
      setShowViewModule(false);
      setSelectedModule(null);
    }
    dispatch(DeletemoduleThunks({ id, uuid }));
  };

  const handleToggle = (module: any) => {
    const currentLocal = toggleStatusMap[module.module_id];
    const currentStatus =
      currentLocal !== undefined
        ? currentLocal
        : module.status === "active" || module.status === true;

    const updatedStatus = !currentStatus;

    setToggleStatusMap((prev) => ({
      ...prev,
      [module.module_id]: updatedStatus,
    }));

    const payload = {
      module_id: module.module_id,
      is_active: updatedStatus ? true : false,
    };

    dispatch(UpdateModuleStatusThunk(payload));
  };

  return (
    <div className="relative flex flex-col h-fit max-h-fit w-full gap-6">
      {showPanel && (
        <div
          className="fixed inset-0 z-40 flex justify-end backdrop-blur-sm bg-black/20"
          onClick={() => setShowPanel(false)}
        >
          <div
            className="h-[95%] mt-4 w-1/3 bg-white shadow-xl rounded-xl z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <AddModule
              onClose={() => setShowPanel(false)}
              onSubmit={(newModule) => {
                setShowPanel(false);
                console.log(newModule, "new module added successfully");
              }}
            />
          </div>
        </div>
      )}

      {showEditPanel && selectedModule && (
        <div
          className="fixed inset-0 z-40 flex justify-end backdrop-blur-sm bg-black/20"
          onClick={() => setShowEditPanel(false)}
        >
          <div
            className="h-[95%] mt-4 w-1/3 bg-white shadow-xl rounded-xl z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <EditModule
              onClose={() => setShowEditPanel(false)}
              existingModule={selectedModule}
            />
          </div>
        </div>
      )}

      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold">Module</h3>

        <div className="w-full flex justify-between gap-4 items-center text-lg font-semibold">
          <div className="bg-[#1BBFCA] text-white p-3 rounded-xl flex gap-4 justify-center items-center">
            <BsSliders size={20} />
            <button
              onClick={() => setShowFilter((prev) => !prev)}
              className="bg-transparent focus:outline-none"
            >
              {showFilter ? "Hide Filter" : "Show Filter"}
            </button>
          </div>

          <div className="bg-[#1BBFCA] text-white flex items-center justify-center p-3 rounded-xl">
            <button
              className="flex items-center gap-3 bg-transparent focus:outline-none"
              onClick={() => setShowPanel(true)}
            >
              <GoPlus size={20} />
              Add Modules
            </button>
          </div>
        </div>
      </div>

      {showFilter && (
        <div className="flex gap-5 bg-white p-4 justify-between shadow-[4px_4px_24px_0px_#0000001A] rounded-xl">
          <div className="flex-1 p-1 flex flex-col gap-2">
            <label htmlFor="status1">Status</label>
            <select
              id="status1"
              className="border h-10 rounded-lg px-2"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="flex-1 p-1 flex flex-col gap-2">
            <label htmlFor="status2">Courses</label>
            <select id="status2" className="border h-10 rounded-lg px-2">
              <option value="">Select Course</option>
              <option value="dummy">Dummy</option>
            </select>
          </div>
        </div>
      )}

      {showViewModule && selectedModule?.title && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-3xl relative">
            <button
              onClick={() => setShowViewModule(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
            >
              ✕
            </button>

            <ViewModule
              title={selectedModule.title}
              courseName={selectedModule.course?.course_name ?? ""}
              description={selectedModule.description ?? ""}
              isActive={
                toggleStatusMap[selectedModule.id] !== undefined
                  ? toggleStatusMap[selectedModule.id]
                  : selectedModule.isActive
              }
              fileUrl={selectedModule.fileUrl}
              fileName={selectedModule.fileName ? "" : ""}
              branch={selectedModule.branch ?? ""}
              video={selectedModule.video} 
              onStatusChange={() =>
                handleToggle({
                  module_id: selectedModule.id,
                  status: selectedModule.isActive,
                })
              }
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <ContentLoader
                key={index}
                speed={1}
                width="100%"
                height="100%"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
                className="w-full h-[210px] p-4 rounded-2xl border shadow-md"
              >
                <rect x="0" y="0" rx="6" ry="6" width="100" height="24" />
                <rect x="270" y="0" rx="6" ry="6" width="80" height="24" />

                <rect x="0" y="36" rx="10" ry="10" width="100%" height="120" />

                <rect x="0" y="170" rx="6" ry="6" width="60%" height="20" />

                <rect x="0" y="200" rx="4" ry="4" width="80" height="16" />
                <rect x="280" y="200" rx="4" ry="4" width="60" height="20" />

                <rect x="0" y="240" rx="6" ry="6" width="100" height="32" />
                <rect x="260" y="240" rx="6" ry="6" width="80" height="32" />
              </ContentLoader>
            ))}
          </div>
        ) : (
          Module?.filter((card: ModuleCardProps) => {
            const statusFromToggle = toggleStatusMap[card.id];
            const isActive =
              statusFromToggle !== undefined ? statusFromToggle : card.isActive;

            if (statusFilter === "") return true;
            if (statusFilter === "active") return isActive;
            if (statusFilter === "inactive") return !isActive;
            return true;
          }).map((card: ModuleCardProps) => (
            <div
              key={card.id}
              className="relative p-4 border rounded-lg shadow-[4px_4px_24px_0px_#0000001A] bg-white"
            >
              <div className="flex justify-end text-gray-400 cursor-pointer">
                <FaEllipsisV
                  onClick={() =>
                    setOpenCardId(openCardId === card.id ? null : card.id)
                  }
                />
              </div>

              <div className="flex items-center gap-2 bg-gray-100 p-3 rounded mt-5">
                <FaFileAlt className="text-gray-600 text-lg" />
                <span className="text-sm font-medium text-gray-700">
                  {card?.title}
                </span>
              </div>

              <div className="mt-4 flex items-center gap-2">
                <FaGraduationCap className="text-gray-600 text-xl" />
                <span className="text-base font-semibold text-gray-700">
                  {card.course?.course_name}
                </span>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <div
                  className={`flex items-center gap-1 font-medium ${
                    toggleStatusMap[card.id] !== undefined
                      ? toggleStatusMap[card.id]
                        ? "text-green-500"
                        : "text-red-500"
                      : card.isActive
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  <span className="text-sm">
                    {toggleStatusMap[card.id] !== undefined
                      ? toggleStatusMap[card.id]
                        ? "Active"
                        : "Inactive"
                      : card.isActive
                      ? "Active"
                      : "Inactive"}
                  </span>
                  <span
                    className={`w-2 h-2 rounded-full ${
                      toggleStatusMap[card.id] !== undefined
                        ? toggleStatusMap[card.id]
                          ? "bg-green-500"
                          : "bg-red-500"
                        : card.isActive
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  />
                </div>

                <label className="relative inline-block w-11 h-6 cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={
                      toggleStatusMap[card.id] !== undefined
                        ? toggleStatusMap[card.id]
                        : card.isActive
                    }
                    onChange={() =>
                      handleToggle({
                        module_id: card.id,
                        status:
                          toggleStatusMap[card.id] !== undefined
                            ? toggleStatusMap[card.id]
                              ? "active"
                              : "inactive"
                            : card.isActive
                            ? "active"
                            : "inactive",
                      })
                    }
                  />
                  <div className="w-full h-full bg-gray-200 rounded-full peer-checked:bg-green-500 transition-colors duration-300" />
                  <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 peer-checked:translate-x-2.5" />
                </label>
              </div>

              {openCardId === card.id && (
                <div
                  ref={dropdownRef}
                  className="absolute top-10 right-4 z-10 w-32 bg-white shadow-md rounded-xl p-2"
                >
                  <button
                    className="flex items-center gap-2 w-full px-4 py-2 text-white bg-cyan-500 rounded-md hover:bg-cyan-600"
                    onClick={() => handleViewClick(card)}
                  >
                    <FaEye />
                    View
                  </button>

                  <button
                    onClick={() => {
                      setSelectedModule(card);
                      setShowEditPanel(true);
                    }}
                    className="flex items-center gap-2 w-full px-4 py-2 mt-2 border rounded-md hover:bg-gray-100 text-gray-700"
                  >
                    <FaEdit />
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(card.id, card.uuid)}
                    className="flex items-center gap-2 w-full px-4 py-2 mt-2 border rounded-md hover:bg-gray-100 text-gray-700"
                  >
                    <FaTrash />
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Modules;
