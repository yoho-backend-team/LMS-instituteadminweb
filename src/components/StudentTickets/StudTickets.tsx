import React, { useEffect, useState } from "react";
import TicketCard from "./TicketCard";
import ticket1 from "../../assets/ticket1.png";
import { useDispatch, useSelector } from "react-redux";
import { getStudentTicket } from "../../features/StudentTicket/Reducers/thunks";
import { selectStudentTicket } from "../../features/StudentTicket/Reducers/selectors";
import { GetLocalStorage } from "../../utils/localStorage";

const StudTickets: React.FC = () => {
  const [filter, setFilter] = useState<"opened" | "closed">("opened");
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch<any>();
  const studentTicketData = useSelector(selectStudentTicket);



  const overall_branch_id = GetLocalStorage("selectedBranchId")
  const overall_istitute_id = GetLocalStorage("instituteId")

  const fetchstudentTickets = async () => {
    try {
      setLoading(true);
      const params = {
        branch_id: overall_branch_id,
        institute_id: overall_istitute_id,
        status: filter,
      };
      await dispatch(getStudentTicket(params));
    } catch (error) {
      console.log("Error fetching tickets:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchstudentTickets();
  }, [dispatch, filter]);

  return (
    <div>
      {/* Header */}
      <div className="bg-[#14b8c6] text-white px-4 py-2 rounded-md inline-flex items-center gap-2 font-semibold text-lg mb-6 w-full">
        <img src={ticket1} alt="Ticket Icon" className="w-5 h-5" />
        STUDENT TICKETS
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-4 mb-6">
        {["opened", "closed"].map((type) => (
          <button
            key={type}
            className={`px-4 py-2 rounded-md font-semibold capitalize ${filter === type
              ? "bg-[#14b8c6] text-white"
              : "bg-gray-200 text-gray-700"
              }`}
            onClick={() => setFilter(type as "opened" | "closed")}
          >
            {type} Tickets
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 sm:gap-2 md:gap-2 lg:gap-4 ">
        {loading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="animate-pulse bg-white rounded-xl shadow p-4 space-y-3"
            >
              <div className="h-4 w-24 bg-gray-200 rounded"></div>
              <div className="h-6 w-32 bg-gray-200 rounded"></div>
              <div className="h-3 w-full bg-gray-200 rounded"></div>
              <div className="h-3 w-5/6 bg-gray-200 rounded"></div>
              <div className="h-10 w-full bg-gray-200 rounded"></div>
            </div>
          ))
        ) : studentTicketData?.data?.length > 0 ? (
          studentTicketData?.data?.map((ticket: any) => (
            <TicketCard key={ticket?._id} data={ticket} />
          ))
        ) : (
          <p className="text-gray-500 col-span-3 text-center">
            No tickets found.
          </p>
        )}
      </div>
    </div>
  );
};

export default StudTickets;
