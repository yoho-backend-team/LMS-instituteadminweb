import React, { useEffect, useState } from "react";
import TicketCard from "../../Ticket Management/Your Ticket/TicketsPage";
import iconticket from '../../../assets/navbar/ticketicon.png';
import ChatWindow from '../../../components/TicketManagement/ChatWindow';
import Sidebar from "../../../components/TicketManagement/Sidebar";
import closeicon from '../../../assets/navbar/Cancel.png';
import { FONTS } from '../../../constants/uiConstants';
import fileimg from '../../../assets/navbar/fileicon.png';
import { useDispatch, useSelector } from "react-redux";
import { selectAdminTickets } from "../../../features/TicketManagement/YourTicket/selector";
import { fetchAdminTicketsThunk } from "../../../features/TicketManagement/YourTicket/thunks";
import { createTicket, updateTicket } from "../../../features/TicketManagement/YourTicket/service";

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
  const [selectedTicketUser, setSelectedTicketUser] = useState<any>(null);
  const [selectedTicketUserDetails, setSelectedTicketUserDetails] = useState<any>(null);

 

  const [query, setQuery] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"High" | "Medium" | "Low">("High");

  const dispatch = useDispatch<any>();
  const adminTickets = useSelector(selectAdminTickets);

  useEffect(() => {
    const params = {
      branch_id: "90c93163-01cf-4f80-b88b-4bc5a5dd8ee4",
      status: activeTab === "open" ? "opened" : "closed",
      page: 1,
      institute_id: "973195c0-66ed-47c2-b098-d8989d3e4529",
    };
    dispatch(fetchAdminTicketsThunk(params));
  }, [activeTab, dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData: any = {
      query,
      description,
      priority,
      branch: "90c93163-01cf-4f80-b88b-4bc5a5dd8ee4",
      institute: "973195c0-66ed-47c2-b098-d8989d3e4529",
      status: activeTab === "open" ? "opened" : "closed",
    };

    if (selectedFile) {
      const toBase64 = (file: File): Promise<string> =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
        });

      try {
        const base64String = await toBase64(selectedFile);
        formData.file = base64String;
      } catch (error) {
        console.error("Failed to convert file to base64:", error);
        return;
      }
    }

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
        page: 1,
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

  return (
    <div className="h-auto p-0">
      <div className="flex bg-[#1BBFCA] rounded-lg justify-between items-center mb-4 h-[55px]">
        <h1 className="flex text-lg text-white bg-[#1BBFCA] px-4 py-2 rounded" style={{ ...FONTS.heading_07_bold }}>
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
        <div className="mb-6 mt-2 " style={{ ...FONTS.heading_08 }}>
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

      {activeTab === "open" && !showChatWindow && (
        <div className="grid md:grid-cols-3 gap-4">
          {Array.isArray(adminTickets) &&
            adminTickets.map((ticket: any, index: number) => (
              <TicketCard
                key={index}
                name={ticket.name}
                email={ticket.email}
                message={ticket.description || ticket.message}
                date={new Date(ticket.created_at).toLocaleDateString("en-GB")}
                time={new Date(ticket.created_at).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                priority={ticket.priority}
                avatarUrl={ticket.avatarUrl}
               onView={() => {
  setSelectedTicketUser(ticket.user);
  setSelectedTicketUserDetails(ticket.institute); 
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
       
        <div className="flex h-[50vh] md:h-[71vh] font-sans">
          <ChatWindow user={selectedTicketUser} />
          <Sidebar user={selectedTicketUserDetails} />
        </div>
      )}

      

      {viewShowModal && (
        <div className="fixed inset-0 z-30 mt-22 shadow-[0_4px_10px_3px_rgba(0,0,0,0.10)] h-full rounded-lg">
          <div className="absolute top-0 right-5 max-w-sm min-w-[300px] h-auto overflow-auto p-2 rounded-lg bg-white shadow-lg z-40 no-scrollbar">
            <div className="flex justify-between items-center mb-0">
              <h2 className="text-lg font-semibold mb-2 text-[#716F6F]" style={{ ...FONTS.heading_07 }}>
                Create Ticket
              </h2>
              <button onClick={() => setviewShowModal(false)} className="text-xl mb-3 font-bold text-gray-600 hover:text-black">
                <img src={closeicon} alt="Close" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div style={{ ...FONTS.heading_09 }}>
                <label className="text-gray-700 block mb-2 text-[#716F6F]">Query</label>
                <textarea
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full border rounded p-2 resize-none focus:outline-none focus:ring-2 focus:ring-[#1BBFCA]"
                  rows={2}
                  required
                />
              </div>

              <div style={{ ...FONTS.heading_09 }}>
                <label className="text-gray-700 block mb-2 text-[#716F6F]">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border rounded p-2 resize-none focus:outline-none focus:ring-2 focus:ring-[#1BBFCA]"
                  rows={2}
                  required
                />
              </div>

              <div style={{ ...FONTS.heading_09 }}>
                <label className="text-gray-700 block mb-2 text-[#716F6F]">Priority</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as "High" | "Medium" | "Low")}
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
                <label className="block mb-1 text-sm font-medium text-gray-700 text-[#716F6F]" style={{ ...FONTS.heading_09 }}>Upload</label>
                <label className="w-full h-16 flex items-center justify-center border-2 border-dashed border-gray-300 rounded cursor-pointer hover:bg-gray-50">
                  <input
                    type="file"
                    accept="*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setSelectedFile(e.target.files[0]);
                      }
                    }}
                  />
                  <span className="text-sm text-gray-500">
                    <img className="mx-auto" src={fileimg}></img> Drop Files Here Or Click To Upload
                  </span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-5 mt-0">
                <button
                  type="button"
                  onClick={() => setviewShowModal(false)}
                  className="border border-[#1BBFCA] text-[#1BBFCA] px-4 py-1 rounded-lg hover:bg-[1BBFCA]"
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
