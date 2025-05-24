import React, { useEffect, useState } from 'react';
import MyDataGrid from '../components/Form/MyDataGrid';
import MyModel from '../components/MyModel';
import { USER_CHAT_DATA } from '../data';
import { convertToISO, extractColumns, fillMonthlyData, fillYearlyData, getMonthDateRange, getMonthsToJanuary, isDateRangeWithInTheTarget, } from '../utils/helper';
import MyChat from '../components/MyChat';
import Breadcrumbs from '../components/Breadcrumb/Breadcrumb';
import KPI from '../components/KPI';

import { IoCalendarNumberSharp } from "react-icons/io5";
import { MdFeedback, MdErrorOutline } from "react-icons/md";
import { IoToday } from "react-icons/io5";
import MyDatePicker from '../components/Form/MyDatePicker';
import { Input } from '@mui/joy';
import ChatPromptChart from '../components/ChatPromptChart';
import { BarChart, CartesianGrid, Legend, Treemap, XAxis, YAxis, Bar, Tooltip } from 'recharts';
import MyBarChart from '../components/MyBarChart';
import Select from 'react-select';
import dayjs from 'dayjs';
import axiosInstance from '../api/axios';
import Loading from '../components/Loading';
import { toast } from 'react-toastify';
import Chat from './Chat';
import { useSelector } from 'react-redux';
import { AUTH } from '../constants';
import { useNavigate, useParams } from 'react-router-dom';

const initialData = {
    usage: [],
    uniqueVisitor: [],
    errorRate: [],
    historyData: []
}
const initialOptions = getMonthsToJanuary();
const Overview = () => {
    const [rows, setRows] = useState(USER_CHAT_DATA)
    const [dateRange, setDateRange] = useState([]);
    const [period, setPeriod] = useState()
    // const [period, setPeriod] = useState("daily")

    const [DATA, setDATA] = useState(initialData)
    const [loading, setLoading] = useState(true)
    const phone = sessionStorage.getItem(AUTH.PHONE)
    const [isDisableDropdown, setIsDisableDropdown] = useState(false)

    const fetchInitialData = async () => {
        if (dateRange.length > 0 && dateRange[0]) return;

        if (!period) {
            setDATA(initialData)
            return
        }
        let start_time = null;
        let end_time = null;

        if (period != "Last 24 Hours" || !period) {
            const dateRange = getMonthDateRange(period)
            start_time = dateRange.start_date;
            end_time = dateRange.end_date
        }

        try {
            setLoading(true);
            const daysPayload = 30
            // let period = isDateRangeWithInTheTarget(start_time, end_time, daysPayload) ? "daily" : "monthly"
            let period = "daily"
            const bodyData = {
                "pno": String(phone),
                "uid": "c9b1a069-2e1e-4138-adac-b7935e769ac6",
                mode: period,
                start_time,
                end_time
            };
            // const [usages, uniqueVisitors, errorRate, historyData] = await Promise.all([
            //     axiosInstance.post("/get_usage", bodyData),
            //     axiosInstance.post("/get_unique_visitors", bodyData),
            //     axiosInstance.post('/get_error_data', bodyData),
            //     axiosInstance.post("get_history_overview", bodyData)
            // ]);

            // const usageData = period === "daily" ? fillMonthlyData(usages?.data.usage_data) : fillYearlyData(usages?.data.usage_data)
            // const uniqueVisitorData = period === "daily" ? fillMonthlyData(uniqueVisitors?.data.unique_users_data) : fillYearlyData(uniqueVisitors?.data.unique_users_data)
            // const errorRateData = period === "daily" ? fillMonthlyData(errorRate?.data.error_data) : fillYearlyData(errorRate?.data.error_data)


            const { data } = await axiosInstance.post("/get_all_overview_data", bodyData)
            const usageData = period === "daily" ? fillMonthlyData(data.data.usage) : fillYearlyData(data.data.usage)
            const uniqueVisitorData = period === "daily" ? fillMonthlyData(data.data.unique_users) : fillYearlyData(data.data.unique_users)
            const errorRateData = period === "daily" ? fillMonthlyData(data.data.error_data) : fillYearlyData(data.data.error_data)

            setDATA(prev => ({
                ...prev,
                usage: usageData.map(item => ({
                    name: item.name,
                    Usage: item.count
                })),
                uniqueVisitor: uniqueVisitorData.map(item => ({
                    name: item.name,
                    "Unique Visitor": item.count
                })),
                errorRate: errorRateData.map(item => ({
                    name: item.name,
                    "Error Rate": item.count
                })),
                historyData: data.data.active_users_history
            }));

            // console.log(data)
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong")
        } finally {
            setLoading(false);
        }
    }


    // fetch data
    useEffect(() => {
        fetchInitialData()
    }, [period]);

    const fetchDataOnDateRange = async () => {
        try {
            setLoading(true)
            const URL = "/overview_timerange_data"
            let start_time = null;
            let end_time = null;
            if (dateRange.length > 0 && dateRange[0]) {
                start_time = convertToISO(dateRange[0]);

                // Add one day to dateRange[1]
                const endDate = new Date(dateRange[1]);
                endDate.setDate(endDate.getDate() + 1);
                end_time = convertToISO(endDate);
                const targetDay = 30
                const mode = isDateRangeWithInTheTarget(start_time, end_time, targetDay) ? "daily" : "monthly"

                const bodyData = {
                    "pno": String(phone),
                    "uid": "c9b1a069-2e1e-4138-adac-b7935e769ac6",
                    start_time,
                    end_time,
                    mode: "daily"
                };
                const { data } = await axiosInstance.post(URL, bodyData)

                // const usageData = fillYearlyData(data?.data?.usage)
                // const uniqueVisitorData = fillYearlyData(data?.data?.unique_user)
                // const errorRateData = fillYearlyData(data?.data?.error_data)

                const usageData = mode === "daily" ? fillMonthlyData(data?.data?.usage) : fillYearlyData(data?.data?.usage)
                const uniqueVisitorData = mode === "daily" ? fillMonthlyData(data?.data?.usage) : fillYearlyData(data?.data?.unique_user)
                const errorRateData = mode === "daily" ? fillMonthlyData(data?.data?.error_data) : fillYearlyData(data?.data?.error_data)


                // console.log(data.data)
                // console.log(uniqueVisitorData)
                // console.log(usageData)
                // console.log(errorRateData)

                setDATA(prev => ({
                    ...prev,
                    usage: usageData.map(item => ({
                        name: item.name,
                        Usage: item.count
                    })),
                    uniqueVisitor: uniqueVisitorData.map(item => ({
                        name: item.name,
                        "Unique Visitor": item.count
                    })),
                    errorRate: errorRateData.map(item => ({
                        name: item.name,
                        "Error Rate": item.count
                    })),
                    historyData: data?.data?.active_users_history
                }));
            }
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchDataOnDateRange()
    }, [dateRange])

    useEffect(() => {
        setPeriod(options[0].value)
        // setPeriod("daily")

    }, [dateRange])

    // enable/disalbe dropdown 
    useEffect(() => {
        if (dateRange.length > 0 && dateRange[0]) {
            setIsDisableDropdown(true)
            setPeriod(null)
        } else {
            setIsDisableDropdown(false)
        }

    }, [dateRange])

    // const options = (initialOptions && initialOptions.length > 0)
    //     && initialOptions.map((record) => ({ label: record.month, value: record.number }))

    const options = (initialOptions && initialOptions.length > 0)
        ? [
            { label: "Last 24 Hours", value: "Last 24 Hours" },
            ...initialOptions.map((record) => ({
                label: record.month,
                value: record.number
            })),
        ]
        : [];

    // console.dir(option)

    const selectedOption = options.find(option => option.value === period) || null;
    return (
        <div className='h-full flex flex-col gap-2'>
            {loading && <Loading />}

            <div className='h-full flex gap-2 flex-col'>
                <Breadcrumbs />
                <Filter options={options} selectedOption={selectedOption} setPeriod={setPeriod} setDateRange={setDateRange} isDisableDropdown={isDisableDropdown} />
                <div className='flex gap-2'>
                    <MyBarChart title={"Usage"} data={DATA.usage} period={period} color='blue' />
                    <MyBarChart title={"Unique Visitor"} data={DATA.uniqueVisitor} period={period} color='green' />
                    <MyBarChart title={"Error Rate"} data={DATA.errorRate} period={period} />

                </div>
                <div className='h-full overflow-auto'>
                    {/* <Filter searchtext={searchtext} setsearchtext={setsearchtext} setDateRange={setDateRange} /> */}
                    <Table DATA={DATA?.historyData} />
                    {/* <Table /> */}
                </div>
            </div>
        </div>
    )
};

export default Overview;

const Table = ({ DATA }) => {
    const INITIAL_COLUMNS = [
        { field: "emp_code", headerName: "Employee Code", width: 150 },
        { field: "name", headerName: "Name", width: 250 },
        { field: "pno", headerName: "Phone No.", width: 250 },
        // { field: "designation", headerName: "Designation", width: 150 },
        { field: "branch_code", headerName: "Branch Code", width: 150 },
        { field: "territory_code", headerName: "Territory Code", width: 200 },
    ];
    const [rows, setRows] = useState([])
    const [columns, setColumns] = useState(INITIAL_COLUMNS)
    const [openModal, setOpenModal] = useState(false)
    const [chatData, setChatData] = useState([])
    const [title, setTitle] = useState()

    const navigate = useNavigate()

    useEffect(() => {
        setRows(DATA)
    }, [DATA])

    useEffect(() => {
        const filedName = "chats"
        setColumns((preColumns) => {
            // Check if the "actions" column already exists
            if (preColumns.some((column) => column.field === filedName)) {
                return preColumns;
            }
            return [
                ...preColumns,
                {
                    field: filedName,
                    headerName: "Chats",
                    flex: 1,
                    renderCell: (params) => (
                        <p
                            style={{ textDecoration: "underline", color: "blue" }}
                            onClick={() => handleShowChat(params.row)}
                            className="hover:cursor-pointer"
                        >
                            SHOW CHATS
                        </p>
                    ),
                },
            ];
        });
    }, []);

    const handleShowChat = (row) => {
        // const dtitle = `Chats of ${row?.name}`
        // setTitle(dtitle)
        // setOpenModal((pre) => !pre)
        // setChatData(row.chat)
        // console.log(row)
        navigate("/dashboard/qna-history/" + row.pno)
    }

    return (
        <MyDataGrid rows={rows} columns={columns} />
    )
}

const Filter = ({ options = [], selectedOption = () => { }, setPeriod = () => { }, setDateRange = () => { }, isDisableDropdown = false }) => {
    return (
        <div className='w-full flex gap-2 justify-evenly'>
            <MyDatePicker setDateRange={setDateRange} />
            <Select
                isMulti={false}
                value={selectedOption}
                onChange={(selectedOption) => {
                    const selectedValue = selectedOption?.value || "";
                    setPeriod(selectedValue);
                }}
                closeMenuOnSelect={true}
                placeholder="Select Month"
                className="basic-multi-select w-full"
                classNamePrefix="select"
                options={options}
                isClearable={true} // Optional: Adds built-in clear (x) button
                isDisabled={isDisableDropdown}
            />

        </div>
    )
}

