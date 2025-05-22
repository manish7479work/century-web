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
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

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
  const navigate = useNavigate()

  useEffect(() => {
    const item = sessionStorage.getItem(AUTH.ROLE)
    if (!item) {
      navigate("/")
    }
    const role = item === AUTH.ADMIN ? AUTH.ADMIN : AUTH.USER
    const sidebar = role === AUTH.ADMIN ? ADMIN_SIDEBAR : USER_SIDEBAR
    setSideBarProps(sidebar)
  }, [user])



  // fetch user profile details
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

  // update the html tiite
  useEffect(() => {
    const role = sessionStorage.getItem(AUTH.ROLE);
    const title = role === AUTH.ADMIN ? "Pragyan | Admin Panel" : "Pragyan | Chat";
    if (role) {
      document.title = title;
    }
  }, [sideBarProps]); //sidebar props change, it change the title because sidebar changes when role changes 


  return (
    <>
      <DashboardTemplate sidebarData={sideBarProps} />
    </>
  );
};

export default Dashboard;
