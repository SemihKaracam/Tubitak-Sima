import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const HomeAcademicianPage = () => {
    const { currentUser } = useSelector(state => state.user)
    const [academician, setAcademician] = useState()
    
    useEffect(()=>{
        const getAcademician = async () => {
            const res = await axios.get("http://localhost:5000/academicians/find/" + currentUser._id)
            setAcademician(res.data)
        }
        getAcademician()
    },[])
    return (
        <div>
            { academician && <h3 className='font-bold text-[20px]'>{academician.ad +" " + academician.soyad}</h3> } 
        </div>
    )
}

export default HomeAcademicianPage

