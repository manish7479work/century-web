// import * as React from 'react';
// import { LineChart } from '@mui/x-charts/LineChart';

import { Tooltip } from "antd"
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

// export default function BasicLineChart() {
//     return (
//         <LineChart
//             xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
//             series={[
//                 {
//                     data: [2, 5.5, 2, 8.5, 1.5, 5],
//                 },
//             ]}
//             height={300}
//         />
//     );
// }


const data = [
    {
        "name": "Page A",
        "uv": 4000,
        "pv": 2400,
        "amt": 2400
    },
    {
        "name": "Page B",
        "uv": 3000,
        "pv": 1398,
        "amt": 2210
    },
    {
        "name": "Page C",
        "uv": 2000,
        "pv": 9800,
        "amt": 2290
    },
    {
        "name": "Page D",
        "uv": 2780,
        "pv": 3908,
        "amt": 2000
    },
    {
        "name": "Page E",
        "uv": 1890,
        "pv": 4800,
        "amt": 2181
    },
    {
        "name": "Page F",
        "uv": 2390,
        "pv": 3800,
        "amt": 2500
    },
    {
        "name": "Page G",
        "uv": 3490,
        "pv": 4300,
        "amt": 2100
    }
]

const BasicLineChat = ({ title = null }) => {
    return (
        <div className="p-4 bg-white w-full rounded-md shadow-sm border-2 border-solid">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">{title}</h2>
            </div>
            <div className="w-full h-48">
                <ResponsiveContainer width="100%" height="100%">

                    < LineChart data={data}>
                        <CartesianGrid strokeDasharray="3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        {/* <Line type="monotone" dataKey="pv" stroke="#8884d8" /> */}
                        <Line type="monotone" dataKey="pv" stroke="#8884d8" />
                        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                    </LineChart >
                </ResponsiveContainer>
            </div>
        </div>
    )
}



export default BasicLineChat




