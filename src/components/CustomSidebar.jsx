import { Sidebar, Menu, MenuItem, sidebarClasses, SubMenu } from 'react-pro-sidebar';
import { NavLink, useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { IoMenu } from "react-icons/io5";
import { Button, IconButton } from '@mui/material';
import { AvatarWthName, Icon } from './Header';
import { useDispatch, useSelector } from 'react-redux';
import { useMsal } from '@azure/msal-react';
import { loginRequest } from './msauth/authConfig';
import { callMsGraph } from './msauth/graph';
import { addUser } from '../store/userSlice';
import { IoMdLogOut } from "react-icons/io";
import Loading from './Loading';

const CustomSidebar = ({ sidebarData }) => {
    const ACTIVE_BG_COLOR = "#E30613"
    const HOVER_BG_COLOR = "#00000"
    const VERSION = import.meta.env.VITE_VERSION ?? 0.0

    const { instance, accounts } = useMsal();
    const [isCollapsed, setIsCollapsed] = useState(false)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user.value)
    const navigate = useNavigate()

    const x = user?.displayName ?? "Devloper ."
    let logedInUserName;
    if (x.trim().split(" ").length == 1) {
        logedInUserName = x.trim() + " ."
    } else {
        logedInUserName = x;
    }

    const handleLogout = useCallback(async () => {
        setLoading(true);
        try {
            // Clear sessionStorage first
            sessionStorage.clear();
            navigate("/")

        } catch (error) {
            console.error("Logout failed:", error);
            // Optionally show user feedback
        } finally {
            setLoading(false)
        }
    }, [instance]);



    return (
        <>
            {loading && <Loading />}
            <Sidebar
                className="font-semibold text-lg h-full"
                rootStyles={{
                    [`.${sidebarClasses.container}`]: {
                        backgroundColor: 'white',
                        height: '100%',

                        // paddingTop: "30px"
                    },

                }}
                collapsed={isCollapsed}
            >
                <div className='flex flex-col items-center gap-2 border-b-2 border-solid my-2'>
                    <Icon isCollapsed={isCollapsed} />
                    <VersionAndToggle setIsCollapsed={setIsCollapsed} isCollapsed={isCollapsed} VERSION={VERSION} />
                </div>

                <Menu
                    menuItemStyles={{
                        button: {
                            [`&.active`]: {
                                backgroundColor: `${ACTIVE_BG_COLOR}`,
                                color: 'white',
                                borderRadius: '0.375rem',
                            },
                            ':not(.active):hover': {
                                backgroundColor: `${HOVER_BG_COLOR}`,
                                borderRadius: '0.375rem',
                                borderBottom: '2px',
                                borderStyle: 'solid',
                            },
                            marginBottom: '4px',

                            margin: isCollapsed ? "" : "10px"

                        },
                    }}
                >
                    {sidebarData?.map((item, idx) => {
                        const { haveSubMenu, icon = null, name, subMenu = [], ...rest } = item;


                        return haveSubMenu ? (
                            <SubMenu key={idx} icon={icon} label={name}>
                                {subMenu.map((subItem, subIdx) => (
                                    <RenderSubMenu key={subIdx} data={subItem} />
                                ))}
                            </SubMenu>
                        ) : (
                            <RenderSubMenu key={idx} data={{ ...item, ...rest }} />
                        );
                    })}
                </Menu>

                <div className='absolute bottom-0 w-full flex flex-col justify-center items-center gap-2 mb-2'>
                    <div className='w-full px-4 flex flex-col gap-2 items-center justify-center'>
                        <AvatarWthName name={logedInUserName} isCollapsed={isCollapsed} />


                        {
                            isCollapsed
                                ? (<IconButton onClick={handleLogout}>
                                    <IoMdLogOut size="2.4rem" className='text-primary' />
                                </IconButton>
                                ) : (<Button
                                    color="error"
                                    variant='outlined'
                                    sx={{
                                        paddingBlock: "6px",
                                        width: "100%",
                                        padding: "6px"
                                    }}
                                    onClick={handleLogout}
                                >
                                    Sign out
                                </Button>)
                        }
                    </div>

                </div>

            </Sidebar>
        </>

    )

}

export default CustomSidebar

const RenderSubMenu = ({ data }) => {
    return (
        <MenuItem icon={data.icon ?? null} component={<NavLink to={data.to} />}>
            <p className='text-md'>{data.name}</p>
        </MenuItem>
    )
}

const VersionAndToggle = ({ setIsCollapsed = () => { }, isCollapsed, VERSION }) => {
    return (
        <div className={`w-full ${isCollapsed ? "px-0" : "px-5"}`}>
            <div className={`flex items-center justify-between ${isCollapsed && " flex-col-reverse"} flex-1`}>
                <p className='text-sm text-center my-2 text-gray-500'>{`${isCollapsed ? "V" : "Version"} : ${VERSION}`}</p>
                <div className='text-center'>
                    <IconButton onClick={() => setIsCollapsed((pre) => !pre)}>
                        <IoMenu fontSize={"32px"} />
                    </IconButton>
                </div>
            </div>
        </div>
    )
}
