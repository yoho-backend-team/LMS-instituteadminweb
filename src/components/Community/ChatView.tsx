// ChatView.tsx
import React, { useRef, useEffect } from "react";
import frame2 from "../../assets/navbar/frame2.png";
import chatBg from "../../assets/navbar/chatBg.png";
import emojiIcon from "../../assets/navbar/emojiIcon.png";
import attachIcon from "../../assets/navbar/attachIcon.png";
import cancel from "../../assets/navbar/cancel.png";
import image from "../../assets/navbar/image.png";

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

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="w-3/4 p-6 overflow-y-auto min-h-[calc(100vh-64px)] relative">
      <div className="bg-white rounded-lg shadow px-4 md:px-6 min-h-[calc(100vh-64px)] flex flex-col relative pb-6">
        {/* <div className="flex justify-end p-2">
          <button onClick={onClose}>
            <img src={cancel} alt="Close" className="w-5 h-5" />
          </button>
        </div> */}
        <img
          src={frame2}
          alt="Batch Banner"
          onClick={() => setShowProfile(true)}
          className="cursor-pointer w-[900px] h-[150px] mb-4 mt-auto"
        />

        <div
          className="flex-1 p-4 overflow-y-auto mt--20"
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
                msg.sender === "admin" ? "justify-end" : "justify-start"
              } group`}
            >
              <div className="relative">
                <div
                  className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                    msg.sender === "admin"
                      ? "bg-cyan-500 text-white"
                      : "bg-white border text-black"
                  }`}
                >
                  <p>{msg.text}</p>
                  <p className="text-[10px] text-right mt-1">{msg.time}</p>
                </div>
                {msg.sender === "user" && (
                  <button
                    onClick={() => onDeleteMessage(index)}
                    className="absolute -right-6 top-1 hidden group-hover:inline"
                  >
                    <img
                      src={cancel}
                      alt="delete"
                      className="w-4 h-4 opacity-70 hover:opacity-100"
                    />
                  </button>
                )}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

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

      {showProfile && (
        <div className="absolute top-7 right-0 bg-white w-[300px] h-[80%] shadow-xl rounded-lg p-4 z-50">
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
