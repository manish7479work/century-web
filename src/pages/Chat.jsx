import React, { useEffect, useState } from 'react';
import { convertToISO, extractColumns } from '../utils/helper';
import Select from 'react-select';
import DataGridWithPadding from '../components/Form/DataGridWithPadding';
import { DatePicker } from "antd";
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import Breadcrumbs from '../components/Breadcrumb/Breadcrumb';
import MyDatePicker from '../components/Form/MyDatePicker';
import { CHAT_DATA } from '../data';
import axiosInstance from '../api/axios';
import Loading from '../components/Loading';

dayjs.extend(isBetween);

const columns = [{ "field": "query", "headerName": "Question", "flex": 1 }, { "field": "response", "headerName": "Answer", "flex": 1 }, { "field": "feedback", "headerName": "Remarks", "width": 300 }]

const Chat = () => {
    const [rows, setRows] = useState([]);
    const [dateRange, setDateRange] = useState([]);
    const [name, setName] = useState([])
    const [loading, setLoading] = useState(false)

    // fetch chat data
    useEffect(() => {
        (async () => {
            const URL = "/get_admin_messages";
            try {
                setLoading(true);
                let start_time = null;
                let end_time = null;

                if (dateRange.length > 0 && dateRange[0]) {
                    start_time = convertToISO(dateRange[0]);
                    end_time = convertToISO(dateRange[1]);
                }

                const bodyData = {
                    "pno": "9876543210",
                    "uid": "c9b1a069-2e1e-4138-adac-b7935e769ac6",
                    start_time,
                    end_time
                };

                const { data } = await axiosInstance.post(URL, bodyData);
                setRows(data.messages);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        })();
    }, [dateRange]);


    let filteredResults = rows
    if (name) {
        filteredResults = filteredResults.filter((row) => row.username.includes(name))
    }

    const options = [...new Set(rows.map((record) => record.username))].map((name) => ({
        label: name,
        value: name,
    }));

    const selectedOption = options.find(option => option.value === name) || null;

    return (
        <div className='h-full w-full flex flex-col gap-2'>
            {loading && <Loading />}
            <Breadcrumbs />
            <Filter options={options} selectedOption={selectedOption} setName={setName} setDateRange={setDateRange} />
            <DataGridWithPadding rows={filteredResults} columns={columns} />
        </div>
    );
};

export default Chat;


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
            />
            <div className='w-[550px]'>
                <MyDatePicker setDateRange={setDateRange} />
            </div>
        </div>
    )
}

