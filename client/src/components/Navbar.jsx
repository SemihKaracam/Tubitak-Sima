import React from 'react'
import { useSelector } from 'react-redux'
import { BiUserCircle } from "react-icons/bi"
const Navbar = () => {
    const { currentUser } = useSelector(state => state.user)
    return (
        <div className='w-full h-[72px] flex items-center justify-end bg-grayNavbarBg '>
            <div className='flex gap-2 items-center text-white pr-6'>
                <BiUserCircle size={28} />
                <span>{currentUser?.username}</span>
            </div>
        </div>
    )
}

export default Navbar