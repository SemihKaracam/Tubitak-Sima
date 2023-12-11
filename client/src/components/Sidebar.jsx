import React from 'react'
import logo from "../assets/logo.jpeg"
import { HiOutlineAcademicCap } from "react-icons/hi"
import { GiTeacher } from "react-icons/gi"
import { MdLibraryBooks } from "react-icons/md"
import { SiGoogleclassroom } from "react-icons/si"
import { FiLogOut } from "react-icons/fi"
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/userSlice'
import { AiTwotoneCalendar } from "react-icons/ai"

const sidebarItemsAdmin = [
    {
        id: 1,
        icon: <HiOutlineAcademicCap size={24} />,
        path: "students",
    },
    {
        id: 2,
        icon: <GiTeacher size={24} />,
        path: "teachers"
    },
    {
        id: 3,
        icon: <MdLibraryBooks size={24} />,
        path: "lessons"
    },
    {
        id: 4,
        icon: <SiGoogleclassroom size={24} />,
        path: "departments"
    },
]


const sidebarItemsTeacher= [
    {
        id: 1,
        icon: <AiTwotoneCalendar size={24} />,
        path: "attendance",
    },
]

// const sidebar ={
//     sidebarItemsAdmin,
//     sidebarItemsStudent
// }

const Sidebar = () => {
    const { currentUser } = useSelector((state) => state.user)
    const sidebar = currentUser?.role == "admin" ? sidebarItemsAdmin : sidebarItemsTeacher
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogout = () => {
        dispatch(logout())
        navigate("/login")
    }
    return (
        <div className='flex-[1] bg-graySidebarBg sticky top-0 left-0 p-4 h-[100vh] text-white'>
            <Link to={currentUser?.role=="admin" ? "/home/admin":"/home/student"} className='logo flex items-center gap-2 mb-16 mt-2'>
                <div className='w-[40px] h-[40px]'>
                    <img src={logo} className="w-full h-full rounded-full" alt="" />
                </div>
                <h3 className='text-[20px] font-semibold inline-block'>Sima</h3>
            </Link>
            <div className='[&>*]:mb-4 sidebarItems'>
                {
                    sidebar.map((item) => (
                        <NavLink key={item.id} className="p-3 flex items-center gap-4 opacity-60 rounded-md" to={`/${item.path}`}>
                            {item.icon}
                            <span className='capitalize text-[14px]'>{item.path}</span>
                        </NavLink>      
                    ))
                }
            </div>
            <button className='flex items-center gap-2 mt-8 pl-3' onClick={handleLogout}>
                <FiLogOut />
                <span className='text-[12px]'>Logout</span>
            </button>
        </div>
    )
}

export default Sidebar