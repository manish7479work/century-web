import React, { useEffect, useState } from 'react';
import MyDataGrid from '../components/Form/MyDataGrid';
import MyModel from '../components/MyModel';
import { USER_CHAT_DATA } from '../data';
import { extractColumns } from '../utils/helper';
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



const KPI_DATA = [
    {
        title: "Hits per Month",
        value: 12345,
        icon: <IoCalendarNumberSharp className="text-white text-3xl" />,
    },
    {
        title: "Hits per Day",
        value: 466545,
        icon: <IoToday className="text-white text-3xl" />,
    },
    {
        title: "Feedback per Day",
        value: 98763,
        icon: <MdFeedback className="text-white text-3xl" />,
    },
    {
        title: "Errors per Day",
        value: 434,
        icon: <MdErrorOutline className="text-white text-3xl" />,
    },
];


const Overview = () => {
    const [kpiData, setKpiData] = useState(KPI_DATA)
    const [searchtext, setsearchtext] = useState("")
    const [rows, setRows] = useState(USER_CHAT_DATA)
    const [dateRange, setDateRange] = useState([]);
    const [period, setPeriod] = useState("day")

    let filteredData = dateRange.length > 0
        ? rows.filter((asset) => {
            const assetDate = dayjs(asset.timestamp).startOf('day');
            const [startDate, endDate] = dateRange.map((date) => dayjs(date).startOf('day'));
            return assetDate.isValid() && assetDate.isBetween(startDate, endDate, null, '[]');
        })
        : rows;


    filteredData = filteredData.filter((item) => {
        const matchesSearch =
            !searchtext ||
            Object.values(item).some(
                (value) =>
                    value &&
                    typeof value === "string" &&
                    value.toLowerCase().includes(searchtext.toLowerCase())
            );

        return matchesSearch;
    });

    const options = [
        {
            "label": "Day",
            "value": "day"
        },
        {
            "label": "Month",
            "value": "month"
        }
    ]

    const selectedOption = options.find(option => option.value === period) || null;


    return (
        <div className='h-full flex flex-col gap-2'>
            <Breadcrumbs />
            <Filter options={options} selectedOption={selectedOption} setPeriod={setPeriod} />
            <div className='h-full overflow-auto flex gap-2 flex-col'>
                <div className='flex gap-2'>
                    {/* <Tree /> */}
                    {/* <BarData /> */}
                    <MyBarChart title={"Usage"} period={period} />
                    <MyBarChart title={"Unique Visitor"} period={period} />
                    {/* <MyBarChart title={"Error Rate"} /> */}

                </div>
                <div className='flex flex-col gap-2'>
                    {/* <Filter searchtext={searchtext} setsearchtext={setsearchtext} setDateRange={setDateRange} /> */}
                    <Table DATA={filteredData} />
                </div>
            </div>
        </div>
    )
};

export default Overview;

const Table = ({ DATA }) => {
    const [rows, setRows] = useState([])
    const [columns, setColumns] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const [chatData, setChatData] = useState([])
    const [title, setTitle] = useState()

    useEffect(() => {
        setRows(DATA)
    }, [DATA])

    useEffect(() => {
        // Example usage
        const excluded = ["id", "chat"];
        const customWidths = [
            { field: 'id', width: 10 },
            { field: 'role', width: 120 }
        ];

        const initialColumns = extractColumns(DATA, excluded, customWidths);
        setColumns(initialColumns)
    }, [])

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
                    width: "300",
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
        const dtitle = `Chats of ${row?.name}`
        setTitle(dtitle)
        setOpenModal((pre) => !pre)
        setChatData(row.chat)
    }

    return (
        <>
            <MyDataGrid rows={rows} columns={columns} />
            <MyModel openModal={openModal} setOpenModal={setOpenModal} title={title} RENDER_COMPONENT={<MyChat chatData={chatData} />} />
        </>
    )
}

const Filter = ({ options = [], selectedOption = () => { }, setPeriod = "", setDateRange = () => { } }) => {
    return (
        <div className='w-full flex gap-2 justify-evenly'>
            <Select
                isMulti={false}
                value={selectedOption}
                onChange={(selectedOption) => {
                    const selectedValue = selectedOption?.value || "";
                    setPeriod(selectedValue);
                }}
                closeMenuOnSelect={true}
                placeholder="Select Period"
                className="basic-multi-select w-full"
                classNamePrefix="select"
                options={options}
                isClearable={true} // Optional: Adds built-in clear (x) button
            />

            <MyDatePicker setDateRange={setDateRange} />
        </div>
    )
}

// const Filter = ({ searchtext, setsearchtext = () => { } }) => {
//     return (
//         <div className='w-full flex gap-2'>
//             <Input
//                 placeholder="Search..."
//                 variant="outlined"
//                 className="w-full"
//                 onChange={(e) => {
//                     setsearchtext(e.target.value);
//                 }}
//                 // sx={{ padding: "8px" }}
//                 value={searchtext}
//             />
//             <div className='w-[550px]'>
//                 <MyDatePicker />
//             </div>
//         </div>
//     )
// }



// ***************************************************************************

const Tree = () => {
    const data = [
        {
            "name": "axis",
            "children": [
                {
                    "name": "Axis",
                    "size": 24593
                },
                {
                    "name": "Axes",
                    "size": 1302
                },
                {
                    "name": "test",
                    "size": 652
                },
                {
                    "name": "AxisLabel",
                    "size": 636
                },
                {
                    "name": "CartesianAxes",
                    "size": 6703
                }
            ]
        },
        {
            "name": "controls",
            "children": [
                {
                    "name": "TooltipControl",
                    "size": 8435
                },
                {
                    "name": "SelectionControl",
                    "size": 7862
                },
                {
                    "name": "PanZoomControl",
                    "size": 5222
                },
                {
                    "name": "HoverControl",
                    "size": 4896
                },
                {
                    "name": "ControlList",
                    "size": 4665
                },
                {
                    "name": "ClickControl",
                    "size": 3824
                },
                {
                    "name": "ExpandControl",
                    "size": 2832
                },
                {
                    "name": "DragControl",
                    "size": 2649
                },
                {
                    "name": "AnchorControl",
                    "size": 2138
                },
                {
                    "name": "Control",
                    "size": 1353
                },
                {
                    "name": "IControl",
                    "size": 763
                }
            ]
        },
        {
            "name": "data",
            "children": [
                {
                    "name": "Data",
                    "size": 20544
                },
                {
                    "name": "NodeSprite",
                    "size": 19382
                },
                {
                    "name": "DataList",
                    "size": 19788
                },
                {
                    "name": "DataSprite",
                    "size": 10349
                },
                {
                    "name": "EdgeSprite",
                    "size": 3301
                },
                {
                    "name": "render",
                    "children": [
                        {
                            "name": "EdgeRenderer",
                            "size": 5569
                        },
                        {
                            "name": "ShapeRenderer",
                            "size": 2247
                        },
                        {
                            "name": "ArrowType",
                            "size": 698
                        },
                        {
                            "name": "IRenderer",
                            "size": 353
                        }
                    ]
                },
                {
                    "name": "ScaleBinding",
                    "size": 11275
                },
                {
                    "name": "TreeBuilder",
                    "size": 9930
                },
                {
                    "name": "Tree",
                    "size": 7147
                }
            ]
        },
        {
            "name": "events",
            "children": [
                {
                    "name": "DataEvent",
                    "size": 7313
                },
                {
                    "name": "SelectionEvent",
                    "size": 6880
                },
                {
                    "name": "TooltipEvent",
                    "size": 3701
                },
                {
                    "name": "VisualizationEvent",
                    "size": 2117
                }
            ]
        },

    ]

    return (
        <Treemap
            width={1000}
            height={550}
            data={data}
            dataKey="size"
            aspectRatio={2 / 3}
            stroke="#fff"
            fill="#8884d8"
        />
    )
}


const BarData = () => {
    const data = [
        {
            "name": "Page A",
            "user visitor": 4000,
        },
        {
            "name": "Page B",
            "user visitor": 3000,
        },
        {
            "name": "Page C",
            "user visitor": 2000,
        },
        {
            "name": "Page D",
            "user visitor": 2780,
        },
        {
            "name": "Page E",
            "user visitor": 1890,
        },
        {
            "name": "Page F",
            "user visitor": 2390,
        },
        {
            "name": "Page G",
            "user visitor": 7490,
        }
    ]

    return (
        <BarChart width={430} height={250} data={data}>
            <CartesianGrid strokeDasharray="3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            {/* <Bar dataKey="pv" fill="#8884d8" /> */}
            <Bar dataKey="user visitor" fill="#82ca9d" />
        </BarChart>
    )
}


