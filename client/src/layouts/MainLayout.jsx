import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import { useSelector } from 'react-redux'
import Navbar from '../components/Navbar'

const MainLayout = () => {
  const { currentUser } = useSelector(state => state.user)
  return (
    <div className='flex overflow-hidden'>
      {/* <div className='flex-1'> */}
      {
        currentUser?.role != "student" &&
        <Sidebar/> 
      }
      {/* </div> */}
      <div className='flex-[5]'>
        <Navbar/>
        <div className='p-6 min-h-[calc(100vh-72px)] bg-[#F4F5F8]'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
//Old outlet bgColor:  bg-[#F4F5F8]

export default MainLayout