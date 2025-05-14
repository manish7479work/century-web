import { FaUser, FaRobot } from "react-icons/fa";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// EXTEND dayjs with relativeTime
dayjs.extend(relativeTime);

const MyChat = ({ chatData = [] }) => {
    return (
        <div className="bg-white py-8 px-4 sm:px-8 h-full overflow-auto">
            {chatData.map((item, idx) => (
                <div key={idx}>
                    <ChatMessage type="user" text={item.prompt} timestamp={item.timestamp} />
                    <ChatMessage type="ai" text={item.response} timestamp={item.timestamp} />
                </div>
            ))}
        </div>
    );
};

const ChatMessage = ({ type, text, timestamp }) => {
    const isUser = type === "user";
    const Icon = isUser ? FaUser : FaRobot;
    const parsedText = text.split(/\*\*(.*?)\*\*/g); // bold syntax parser

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
                </div>
                <div className="text-xs text-gray-600 mt-2 text-right">
                    {/* {dayjs(timestamp).fromNow()} */}
                    {timestamp}
                </div>
            </div>
            {isUser && (
                <div className="ml-2 mt-1 text-gray-500">
                    <Icon />
                </div>
            )}
        </div>
    );
};




export default MyChat
