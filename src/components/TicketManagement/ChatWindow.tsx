/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { LuSend } from "react-icons/lu";

// import { FiPlus } from "react-icons/fi";
// import { MdOutlineEmojiEmotions } from "react-icons/md";
import chatimg from '../../assets/navbar/chatbackgroundimg.png'
import { GetProfileDetail } from "../../features/Auth/service";
import socket from "../../utils/socket";
import dayjs from "dayjs";
import { FONTS } from "../../constants/uiConstants";

interface ChatWindowProps {
  user: {
    user: any;
    first_name: string;
    is_active: boolean;
    image: string;
    uuid: string;
    messages: any
  };
}

const ChatWindow: React.FC<ChatWindowProps> = ({ user }) => {
  const [inputValue, setInputValue] = useState<any>();
  const [adminProfile, setAdminProfile] = useState<any>();
  const [messages, setMessages] = useState<any>();

  const getProfile = async () => {
    const response = await GetProfileDetail();
    setAdminProfile(response?.data)
  }

  useEffect(() => {
    getProfile();
  }, [])

  const handleSend = () => {
    const newMessage = {
      ticket_id: user?.uuid,
      text: inputValue,
      senderType: "InstituteAdmin",
      user: adminProfile?._id
    }
    socket.emit("sendTicketMessage", newMessage)
    setMessages((prev: any) => [...prev, { content: inputValue, sender: adminProfile?._id }])
    setInputValue("");
  }

  useEffect(() => {
    if (user?.messages) {
      setMessages(user.messages)
    }
  }, [user])

  return (
    <div className="flex flex-col justify-between w-full h-[75vh] border border-[#E2E8F0] rounded-xl bg-white chatwindow">
      {/* Top Bar */}
      <div className="flex p-4 bg-white border shadow-[0_4px_10px_3px_rgba(0,0,0,0.10)] rounded-2xl m-2 items-center gap-4">
        <img
          src={user.image}
          alt={""}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <div className="font-semibold">{user?.user?.first_name + " " + user?.user?.last_name}</div>
          <div className={`text-sm ${user.is_active ? 'text-green-500' : 'text-red-500'}`}>
            {user.is_active ? 'Active Now' : 'Inactive'}
          </div>
        </div>
      </div>

      {/* Messages Section */}
      <div className="flex-1 p-4 overflow-y-auto"
        style={{ backgroundImage: `url(${chatimg})` }}>
        {/* Example message bubble */}
        {messages?.map((msg: any, index: any) => (<div key={index} className="mb-2 flex flex-col items-end">
          <div className={`bg-gray-200 text-black p-2 rounded-xl max-w-[70%] ${msg?.sender === adminProfile?._id ? 'bg-[#14b8c6] text-white' : 'bg-white text-gray-800'}`}>
            <p style={{ ...FONTS.heading_07 }}>{msg.content}</p>
            <p className="" style={{ ...FONTS.description }}>{dayjs(msg.date).format("HH:MM A")}</p>
          </div>
        </div>))}
      </div>

      {/* Input Bar */}
      <div className="flex items-center border-t px-4 py-3 gap-3">
        {/* <FiPlus className="text-gray-500 text-xl cursor-pointer" />
        <MdOutlineEmojiEmotions className="text-gray-500 text-xl cursor-pointer" /> */}
        <input
          value={inputValue}
          onChange={(e: any) => setInputValue(e.target.value)}
          type="text"
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="ml-2 bg-[#1E40AF] hover:bg-blue-800 text-white p-2 rounded-full">
          <LuSend />
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
