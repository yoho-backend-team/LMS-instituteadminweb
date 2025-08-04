// components/ChatWindow.tsx
import React, { useState } from "react";
import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import chatimg from '../../assets/navbar/chatbackgroundimg.png';
import sendicon from '../../assets/navbar/sendicon.png';
import paperclip from '../../assets/navbar/Paperclip.png';
import ciricon from '../../assets/navbar/circle.png';
import smiley from '../../assets/navbar/Smiley.png';

const ChatWindow: React.FC = () => {
    const [messages, setMessages] = useState([
        { text: "Hi there, how are you?", time: "2:24 PM", fromUser: false },
        { text: "Waiting for your reply...", time: "2:25 PM", fromUser: false },
        { text: "Hi, I am coming there in few minutes...", time: "2:26 PM", fromUser: true },
        { text: "Thank you very much!", time: "2:27 PM", fromUser: false },
    ]);

    const [input, setInput] = useState("");

    const handleSend = () => {
        if (input.trim() === "") return;

        const now = new Date();
        const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });

        const newMessage = {
            text: input,
            time,
            fromUser: true,
        };

        setMessages((prev) => [...prev, newMessage]);
        setInput("");
    };

    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({
                behavior: "smooth",
                block: "end",         // Scrolls just enough to bring it into view
                inline: "nearest",    // Optional
            });
        }
    }, [messages]);

    return (
        <div className="flex flex-col h-auto w-4/5 w-full">
            <div className="flex p-4 bg-white border shadow-[0_4px_10px_3px_rgba(0,0,0,0.10)] rounded-2xl mr-5 items-center gap-4">
                {/* Circular Image */}
                <img src={ciricon} alt="User" className="w-10 h-10 rounded-full object-cover" />

                {/* Text Column */}
                <div>
                    <div className="font-semibold">Oliver Smith</div>
                    <div className="text-green-500 text-sm">Active Now</div>
                </div>
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-1  overflow-y-auto rounded-t-2xl mt-4 mr-5"
                style={{ backgroundImage: `url(${chatimg})` }}>
                {messages.map((msg, index) => (
                    <MessageBubble key={index} {...msg} />
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-1 bg-white  flex items-center space-x-2 rounded-b-2xl mr-5" style={{
                backgroundImage: `url(${chatimg})`,
            }}>
                <div className="relative flex-1">
                    {/* Left Icon (Smile) */}
                    <span className="absolute left-2 top-8 -translate-y-1/2 text-gray-400 cursor-pointer"><img src={smiley} /></span>

                    {/* Input */}
                    <input
                        type="text"
                        placeholder="Type a message"
                        className="w-full p-2 pl-8 pr-8 bg-white rounded-lg text-sm focus:outline-none border shadow-[0_4px_10px_3px_rgba(0,1,1,0.10)]"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    />

                    {/* Right Icon (Attachment) */}
                    <span className="absolute right-2 top-8 -translate-y-1/2 text-gray-400 cursor-pointer"><img src={paperclip} /></span>
                </div>

                <button className='mt-2'
                    onClick={handleSend}
                >
                    <img className='h-[60px] w-[60px]' src={sendicon} />
                </button>
            </div>
        </div>
    );
};

export default ChatWindow;
