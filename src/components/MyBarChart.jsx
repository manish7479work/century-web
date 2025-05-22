import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    Tooltip,
    XAxis,
    YAxis,
    ResponsiveContainer,
} from "recharts"

const MyBarChart = ({ title, data = [] }) => {
    return (
        <div className="p-4 bg-white w-full rounded-md shadow-sm border-2 border-solid">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">{title}</h2>
            </div>
            <div className="w-full h-48">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="1" />
                        {/* <XAxis dataKey="name" /> */}
                        <XAxis dataKey="name" interval={2} />
                        <YAxis //domain={[0, yAxisMax]}
                            // tickFormatter={(tick) => Math.floor(tick)}
                            allowDecimals={false} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey={title} fill="#E30613" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default MyBarChart

