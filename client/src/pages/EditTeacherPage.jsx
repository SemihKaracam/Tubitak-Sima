import React, { useEffect } from 'react'
import { formInputs } from './CreateTeacherPage'
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AiOutlineLeft } from 'react-icons/ai'
import Form from '../components/Form'
import axios from 'axios'

const EditTeacherPage = () => {
    const [teacher, setTeacher] = useState({})
    const navigate = useNavigate()
    const { currentUser } = useSelector(state => state.user)
    const { pathname } = useLocation()
    const id = pathname.split("/")[3]

    const handleTeacherChange = (e) => {
        setTeacher({ ...teacher, [e.target.name]: e.target.value })
    }

    console.log(id)
    useEffect(() => {
        const getTeacher = async () => {
            const res = await axios.get("http://localhost:5000/academicians/" + id)
            setTeacher(res.data)
        }
        getTeacher()
    }, [])

    const handleEditTeacher = async (e) => {
        e.preventDefault()
        await axios.put("http://localhost:5000/academicians/" + id, teacher, {
            headers: {
                "Authorization": "Bearer " + currentUser.accessToken
            }
        })
        navigate("/teachers")
    }
    
    return (
        <div>
            <h3 className='text-[24px]'>Edit Teacher</h3>
            <Link className='inline-flex items-center gap-2 bg-[#918E98] text-white px-2 py-1 my-4' to="/teachers">
                <AiOutlineLeft color='white' />
                <span>Back</span>
            </Link>
            <Form handleChange={handleTeacherChange} entityInfo={teacher} handleAction={handleEditTeacher} formInputs={formInputs} title="Teacher" type="edit" />
        </div>
    )
}

export default EditTeacherPage