import React, { useEffect, useState } from 'react';
import { extractColumns } from '../utils/helper';
import Select from 'react-select';
import DataGridWithPadding from '../components/Form/DataGridWithPadding';
import { DatePicker } from "antd";
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import Breadcrumbs from '../components/Breadcrumb/Breadcrumb';
import MyDatePicker from '../components/Form/MyDatePicker';
import { CHAT_DATA } from '../data';
import axiosInstance from '../api/axios';
import { toast } from 'react-toastify';
import axios from 'axios';
import Loading from '../components/Loading';

dayjs.extend(isBetween);

const Chat = () => {
    const columns = extractColumns(CHAT_DATA, ["timestamp", "id", "name"], [{ field: "remarks", width: 300 }, { field: "name", width: 100 }]);
    const [rows, setRows] = useState([]);
    const [dateRange, setDateRange] = useState([]);
    const [name, setName] = useState([])
    const [loading, setLoading] = useState(false)

    const getChat = async () => {
        try {
            setLoading(true)
            const URL = "https://pragyantest.azurewebsites.net/get_admin_messages"
            const bodyData = {
                "pno": "9876543210",
                "uid": "c9b1a069-2e1e-4138-adac-b7935e769ac6"
            }
            const { data } = await axiosInstance.post(URL, bodyData)
            console.log(data)
            toast.success("Data fetch sucessfully...")
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }


    useEffect(() => {
        const fetchChat = async () => {
            await getChat();
        };

        fetchChat();
    }, []);


    let filteredResults = dateRange.length > 0
        ? rows.filter((asset) => {
            const assetDate = dayjs(asset.timestamp).startOf('day');
            const [startDate, endDate] = dateRange.map((date) => dayjs(date).startOf('day'));
            return assetDate.isValid() && assetDate.isBetween(startDate, endDate, null, '[]');
        })
        : rows;

    if (name) {
        filteredResults = filteredResults.filter((row) => row.name.includes(name))
    }

    const source = dateRange ? filteredResults : rows;
    const options = [...new Set(source.map((record) => record.name))].map((name) => ({
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
                isClearable={false} // Optional: Adds built-in clear (x) button
            />
            <div className='w-[550px]'>
                <MyDatePicker setDateRange={setDateRange} />
            </div>
        </div>
    )
}

