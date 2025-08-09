import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCommunityMessages } from "../../features/Community/Reducers/thunks"; 
import { selectMessages } from "../../features/Community/Reducers/selectors"; 
import LeftSide from "./LeftSide";
import ChatView from "./ChatView";
import type { AppDispatch } from "../../app/store";



const Communitys: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const messages = useSelector(selectMessages);

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

  // 🧠 Whenever selectedBatch changes → fetch messages
  useEffect(() => {
    if (selectedBatch) {
      dispatch(fetchCommunityMessages({ batch: selectedBatch }));
    }
  }, [selectedBatch, dispatch]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    console.warn("This just updates locally. Add send message API later.");
    setMessage("");
  };

  const handleDeleteMessage = () => {
    console.warn("Implement delete message API later");
  };

  const dummyBatches = [
    { _id: "688deada6f788de6b9237b53", group: "MERN 2025" },
    { _id: "688deada6f788de6b9237b54", group: "SVS batch" },
    { _id: "688deada6f788de6b9237b55", group: "PYTHON 2025" },
    { _id: "688deada6f788de6b9237b56", group: "C++ 2025" },
    { _id: "688deada6f788de6b9237b57", group: "mysql 2025" },
  ];

  return (
    <div className="flex justify-between w-full gap-6 bg-white font-poppins">
      <LeftSide
        batches={dummyBatches}
        selectedBatch={selectedBatch}
        onSelectBatch={(batchId) => {
          setSelectedBatch(batchId); // This triggers chat load
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
          onClose={() => setSelectedBatch(null)}
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