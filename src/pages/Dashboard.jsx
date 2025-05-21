import DashboardTemplate from '../Template/DashboardTemplate';
import { GrOverview } from "react-icons/gr";
import { AiFillWechat } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
import { useMsal } from '@azure/msal-react';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { loginRequest } from '../components/msauth/authConfig';
import { callMsGraph } from '../components/msauth/graph';
import { addUser } from '../store/userSlice';
import Loading from '../components/Loading';
import { AUTH } from '../constants';
import axiosInstance from '../api/axios';

const ADMIN_SIDEBAR = [
  {
    haveSubMenu: false,
    name: "Overview",
    icon: <GrOverview />,
    to: "overview",
    subMenu: [
    ]
  },
  {
    haveSubMenu: false,
    name: "QnA History",
    icon: <FaHistory size={"20px"} />,
    to: "qna-history",
    subMenu: [

    ],

  },
  {
    haveSubMenu: false,
    name: "Chat",
    icon: <AiFillWechat size={"30px"} />,
    to: "chat",
    subMenu: [

    ]
  },
  {
    haveSubMenu: false,
    name: "User",
    icon: <FaRegUser size={"20px"} />,
    to: "user",
    subMenu: [

    ],

  },


]

const USER_SIDEBAR = [
  {
    haveSubMenu: false,
    name: "Chat",
    icon: <AiFillWechat size={"30px"} />,
    to: "chat",
    subMenu: [

    ]
  },
]

const Dashboard = () => {
  const { instance, accounts } = useMsal();
  const [loading, setLoading] = useState(false)
  const [sideBarProps, setSideBarProps] = useState([])
  const dispatch = useDispatch()
  const [user, setUser] = useState(null)

  useEffect(() => {
    // setSideBarProps()
    const fetchRole = async () => {
      try {
        if (user) {
          const URL = "/get_user_role"
          const bodyData = {
            "pno": String(9876543210),
            "uid": "c9b1a069-2e1e-4138-adac-b7935e769ac6",
          };
          const { data } = await axiosInstance.post(URL, bodyData)
          console.log(data)
          const role = data?.user_role === AUTH.ADMIN.toLowerCase() ? AUTH.ADMIN : AUTH.USER
          const sidebar = role === AUTH.ADMIN ? ADMIN_SIDEBAR : USER_SIDEBAR
          setSideBarProps(sidebar)
          sessionStorage.setItem(AUTH.ROLE, role)
        }
      } catch (error) {
        console.log(error)
      }
    }

    fetchRole()

  }, [user])


  // useEffect(() => {
  //   const fetchRole = async () => {
  //     console.log(user)
  //     if (!user?.mobilePhone) return;

  //     try {
  //       const URL = "/get_user_role";
  //       const bodyData = {
  //         pno: String(user.mobilePhone),
  //         uid: "c9b1a069-2e1e-4138-adac-b7935e769ac6", // consider making UID dynamic
  //       };

  //       const { data } = await axiosInstance.post(URL, bodyData);
  //       console.log("User role data:", data);

  //       const role = data?.role || AUTH.USER; // fallback to USER if role not returned
  //       const sidebar = role === AUTH.ADMIN ? ADMIN_SIDEBAR : USER_SIDEBAR;

  //       sessionStorage.setItem(AUTH.ROLE, role);
  //       setSideBarProps(sidebar);
  //     } catch (error) {
  //       console.error("Failed to fetch user role:", error);
  //     }
  //   };

  //   fetchRole();
  // }, [user]);


  useEffect(() => {
    if (accounts.length > 0) {
      setLoading(true);

      instance
        .initialize() // MSAL initialization
        .then(() => {
          return instance.acquireTokenSilent({
            ...loginRequest,
            account: accounts[0],
          });
        })
        .then((response) => {
          return callMsGraph(response.accessToken);
        })
        .then((data) => {
          setUser(data)
          dispatch(addUser(data));
        })
        .catch((error) => {
          console.error("Token acquisition or Graph call failed:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [instance, accounts]);


  return (
    <>
      <DashboardTemplate sidebarData={sideBarProps} />
    </>
  );
};

export default Dashboard;
