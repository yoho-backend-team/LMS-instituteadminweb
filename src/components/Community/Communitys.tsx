import React, { useState, useEffect, useRef } from "react";
import circle from "../../assets/navbar/circle.png";
import frame2 from "../../assets/navbar/frame2.png";
import chatBg from "../../assets/navbar/chatBg.png";
import emojiIcon from "../../assets/navbar/emojiIcon.png";
import attachIcon from "../../assets/navbar/attachIcon.png";
import image from "../../assets/navbar/image.png";
import cancel from "../../assets/navbar/cancel.png";

interface Message {
  sender: string;
  text: string;
  time: string;
}

const batches = ["MERN 2025"];

const initialChatData: Record<string, Message[]> = {
  "MERN 2025": [
    { sender: "user", text: "Hi there, How are you?", time: "12:41 PM" },
    {
      sender: "user",
      text: "Waiting for your reply. As I have to go back soon.",
      time: "12:42 PM",
    },
    {
      sender: "admin",
      text: "Hi. I am coming there in few minutes. Please wait.",
      time: "12:42 PM",
    },
    {
      sender: "user",
      text: "Thank you very much. I am waiting here at StarBuck cafe.",
      time: "12:43 PM",
    },
  ],
  "MEAN STACK 2024": [],
};

const Communitys: React.FC = () => {
  const [selectedBatch, setSelectedBatch] = useState<string | null>(null);
  const [showProfile, setShowProfile] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "MERN 2025",
    about: "Hello My name is Zilan ...",
    email: "felecia_rower@email.com",
    availability: "Mon-Fri 10AM - 8PM",
    phone: "+91 98765 43265",
  });

  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMsg: Message = {
      sender: "user",
      text: message.trim(),
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, newMsg]);
    setMessage("");
  };

  const handleDeleteMessage = (indexToDelete: number) => {
    const updatedMessages = messages.filter((_, idx) => idx !== indexToDelete);
    setMessages(updatedMessages);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (

            



    <div className="flex h-[calc(100vh-64px)] font-sans bg-white-100 items-start pt-6 mt-[10px]">
      
      {/* LEFT SIDE */}
      <div className="w-1/4 bg-[#1BBFCA] text-white flex flex-col items-center pt-6 px-4 h-[85vh] rounded-lg overflow-hidden mt-6 ">
      <div className="text-xl  text-[#BBFCA] font-bold  mr-47     ">Batches</div>
        <div className="w-full space-y-4 ">
          {batches.map((batch) => (
            <div
              key={batch}
              onClick={() => {
                setSelectedBatch(batch);
                setShowProfile(false);
                setMessages(initialChatData[batch]);
              }}
              className={`bg-white rounded-xl shadow-md p-4 flex items-center cursor-pointer transition ${
                selectedBatch === batch ? "ring-2 ring-cyan-600" : ""
              }`}
            >
              <img
                src={circle}
                alt="batch"
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <p className="text-gray-800 font-bold text-sm">{batch}</p>
                <p className="text-gray-500 text-xs">
                  {batch === "MERN 2025" ? "MEAN STACK 2024" : "MERN 2025"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT SIDE */}
      {selectedBatch && (
        <div className="w-3/4 p-6 overflow-y-auto min-h-[calc(100vh-64px)] relative">
          <div className="bg-white rounded-lg shadow px-2 sm:px-4 md:px-6 min-h-[calc(100vh-100px)] top--15 flex flex-col relative pb-6">
            {/* <div className="flex justify-end p-2">
              <button
                onClick={() => {
                  setSelectedBatch(null); 
                  setMessages([]); 
                }}
                className="text-gray-500 hover:text-black "
                title="Close Chat"
              >
                <img src={cancel} alt="Close" className="w-5 h-5" />
              </button>
            </div> */}

            {/* Card */}
            <img
              src={frame2}
              alt="MERN Card"
              onClick={() => setShowProfile(true)}
              className="w-auto max-w-[2000px] -ml-5 h-auto -mt-3 mb-4 mx-auto rounded cursor-pointer"
            />

            {/* Chat Area */}
            <div
              className="flex-1 p-4 rounded overflow-y-auto -mt-8"
              style={{
                backgroundImage: `url(${chatBg})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
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
                        onClick={() => handleDeleteMessage(index)}
                        className="absolute -right-6 top-1 hidden group-hover:inline"
                        title="Delete"
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

            {/* Message Input */}
            <div className="mt-2 flex items-center gap-2 px-2 relative">
              <button>
                <img src={emojiIcon} alt="emoji" className="w-5 h-5" />
              </button>
              <input
                className="flex-1 border p-2 rounded-l"
                placeholder="Type a message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <button className="absolute right-18 top--1 opacity-70">
                <img src={attachIcon} alt="attach" className="w-5 h-5" />
              </button>
              <button
                className="bg-green-500 text-white px-4 rounded-r ml-auto"
                onClick={handleSendMessage}
              >
                ➤
              </button>
            </div>
          </div>

          {/* Profile Modal */}
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
                    <h2 className="text-lg font-semibold">
                      {profileData.name}
                    </h2>
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
                        setProfileData({
                          ...profileData,
                          about: e.target.value,
                        })
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
      )}
    </div>
    
  );
};

export default Communitys;
