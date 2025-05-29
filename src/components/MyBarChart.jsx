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

const MyBarChart = ({ title, data = [], color = "#E30613", interval = 2 }) => {
    const titleValue = data.length === 12 ? `${title} / Month` : `${title} / Day`;
    // console.log(data.length)
    return (
        <div className="p-4 bg-white w-full rounded-md shadow-sm border-2 border-solid">
            {/* <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">{title}</h2>
            </div> */}
            <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        margin={{ top: 5, right: 10, left: 10, bottom: 20 }} // Adds spacing inside the chart
                    >
                        <CartesianGrid strokeDasharray="1" />

                        <XAxis
                            dataKey="name"
                            interval={interval}
                            label={{
                                value: titleValue,
                                position: 'insideBottom',
                                offset: -15, // Lower this to push label farther from legend
                                className: 'text-md font-semibold',
                            }}
                        />

                        <YAxis
                            allowDecimals={false}
                            label={{
                                value: 'Y-Axis Label',
                                angle: -90,
                                position: 'outsideLeft',
                                // offset: 30, // Increase this value to push the label more to the left

                            }}
                        />

                        <Tooltip />
                        <Legend
                            verticalAlign="top"
                            align="right"
                            wrapperStyle={{ paddingBottom: 10, marginRight: 0, paddingRight: 0 }} // Optional: adds space below the legend
                        />

                        <Bar dataKey={title} fill={color} />
                    </BarChart>
                </ResponsiveContainer>


            </div>
        </div>
    )
}

export default MyBarChart

