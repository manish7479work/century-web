import { useState, useRef, useEffect } from "react";
import { FaUser, FaRobot } from "react-icons/fa";
import { IoSendSharp } from "react-icons/io5";
import { IconButton } from "@mui/material";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Header from "../components/Header";
import axiosInstance from "../api/axios";
import Breadcrumbs from "../components/Breadcrumb/Breadcrumb";
import Loading from "../components/Loading";

// Extend dayjs
dayjs.extend(relativeTime);

const Chat = () => {
    const [chatData, setChatData] = useState([]);
    const [prompt, setPrompt] = useState("");
    const bottomRef = useRef(null);
    const [loading, setLoading] = useState(false)
    const [fetchChat, setFetchChat] = useState(false)


    useEffect(() => {
        let isMounted = true; // track if component is still mounted

        async function fetchMessages() {
            try {
                setLoading(true)
                const URL = "/get_messages";
                const bodyData = {
                    pno: "9876543210",
                    uid: "c9b1a069-2e1e-4138-adac-b7935e769ac6"
                }
                const { data } = await axiosInstance.post(URL, bodyData);
                if (isMounted) {
                    console.log(data);
                    // Optionally set state with data here
                    setChatData(data?.messages ?? [])
                }
            } catch (error) {
                if (isMounted) {
                    console.error("Failed to fetch messages:", error);
                    // Optionally set error state here
                }
            } finally {
                setLoading(false)
            }
        }

        fetchMessages();

        return () => {
            isMounted = false; // cleanup flag on unmount
        };
    }, []);



    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!prompt.trim()) return;

        try {
            setFetchChat(true)
            const URL = "/query";
            const bodyData = {
                pno: "9876543210",
                uid: "c9b1a069-2e1e-4138-adac-b7935e769ac6",
                message: prompt
            }

            const newMessage = {
                message: prompt,
                sender: "user",
                timestamp: new Date().toISOString()
            };

            setChatData([...chatData, newMessage]);
            setPrompt("");

            const { data } = await axiosInstance.post(URL, bodyData);

            setChatData([...chatData, ...data]);
            setPrompt("");
        } catch (error) {
            console.log(error)
        } finally {
            setFetchChat(false)
        }
    };

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatData, fetchChat]);

    return (
        <div className="flex flex-col h-full w-full">
            {loading && <Loading />}

            <div className="mb-3">

                <Breadcrumbs />
            </div>
            <div className="flex-1 overflow-y-auto bg-white py-2 px-4 sm:px-8 space-y-4">
                {chatData.map((item, idx) => (
                    <div key={idx}>

                        {/* <ChatMessage type="user" text={item.sender} timestamp={item.timestamp} />
                        <ChatMessage type="ai" text={item.message} timestamp={item.timestamp} /> */}

                        <ChatMessage type={item.sender} text={item.message} timestamp={item.timestamp} />

                    </div>

                ))}

                {fetchChat && (<ChatLoader />
                )}

                <div ref={bottomRef} />

                <form
                    onSubmit={handleSubmit}
                    className="sticky bottom-0 bg-white flex items-center border-2 border-gray-200 rounded-md px-2 py-1"
                >
                    <input
                        type="text"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Chat with Pragyan"
                        className="flex-1 bg-transparent outline-none text-sm placeholder:text-gray-600"
                    />
                    <IconButton type="submit">
                        <IoSendSharp />
                    </IconButton>
                </form>
            </div>
        </div>
    );
};

export default Chat;

const ChatMessage = ({ type, text, timestamp }) => {
    const isUser = type === "user";
    const Icon = isUser ? FaUser : FaRobot;
    const parsedText = text.split(/\*\*(.*?)\*\*/g); // parse **bold**

    return (
        <div className={`flex items-start ${isUser ? "justify-end" : "justify-start"} mb-4`}>
            {!isUser && (
                <div className="mr-2 mt-1 text-gray-500">
                    <Icon />
                </div>
            )}
            <div>
                <div
                    className={`px-4 py-3 rounded-lg max-w-xl text-sm shadow 
                    ${isUser ? "bg-blue-100 text-gray-900" : "bg-gray-100 text-gray-800"}`}
                >
                    {parsedText.map((part, i) =>
                        i % 2 === 1 ? <strong key={i}>{part}</strong> : <span key={i}>{part}</span>
                    )}
                    {/* <span>{text}</span> */}
                </div>
                {/* <div className="text-xs text-gray-600 mt-2 text-right">
                    {dayjs(timestamp).fromNow()}
                </div> */}
            </div>
            {isUser && (
                <div className="ml-2 mt-1 text-gray-500">
                    <Icon />
                </div>
            )}
        </div>
    );
};



// components/ChatLoader.jsx
const ChatLoader = () => {
    return (
        <div className="flex items-start justify-start mb-4">
            <div className="mr-2 mt-1 text-gray-500">
                <FaRobot />
            </div>
            <div className="px-4 py-3 rounded-lg max-w-xs text-sm shadow bg-gray-100 text-gray-800">
                <TypingDots />
            </div>
        </div>
    );
};

const TypingDots = () => (
    <div className="flex space-x-1">
        <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
        <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
        <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
    </div>
);

// export default ChatLoader;
