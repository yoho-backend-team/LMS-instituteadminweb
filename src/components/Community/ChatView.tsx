/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import chatBg from "../../assets/navbar/chatbg.png";
import emojiIcon from "../../assets/navbar/emojiIcon.png";
// import attachIcon from "../../assets/navbar/attachIcon.png";
import cancel from "../../assets/navbar/Cancel.png";
import image from "../../assets/navbar/image.png";
import Button from "../../assets/navbar/Button.png";
import circle from "../../assets/navbar/circle.png";
import contact from "../../assets/navbar/contact.png";
import send from "../../assets/navbar/send.png";
import { GetImageUrl } from "../../utils/helper";
import EmojiPicker, { type EmojiClickData } from "emoji-picker-react";
import { useSelector, useDispatch } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import { fetchCommunityProfileThunk } from "../../features/Community/Reducers/thunks";

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
  onSendMessage: (attachment?: File | null) => void;
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
  "#2ECC71",
  "#9B59B6",
  "#E67E22",
  "#E91E63",
  "#16A085",
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
  selectedBatch,
  messages,
  message,
  onChangeMessage,
  onSendMessage,
  onDeleteMessage,
  showProfile,
  setShowProfile,
}) => {
  const chatEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedAttachment, setSelectedAttachment] = useState<File | null>(
    null
  );

  const dispatch = useDispatch<AppDispatch>();
  const userIds: any = useSelector((state: RootState) => state.authuser.user);
  const profile: any = useSelector(
    (state: RootState) => state.community.profileData
  );

  // ✅ Emoji handling
  const handleEmojiClick = (emojiData: EmojiClickData) => {
    onChangeMessage(message + emojiData.emoji);
  };

  // ✅ Scroll to bottom when messages update
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ✅ Fetch batch profile
  useEffect(() => {
    if (showProfile) {
      dispatch(fetchCommunityProfileThunk(selectedBatch?.batch?._id));
    }
  }, [dispatch, selectedBatch?.batch?._id, showProfile]);

  // ✅ Prevent empty message send
  const handleSend = () => {
    if (!message.trim() && !selectedAttachment) return; // block empty sends
    onSendMessage(selectedAttachment);
    setSelectedAttachment(null);
  };

  // ✅ Handle file attachment
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedAttachment(file);
    }
  };
  

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
                ? GetImageUrl(selectedBatch?.groupimage ?? undefined) ?? undefined
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
              className={`mb-3 flex ${
                msg.sender === userIds?._id ? "justify-end" : "justify-start"
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
                  className={`px-4 py-2 rounded-xl text-sm whitespace-pre-wrap break-words shadow-sm flex gap-2 ${
                    msg.sender === userIds?._id
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

        {/* Input Section */}
        <div className="flex items-center mt-2 relative">
          <div className="flex items-center w-full border rounded-md overflow-hidden bg-white shadow p-1">
            {/* <span
              className="pl-3 pr-2 cursor-pointer"
              onClick={() => setShowEmojiPicker((prev) => !prev)}
            >
              <img src={emojiIcon} alt="emoji" className="w-5 h-5" />
            </span> */}

            <input
              className="w-full outline-none py-2 text-sm"
              placeholder="Type a message"
              value={message}
              onChange={(e) => onChangeMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />

            {/* File upload */}
            {/* <button
              className="opacity-70 pr-3"
              onClick={() => fileInputRef.current?.click()}
            >
              <img src={attachIcon} alt="attach" className="w-5 h-5" />
            </button> */}
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          <button onClick={handleSend} className="p-1 mt-2">
            <img src={send} alt="send" className="w-[50px] h-[50px]" />
          </button>
{showEmojiPicker && (
  <div className="absolute bottom-16 left-4 z-50">
    <EmojiPicker onEmojiClick={handleEmojiClick} />
  </div>
)}
        </div>

        {/* Preview of attachment (optional) */}
        {selectedAttachment && (
          <div className="mt-2 flex items-center gap-3 bg-gray-100 px-3 py-2 rounded-lg text-sm">
            <p className="truncate w-[200px]">{selectedAttachment.name}</p>
            <button
              onClick={() => setSelectedAttachment(null)}
              className="text-red-500 text-xs"
            >
              Remove
            </button>
          </div>
        )}
      </div>

      {/* Profile Panel */}
      {showProfile && (
        <div className="sm:h-[350px] absolute top-5 right-6 bg-white w-[300px] h-auto shadow-xl rounded-lg z-50 flex flex-col font-['Inter','sans-serif'] text-[#7D7D7D] text-sm overflow-hidden">
          <div className="p-4 border-b flex flex-col items-center shrink-0">
            <div className="w-full flex justify-end mb-2">
              <button onClick={() => setShowProfile(false)}>
                <img src={cancel} alt="cancel" className="w-5 h-5" />
              </button>
            </div>
            <img
              src={
                selectedBatch
                  ? GetImageUrl(selectedBatch?.groupimage ?? undefined) ?? undefined
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
                <p>{profile?.batch?.course?.description}</p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-semibold text-[#716F6F] mb-1">Staffs</h3>
              {profile?.batch?.instructor?.map((data: any, i: number) => (
                <p key={i}>{data?.full_name}</p>
              ))}
            </div>
            <div className="mt-6">
              <h3 className="font-semibold text-[#716F6F] mb-1">Students</h3>
              {profile?.batch?.student?.map((data: any, i: number) => (
                <p key={i}>{data?.full_name}</p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatView;
