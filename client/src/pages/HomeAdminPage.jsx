import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { HiOutlineAcademicCap } from "react-icons/hi"
import { GiTeacher } from "react-icons/gi"
import { MdLibraryBooks } from "react-icons/md"
import { SiGoogleclassroom } from "react-icons/si"
import axios from 'axios'
import StudentPage from './StudentPage'

const dashboardItemsInit = [
  {
    id: 1,
    icon: <HiOutlineAcademicCap size={30} />,
    title: "Students",
    borderColor: "border-l-[#6E8FDD]",
    textColor: "text-[#6E8FDD]",
    count: 0
  },
  {
    id: 2,
    icon: <GiTeacher size={30} />,
    title: "Teachers",
    borderColor: "border-l-[#51ADC5]",
    textColor: "text-[#51ADC5]",
    count: 0
  },
  {
    id: 3,
    icon: <MdLibraryBooks size={30} />,
    title: "Lessons",
    borderColor: "border-l-[#3FB099]",
    textColor: "text-[#3FB099]",
    count: 0
  },
  {
    id: 4,
    icon: <SiGoogleclassroom size={30} />,
    title: "Departments",
    borderColor: "border-l-[#E46650]",
    textColor: "text-[#E46650]",
    count: 0
  },
]

const HomeAdminPage = () => {
  const { currentUser,loading } = useSelector((state) => state.user)
  console.log(loading)
  const [countDocuments, setCountDocuments] = useState()
  const [dashboardItems, setDashBoardItems] = useState(dashboardItemsInit)
  const [student, setStudent] = useState()
  useEffect(() => {
    if (currentUser.role == "admin") {
      const getCountsOfDocuments = async () => {
        const res = await axios.get("http://localhost:5000/departments/all", {
          headers: {
            Authorization: "Bearer " + currentUser.accessToken
          }
        })
        const list = res.data
        console.log(list)
        setDashBoardItems(dashboardItems.map((item, index) => (
          { ...item, count: list[index] }
        )))
      }
      getCountsOfDocuments()
    }
  }, [])

  return (
    <div>
      <h3 className='text-[#7D7973] font-[500] text-[24px] mb-4'>Dashboard</h3>
      <div className='flex gap-4 flex-wrap'>
        {
          dashboardItems?.map((item) => (
            <div key={item.id} className={`shadow-xl flex items-center justify-between basis-[23%] ${item.borderColor} border-l-4 rounded-md px-4 py-6`}>
              <div>
                <h4 className={`text-[12px] pb-1 font-semibold ${item.textColor}`}>{item.title.toUpperCase()}</h4>
                <h3 className='text-[18px] font-[500]'>{item.count} {item.title}</h3>
              </div>
              {item.icon}
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default HomeAdminPage