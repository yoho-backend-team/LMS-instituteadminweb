import React, { useCallback, useEffect, useState } from "react";
import { TbXboxXFilled } from "react-icons/tb";
import { FaFilter } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { FONTS } from "../../constants/uiConstants";
import { getAllBatches } from "../../features/certificateManagement/services";
import {
  getBranchService,
  getCourseService,
} from "../../features/batchManagement/services";
import { useDispatch } from "react-redux";

interface CertificateFilterProps {
  showFilter: boolean;
  setShowFilter: (show: boolean) => void;
  selectedCourse: string;
  setSelectedCourse: (course: string) => void;
  selectedBranch: string;
  setSelectedBranch: (branch: string) => void;
  selectedBatch: string;
  setSelectedBatch: (batch: string) => void;
  selectedStudent: string;
  setSelectedStudent: (student: string) => void;
  onAdd: () => void;
  setBranchFilter: any
  setCourseFilter: any
  setSearchTerm: any
  searchTerm: any
}

export const CertificateFilter: React.FC<CertificateFilterProps> = ({
  showFilter,
  setShowFilter,
  selectedCourse,
  setSelectedCourse,
  selectedBranch,
  setSelectedBranch,
  selectedBatch,
  setSelectedBatch,
  setBranchFilter,
  setCourseFilter,
  selectedStudent,
  setSelectedStudent,
  onAdd,
  setSearchTerm,
  searchTerm
}) => {
  const dispatch = useDispatch<any>();
  const [courses, setCourses] = useState<any[]>([]);
  const [branches, setBranches] = useState<any[]>([]);
  const [allBatches, setAllBatches] = useState<any[]>([]);

  const fetchAllCourses = async () => {
    try {
      const response = await getCourseService({branch: selectedBranch});
      console.log(response, 'course resp')
      if (response) {
        setCourses(response?.data);
      }
    } catch (error) {
      console.log("Error fetching course data:", error);
    }
  };

  const fetchAllBranches = async () => {
    try {
      const response = await getBranchService({});
      if (response) {
        setBranches(response?.data);
      }
    } catch (error) {
      console.log("Error fetching branch data:", error);
    }
  };

  const fetchAllBatches = useCallback(async () => {
    try {
      const response = await getAllBatches({});
      if (response?.data) {
        setAllBatches(response.data);
      }
    } catch (error) {
      console.error("Error fetching batches:", error);
      // toast.error('Failed to load batches');
    }
  }, []);

  useEffect(() => {
    fetchAllBranches();
    fetchAllCourses();
    fetchAllBatches();
  }, [dispatch, selectedBranch]);


  return (
    <>
      <div className="bg-[#1BBFCA] px-6 py-3 rounded-xl flex justify-between items-center">
        <h2 className="text-white text-lg font-semibold flex">
          <FaFilter
            className="mt-1 mr-2"
            style={{ ...FONTS.heading_06_bold }}
          />{" "}
          FILTER
        </h2>
        <button
          onClick={() => setShowFilter(!showFilter)}
          className="bg-white w-10 h-10 p-1 rounded"
        >
          {showFilter ? (
            <TbXboxXFilled className=" w-6 h-6 ml-1" />
          ) : (
            <span className="text-green-700 font-semibold">Go</span>
          )}
        </button>
      </div>

      {showFilter && (
        <div className=" bg-white mt-5 rounded-xl p-4 shadow-md">
          <div className="font-normal text-xl text-[#716F6F] mb-5">
            <h2>Student Certificates</h2>
          </div>
          <div className=" grid md:grid-cols-2 gap-3">

            <div>
              <label
                className="block text-lg font-medium text-[#716F6F] mb-1"
                style={{ ...FONTS.heading_08 }}
              >
                Branch
              </label>
              <select
                className="w-full border h-13 px-3 py-2 rounded"
                value={selectedBranch}
                onChange={(e) => {
                  const selected = branches.find(
                    (branch: any) => branch?.uuid === e.target.value
                  );
                  setSelectedBranch(selected?.uuid || "");
                  setBranchFilter(selected?._id || "");
                }}
                style={{ ...FONTS.heading_08 }}
              >
                <option value="">All</option>
                {branches?.map((branch: any) => (
                  <option key={branch?._id} value={branch?.uuid}>
                    {branch?.branch_identity}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                className="block text-lg font-medium text-[#716F6F] mb-1"
                style={{ ...FONTS.heading_08 }}
              >
                Course
              </label>
              <select
                className="w-full border h-13 px-3 py-2 rounded"
                value={selectedCourse}
                onChange={(e) => {
                  const selected = courses.find(
                    (course: any) => course?.uuid === e.target.value
                  );
                  setSelectedCourse(selected?.uuid || "");
                  setCourseFilter(selected?._id || "");
                }}
                style={{ ...FONTS.heading_08 }}
              >
                <option value="">All</option>
                {courses?.map((course: any) => (
                  <option key={course?.uuid} value={course?.uuid}>
                    {course?.course_name}
                  </option>
                ))}
              </select>
            </div>
           
            {/* <div>
              <label
                className="block text-lg font-medium text-[#716F6F] mb-1"
                style={{ ...FONTS.heading_08 }}
              >
                Batch
              </label>
              <select
                className="w-full border h-13 px-3 py-2 rounded"
                value={selectedBatch}
                onChange={(e) => setSelectedBatch(e.target.value)}
                style={{ ...FONTS.heading_08 }}
              >
                <option value="">All</option>
                {allBatches?.map((batch) => (
                  <option key={batch._id} value={batch._id}>
                    {batch.batch_name}
                  </option>
                ))}
              </select>
            </div> */}
            <div>
              <input
                type="text"
                className="w-full text-lg border mt-8 h-13 px-3 py-2 rounded"
                placeholder="Search Certificates"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex my-4 pt-6 ml-28">
              <button
                onClick={onAdd}
                className="bg-[#1BBFCA] text-white px-4 py-2 w-3.5/5 flex rounded-lg"
              >
                <IoMdAdd
                  className="pr-2 h-6 w-7"
                  style={{ ...FONTS.heading_06_bold }}
                />{" "}
                Add Student Certificate
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
