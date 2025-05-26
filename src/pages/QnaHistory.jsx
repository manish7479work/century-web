import React, { useEffect, useRef, useState } from 'react';
import { convertToISO, daysInCurrentMonth, extractColumns, fillMonthlyData, fillYearlyData, isDateRangeWithInTheTarget, isSameMonth, mapDailyTotalsInRange } from '../utils/helper';
import Select from 'react-select';
import DataGridWithPadding from '../components/Form/DataGridWithPadding';
import { DatePicker } from "antd";
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import Breadcrumbs from '../components/Breadcrumb/Breadcrumb';
import MyDatePicker from '../components/Form/MyDatePicker';
import { CHAT_DATA, DUMMY_CHAT, USER_CHAT_DATA } from '../data';
import axiosInstance from '../api/axios';
import Loading from '../components/Loading';
import { useSelector } from 'react-redux';
import { AUTH } from '../constants';
import MyChat from '../components/MyChat';
import ChatMessage from '../components/ChatMessage';
import MyBarChart from '../components/MyBarChart';
import BasicLineChart from '../components/BasicLineChat';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

dayjs.extend(isBetween);

const columns = [{ "field": "query", "headerName": "Question", "flex": 1 }, { "field": "response", "headerName": "Answer", "flex": 1 }, { "field": "feedback", "headerName": "Remarks", "width": 300 }]

const initialData = {
    usage: [],
    average: [],
    errorRate: [],
    chatData: []
}
const QnaHistory = () => {
    const [dateRange, setDateRange] = useState([]);
    const [phoneNumber, setPhoneNumber] = useState(null)
    const [loading, setLoading] = useState(false)
    // const phone = useSelector((state) => state.user.phone)
    const [selectedData, setSelectedData] = useState(null)
    const phone = sessionStorage.getItem(AUTH.PHONE)
    const [users, setUsers] = useState([])
    const [data, setData] = useState(initialData)
    const PNO = useParams().pno;
    const bottomRef = useRef(null);
    const [interval, setInterval] = useState(2);

    useEffect(() => {
        const timer = setTimeout(() => {
            bottomRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 50); // Delay to allow Markdown to render

        return () => clearTimeout(timer);
    }, [DUMMY_CHAT]);

    // fetch last 24 hours, user details that access the application
    useEffect(() => {
        (async () => {
            const URL = "/get_history_overview";
            if (PNO) return
            try {
                setLoading(true);
                let start_time = null;
                let end_time = null;

                if (dateRange.length > 0 && dateRange[0]) {
                    start_time = convertToISO(dateRange[0]);

                    // Add one day to dateRange[1]
                    const endDate = new Date(dateRange[1]);
                    endDate.setDate(endDate.getDate() + 1);
                    end_time = convertToISO(endDate);
                }
                const mode = "daily"
                const bodyData = {
                    "pno": PNO,
                    "uid": "c9b1a069-2e1e-4138-adac-b7935e769ac6",
                    start_time,
                    end_time,
                    mode
                };

                const { data } = await axiosInstance.post(URL, bodyData);
                setUsers(data.history_data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        })();
    }, []);


    const initialPnoRef = useRef(null);

    useEffect(() => {
        (async () => {
            const URL = "/get_user_analytics";

            const effectivePno = PNO ?? selectedData?.pno;
            if (!effectivePno) return;

            // Cache PNO for consistent reference to avoid re-runs
            if (initialPnoRef.current) {
                initialPnoRef.current = effectivePno;
            }

            // let period = "daily";

            console.log(initialPnoRef)


            try {
                setLoading(true);
                let start_time = null;
                let end_time = null;

                if (dateRange.length > 0 && dateRange[0]) {
                    start_time = convertToISO(dateRange[0]);
                    const endDate = new Date(dateRange[1]);
                    endDate.setDate(endDate.getDate() + 1);
                    end_time = convertToISO(endDate);


                }

                const bodyData = {
                    // pno: initialPnoRef.current,
                    pno: effectivePno,

                    uid: "c9b1a069-2e1e-4138-adac-b7935e769ac6", // Replace with dynamic UID if possible
                    start_time,
                    end_time,
                };

                const { data } = await axiosInstance.post(URL, bodyData);

                const mode = data?.analytics_data?.mode || "daily";

                const daysInCurrentMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
                let t = isDateRangeWithInTheTarget(start_time, end_time, daysInCurrentMonth + 1)
                if (!t && mode === "daily") {
                    setInterval(5)
                } else {
                    setInterval(2);
                }

                const usageData = mode === "daily"
                    ? (PNO || !(dateRange.length > 0 && dateRange[0])) ? fillMonthlyData(data.analytics_data.usage) : mapDailyTotalsInRange(start_time, end_time, data?.analytics_data?.usage)
                    : fillYearlyData(data.analytics_data.usage);

                const errorRateData = mode === "daily"
                    ? (PNO && !(dateRange.length > 0 && dateRange[0])) ? fillMonthlyData(data.analytics_data.error_data) : mapDailyTotalsInRange(start_time, end_time, data?.analytics_data?.usage)
                    : fillYearlyData(data.analytics_data.error_data);

                console.log(errorRateData)

                setData(prev => ({
                    ...prev,
                    usage: usageData.map(item => ({
                        name: item.name,
                        Usage: item.count
                    })),
                    average: [],
                    errorRate: errorRateData.map(item => ({
                        name: item.name,
                        "Error Rate": item.count
                    })),
                    chatData: data.chat_data
                }));

                // Only set once to avoid looping
                if (!selectedData) {
                    setSelectedData(data.user_data);
                }

            } catch (error) {
                console.error(error);
                toast.error("Something went wrong");
            } finally {
                setLoading(false);
            }
        })();
    }, [PNO, selectedData, dateRange]);

    let filteredResults = users
    if (selectedData) {
        filteredResults = filteredResults.filter((row) => row.pno.includes(selectedData.pno))
    }

    const options = users.map((record) => ({
        label: `${record.name} <${record.emp_code}>`,
        value: record,
    }));

    const selectedOption = options.find(option => option.value.pno === selectedData?.pno) || null;


    const USER_DATA_PREVIEW = [
        {
            title: "Emp Number:",
            value: selectedData?.emp_code || selectedData?.employee_code || "Not Available"
        },
        {
            title: "Name:",
            value: selectedData?.name ?? "Not Available"
        },
        {
            title: "Phone Number:",
            value: selectedData?.pno || selectedData?.phone || "Not Available"
        },
        {
            title: "Territory Code:",
            value: selectedData?.territory_code ?? "Not Available"
        },
    ]

    return (
        <div className="h-full w-full flex flex-col gap-2">
            {loading && <Loading />}
            <Breadcrumbs />

            {!PNO && <Filter
                options={options}
                selectedOption={selectedOption}
                setName={setSelectedData}
                setDateRange={setDateRange}
            />}


            {/* This part takes remaining space and scrolls */}
            {
                (PNO || selectedData) && (
                    <div className="flex-1 overflow-auto flex flex-col gap-2">
                        <div className='sticky top-0 z-10  inline-block bg-white'>
                            <div className='flex justify-between px-2 border-2 border-solid border-gray-300 py-2 rounded-md'>
                                {
                                    USER_DATA_PREVIEW.map((record, idx) => (
                                        <div key={idx} className='flex gap-2'>
                                            <p className='font-semibold'>{record.title}</p>
                                            <p>{record.value}</p>
                                        </div>
                                    ))
                                }

                            </div>
                        </div>
                        {/* Bar charts container (non-sticky) */}
                        <div className="flex gap-2 ">
                            <MyBarChart title={"Usage"} data={data.usage} period={"monthly"} color='blue' interval={interval} />
                            <MyBarChart title={"Average"} data={data.average} period={"monthly"} color='green' interval={interval} />
                            {/* <BasicLineChart /> */}
                            <MyBarChart title={"Error Rate"} data={data.errorRate} period={"monthly"} interval={interval} />
                        </div>

                        {/* Sticky CHATS Header */}
                        <div className="shadow-sm bg-gray-100 py-2 rounded-md px-2 sticky top-12 z-10 border-b-2 border-solid border-primary">
                            <h1 className="font-bold text-md relative inline-block">
                                CHATS
                                {/* <div className="h-[2px] bg-primary w-[80%] mt-1 mx-auto"></div> */}
                            </h1>
                        </div>

                        {/* Scrollable Chat Messages */}
                        <div className="flex-1 bg-white p-2">
                            {data.chatData.map((item, idx) => (
                                // {DUMMY_CHAT.map((item, idx) => (

                                <ChatMessage
                                    key={idx}
                                    type={item.sender}
                                    text={item.message}
                                    timestamp={item.timestamp}
                                    feedback={item.feedback}
                                />
                            ))}
                            {/* <div ref={bottomRef} /> */}
                        </div>
                    </div>
                )
            }
        </div>

        // <div className="h-full w-full flex flex-col gap-2 overflow-auto">
        //     {loading && <Loading />}
        //     <Breadcrumbs />
        //     <Filter
        //         options={options}
        //         selectedOption={selectedOption}
        //         setName={setName}
        //         setDateRange={setDateRange}
        //     />

        //     {/* Bar charts */}
        //     <div className="flex gap-2 ">
        //         <MyBarChart title={"Usage"} data={[]} period={"monthly"} />
        //         <MyBarChart title={"Average"} data={[]} period={"monthly"} />
        //         <MyBarChart title={"Error Rate"} data={[]} period={"monthly"} />
        //     </div>

        //     {/* CHATS header */}
        //     <div className="shadow-md bg-white py-2 rounded-md px-2">
        //         <h1 className="font-bold text-2xl relative inline-block">
        //             CHATS
        //             <div className="h-[2px] bg-primary w-[80%] mt-1 mx-auto"></div>
        //         </h1>
        //     </div>

        //     {/* Scrollable Chat Box (ONLY this part scrolls) */}
        //     <div className="flex-1 overflow-y-auto bg-white p-2">
        //         {DUMMY_CHAT.map((item, idx) => (
        //             <ChatMessage
        //                 key={idx}
        //                 type={item.sender}
        //                 text={item.message}
        //                 timestamp={item.timestamp}
        //                 feedback={item.feedback}
        //             />
        //         ))}
        //         <div ref={bottomRef} />
        //     </div>
        // </div>


    );
};

export default QnaHistory;




// const Filter = ({ options, selectedOption, setName, setDateRange }) => {
//     return (
//         <div className='w-full flex gap-2'>
//             <Select
//                 isMulti={false}
//                 value={selectedOption}
//                 onChange={(selectedOption) => {
//                     const selectedValue = selectedOption?.value || "";
//                     setName(selectedValue);
//                 }}
//                 closeMenuOnSelect={true}
//                 placeholder="Select Name"
//                 className="basic-multi-select w-full"
//                 classNamePrefix="select"
//                 options={options}
//                 isClearable={true}
//             />
//             <div className='w-[550px] '>
//                 <MyDatePicker disabled={!selectedOption} setDateRange={setDateRange} />
//             </div>
//         </div>
//     )
// }

// import Select from 'react-select';

const customStyles = {
    menuPortal: (base) => ({ ...base, zIndex: 9999 }), // High z-index for the dropdown
};

const Filter = ({ options, selectedOption, setName, setDateRange }) => {
    return (
        <div className='w-full flex gap-2'>
            <Select
                isMulti={false}
                value={selectedOption}
                onChange={(selectedOption) => {
                    const selectedValue = selectedOption?.value || "";
                    setName(selectedValue);
                }}
                closeMenuOnSelect={true}
                placeholder="Select Name"
                className="basic-multi-select w-full"
                classNamePrefix="select"
                options={options}
                isClearable={true}
                menuPortalTarget={document.body} // Renders menu to the body
                styles={customStyles} // Apply custom z-index
            />
            <div className='w-[550px] '>
                <MyDatePicker disabled={!selectedOption} setDateRange={setDateRange} />
            </div>
        </div>
    );
};


