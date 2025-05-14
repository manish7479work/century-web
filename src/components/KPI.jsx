import { FaMoneyBillWave } from "react-icons/fa";

export default function KPI({ title = "dummy", value = 0, icon }) {
    return (
        <div className="flex-1 flex items-center justify-between p-4 bg-white rounded-md shadow-sm border-2 border-solid">
            <div>
                <p className="text-sm text-gray-500">{title}</p>
                <div className="text-xl font-bold text-gray-800">
                    {Number(value).toLocaleString()}
                    {/* <span className="text-green-500 text-sm font-semibold">+55%</span> */}
                </div>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-red-300 rounded-xl flex items-center justify-center">
                {/* <FaMoneyBillWave className="text-white text-xl" /> */}
                {/* <Icon className="text-white text-xl" /> */}
                {icon}
            </div>
        </div>
    );
}
