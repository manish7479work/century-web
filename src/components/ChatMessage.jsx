import { MarkdownHooks } from 'react-markdown'
import { FaUser, FaRobot } from "react-icons/fa";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Chip } from '@mui/material';

// Extend dayjs
dayjs.extend(relativeTime);

const ChatMessage = ({ type, text, timestamp = null, feedback = null }) => {
    const isUser = type === "user";
    const Icon = isUser ? FaUser : FaRobot;

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
                    <MarkdownHooks>{text}</MarkdownHooks>
                    {/* {text} */}
                </div>
                {timestamp && (<div className="text-sm text-gray-600 mt-2 text-right">
                    {/* {dayjs(timestamp).fromNow()} */}
                    {timestamp}
                </div>)}
                {feedback && (<div className=" text-gray-600 mt-2 text-right">
                    {/* {dayjs(timestamp).fromNow()} */}
                    <Chip label={feedback} color="primary" variant='outlined' className=" font-semibold" />

                </div>)}




            </div>
            {isUser && (
                <div className="ml-2 mt-1 text-gray-500">
                    <Icon />
                </div>
            )}
        </div>
    );
};

export default ChatMessage