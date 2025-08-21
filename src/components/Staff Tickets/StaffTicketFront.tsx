
import React, { useState, useEffect } from "react";
import {
  FiCalendar,
  FiClock,
  FiMoreVertical,
  FiCheckCircle,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetStaffTicketServicesThunks } from "../../features/Ticket_Management/reducers/thunks";
import avatarimg from "../../assets/navbar/avatarimg.png";
import { GetStaffTicket } from "../../features/Ticket_Management/reducers/selectors";

interface Ticket {
  id: number;
  name: string;
  email: string;
  message: string;
  date: string;
  time: string;
  priority: "High" | "Low";
  status: "opened" | "closed";
}

interface GetTicketsParams {
  branch_id: string;
  institute_id: string;
  page: number;
  status: "opened" | "closed";
}

const StaffTickets: React.FC = () => {
  const [menuOpenId, setMenuOpenId] = useState<number | null>(null);
  const [showOpenTickets, setShowOpenTickets] = useState<boolean>(true);
  const [showClosedTickets, setShowClosedTickets] = useState<boolean>(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const staffTickets = useSelector(GetStaffTicket);
  const loading: boolean = useSelector(
    (state: any) => state.staffTickets?.loading || false
  );
  const error: any = useSelector((state: any) => state.staffTickets?.error);


  useEffect(() => {
    if (showOpenTickets) {
      const params: GetTicketsParams = {
        branch_id: "90c93163-01cf-4f80-b88b-4bc5a5dd8ee4",
        institute_id: "973195c0-66ed-47c2-b098-d8989d3e4529",
        page: 1,
        status: "opened",
      };
      dispatch(GetStaffTicketServicesThunks(params) as any);
    } else if (showClosedTickets) {
      const params: GetTicketsParams = {
        branch_id: "90c93163-01cf-4f80-b88b-4bc5a5dd8ee4",
        institute_id: "973195c0-66ed-47c2-b098-d8989d3e4529",
        page: 1,
        status: "closed",
      };
      dispatch(GetStaffTicketServicesThunks(params) as any);
    }
  }, [dispatch, showOpenTickets, showClosedTickets]);

  const handleResolve = (ticket: Ticket) => {
    setMenuOpenId(null);
    if (ticket.status === "opened") {
      navigate(`/tickets/${ticket.id}`);
    } else {
      console.log("Ticket is not open, cannot navigate");
    }
  };

  

  return (
    <div>
      <div className="bg-[#14b8c6] w-full text-white px-4 py-2 rounded-md inline-flex items-center gap-2 font-semibold text-lg mb-6">
        STAFF TICKETS
      </div>

      {/* Toggle Buttons */}
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => {
            setShowOpenTickets(true);
            setShowClosedTickets(false);
          }}
          className={`px-4 py-2 rounded-md font-semibold text-sm ${showOpenTickets
            ? "bg-[#14b8c6] text-white"
            : "bg-gray-200 text-gray-700"
            }`}
        >
          Open Tickets
        </button>

        <button
          onClick={() => {
            setShowOpenTickets(false);
            setShowClosedTickets(true);
          }}
          className={`px-4 py-2 rounded-md font-semibold text-sm ${showClosedTickets
            ? "bg-[#14b8c6] text-white"
            : "bg-gray-200 text-gray-700"
            }`}
        >
          Closed Tickets
        </button>
      </div>

      {(showOpenTickets || showClosedTickets) && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-[#14b8c6] mb-2">
            {showOpenTickets ? "Open Tickets" : "Closed Tickets"}
          </h3>

          {loading ? (
            <p>Loading tickets...</p>
          ) : error ? (
            <p className="text-red-500">Error loading tickets.</p>
          ) : staffTickets.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6">
              {staffTickets.map((ticket: any) => (
                <div
                  key={ticket.id}
                  className="bg-white shadow-md rounded-lg p-4 relative border-2"
                >
                  <div className="flex items-center justify-between mb-2 relative">
                    <div className="flex items-center gap-3">
                      <img
                        src={avatarimg}
                        alt="Avatar"
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <h2 className="text-gray-800 font-semibold">
                          {ticket.user.full_name}
                        </h2>
                        <p className="text-gray-500 text-sm">{ticket.user.email}</p>
                      </div>
                    </div>

                    <div className="relative">
                      <FiMoreVertical
                        className="text-gray-400 cursor-pointer"
                        onClick={() =>
                          setMenuOpenId(menuOpenId === ticket.id ? null : ticket.id)
                        }
                      />
                      {menuOpenId === ticket.id && (
                        <div className="absolute right-0 mt-2 z-10 w-25">
                          <button
                            className="w-full px-2 py-2 text-sm text-white bg-[#14b8c6] rounded-xl flex items-center gap-2"
                            onClick={() => handleResolve(ticket)}
                          >
                            <FiCheckCircle /> Resolve
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4">{ticket.query}</p>

                  <div className="flex justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <FiCalendar />
                    </div>
                    <div className="flex items-center gap-1">
                      <FiClock />
                      {new Date(ticket.date).toLocaleString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </div>
                  </div>

                  <button
                    className={`text-white text-sm font-medium px-4 py-2 rounded-md flex items-center gap-2 ${ticket.priority === "High" ? "bg-[#14b8c6]" : "bg-[#14b8c6]"
                      }`}
                  >
                    <FiCalendar />
                    Priority: {ticket.priority}
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">
              No {showOpenTickets ? "open" : "closed"} tickets found.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default StaffTickets;
