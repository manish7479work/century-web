// import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis, ResponsiveContainer } from "recharts"

// const MyBarChart = ({ title, data = [], period }) => {

//     const generateCurrentMonthData = () => {
//         const today = new Date()
//         const year = today.getFullYear()
//         const month = today.getMonth()

//         // Get number of days in the current month
//         const daysInMonth = new Date(year, month + 1, 0).getDate()

//         const data = []
//         for (let day = 1; day <= daysInMonth; day++) {
//             let val
//             if (title === "Usage") {
//                 val = Math.floor(Math.random() * 2320) + 64
//             } else if (title == "Error Rate") {
//                 val = Math.floor(Math.random() * 820) + 23

//             } else {
//                 val = Math.floor(Math.random() * 5000) + 11
//             }
//             data.push({
//                 name: `${day}`,
//                 [title]: val,
//             })
//         }
//         return data
//     }

//     data = generateCurrentMonthData()

//     return (
//         <div className="p-4 bg-white w-full rounded-md shadow-sm border-2 border-solid">
//             <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-lg font-semibold">{title}</h2>
//             </div>
//             <div className="w-full h-64">
//                 <ResponsiveContainer width="100%" height="100%">
//                     <BarChart data={data}>
//                         <CartesianGrid strokeDasharray="3" />
//                         <XAxis dataKey="name" />
//                         <YAxis />
//                         <Tooltip />
//                         <Legend />
//                         <Bar dataKey={title} fill="#E30613" />
//                         {/* <Bar dataKey="user visitor" fill="#E30613" label={{ position: 'top', fill: '#000', fontSize: 12 }} /> */}
//                     </BarChart>
//                 </ResponsiveContainer>
//             </div>
//         </div>
//     )
// }

// export default MyBarChart












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

const MyBarChart = ({ title, data = [], period }) => {
    const generateData = () => {
        if (period === "day") {
            const today = new Date()
            const year = today.getFullYear()
            const month = today.getMonth()
            const daysInMonth = new Date(year, month + 1, 0).getDate()

            const dailyData = []
            for (let day = 1; day <= daysInMonth; day++) {
                let val
                if (title === "Usage") {
                    val = Math.floor(Math.random() * 2320) + 64
                } else if (title === "Error Rate") {
                    val = Math.floor(Math.random() * 820) + 23
                } else {
                    val = Math.floor(Math.random() * 5000) + 11
                }
                dailyData.push({
                    name: `${day}`,
                    [title]: val,
                })
            }
            return dailyData
        } else if (period === "month") {
            const months = [
                "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
            ]

            const monthlyData = months.map((month) => {
                let val
                if (title === "Usage") {
                    val = Math.floor(Math.random() * 50000) + 1000
                } else if (title === "Error Rate") {
                    val = Math.floor(Math.random() * 20000) + 500
                } else {
                    val = Math.floor(Math.random() * 120000) + 1500
                }
                return {
                    name: month,
                    [title]: val,
                }
            })

            return monthlyData
        } else {
            return []
        }
    }

    data = generateData()

    return (
        <div className="p-4 bg-white w-full rounded-md shadow-sm border-2 border-solid">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">{title}</h2>
            </div>
            <div className="w-full h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3" />
                        <XAxis dataKey="name" />
                        <YAxis />
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

