import React from "react";
import { LuSend } from "react-icons/lu";

import { FiPlus } from "react-icons/fi";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import chatimg from '../../assets/navbar/chatbackgroundimg.png'

interface ChatWindowProps {
  user: {
    first_name: string;
    is_active: boolean;
    image: string;
  };
}

const ChatWindow: React.FC<ChatWindowProps> = ({ user }) => {
  return (
    <div className="flex flex-col justify-between w-4/5 border border-[#E2E8F0] rounded-xl bg-white mx-2 mt-2">
      {/* Top Bar */}
      <div className="flex p-4 bg-white border shadow-[0_4px_10px_3px_rgba(0,0,0,0.10)] rounded-2xl mr-5 items-center gap-4">
        <img
          src={user.image}
          alt={""}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <div className="font-semibold">{user.first_name}</div>
          <div className={`text-sm ${user.is_active ? 'text-green-500' : 'text-red-500'}`}>
  {user.is_active ? 'Active Now' : 'Inactive'}
</div>
        </div>
      </div>

      {/* Messages Section */}
      <div className="flex-1 p-4 overflow-y-auto"
       style={{ backgroundImage: `url(${chatimg})` }}>
        {/* Example message bubble */}
        <div className="mb-2 flex flex-col items-start">
          <div className="bg-gray-200 text-black p-2 rounded-xl max-w-[70%]">
            Hello! How can I help you today?
          </div>
        </div>
      </div>

      {/* Input Bar */}
      <div className="flex items-center border-t px-4 py-3 gap-3">
        <FiPlus className="text-gray-500 text-xl cursor-pointer" />
        <MdOutlineEmojiEmotions className="text-gray-500 text-xl cursor-pointer" />
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button className="ml-2 bg-[#1E40AF] hover:bg-blue-800 text-white p-2 rounded-full">
          <LuSend />
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
