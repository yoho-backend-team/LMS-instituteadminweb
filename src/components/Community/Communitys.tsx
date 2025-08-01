
import React, { useState } from "react";
import LeftSide from "./LeftSide";
import ChatView from "./ChatView";

interface Message {
  sender: string;
  text: string;
  time: string;
}

const batches = ["MERN 2025", "MEAN STACK 2024"];

const initialChatData: Record<string, Message[]> = {
  "MERN 2025": [
    { sender: "user", text: "Hi there, How are you?", time: "12:41 PM" },
    { sender: "user", text: "Waiting for your reply.", time: "12:42 PM" },
    { sender: "admin", text: "Hi. I am coming.", time: "12:42 PM" },
    { sender: "user", text: "Thanks. Waiting at cafe.", time: "12:43 PM" },
  ],
  "MEAN STACK 2024": [],
};

const Communitys: React.FC = () => {
  const [selectedBatch, setSelectedBatch] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [showProfile, setShowProfile] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState(false);

  const [profileData, setProfileData] = useState({
    name: "MERN 2025",
    about: "Hello My name is Zilan ...",
    email: "felecia_rower@email.com",
    availability: "Mon-Fri 10AM - 8PM",
    phone: "+91 98765 43265",
  });

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

  const handleDeleteMessage = (index: number) => {
    setMessages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex justify-between w-full gap-6 bg-white font-poppins">

      <LeftSide
        batches={batches}
        selectedBatch={selectedBatch}
        onSelectBatch={(batch) => {
          setSelectedBatch(batch);
          setMessages(initialChatData[batch] || []);
          setShowProfile(false);
        }}
      />

      {selectedBatch && (
        <ChatView
          messages={messages}
          message={message}
          onChangeMessage={setMessage}
          onSendMessage={handleSendMessage}
          onDeleteMessage={handleDeleteMessage}
          selectedBatch={selectedBatch}
          onClose={() => {
            setSelectedBatch(null);
            setMessages([]);
          }}
          showProfile={showProfile}
          setShowProfile={setShowProfile}
          profileData={profileData}
          setProfileData={setProfileData}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
      )}
    </div>
  );
};

export default Communitys;
