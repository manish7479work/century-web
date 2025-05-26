import { useState, useRef, useEffect } from "react";
import { FaUser, FaRobot } from "react-icons/fa";
import { IoSendSharp } from "react-icons/io5";
import { Alert, IconButton } from "@mui/material";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Header from "../components/Header";
import axiosInstance from "../api/axios";
import Breadcrumbs from "../components/Breadcrumb/Breadcrumb";
import Loading from "../components/Loading";
import { useSelector } from "react-redux";
import { AUTH } from "../constants";
import ChatMessage from "./ChatMessage";

// Extend dayjs
dayjs.extend(relativeTime);

const MyChat = ({ chatData = [], readOnly = true }) => {
    const bottomRef = useRef(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            bottomRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 50); // Delay to allow Markdown to render

        return () => clearTimeout(timer);
    }, [chatData]);

    return (
        <div className="h-full overflow-y-auto bg-white  p-2">
            {chatData.map((item, idx) => (
                <ChatMessage
                    key={idx}
                    type={item.sender}
                    text={item.message}
                    timestamp={item.timestamp}
                    feedback={item.feedback}

                />
            ))}

            <div ref={bottomRef} />
        </div>
    );
};

export default MyChat;


