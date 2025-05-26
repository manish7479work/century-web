
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FaUser, FaRobot } from "react-icons/fa";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Chip } from '@mui/material';

// Extend dayjs with relative time
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
                    {/* <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {text}
                    </ReactMarkdown> */}

                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                            h1: ({ node, ...props }) => <h1 className="text-2xl font-bold mt-4 mb-2 font-helvetica" {...props} />,
                            h2: ({ node, ...props }) => <h2 className="text-xl font-semibold mt-3 mb-2 font-helvetica" {...props} />,
                            h3: ({ node, ...props }) => <h3 className="text-lg font-medium mt-2 mb-1 font-helvetica" {...props} />,
                            // ...add more as needed
                            p: ({ node, ...props }) => <p className="text-black" {...props} />,
                            li: ({ node, ...props }) => <li className="text-black" {...props} />,
                            strong: ({ node, ...props }) => <strong className="text-black" {...props} />,
                            em: ({ node, ...props }) => <em className="text-black" {...props} />,
                            blockquote: ({ node, ...props }) => <blockquote className="text-black border-l-4 pl-4 italic" {...props} />,
                            code: ({ node, ...props }) => <code className="text-black bg-gray-200 px-1 rounded" {...props} />,
                            hr: () => <hr className="border-black my-2" />,
                        }}
                    >
                        {text}
                    </ReactMarkdown>

                </div>
                {timestamp && (
                    <div className="text-sm text-gray-600 mt-2 text-right">
                        {timestamp}
                    </div>
                )}
                {feedback && (
                    <div className="text-gray-600 mt-2 text-right">
                        <Chip label={feedback} color="primary" variant='outlined' className="font-semibold" />
                    </div>
                )}
            </div>
            {isUser && (
                <div className="ml-2 mt-1 text-gray-500">
                    <Icon />
                </div>
            )}
        </div>
    );
};

export default ChatMessage;
