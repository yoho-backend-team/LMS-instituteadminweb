// components/MessageBubble.tsx
import React from "react";
import contact from '../../assets/navbar/contact.png';
import { FONTS } from '../../constants/uiConstants';

interface MessageProps {
  text: string;
  time: string;
  fromUser?: boolean;
}

const MessageBubble: React.FC<MessageProps> = ({ text, time, fromUser = false }) => {
  return (
    <div className={`flex flex-col ${fromUser ? "items-end" : "items-start"} mb-4`}>
      {/* Row with avatar + message bubble */}
      <div className={`flex ${fromUser ? "flex-row-reverse" : "flex-row"} items-start gap-2 `}>

        <img
          src={contact} // Icon path
          alt="User"
          className="w-12 h-12"
        />

        {/* Chat bubble */}
        <div className={`shadow-[0_4px_10px_3px_rgba(0,0,0,0.3)] max-w-xs p-3 rounded-lg text-sm ${fromUser ? "bg-[#1BBFCA] text-white" : "bg-white text-[#7D7D7D]"}`} style={{ ...FONTS.heading_09 }}>
          <p>{text}</p>
        </div>
      </div>

      {/* Timestamp below bubble */}
      <span className={`text-[11px] mt-1 text-[#7D7D7D] ${fromUser ? "pr-10 text-right" : "pl-12 text-left"}`} style={{ ...FONTS.heading_09 }}>
        {time}
      </span>
    </div>



  );
};

export default MessageBubble;
