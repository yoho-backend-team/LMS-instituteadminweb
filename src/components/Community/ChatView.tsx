/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useState } from "react";
import chatBg from "../../assets/navbar/chatbg.png";
import emojiIcon from "../../assets/navbar/emojiIcon.png";
import attachIcon from "../../assets/navbar/attachIcon.png";
import cancel from "../../assets/navbar/Cancel.png";
import image from "../../assets/navbar/image.png";
import Button from "../../assets/navbar/Button.png";
import circle from "../../assets/navbar/circle.png";
import contact from "../../assets/navbar/contact.png";
import box from "../../assets/navbar/box.png";
import clock from "../../assets/navbar/clock.png";
import phone from "../../assets/navbar/phone.png";
import send from "../../assets/navbar/send.png";
import { GetImageUrl } from "../../utils/helper";
import EmojiPicker, { type EmojiClickData } from "emoji-picker-react";
// import { GetLocalStorage } from "../../utils/localStorage";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";

interface Message {
  sender: string;
  text: string;
  time: string;
  sender_name: string;
}

interface Props {
  userId: string | null;
  selectedBatch: any;
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

const colors = [
  "#FF5733",
  "#1E90FF",
  "#2ECC71", // green
  "#9B59B6", // purple
  "#E67E22", // orange
  "#E91E63", // pink
  "#16A085", // teal
];
const senderColorMap: Record<string, string> = {};

function getSenderColor(sender: string) {
  if (!senderColorMap[sender]) {
    const random = colors[Object.keys(senderColorMap).length % colors.length];
    senderColorMap[sender] = random;
  }
  return senderColorMap[sender];
}

const ChatView: React.FC<Props> = ({
  // userId,
  selectedBatch,
  messages,
  message,
  onChangeMessage,
  onSendMessage,
  onDeleteMessage,
  showProfile,
  setShowProfile,
  profileData,
}) => {
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const handleEmojiClick = (emojiData: EmojiClickData) => {
    onChangeMessage(message + emojiData.emoji);
  };

  const userIds: any = useSelector((state: RootState) => state.authuser.user)

  return (
    <div className="h-[83vh] grow shadow-lg font-poppins rounded-xl relative">
      <div className="rounded-lg shadow md:px-6 flex flex-col pb-6 h-full">
        {/* Top Bar */}
        <div
          className="w-full h-[80px] bg-white rounded-xl shadow-[4px_4px_24px_0px_#0000001A] p-3 flex items-center cursor-pointer transition my-4"
          onClick={() => setShowProfile(true)}
        >
          <img
            src={
              selectedBatch
                ? GetImageUrl(selectedBatch?.groupimage ?? undefined) ??
                undefined
                : circle
            }
            alt="batch"
            className="w-12 h-12 rounded-full mr-4"
          />
          <div>
            <p className="text-[#7D7D7D] font-bold text-sm">
              {selectedBatch ? selectedBatch?.group : "Select a Batch"}
            </p>
            <p className="text-[#7D7D7D] text-xs">
              {selectedBatch
                ? selectedBatch?.batch?.batch_name
                : "No Batch Selected"}
            </p>
          </div>
        </div>

        {/* Messages */}
        <div
          className="flex-1 overflow-y-auto p-4 h-fit"
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
              className={`mb-3 flex ${msg.sender === userIds?._id ? "justify-end" : "justify-start"
                } group items-end`}
            >
              {msg.sender !== userIds?._id && (
                <img
                  src={contact}
                  alt="icon"
                  className="w-10 h-10 rounded-full mr-1"
                />
              )}

              <div className="relative max-w-[70%]">
                <p
                  className="text-xs font-semibold mb-1"
                  style={{
                    color: getSenderColor(msg.sender),
                  }}
                >
                  {msg.sender_name}
                </p>

                <div
                  className={`px-4 py-2 rounded-xl text-sm whitespace-pre-wrap break-words shadow-sm flex gap-2 ${msg.sender === userIds?._id
                    ? "bg-[#1BBFCA] text-white rounded-br-none justify-end"
                    : "bg-white border text-black rounded-bl-none"
                    }`}
                >
                  <p>{msg.text}</p>
                  <p className="text-[10px] text-right mt-1 opacity-70">
                    {msg.time}
                  </p>
                </div>

                {msg.sender === userIds?._id && (
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

              {msg.sender === userIds?._id && (
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

        {/* Input */}
        <div className="flex items-center">
          <div className="flex items-center w-full border rounded-md overflow-hidden bg-white shadow p-1">
            <span
              className="pl-3 pr-2 cursor-pointer"
              onClick={() => setShowEmojiPicker((prev) => !prev)}
            >
              <img src={emojiIcon} alt="emoji" className="w-5 h-5" />
            </span>
            <input
              className="w-full outline-none py-2 text-sm"
              placeholder="Type a message"
              value={message}
              onChange={(e) => onChangeMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onSendMessage()}
            />
            <button className="opacity-70 pr-3">
              <img src={attachIcon} alt="attach" className="w-5 h-5" />
            </button>
          </div>

          <button onClick={onSendMessage} className="p-1 mt-2">
            <img src={send} alt="send" className="w-[50px] h-[50px]" />
          </button>
          {showEmojiPicker && (
            <div className="absolute bottom-16 left-4 z-50">
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}
        </div>
      </div>

      {/* Profile Panel */}
      {showProfile && (
        <div className="absolute top-5 right-6 bg-white w-[300px] h-auto shadow-xl rounded-lg z-50 flex flex-col font-['Inter','sans-serif'] text-[#7D7D7D] text-sm overflow-hidden">
          <div className="p-4 border-b flex flex-col items-center shrink-0">
            <div className="w-full flex justify-end mb-2">
              <button onClick={() => setShowProfile(false)}>
                <img src={cancel} alt="cancel" className="w-5 h-5" />
              </button>
            </div>
            <img
              src={
                selectedBatch
                  ? GetImageUrl(selectedBatch?.groupimage ?? undefined) ??
                  undefined
                  : circle
              }
              alt="profile"
              className="w-24 h-24 rounded-full mb-3"
            />
            <h2 className="text-lg font-semibold text-[#716F6F]">
              {selectedBatch?.group}
            </h2>
            <p className="text-green-500 text-sm">Online</p>
          </div>

          <div className="overflow-y-auto px-4 py-4 flex-1 min-h-0">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-[#716F6F]">About</h3>
                <p>{profileData.about}</p>
              </div>

              <div>
                <h3 className="font-semibold text-[#716F6F]">
                  Personal Information
                </h3>
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

            <div className="mt-6">
              <h3 className="font-semibold text-[#716F6F] mb-1">Staff</h3>
              <p>No Staffs Found</p>
            </div>

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
