import React from "react";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from "recharts";

const chatPromptData = {
    Product: 45,
    Customers: 30,
    Sales: 65,
    Inventory: 20,
    Support: 50,
    Marketing: 25,
};

// Convert object to array format
const data = Object.entries(chatPromptData).map(([key, value]) => ({
    name: key,
    value,
}));

// Find max value for highlighting
const maxValue = Math.max(...data.map((d) => d.value));

const ChatPromptChart = () => {
    return (
        <div className="p-4 bg-white w-full rounded-md shadow-sm border-2 border-solid">
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold">Chat Prompt Data</h2>

            </div>
            <ResponsiveContainer width="100%" height={250}>
                <BarChart data={data}>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis tickFormatter={(v) => `${v}`} />
                    <Tooltip />
                    <Bar dataKey="value" radius={[10, 10, 0, 0]} background={{ fill: "#FCDADB" }} barSize={20} >
                        {data.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={entry.value === maxValue ? "#E30613" : "#F1606C"}
                            />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ChatPromptChart;
