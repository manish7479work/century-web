// import React, { useEffect, useState } from 'react'
// import MyDataGrid from '../components/Form/MyDataGrid'
// import { extractColumns } from '../utils/helper'
// import { Chip } from '@mui/material'
// import Select from 'react-select'
// // import { Input } from '@mui/joy'
// import { toast } from 'react-toastify'
// import Breadcrumbs from '../components/Breadcrumb/Breadcrumb'
// import { Input } from '@mui/joy'
// import axiosInstance from '../api/axios'
// import Loading from '../components/Loading'
// "react-select"

// const INITIAL_COLUMNS = [
//     {
//         field: "emp_code",
//         headerName: "Employee Code",
//         width: 150
//     },
//     {
//         field: "name",
//         headerName: "Name",
//         width: 250
//     },
//     {
//         field: "phone",
//         headerName: "Phone No.",
//         width: 150
//     },

//     {
//         field: "designation",
//         headerName: "Designation",
//         width: 150
//     },

//     {
//         field: "branch_code",
//         headerName: "Branch Code",
//         width: 150
//     },
//     {
//         field: "territory_code",
//         headerName: "Territory Code",
//         width: 150
//     },

// ]

// const User = () => {
//     const [rows, setRows] = useState([])
//     // const [columns, setColumns] = useState(extractColumns(USER_DATA, ["id", "status"]))
//     const [columns, setColumns] = useState(INITIAL_COLUMNS)

//     const [searchtext, setsearchtext] = useState("")
//     const [loading, setLoading] = useState(false)

//     useEffect(() => {
//         const fieldName = "status";
//         setColumns((prevColumns) => {
//             if (prevColumns.some((column) => column.field === fieldName)) {
//                 return prevColumns;
//             }
//             return [
//                 ...prevColumns,
//                 {
//                     field: fieldName,
//                     headerName: fieldName.charAt(0).toUpperCase() + fieldName.slice(1),
//                     width: 120, // width should be a number, not a string
//                     renderCell: (params) => {
//                         const isActive = params.value
//                         return (
//                             <Chip
//                                 label={params.value ? "Active" : "In Active"}
//                                 style={{
//                                     width: "80px"
//                                 }}
//                                 color={isActive ? "success" : "error"}
//                                 variant="outlined"
//                             />
//                         );
//                     },
//                 },
//             ];
//         });
//     }, []);

//     useEffect(() => {
//         const fieldName = "Update To";
//         setColumns((prevColumns) => {
//             if (prevColumns.some((column) => column.field === fieldName)) {
//                 return prevColumns;
//             }
//             return [
//                 ...prevColumns,
//                 {
//                     field: fieldName,
//                     headerName: fieldName.charAt(0).toUpperCase() + fieldName.slice(1),
//                     width: "120",
//                     renderCell: (params) => {
//                         const currentStatus = params.row.status;
//                         const newStatus = currentStatus ? "In Active" : "Active";
//                         const newColor = !currentStatus ? "success" : "error";

//                         return (
//                             <Chip
//                                 label={newStatus}
//                                 style={{
//                                     // backgroundColor: newColor,
//                                     color: "white",
//                                     width: "80px",

//                                 }}
//                                 variant='outline'
//                                 clickable
//                                 onClick={() => clickHandle(params.row, !currentStatus)}
//                                 color={newColor}
//                             />
//                         );
//                     },
//                 },
//             ];
//         });
//     }, []);

//     // fetch User data
//     useEffect(() => {
//         const fetchUser = async () => {
//             const URL = "/get_admin_users"
//             try {
//                 setLoading(true)
//                 const bodyData = {
//                     "pno": "9876543210",
//                     "uid": "c9b1a069-2e1e-4138-adac-b7935e769ac6"
//                 }
//                 const { data } = await axiosInstance.post(URL, bodyData)
//                 const { users } = data
//                 // console.log(users)
//                 setRows(users)
//                 // setColumns(extractColumns(users))
//             } catch (error) {
//                 console.log(error)
//             } finally {
//                 setLoading(false)
//             }
//         };
//         fetchUser();
//     }, []);

//     // console.log(rows)

//     const updateStatus = async (phone, status) => {
//         try {
//             setLoading(true)
//             const URL = "modify_user_access"
//             const bodyData = {
//                 "pno": "9876543210",
//                 "uid": "c9b1a069-2e1e-4138-adac-b7935e769ac6",
//                 user_pno: phone,
//                 status
//             }
//             const { data } = await axiosInstance.post(URL, bodyData)
//             // console.log(data)
//         } catch (error) {
//             throw new Error(error)
//         } finally {
//             setLoading(false)
//         }
//     }

//     const filteredData = rows.filter((item) => {
//         const matchesSearch =
//             !searchtext ||
//             Object.values(item).some(
//                 (value) =>
//                     value &&
//                     typeof value === "string" &&
//                     value.toLowerCase().includes(searchtext.toLowerCase())
//             );

//         return matchesSearch;
//     });


//     const clickHandle = async (row, newStatus) => {
//         const confirmMsg = `Do you really want to change the status of ${row?.phone} to ${newStatus}?`;
//         const isConfirmed = confirm(confirmMsg);

//         if (!isConfirmed) return;

//         try {
//             // Uncomment this when backend integration is ready
//             await updateStatus(row?.phone, newStatus);

//             console.log(filteredData)

//             // const updatedRows = rows.map((item) =>
//             //     item?.phone === row?.phone ? { ...item, status: newStatus } : item
//             // );

//             // console.log(updatedRows)

//             // setRows(updatedRows);
//             toast.success("Status updated successfully.");
//         } catch (error) {
//             console.error(error);
//             toast.error("Something went wrong!");
//         }
//     };


//     // const clickHandle = async (row, status) => {
//     //     const isConfirm = confirm("Do you really want to change the status ?" + row?.phone + " with " + status)
//     //     if (isConfirm) {
//     //         try {
//     //             // await updateStatus(row?.phone, status)

//     //             const updatedRows = rows.map((rows) =>
//     //                 rows?.phone === row?.phone ? { ...rows, status } : rows
//     //             );
//     //             setRows(updatedRows);

//     //             toast.success("Status updated sucessfully...")
//     //         } catch (error) {
//     //             console.log(error)
//     //             toast.error("Something went wrong!")
//     //         }


//     //     }
//     // }

//     return (
//         <div className='h-full w-full overflow-auto flex flex-col gap-2'>
//             {loading && <Loading />}
//             <Breadcrumbs />
//             <Input
//                 placeholder="Search..."
//                 variant="outlined"
//                 className="w-full"
//                 onChange={(e) => {
//                     setsearchtext(e.target.value);
//                 }}
//                 sx={{ padding: "8px" }}
//                 value={searchtext}
//             />
//             <MyDataGrid rows={filteredData} columns={columns} />
//         </div>
//     )
// }

// export default User


import React, { useEffect, useState } from 'react';
import MyDataGrid from '../components/Form/MyDataGrid';
import { Chip } from '@mui/material';
import { Input } from '@mui/joy';
import { toast } from 'react-toastify';
import Breadcrumbs from '../components/Breadcrumb/Breadcrumb';
import axiosInstance from '../api/axios';
import Loading from '../components/Loading';
import { useSelector } from 'react-redux';
import { AUTH } from '../constants';

const INITIAL_COLUMNS = [
    { field: "emp_code", headerName: "Employee Code", width: 150 },
    { field: "name", headerName: "Name", width: 250 },
    { field: "phone", headerName: "Phone No.", width: 150 },
    { field: "designation", headerName: "Designation", width: 150 },
    { field: "branch_code", headerName: "Branch Code", width: 150 },
    { field: "territory_code", headerName: "Territory Code", width: 150 },
];

const User = () => {
    const [rows, setRows] = useState([]);
    const [searchtext, setsearchtext] = useState("");
    const [loading, setLoading] = useState(false);
    // const phone = useSelector((state) => state.user.phone)
    const phone = sessionStorage.getItem(AUTH.PHONE)



    // Fetch user data on mount
    useEffect(() => {
        const fetchUser = async () => {
            const URL = "/get_admin_users";
            try {
                setLoading(true);
                const bodyData = {
                    pno: String(phone),
                    uid: "c9b1a069-2e1e-4138-adac-b7935e769ac6",
                };
                const { data } = await axiosInstance.post(URL, bodyData);
                const { users } = data;
                setRows(users);
            } catch (error) {
                console.error(error);
                toast.error("Failed to fetch user data.");
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    // Handle user status update
    const updateStatus = async (phone, status) => {
        try {
            setLoading(true);
            const URL = "modify_user_access";
            const bodyData = {
                pno: String(phone),
                uid: "c9b1a069-2e1e-4138-adac-b7935e769ac6",
                user_pno: phone,
                status,
            };
            await axiosInstance.post(URL, bodyData);
        } catch (error) {
            throw new Error(error);
        } finally {
            setLoading(false);
        }
    };

    // Handle chip click
    const clickHandle = async (row, newStatus) => {
        const confirmMsg = `Do you really want to change the status of ${row?.phone} to ${newStatus ? "Active" : "In Active"}?`;
        if (!confirm(confirmMsg)) return;

        try {
            await updateStatus(row?.phone, newStatus);
            const updatedRows = rows.map((item) =>
                item?.phone === row?.phone ? { ...item, status: newStatus } : item
            );

            setRows(updatedRows);
            toast.success("Status updated successfully.");
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong!");
        }
    };

    // Filter data based on search
    const filteredData = rows.filter((item) =>
        !searchtext ||
        Object.values(item).some(
            (value) =>
                value &&
                typeof value === "string" &&
                value.toLowerCase().includes(searchtext.toLowerCase())
        )
    );

    // Columns with dynamic renderers
    const columns = [
        ...INITIAL_COLUMNS,
        {
            field: "status",
            headerName: "Status",
            width: 120,
            renderCell: (params) => {
                const isActive = params.value;
                return (
                    <Chip
                        label={isActive ? "Active" : "In Active"}
                        style={{ width: "80px" }}
                        color={isActive ? "success" : "error"}
                        variant="outlined"
                    />
                );
            },
        },
        {
            field: "Update To",
            headerName: "Update To",
            width: 120,
            renderCell: (params) => {
                const currentStatus = params.row.status;
                const newStatus = !currentStatus;
                return (
                    <Chip
                        label={newStatus ? "Active" : "In Active"}
                        style={{ width: "80px" }}
                        variant="filled"
                        clickable
                        onClick={() => clickHandle(params.row, newStatus)}
                        color={newStatus ? "success" : "error"}
                    />
                );
            },
        },
    ];

    return (
        <div className="h-full w-full overflow-auto flex flex-col gap-2">
            {loading && <Loading />}
            <Breadcrumbs />
            <Input
                placeholder="Search..."
                variant="outlined"
                className="w-full"
                onChange={(e) => setsearchtext(e.target.value)}
                sx={{ padding: "8px" }}
                value={searchtext}
            />
            <MyDataGrid rows={filteredData} columns={columns} />
        </div>
    );
};

export default User;
