import React, { useEffect, useState } from "react";
import LeftSide from "./LeftSide";
import ChatView from "./ChatView";
import { useSelector, useDispatch } from "react-redux";
import { fetchCommunityById } from "../../features/Community/Reducers/thunks";
import { selectMessages } from "../../features/Community/Reducers/selectors";
import socket, { socketConnect, socketDisconnect } from "../../utils/socket";
import { GetProfileDetail } from "../../features/Auth/service";

interface Message {
  sender: string;
  sender_name: string;
  text: string;
  time: string;
  timestamp: string;
}

const Communitys: React.FC = () => {
  interface Batch {
    _id?: string;
    group?: string;
    groupimage?: string;
    batch?: { batch_name?: string };
  }

  const [selectedBatch, setSelectedBatch] = useState<Batch | null>(null);
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [showProfile, setShowProfile] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState(false);

  const [userId, setUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  const dispatch = useDispatch<any>();
  const communityMessages = useSelector(selectMessages);

  const getProfile = async () => {
    try {
      const res = await GetProfileDetail();
      if (res?.data) {
        setUserId(res.data._id);

        const fullName = `${res.data.first_name || ""} ${
          res.data.last_name || ""
        }`.trim();
        setUserName(fullName);
      }
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const transformMessages = (apiMessages: any[]) => {
    return apiMessages
      .map((msg) => ({
        sender: msg.sender,
        sender_name: msg.sender_name,
        text: msg.message,
        time: formatTime(msg.timestamp),
        timestamp: msg.timestamp,
      }))
      .reverse();
  };

  useEffect(() => {
    if (communityMessages?.data) {
      const transformedMessages = transformMessages(communityMessages.data);
      setMessages(transformedMessages);
    }
  }, [communityMessages]);

  useEffect(() => {
    socketConnect();

    socket.on("newMessage", (msg: any) => {
      setMessages((prev) => [
        ...prev,
        {
          sender: msg.senderId ?? msg.sender,
          sender_name: msg.name ?? msg.sender_name,
          text: msg.content ?? msg.message,
          time: formatTime(msg.time ?? msg.timestamp),
          timestamp: msg.time ?? msg.timestamp,
        },
      ]);
    });

    return () => {
      socketDisconnect();
      socket.off("newMessage");
    };
  }, []);

  const handleSendMessage = () => {
    if (!message.trim() || !selectedBatch || !userId) return;

    const msgData = {
      content: message.trim(),
      groupId: selectedBatch._id,
      senderId: userId,
      name: userName,
      time: new Date().toISOString(),
    };

    socket.emit("sendMessage", msgData);

    setMessages((prev) => [
      ...prev,
      {
        sender: userId,
        sender_name: "You",
        text: message.trim(),
        time: formatTime(msgData.time),
        timestamp: msgData.time,
      },
    ]);

    setMessage("");
  };

  const handleDeleteMessage = (index: number) => {
    setMessages((prev) => prev.filter((_, i) => i !== index));
  };

  const fetchMessages = () => {
    if (selectedBatch) {
      dispatch(
        fetchCommunityById({
          communityId: selectedBatch._id,
        })
      );

      socket.emit("joinRoom", { roomId: selectedBatch._id, userId });
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [selectedBatch]);

  return (
    <div className="flex justify-between w-full gap-6 bg-white font-poppins">
      <LeftSide
        selectedBatch={selectedBatch}
        onSelectBatch={(batch) => {
          setSelectedBatch(batch);
          setShowProfile(false);
        }}
        instituteId="YOUR_INSTITUTE_ID"
      />

      {selectedBatch && (
        <ChatView
          userId={userId} 
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
          profileData={{
            name: selectedBatch?.group || "",
            about: "Hello My name is Zilan ...",
            email: "felecia_rower@email.com",
            availability: "Mon-Fri 10AM - 8PM",
            phone: "+91 98765 43265",
          }}
          setProfileData={() => {}}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
      )}
    </div>
  );
};

export default Communitys;
