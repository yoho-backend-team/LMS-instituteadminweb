

import React, { useEffect, useState } from "react";
import LeftSide from "./LeftSide";
import ChatView from "./ChatView";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchCommunity, fetchCommunityById } from "../../features/Community/Reducers/thunks";
import { selectMessages } from "../../features/Community/Reducers/selectors";

interface Message {
  sender: string;
  sender_name: string;
  text: string;
  time: string;
  timestamp: string;
}

const batches = ["MERN 2025", "MEAN STACK 2024"];

const Communitys: React.FC = () => {
  interface Batch {
    _id?: string;
    name?: string;
  }
  
  const [selectedBatch, setSelectedBatch] = useState<Batch | null>(null);
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

  const dispatch = useDispatch<any>();
  const communityMessages = useSelector(selectMessages);

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const transformMessages = (apiMessages: any[]) => {
    return apiMessages.map(msg => ({
      sender: msg.sender,
      sender_name: msg.sender_name,
      text: msg.message,
      time: formatTime(msg.timestamp),
      timestamp: msg.timestamp
    })).reverse(); 
  };

  useEffect(() => {
    if (communityMessages?.data) {
      const transformedMessages = transformMessages(communityMessages.data);
      setMessages(transformedMessages);
    }
  }, [communityMessages]);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    const newMsg: Message = {
      sender: "user",
      sender_name: "You",
      text: message.trim(),
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      timestamp: new Date().toISOString()
    };
    setMessages((prev) => [...prev, newMsg]);
    setMessage("");
  };

  const handleDeleteMessage = (index: number) => {
    setMessages((prev) => prev.filter((_, i) => i !== index));
  };

  const fetchMessages = () => {
    if (selectedBatch) {
      dispatch( 
        fetchCommunityById({
          communityId: selectedBatch?._id 
        })
      );
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [selectedBatch]);

  return (
    <div className="flex justify-between w-full gap-6 bg-white font-poppins">

      <LeftSide
        batches={batches}
        selectedBatch={selectedBatch}
        onSelectBatch={(batch) => {
          setSelectedBatch(batch);
          setShowProfile(false);
          fetchMessages();
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