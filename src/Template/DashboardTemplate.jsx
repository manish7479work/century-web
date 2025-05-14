// import Header from '../components/Header'
// import CustomSidebar from '../components/CustomSidebar'
// import { Outlet } from 'react-router-dom'
// import Breadcrumbs from '../components/Breadcrumb/Breadcrumb'

// const DashboardTemplate = ({ sidebarData }) => {
//     return (
//         <div className='h-screen w-full flex flex-col gap-1.5 bg-[#feefd2]'>
//             <Header />
//             <div className='flex gap-1.5 mb-2 mx-1.5'>

//                 < div className='h-full rounded-md' >
//                     <CustomSidebar sidebarData={sidebarData} />
//                 </div >


//                 <div className='w-full px-4 py-1.5 bg-white h-[calc(100vh-65px)]'>
//                     <Outlet />
//                 </div>
//             </div >
//         </div >
//     )
// }

// export default DashboardTemplate



import Header from '../components/Header'
import CustomSidebar from '../components/CustomSidebar'
import { Outlet } from 'react-router-dom'
import Breadcrumbs from '../components/Breadcrumb/Breadcrumb'

const DashboardTemplate = ({ sidebarData }) => {
    return (
        <div className='h-screen w-full flex flex-col bg-[#cdf2f8] overflow-hidden gap-1'>
            {/* <Header /> */}
            <div className='flex flex-1 overflow-hidden gap-1 m-1'>
                {/* Sidebar Container */}
                <div className='h-full rounded-md overflow-hidden'>
                    <CustomSidebar sidebarData={sidebarData} />
                </div>

                {/* Main Content Area */}
                <div className='flex-1 p-2 bg-white overflow-y-auto rounded-md'>
                    {/* <div className='flex flex-col gap-2'> */}
                    {/* <Breadcrumbs /> */}
                    <Outlet />
                    {/* </div> */}
                </div>
            </div>
        </div>
    )
}

export default DashboardTemplate

