import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BiUserCircle } from "react-icons/bi"
import { FiLogOut } from 'react-icons/fi'
import { logout } from '../redux/userSlice'
const Navbar = () => {
    const { currentUser } = useSelector(state => state.user)
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(logout())
        navigate("/login")
    }
    return (
        <div className='w-full h-[72px] flex items-center justify-end bg-grayNavbarBg '>
            <div className='flex gap-2 items-center text-white pr-6'>
                <BiUserCircle size={28} />
                <span>{currentUser?.username}</span>
            </div>
            <div className='flex items-center'>
                <button className='flex items-center gap-2 pl-3 text-white pr-4' onClick={handleLogout}>
                    <FiLogOut />
                    <span className='text-[12px]'>Logout</span>
                </button>
            </div>

        </div>
    )
}

export default Navbar