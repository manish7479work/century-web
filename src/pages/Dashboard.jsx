import DashboardTemplate from '../Template/DashboardTemplate';
import { GrOverview } from "react-icons/gr";
import { AiFillWechat } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";

const DATA = [
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

    ]
  },

]

const Dashboard = () => {
  return (
    <>
      <DashboardTemplate sidebarData={DATA} />
    </>
  );
};

export default Dashboard;
