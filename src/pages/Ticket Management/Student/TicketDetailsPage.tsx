import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { FiX, FiSend } from "react-icons/fi";
import chatbg from '../../../assets/navbar/chatbg.png'
import circleblue from '../../../assets/navbar/circleblue.png'
import userblue from '../../../assets/navbar/userblue.png'

interface Message {
    sender: "user" | "admin";
    text: string;
    time: string;
}

const TicketDetailsPage: React.FC = () => {
    const { id } = useParams();

    const [messages, setMessages] = useState<Message[]>([
        { sender: "user", text: "Hi there, How are you?", time: "12:24 PM" },
        {
            sender: "user",
            text: "Waiting for your reply. As I have to go back soon. I have to travel long distance.",
            time: "12:25 PM",
        },
        {
            sender: "admin",
            text: "Hi! I am coming there in few minutes. Please wait! I am in taxi right now.",
            time: "12:26 PM",
        },
        {
            sender: "user",
            text: "Thank you very much. I am waiting here at Starbucks cafe.",
            time: "12:35 PM",
        },
    ]);

    const [inputValue, setInputValue] = useState("");

    const handleSend = () => {
        if (inputValue.trim() === "") return;

        const newMessage: Message = {
            sender: "admin",
            text: inputValue,
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };

        setMessages((prev) => [...prev, newMessage]);
        setInputValue("");
    };

    return (
        <div className="p-6 pt-3">
            <h1 className="text-xl font-bold mb-4">Student Ticket</h1>

            {/* Ticket Header */}
            <div className="bg-white rounded-lg shadow-md p-4 flex justify-between items-center mb-6 border-t-4 border-[#14b8c6]">
                <div>
                    <p className="text-sm font-semibold">
                        TICKET ID : <span className="text-[#14b8c6]">#{id}</span>
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                        RAISED DATE & TIME : <span className="font-medium">APR 28, 2025, 4:14 PM</span>
                    </p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-[#14b8c6] text-white rounded-md text-sm font-semibold">
                    <FiX className="text-lg" /> CLOSE TICKET
                </button>
            </div>

            {/* Main layout */}
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Left Section */}
                <div className="flex-1 flex flex-col gap-4">
                    {/* Box 1: Oliver Info */}
                    <div className="bg-white rounded-md shadow p-4">
                        <div className="flex items-center gap-3">
                            <img
                                src={circleblue}
                                alt="User Avatar"
                                className="w-12 h-12 rounded-full object-cover"
                            />

                            <div>
                                <h2 className="font-semibold text-gray-800 text-base">Oliver Smith</h2>
                                <p className="text-green-600 text-sm">Active Now</p>
                            </div>
                        </div>
                    </div>

                    {/* Box 2: Chat Panel */}
                    <div className="bg-white rounded-md shadow p-4 flex flex-col justify-between flex-1 border-2"
                        style={{ backgroundImage: `url(${chatbg})` }}
                    >
                        {/* Chat messages */}
                        <div className="h-[300px] overflow-y-auto rounded-md p-4 space-y-4 mb-4 bg-no-repeat bg-cover bg-center">
                            {messages.map((msg, idx) => (
                                <div
                                    key={idx}
                                    className={`flex items-start gap-2 ${msg.sender === "admin" ? "justify-end" : ""
                                        }`}
                                >
                                    {msg.sender === "user" && (
                                        <img
                                            src={userblue}
                                            alt="User"
                                            className="w-14 h-14 rounded-full object-cover"
                                        />

                                    )}
                                    <div
                                        className={`p-2 rounded shadow text-sm max-w-[75%] ${msg.sender === "admin"
                                            ? "bg-[#14b8c6] text-white"
                                            : "bg-white text-gray-800"
                                            }`}
                                    >
                                        {msg.text}
                                        <div
                                            className={`text-[10px] text-right mt-1 ${msg.sender === "admin" ? "text-white" : "text-gray-500"
                                                }`}
                                        >
                                            {msg.time}
                                        </div>
                                    </div>
                                    {msg.sender === "admin" && (
                                        <img
                                            src={userblue}
                                            alt="User"
                                            className="w-14 h-14 rounded-full object-cover"
                                        />
                                    )}
                                </div>
                            ))}
                            <div className="flex gap-2 mb-4">
                                <button className="bg-blue-100 text-blue-700 px-4 py-1 rounded text-sm">Solved</button>
                                <button className="bg-blue-100 text-blue-700 px-4 py-1 rounded text-sm">Not Related</button>
                            </div>

                            {/* Input */}
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Type a message"
                                    className="w-full border border-gray-500 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#14b8c6]"
                                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                />

                                <button onClick={handleSend} className="bg-green-500 p-2 rounded text-white">
                                    <FiSend />
                                </button>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Right Section */}
                <div className="w-full lg:w-[30%] bg-white rounded-md shadow p-4 space-y-4">
                    <div>
                        <p className="font-semibold text-gray-800 mb-1">Issue Description:</p>
                        <p className="text-sm text-gray-600">If You Can This Yes Successfully Mobile App On Android</p>
                    </div>

                    <div>
                        <p className="font-semibold text-gray-800 mb-1">Issue Category:</p>
                        <p className="text-sm text-gray-600">Feedback</p>
                    </div>

                    <div>
                        <p className="font-semibold text-gray-800 mb-1">Attachments:</p>
                        <p className="text-sm text-gray-600 break-all">2bf39350-F04d-4e22-A5ea-2be943f28e9e.jpeg</p>
                        <a href="#" className="text-blue-500 underline text-sm">View</a>
                    </div>

                    <div>
                        <p className="font-semibold text-gray-800 mb-1">Status:</p>
                        <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
                            Opened
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TicketDetailsPage;
