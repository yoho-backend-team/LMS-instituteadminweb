import React, { useRef, useEffect, useState } from "react";
// import frame2 from "../../assets/navbar/frame2.png";
import chatBg from "../../assets/navbar/chatBg.png";
import emojiIcon from "../../assets/navbar/emojiIcon.png";
import attachIcon from "../../assets/navbar/attachIcon.png";
import cancel from "../../assets/navbar/cancel.png";
import image from "../../assets/navbar/image.png";
import Button from "../../assets/navbar/Button.png";
import circle from "../../assets/navbar/circle.png";
import contact from "../../assets/navbar/contact.png";

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
  selectedBatch,
  messages,
  message,
  onChangeMessage,
  onSendMessage,
  onDeleteMessage,
  onClose,
  showProfile,
  setShowProfile,
  profileData,
  setProfileData,
  isEditing,
  setIsEditing,
}) => {
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="w-3/4 p-6 overflow-y-auto relative">
      <div className="bg-white rounded-lg shadow md:px-6 flex flex-col relative pb-6 mt-12">
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
          className="flex-1 p-4 overflow-y-auto"
          style={{
            backgroundImage: `url(${chatBg})`,
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
              {/* 👤 Show icon on left for others */}
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

                {/* 📎 Show delete option only for user's messages */}
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

              {/* 👤 Show icon on right for your own message */}
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

        {/* Message Input */}
        <div className="mt-2 flex items-center gap-2 px-2 relative">
          <button>
            <img src={emojiIcon} alt="emoji" className="w-5 h-5" />
          </button>
          <input
            className="flex-1 border p-2 rounded-l"
            placeholder="Type a message"
            value={message}
            onChange={(e) => onChangeMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSendMessage()}
          />
          <button className="absolute right-18 top--1 opacity-70">
            <img src={attachIcon} alt="attach" className="w-5 h-5" />
          </button>
          <button
            className="bg-green-500 text-white px-4 rounded-r ml-auto"
            onClick={onSendMessage}
          >
            ➤
          </button>
        </div>
      </div>

      {/* Profile Panel */}
      {showProfile && (
        <div className="absolute top-12 right-0 bg-white w-[300px] h-[90%] shadow-xl rounded-lg p-4 z-50">
          <div className="flex justify-between items-center mb-2">
            <button onClick={() => setShowProfile(false)}>
              <img src={cancel} alt="cancel" className="w-5 h-5" />
            </button>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="text-sm text-blue-500 hover:underline"
              >
                Edit
              </button>
            )}
          </div>
          <div className="flex flex-col items-center mt-2">
            <img
              src={image}
              alt="profile"
              className="w-24 h-24 rounded-full mb-3"
            />
            {isEditing ? (
              <input
                value={profileData.name}
                onChange={(e) =>
                  setProfileData({ ...profileData, name: e.target.value })
                }
                className="text-lg font-semibold text-center border rounded p-1 w-full"
              />
            ) : (
              <>
                <h2 className="text-lg font-semibold">{profileData.name}</h2>
                <p className="text-green-500 text-sm">Online</p>
              </>
            )}
          </div>

          <hr className="my-4" />
          <div className="text-sm space-y-4">
            <div>
              <h3 className="font-semibold">About</h3>
              {isEditing ? (
                <textarea
                  value={profileData.about}
                  onChange={(e) =>
                    setProfileData({ ...profileData, about: e.target.value })
                  }
                  className="border rounded w-full p-1 text-sm"
                />
              ) : (
                <p>{profileData.about}</p>
              )}
            </div>
            <div>
              <h3 className="font-semibold">Personal Information</h3>
              <ul className="space-y-1 mt-1">
                <li>
                  📧{" "}
                  {isEditing ? (
                    <input
                      value={profileData.email}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          email: e.target.value,
                        })
                      }
                      className="border rounded p-1 w-full text-sm"
                    />
                  ) : (
                    profileData.email
                  )}
                </li>
                <li>
                  🕒{" "}
                  {isEditing ? (
                    <input
                      value={profileData.availability}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          availability: e.target.value,
                        })
                      }
                      className="border rounded p-1 w-full text-sm"
                    />
                  ) : (
                    profileData.availability
                  )}
                </li>
                <li>
                  📞{" "}
                  {isEditing ? (
                    <input
                      value={profileData.phone}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          phone: e.target.value,
                        })
                      }
                      className="border rounded p-1 w-full text-sm"
                    />
                  ) : (
                    profileData.phone
                  )}
                </li>
              </ul>
            </div>
          </div>
          <hr className="my-4" />

          {/* Staff Section */}
          <div>
            <h3 className="font-semibold">Staff</h3>
            <p className="text-gray-500">No Staffs Found</p>
          </div>

          <hr className="my-4" />

          {/* Students Section */}
          <div>
            <h3 className="font-semibold">Students</h3>
            <p className="text-gray-500">No Students Found</p>
          </div>

          {isEditing && (
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setIsEditing(false)}
                className="bg-blue-500 text-white px-4 py-1 rounded"
              >
                Save
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatView;
