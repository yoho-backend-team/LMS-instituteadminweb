import React, { useEffect, useState } from "react";
import TicketCard from "../../Ticket Management/Your Ticket/TicketsPage";
import iconticket from "../../../assets/navbar/ticketicon.png";
import ChatWindow from "../../../components/TicketManagement/ChatWindow";
import Sidebar from "../../../components/TicketManagement/Sidebar";
import closeicon from "../../../assets/navbar/Cancel.png";
import { FONTS } from "../../../constants/uiConstants";
import fileimg from "../../../assets/navbar/fileicon.png";
import { useDispatch, useSelector } from "react-redux";
import { selectAdminTickets } from "../../../features/TicketManagement/YourTicket/selector";
import { fetchAdminTicketsThunk } from "../../../features/TicketManagement/YourTicket/thunks";
import {
  createTicket,
  updateTicket,
} from "../../../features/TicketManagement/YourTicket/service";
import socket from "../../../utils/socket";
import { GetLocalStorage } from "../../../utils/localStorage";
// import { GetImageUrl } from "../../../utils/helper";
import { uploadTicketService } from "../../../features/Ticket_Management/services";

interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: string;
}

const TicketsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"open" | "closed">("open");
  const [showChatWindow, setShowChatWindow] = useState(false);
  const [showbuttonWindow, setShowbuttonWindow] = useState(true);
  const [viewShowModal, setviewShowModal] = useState(false);
  const [showCreateButton, setShowCreateButton] = useState(true);
  const [showBackButton, setShowBackButton] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingTicketId, setEditingTicketId] = useState<string | null>(null);
  const [selectedTicketUserDetails, setSelectedTicketUserDetails] =
    useState<any>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [query, setQuery] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"High" | "Medium" | "Low">("High");
  const [currentPage] = useState(1);
  const dispatch = useDispatch<any>();
  const adminTickets = useSelector(selectAdminTickets);


  const overall_branch_id = GetLocalStorage("selectedBranchId")
  const overall_istitute_id = GetLocalStorage("instituteId")


  useEffect(() => {
    const params = {
      branch_id: overall_branch_id,
      status: activeTab === "open" ? "opened" : "closed",
      page: currentPage,
      institute_id: overall_istitute_id,
    };
    dispatch(fetchAdminTicketsThunk(params));
  }, [dispatch, activeTab, currentPage]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let fileUrl;

    if (selectedFile) {
      const formFile = new FormData()
      formFile.append("file", selectedFile);
      const response = await uploadTicketService(formFile)
      if (response) {
        fileUrl = response?.data?.file
      }
    }
    const formData: any = {
      query,
      description,
      priority,
      branch: overall_branch_id,
      institute: overall_istitute_id,
      status: activeTab === "open" ? "opened" : "closed",
      file: fileUrl
    };


    try {
      if (isEditMode && editingTicketId) {
        const response = await updateTicket(formData, editingTicketId);
        console.log("Ticket successfully updated:", response.data);
      } else {

        const response = await createTicket(formData);
        console.log("Ticket successfully created:", response.data);
      }

      const params = {
        branch_id: "90c93163-01cf-4f80-b88b-4bc5a5dd8ee4",
        status: formData.status,
        page: currentPage,
        institute_id: "973195c0-66ed-47c2-b098-d8989d3e4529",
      };
      dispatch(fetchAdminTicketsThunk(params));

      setQuery("");
      setDescription("");
      setPriority("High");
      setSelectedFile(null);
      setviewShowModal(false);
      setIsEditMode(false);
      setEditingTicketId(null);
    } catch (error) {
      console.error("Error submitting ticket:", error);
    }
  };

  // useEffect(() => {
  //   if (adminTickets?.messages) {
  //     setMessages(adminTickets.messages);
  //   }
  // }, [adminTickets]);

  useEffect(() => {
    if (!socket) return;
    const handleMessage = (message: Message) => {
      setMessages((prev) => [message, ...prev]);
    };

    socket.on("receiveMessage", handleMessage);
    return () => {
      socket.off("receiveMessage", handleMessage);
    };
  }, []);

  const TicketSkeleton = () => (
    <div className="animate-pulse bg-white rounded-lg shadow-md p-4 flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
        <div className="flex-1">
          <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>

      <div className="h-4 bg-gray-300 rounded w-5/6"></div>

      <div className="h-3 bg-gray-200 rounded w-full"></div>
      <div className="h-3 bg-gray-200 rounded w-4/5"></div>

      <div className="flex justify-between items-center mt-3">
        <div className="h-3 bg-gray-300 rounded w-1/4"></div>
        <div className="h-3 bg-gray-300 rounded w-1/6"></div>
      </div>
    </div>
  );


  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true);
      const params = {
        branch_id: overall_branch_id,
        status: activeTab === "open" ? "opened" : "closed",
        page: currentPage,
        institute_id: overall_istitute_id,
      };
      await dispatch(fetchAdminTicketsThunk(params));
      setLoading(false);
    };

    fetchTickets();
  }, [dispatch, activeTab, currentPage]);


  return (
    <div className="h-auto p-0 w-full">
      <div className="flex bg-[#1BBFCA] rounded-lg justify-between items-center mb-4 h-[55px] chatwindow">
        <h1
          className="flex text-lg text-white bg-[#1BBFCA] px-4 py-2 rounded"
          style={{ ...FONTS.heading_07_bold }}
        >
          <img className="mr-2" src={iconticket} />
          YOUR TICKET
        </h1>
        {showCreateButton && (
          <button
            onClick={() => {
              setShowChatWindow(false);
              setviewShowModal(true);
            }}
            className="bg-white text-[#1BBFCA] px-4 py-1 mr-2 rounded-lg shadow"
            style={{ ...FONTS.heading_08_bold }}
          >
            CREATE
          </button>
        )}
        {showBackButton && (
          <button
            onClick={() => {
              setShowChatWindow(false);
              setviewShowModal(false);
              setShowCreateButton(true);
              setShowBackButton(false);
              setShowbuttonWindow(true);
            }}
            className="bg-white text-[#1BBFCA] px-4 py-1 mr-2 rounded-lg shadow"
            style={{ ...FONTS.heading_08_bold }}
          >
            Back
          </button>
        )}
      </div>

      {showbuttonWindow && (
        <div className="mb-6 mt-2 flex flex-row" style={{ ...FONTS.heading_08 }}>
          <button
            onClick={() => {
              setActiveTab("open");
              setShowChatWindow(false);
            }}
            className={`mr-2 rounded-lg w-[157px] h-[35px] ${activeTab === "open"
              ? "bg-[#1BBFCA] text-white"
              : "bg-white text-teal-500 border border-teal-500"
              }`}
          >
            Opened Tickets
          </button>
          <button
            onClick={() => {
              setActiveTab("closed");
              setShowChatWindow(false);
            }}
            className={`rounded-lg w-[157px] h-[35px] items-center ${activeTab === "closed"
              ? "bg-[#1BBFCA] text-white"
              : "bg-white text-[#1BBFCA] border border-teal-500"
              }`}
          >
            Closed Tickets
          </button>
        </div>
      )}
      {!showChatWindow && (
        <div className="grid md:grid-cols-3 gap-4">
          {loading
            ? Array.from({ length: 6 }).map((_, index) => <TicketSkeleton key={index} />)
            : adminTickets?.data?.map((ticket: any, index: number) => (
              <TicketCard
                key={index}
                name={ticket?.user?.first_name + ticket?.user?.last_name}
                email={ticket?.user?.email}
                category={ticket?.description}
                query={ticket?.query}
                message={messages}
                date={new Date(ticket.createdAt).toLocaleDateString("en-GB")}
                time={new Date(ticket.createdAt).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                priority={ticket.priority}
                avatarUrl={ticket?.user?.image}
                lastPage={adminTickets?.last_page}
                onView={() => {
                  setSelectedTicketUserDetails(ticket);
                  setShowChatWindow(true);
                  setShowbuttonWindow(false);
                  setShowCreateButton(false);
                  setShowBackButton(true);
                }}
              />
            ))}
        </div>
      )}


      {showChatWindow && (
        <div className="h-full gap-4 w-full grid sm:grid-cols-1 lg:grid-cols-4 font-sans">
          <div className="md:col-span-1 lg:col-span-3">
            <ChatWindow user={selectedTicketUserDetails} />
          </div>
          <Sidebar user={selectedTicketUserDetails} />
        </div>
      )}

      {viewShowModal && (
        <div className="fixed inset-0 z-30 flex justify-end items-center bg-black bg-opacity-25 backdrop-blur-sm">
          <div className="relative w-full max-w-sm min-w-[350px]  h-[90vh] overflow-auto p-4 rounded-lg bg-white shadow-xl">

            <div className="flex justify-between items-center border-b pb-2 mb-4">
              <h2
                className="text-lg font-semibold text-[#716F6F]"
                style={{ ...FONTS.heading_07 }}
              >
                Create Ticket
              </h2>
              <button
                onClick={() => setviewShowModal(false)}
                className="text-gray-600 hover:text-black"
              >
                <img src={closeicon} alt="Close" className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div style={{ ...FONTS.heading_09 }}>
                <label className="block mb-2 text-[#716F6F]">Query</label>
                <textarea
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full border rounded p-2 resize-none focus:outline-none focus:ring-2 focus:ring-[#1BBFCA]"
                  rows={2}
                  required
                />
              </div>

              <div style={{ ...FONTS.heading_09 }}>
                <label className="block mb-2 text-[#716F6F]">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border rounded p-2 resize-none focus:outline-none focus:ring-2 focus:ring-[#1BBFCA]"
                  rows={2}
                  required
                />
              </div>

              <div style={{ ...FONTS.heading_09 }}>
                <label className="block mb-2 text-[#716F6F]">Priority</label>
                <select
                  value={priority}
                  onChange={(e) =>
                    setPriority(e.target.value as "High" | "Medium" | "Low")
                  }
                  className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#1BBFCA]"
                  required
                >
                  <option value=""></option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>

              <div>
                <label
                  className="block mb-1 text-sm font-medium text-[#716F6F]"
                  style={{ ...FONTS.heading_09 }}
                >
                  Upload
                </label>

                <label className="w-full h-16 flex items-center justify-center border-2 border-dashed border-gray-300 rounded cursor-pointer hover:bg-gray-50">
                  <input
                    type="file"
                    accept="*"
                    onChange={async (e: any) => {
                      if (e.target.files && e.target.files[0]) {
                        const file = e.target.files[0];
                        setSelectedFile(file);
                      }
                    }}
                    className="hidden"
                  />
                  <span className="text-sm text-gray-500 flex items-center gap-2">
                    <img className="w-5 h-5" src={fileimg} alt="file" />
                    {selectedFile ? selectedFile.name : "Drop Files Here Or Click To Upload"}
                  </span>
                </label>
              </div>


              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-5">
                <button
                  type="button"
                  onClick={() => setviewShowModal(false)}
                  className="border border-[#1BBFCA] text-[#1BBFCA] px-4 py-1 rounded-lg hover:bg-[#E6F9FA]"
                  style={{ ...FONTS.heading_08 }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#1BBFCA] text-white px-4 py-1 rounded-lg hover:bg-[#17a4b0]"
                  style={{ ...FONTS.heading_08 }}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default TicketsPage;
