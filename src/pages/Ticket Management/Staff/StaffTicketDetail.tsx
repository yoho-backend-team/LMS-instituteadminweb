/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiSend, FiArrowLeft } from "react-icons/fi";
import chtimg from "../../../assets/icons/chtimg.png";
import userblue from "../../../assets/navbar/userblue.png";
import { useTicketContext } from "../../../components/Staff Tickets/StaffTicketContext";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getindividualStaffdata } from "../../../features/Ticket_Management/reducers/selectors";
import { GetIndividualStaffTicketThunks } from "../../../features/Ticket_Management/reducers/thunks";
import { GetImageUrl } from "../../../utils/helper";
import dayjs from "dayjs";
import { updateStaffTicketService } from "../../../features/Ticket_Management/services";
import socket from "../../../utils/socket";
import { GetProfileDetail } from "../../../features/Auth/service";
import { IoIosCloseCircle } from "react-icons/io";

interface Message {
  sender: "user" | "admin";
  text: string;
  time: string;
}
interface AdminProfile {
  _id: string;
  full_name?: string;
  [key: string]: any;
}

const StaffTicketDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tickets } = useTicketContext();
  const [adminProfile, SetAdminProfile] = useState<AdminProfile | null>(null);
  const [messages, setMessages] = useState<Message[]>();

  const ticketId: any = id;
  const ticket = tickets.find((t: any) => t.id === ticketId);
  const status = ticket?.status ?? "opened";

  const dispatch = useDispatch<any>();

  const individualData = useSelector(getindividualStaffdata);

  useEffect(() => {
    dispatch(GetIndividualStaffTicketThunks(ticketId));
  }, [dispatch, ticketId]);

  const handleCloseTicket = async (ticketId: any) => {
    await updateStaffTicketService(ticketId);
    navigate(-1)
  };

  const [inputValue, setInputValue] = useState("");
  const chatRef = useRef<HTMLDivElement>(null);

  const getProfile = async () => {
    const response = await GetProfileDetail();
    SetAdminProfile(response?.data);
  };

  useEffect(() => {
    if (individualData?.messages) {
      setMessages(individualData.messages);
    }
  }, [individualData]);

  useEffect(() => {
    getProfile();
  }, []);

  const handleSend = () => {
    if (inputValue.trim() === "") return;

    const newMessage: Message = {
      ticket_id: id,
      text: inputValue,
      senderType: "InstituteAdmin",
      user: adminProfile?._id,
    } as any;
    socket.emit("sendTeacherTicketMessage", newMessage);
    setMessages((prev: any) => [
      { sender: adminProfile?._id, content: inputValue, date: new Date() },
      ...prev,
    ]);
    setInputValue("");
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [inputValue]);

  useEffect(() => {
    socket.connect();
    socket.on("connect", () => {
      socket.emit("joinTicket", id);
    });

    const handleMessage = (message: Message) => {
      setMessages((prev: any) => [message, ...prev]);
    };

    socket.on("receiveTeacherTicketMessage", handleMessage);
    return () => {
      socket.off("receiveTeacherTicketMessage", handleMessage);
    };
  });


  return (
    <div className="p-6 pt-0">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 text-black rounded-md text-sm font-semibold"
          >
            <FiArrowLeft className="text-xl" />
          </button>
          <h1 className="text-xl font-bold">Staff Ticket</h1>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4 flex justify-between items-center mb-6 border-t-4 border-[#14b8c6]">
        <div>
          <p className="text-sm font-semibold">
            TICKET ID :{" "}
            <span className="text-[#14b8c6]">#{individualData?.id}</span>
          </p>
          <p className="text-sm text-gray-600 mt-1">
            RAISED DATE & TIME :{" "}
            <span className="font-medium">
              {dayjs(individualData?.date).format("DD-MM-YYYY , HH:MM A")}
            </span>
          </p>
        </div>
        {status !== "closed" && (
          <button onClick={() => handleCloseTicket(individualData?.uuid)} className="flex items-center gap-2 px-4 py-2 bg-white text-[#3ABE65] rounded-md text-sm font-semibold border-2 shadow">
            <IoIosCloseCircle className="text-lg" /> CLOSE TICKET
          </button>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 flex flex-col gap-4 relative">
          <div className="bg-white rounded-md border-t-2 shadow p-4">
            <div className="flex items-center gap-3">
              <img
                src={GetImageUrl(individualData?.user?.image) ?? undefined}
                alt="User Avatar"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h2 className="font-semibold text-gray-800 text-base">
                  {individualData?.user?.full_name}
                </h2>
                <p className="text-green-600 text-sm">Active Now</p>
              </div>
            </div>
          </div>

          <div
            className="bg-white rounded-md shadow border-2 flex flex-col flex-1 relative"
            style={{ backgroundImage: `url(${chtimg})` }}
          >
            <div
              ref={chatRef}
              className="h-[300px] overflow-y-auto p-4 space-y-4 bg-no-repeat bg-cover bg-center"
            >
              {messages?.map((msg: any, idx: any) => (
                <div
                  key={idx}
                  className={`flex items-start gap-2 ${msg.sender === adminProfile?._id ? "justify-end" : ""
                    }`}
                >
                  {msg.sender === "user" && (
                    <img
                      src={userblue}
                      alt="User"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  )}
                  <div
                    className={`p-2 rounded shadow text-sm max-w-[75%] ${msg.sender === adminProfile?._id
                      ? "bg-[#14b8c6] text-white"
                      : "bg-white text-gray-800"
                      }`}
                  >
                    {msg.content}
                    <div
                      className={`text-[10px] text-right mt-1 ${msg.sender === adminProfile?._id
                        ? "text-white"
                        : "text-gray-500"
                        }`}
                    >
                      {dayjs(msg.date).format("HH:MM A")}
                    </div>
                  </div>
                  {msg.sender === "admin" && (
                    <img
                      src={userblue}
                      alt="Admin"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  )}
                </div>
              ))}

              {status !== "closed" && (
                <div className="flex gap-2 px-4 py-2 border-t">
                  <button
                    onClick={() => handleCloseTicket(individualData?.uuid)}
                    className="border border-[#1BBFCA] text-[#1BBFCA] text-sm font-medium px-4 py-2 rounded"
                  >
                    Solved
                  </button>
                  <button className="bg-[#1BBFCA] text-white text-sm font-medium px-4 py-2 rounded">
                    Not Related
                  </button>
                </div>
              )}
            </div>

            <div className="border-t border-gray-200 px-4 py-3 flex items-center gap-2 bg-white">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type a message"
                className="w-full border border-gray-400 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#14b8c6]"
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <button
                onClick={handleSend}
                className="bg-green-500 p-2 rounded text-white"
              >
                <FiSend />
              </button>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[30%] bg-white border rounded-md shadow p-4 space-y-4">
          <div>
            <p className="font-semibold text-gray-800 mb-1">
              Issue Description:
            </p>
            <p className="text-sm text-gray-600">
              {individualData?.description}
            </p>
          </div>
          <div>
            <p className="font-semibold text-gray-800 mb-1">Issue Category:</p>
            <p className="text-sm text-gray-600">{individualData?.category}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-800 mb-1">Attachments:</p>
            <p className="text-sm text-gray-600 break-all">
              {GetImageUrl(individualData?.file)}
            </p>
            <a
              href={GetImageUrl(individualData?.file) ?? undefined}
              target="_blank"
              className="text-blue-500 underline text-sm"
            >
              View
            </a>
          </div>
          <div>
            <p className="font-semibold text-gray-800 mb-1">Status:</p>
            <span
              className={`inline-block px-3 py-2 rounded text-sm ${status === "opened"
                ? "text-white bg-[#1BBFCA]"
                : "text-white bg-[#3ABE65]"
                }`}
            >
              {status}
            </span>
          </div>
        </div>

      </div>

    </div>


  );
};

export default StaffTicketDetail;
