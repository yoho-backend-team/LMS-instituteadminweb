import React, { useRef, useEffect, useState } from "react";
import chatBg from "../../assets/navbar/chatBg.png";
import emojiIcon from "../../assets/navbar/emojiIcon.png";
import attachIcon from "../../assets/navbar/attachIcon.png";
import cancel from "../../assets/navbar/cancel.png";
import image from "../../assets/navbar/image.png";
import Button from "../../assets/navbar/Button.png";
import circle from "../../assets/navbar/circle.png";
import contact from "../../assets/navbar/contact.png";
import box from "../../assets/navbar/box.png";

import clock from "../../assets/navbar/clock.png";
import phone from "../../assets/navbar/phone.png";
import send from "../../assets/navbar/send.png";

interface Message {
  sender: string;
  text: string;
  time: string;
}

interface Props {
  selectedBatch: string;
  messages: Message[];
  message: string;
  onChangeMessage: (msg: string) => void;
  onSendMessage: () => void;
  onDeleteMessage: (index: number) => void;
  onClose: () => void;
  showProfile: boolean;
  setShowProfile: (val: boolean) => void;
  profileData: any;
  setProfileData: (data: any) => void;
  isEditing: boolean;
  setIsEditing: (val: boolean) => void;
}

const ChatView: React.FC<Props> = ({
  //  selectedBatch,
  messages,
  message,
  onChangeMessage,
  onSendMessage,
  onDeleteMessage,
  //  onClose,
  showProfile,
  setShowProfile,
  profileData,
  // setProfileData,
  //  isEditing,
  //  setIsEditing,
}) => {
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className=" h-[89vh] w-[900px]  p-6 overflow-hidden  shadow-lg font-['Inter','sans-serif'] rounded-xl relative">


       <div className=" rounded-lg shadow md:px-6 flex flex-col relative pb-6 mt-12 h-full"> 
        {/* Top Bar */}
        <div className="w-full h-[80px] bg-white rounded-xl shadow-[4px_4px_24px_0px_#0000001A] p-3 flex items-center cursor-pointer transition my-4">
          <img
            src={circle}
            alt="batch"
            className="w-12 h-12 rounded-full mr-4"
            onClick={() => setShowProfile(true)}
          />
          <div>
            <p className="text-gray-800 font-bold text-sm">MERN 2025</p>
            <p className="text-gray-500 text-xs">MEAN STACK 2024</p>
          </div>
        </div>

        {/* Messages */}
        <div
          className="flex-1 overflow-y-auto p-4 h-fit  "
          style={{
            backgroundImage: `url(${chatBg})`,
            backgroundAttachment: "fixed",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center top",
          }}
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-3 flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              } group items-end`}
            >
              {msg.sender !== "user" && (
                <img
                  src={contact}
                  alt="icon"
                  className="w-6 h-6 rounded-full mr-2"
                />
              )}
              <div className="relative max-w-[70%]">
                <div
                  className={`px-4 py-2 rounded-xl text-sm whitespace-pre-wrap break-words shadow-sm ${
                    msg.sender === "user"
                      ? "bg-[#1BBFCA] text-white rounded-br-none"
                      : "bg-white border text-black rounded-bl-none"
                  }`}
                >
                  <p>{msg.text}</p>
                  <p className="text-[10px] text-right mt-1 opacity-70">
                    {msg.time}
                  </p>
                </div>

                {msg.sender === "user" && (
                  <div className="absolute top-1 -left-8">
                    <button
                      onClick={() =>
                        setOpenMenuIndex(openMenuIndex === index ? null : index)
                      }
                    >
                      <img
                        src={Button}
                        alt="menu"
                        className="w-4 h-4 opacity-70 hover:opacity-100"
                      />
                    </button>

                    {openMenuIndex === index && (
                      <div className="absolute top-5 left-0 bg-white border rounded shadow text-xs z-50">
                        <button
                          className="px-3 py-1 hover:bg-gray-100 w-full text-left"
                          onClick={() => {
                            onDeleteMessage(index);
                            setOpenMenuIndex(null);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {msg.sender === "user" && (
                <img
                  src={image}
                  alt="You"
                  className="w-6 h-6 rounded-full ml-2"
                />
              )}
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
        <div className="mt-2 px-8 relative mb-2 ">
          <div className="flex items-center w-full border rounded-md overflow-hidden bg-white shadow">
            {/* Emoji icon inside input */}
            <span className="pl-3 pr-2" >
              <img src={emojiIcon} alt="emoji" className="w-5 h-5 -gap-3" />
            </span>

            {/* Input box with fixed width */}
            <div className="relative ">
              {/* Moves only the box */}
              <input
                className="w-[350px] outline-none py-2 text-sm pr-2 ml-[-10px] "
                placeholder="Type a message"
                value={message}
                onChange={(e) => onChangeMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && onSendMessage()}
              />
            </div>

            {/* Attach icon */}
            <button className="px-2 opacity-70  ml-auto ">
              <img src={attachIcon} alt="attach" className="w-5 h-5" />
            </button>
          </div>

          {/* Send button placed absolutely outside input box */}
          <button
            onClick={onSendMessage}
            className="absolute -right-4 -bottom-3 p-1"
          >
            <img src={send} alt="send" className="w-[45px] h-[45px]" />
          </button>
        </div>
      </div>

      {/* Profile Panel */}
{showProfile && (
  <div className="absolute top-15 right-0 bg-white w-[300px] h-auto shadow-xl rounded-lg z-50 flex flex-col font-['Inter','sans-serif'] text-[#7D7D7D] text-sm overflow-hidden">
    
    {/* Fixed Header */}
    <div className="p-4 border-b flex flex-col items-center shrink-0">
      <div className="w-full flex justify-end mb-2">
        <button onClick={() => setShowProfile(false)}>
          <img src={cancel} alt="cancel" className="w-5 h-5" />
        </button>
      </div>
      <img src={image} alt="profile" className="w-24 h-24 rounded-full mb-3" />
      <h2 className="text-lg font-semibold text-[#716F6F]">
        {profileData.name}
      </h2>
      <p className="text-green-500 text-sm">Online</p>
    </div>

    {/* ✅ Scrollable Content */}
    <div className="overflow-y-auto px-4 py-4 flex-1 min-h-0">
      {/* About */}
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold text-[#716F6F]">About</h3>
          <p>{profileData.about}</p>
        </div>

        {/* Personal Info */}
        <div>
          <h3 className="font-semibold text-[#716F6F]">Personal Information</h3>
          <ul className="space-y-2 mt-2">
            <li className="flex items-center gap-2">
              <img src={box} alt="email" className="w-4 h-4" />
              <span>{profileData.email}</span>
            </li>
            <li className="flex items-center gap-2">
              <img src={clock} alt="availability" className="w-4 h-4" />
              <span>{profileData.availability}</span>
            </li>
            <li className="flex items-center gap-2">
              <img src={phone} alt="phone" className="w-4 h-4" />
              <span>{profileData.phone}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Staff Section */}
      <div className="mt-6">
        <h3 className="font-semibold text-[#716F6F] mb-1">Staff</h3>
        <p>No Staffs Found</p>
      </div>

      {/* Students Section */}
      <div className="mt-6">
        <h3 className="font-semibold text-[#716F6F] mb-1">Students</h3>
        <p>No Students Found</p>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default ChatView;
