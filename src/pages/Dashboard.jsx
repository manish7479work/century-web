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

// const DATA = [
//   {
//     haveSubMenu: true,
//     name: "Developer",
//     icon: "",
//     to: "",
//     subMenu: [
//       {
//         name: "Fontend",
//         icon: "",
//         to: "fontend"
//       },
//       {
//         name: "Backend",
//         icon: "",
//         to: "backend"
//       },
//       {
//         name: "Devops",
//         icon: "",
//         to: "devops"
//       }
//     ]
//   },
//   {
//     haveSubMenu: false,
//     name: "Settings",
//     icon: <GrOverview />,
//     to: "settings",
//     subMenu: [
//       {
//         name: "Fontend",
//         icon: "",
//         to: "fontend"
//       },
//       {
//         name: "Backend",
//         icon: "",
//         to: "backend"
//       },
//       {
//         name: "Devops",
//         icon: "",
//         to: "devops"
//       }
//     ]
//   },
//   {
//     haveSubMenu: true,
//     name: "Profile",
//     icon: "",
//     to: "profile",
//     subMenu: [
//       {
//         name: "Fontend",
//         icon: "",
//         to: "fontend"
//       },
//       {
//         name: "Backend",
//         icon: "",
//         to: "backend"
//       },
//       {
//         name: "Devops",
//         icon: "",
//         to: "devops"
//       }
//     ]
//   }
// ]

