import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCommunityMessages } from "../../features/Community/Reducers/thunks"; 
import { selectMessages } from "../../features/Community/Reducers/selectors"; 
import LeftSide from "./LeftSide";
import ChatView from "./ChatView";
// import { AppDispatch } from '../../store';

interface Message {
  sender: string;
  text: string;
  time: string;
}

const batches = ["MERN 2025", "MEAN STACK 2024"];

const Communitys: React.FC = () => {
  const dispatch = useDispatch();
  const messages = useSelector(selectMessages); 
// const [selectedBatch, setSelectedBatch] = useState<string>(""); // no null

   const [selectedBatch, setSelectedBatch] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");
  const [showProfile, setShowProfile] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState(false);

  const [profileData, setProfileData] = useState({
    name: "MERN 2025",
    about: "Hello My name is Zilan ...",
    email: "felecia_rower@email.com",
    availability: "Mon-Fri 10AM - 8PM",
    phone: "+91 98765 43265",
  });

  useEffect(() => {
    
      dispatch(fetchCommunityMessages({ batch: "688deada6f788de6b9237b53" }));
    
  }, [selectedBatch, dispatch]);

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

    
    console.warn("This just updates locally. Add send message API later.");
      // setMessages((prev) => [...prev, newMsg]);

    setMessage("");
  };

  const handleDeleteMessage = (index: number) => {
    
    console.warn("Implement delete message API later");
  };

  return (
    <div className="flex justify-between w-full gap-6 bg-white font-poppins">
      <LeftSide
        batches={batches}
        selectedBatch={selectedBatch}
        onSelectBatch={(batch) => {
          setSelectedBatch(batch);
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
