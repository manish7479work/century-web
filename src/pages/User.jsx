import React, { useEffect, useState } from 'react'
import MyDataGrid from '../components/Form/MyDataGrid'
import { extractColumns } from '../utils/helper'
import { Chip } from '@mui/material'
import Select from 'react-select'
// import { Input } from '@mui/joy'
import { toast } from 'react-toastify'
import Breadcrumbs from '../components/Breadcrumb/Breadcrumb'
import { Input } from '@mui/joy'
"react-select"

const USER_DATA = [
    {
        "id": 1,
        "name": "Alice Johnson",
        "email": "alice.johnson@example.com",
        "designation": "Software Engineer",
        "phoneNumber": "+1-555-234-5678",
        "address": "123 Maple St, San Francisco, CA",
        "status": "Active"
    },
    {
        "id": 2,
        "name": "Bob Smith",
        "email": "bob.smith@example.com",
        "designation": "Product Manager",
        "phoneNumber": "+1-555-345-6789",
        "address": "456 Oak Ave, Seattle, WA",
        "status": "Inactive"
    },
    {
        "id": 3,
        "name": "Carol Williams",
        "email": "carol.williams@example.com",
        "designation": "UX Designer",
        "phoneNumber": "+1-555-456-7890",
        "address": "789 Pine Rd, Austin, TX",
        "status": "Active"
    },
    {
        "id": 4,
        "name": "David Lee",
        "email": "david.lee@example.com",
        "designation": "DevOps Engineer",
        "phoneNumber": "+1-555-567-8901",
        "address": "321 Birch Ln, Denver, CO",
        "status": "Pending"
    },
    {
        "id": 5,
        "name": "Emma Davis",
        "email": "emma.davis@example.com",
        "designation": "QA Analyst",
        "phoneNumber": "+1-555-678-9012",
        "address": "654 Cedar Blvd, Chicago, IL",
        "status": "Active"
    },
    {
        "id": 6,
        "name": "Frank Thomas",
        "email": "frank.thomas@example.com",
        "designation": "Data Analyst",
        "phoneNumber": "+1-555-789-0123",
        "address": "789 Spruce St, Boston, MA",
        "status": "Active"
    },
    {
        "id": 7,
        "name": "Grace Miller",
        "email": "grace.miller@example.com",
        "designation": "HR Manager",
        "phoneNumber": "+1-555-890-1234",
        "address": "321 Willow Dr, Miami, FL",
        "status": "Inactive"
    },
    {
        "id": 8,
        "name": "Henry Wilson",
        "email": "henry.wilson@example.com",
        "designation": "IT Support",
        "phoneNumber": "+1-555-901-2345",
        "address": "159 Elm Ct, Phoenix, AZ",
        "status": "Active"
    },
    {
        "id": 9,
        "name": "Isabella Moore",
        "email": "isabella.moore@example.com",
        "designation": "Marketing Lead",
        "phoneNumber": "+1-555-012-3456",
        "address": "753 Redwood Ave, Atlanta, GA",
        "status": "Active"
    },
    {
        "id": 10,
        "name": "Jack Taylor",
        "email": "jack.taylor@example.com",
        "designation": "Backend Developer",
        "phoneNumber": "+1-555-123-4567",
        "address": "951 Ash St, Dallas, TX",
        "status": "Pending"
    },
    {
        "id": 11,
        "name": "Kara Anderson",
        "email": "kara.anderson@example.com",
        "designation": "Frontend Developer",
        "phoneNumber": "+1-555-234-5678",
        "address": "222 Birch Dr, Portland, OR",
        "status": "Inactive"
    },
    {
        "id": 12,
        "name": "Liam Thomas",
        "email": "liam.thomas@example.com",
        "designation": "Project Manager",
        "phoneNumber": "+1-555-345-6789",
        "address": "345 Fir Ln, Tampa, FL",
        "status": "Active"
    },
    {
        "id": 13,
        "name": "Mia Jackson",
        "email": "mia.jackson@example.com",
        "designation": "QA Engineer",
        "phoneNumber": "+1-555-456-7890",
        "address": "111 Pine Cir, Denver, CO",
        "status": "Active"
    },
    {
        "id": 14,
        "name": "Noah White",
        "email": "noah.white@example.com",
        "designation": "Full Stack Developer",
        "phoneNumber": "+1-555-567-8901",
        "address": "444 Cedar Blvd, Chicago, IL",
        "status": "Inactive"
    },
    {
        "id": 15,
        "name": "Olivia Harris",
        "email": "olivia.harris@example.com",
        "designation": "Technical Writer",
        "phoneNumber": "+1-555-678-9012",
        "address": "777 Oak St, Seattle, WA",
        "status": "Pending"
    },
    {
        "id": 16,
        "name": "Peter Clark",
        "email": "peter.clark@example.com",
        "designation": "System Administrator",
        "phoneNumber": "+1-555-789-0123",
        "address": "888 Palm Dr, San Diego, CA",
        "status": "Active"
    },
    {
        "id": 17,
        "name": "Quinn Lewis",
        "email": "quinn.lewis@example.com",
        "designation": "Data Scientist",
        "phoneNumber": "+1-555-890-1234",
        "address": "999 Spruce Ln, Austin, TX",
        "status": "Active"
    },
    {
        "id": 18,
        "name": "Rachel Young",
        "email": "rachel.young@example.com",
        "designation": "Business Analyst",
        "phoneNumber": "+1-555-901-2345",
        "address": "555 Maple Ct, Columbus, OH",
        "status": "Inactive"
    },
    {
        "id": 19,
        "name": "Sam King",
        "email": "sam.king@example.com",
        "designation": "Sales Manager",
        "phoneNumber": "+1-555-012-3456",
        "address": "123 Sycamore Blvd, Las Vegas, NV",
        "status": "Pending"
    },
    {
        "id": 20,
        "name": "Tina Scott",
        "email": "tina.scott@example.com",
        "designation": "Scrum Master",
        "phoneNumber": "+1-555-123-4567",
        "address": "321 Fir Dr, Raleigh, NC",
        "status": "Active"
    },
    {
        "id": 21,
        "name": "Uma Carter",
        "email": "uma.carter@example.com",
        "designation": "UI/UX Designer",
        "phoneNumber": "+1-555-234-5678",
        "address": "234 Redwood St, Kansas City, MO",
        "status": "Active"
    },
    {
        "id": 22,
        "name": "Victor Nelson",
        "email": "victor.nelson@example.com",
        "designation": "Software Tester",
        "phoneNumber": "+1-555-345-6789",
        "address": "765 Walnut Ct, Nashville, TN",
        "status": "Inactive"
    },
    {
        "id": 23,
        "name": "Wendy Brooks",
        "email": "wendy.brooks@example.com",
        "designation": "Cloud Engineer",
        "phoneNumber": "+1-555-456-7890",
        "address": "456 Beech Rd, Salt Lake City, UT",
        "status": "Active"
    },
    {
        "id": 24,
        "name": "Xavier Bell",
        "email": "xavier.bell@example.com",
        "designation": "Security Analyst",
        "phoneNumber": "+1-555-567-8901",
        "address": "123 Hemlock Dr, Baltimore, MD",
        "status": "Pending"
    },
    {
        "id": 25,
        "name": "Yara Griffin",
        "email": "yara.griffin@example.com",
        "designation": "SEO Specialist",
        "phoneNumber": "+1-555-678-9012",
        "address": "678 Pine Ridge, Orlando, FL",
        "status": "Active"
    }
    // Continue up to id 50 similarly
]

const User = () => {
    const [rows, setRows] = useState(USER_DATA)
    const [columns, setColumns] = useState(extractColumns(USER_DATA, ["id", "status"]))
    const [searchtext, setsearchtext] = useState("")


    useEffect(() => {
        const fieldName = "status";
        setColumns((prevColumns) => {
            if (prevColumns.some((column) => column.field === fieldName)) {
                return prevColumns;
            }
            return [
                ...prevColumns,
                {
                    field: fieldName,
                    headerName: fieldName.toUpperCase(),
                    width: 120, // width should be a number, not a string
                    renderCell: (params) => {
                        const isActive = params.value === "Active";
                        return (
                            <Chip
                                label={params.value}
                                style={{
                                    width: "80px"
                                }}
                                color={isActive ? "success" : "error"}
                                variant="outlined"
                            />
                        );
                    },
                },
            ];
        });
    }, []);

    useEffect(() => {
        const fieldName = "Update To";
        setColumns((prevColumns) => {
            if (prevColumns.some((column) => column.field === fieldName)) {
                return prevColumns;
            }
            return [
                ...prevColumns,
                {
                    field: fieldName,
                    headerName: fieldName.toUpperCase(),
                    width: "120",
                    renderCell: (params) => {
                        const currentStatus = params.row.status;
                        const newStatus = currentStatus === "Active" ? "In Active" : "Active";
                        const newColor = newStatus === "Active" ? "success" : "error";

                        return (
                            <Chip
                                label={newStatus}
                                style={{
                                    // backgroundColor: newColor,
                                    color: "white",
                                    width: "80px",

                                }}
                                variant='outline'
                                clickable
                                onClick={() => clickHandle(params.row.id, newStatus)}
                                color={newColor}
                            />
                        );
                    },
                },
            ];
        });
    }, []);

    const filteredData = rows.filter((item) => {
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

    const clickHandle = (id, status) => {
        const isConfirm = confirm("Do you really want to change the status ?" + id + status)
        if (isConfirm) {
            const updatedRow = rows.map((row) => {
                if (row.id === id) {
                    row.status = status;
                }
                return row;
            })
            toast.success("Status updated sucessfully...")
            setRows(updatedRow)
        }
    }

    return (
        <div className='h-full w-full overflow-auto flex flex-col gap-2'>
            <Breadcrumbs />
            <Input
                placeholder="Search..."
                variant="outlined"
                className="w-full"
                onChange={(e) => {
                    setsearchtext(e.target.value);
                }}
                sx={{ padding: "8px" }}
                value={searchtext}
            />
            <MyDataGrid rows={filteredData} columns={columns} />
        </div>
    )
}

export default User

