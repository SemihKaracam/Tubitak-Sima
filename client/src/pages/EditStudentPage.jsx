import React, { useEffect, useState } from 'react'
import { formInputs } from './CreateStudentPage'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Form from '../components/Form'
import { AiOutlineLeft } from 'react-icons/ai'
import axios from 'axios'

const EditStudentPage = () => {
    const [student, setStudent] = useState({})
    const navigate = useNavigate()
    const { currentUser } = useSelector(state => state.user)
    const { pathname } = useLocation()
    const id = pathname.split("/")[3]

    console.log(student)
    const handleStudentChange = (e) => {
        setStudent({ ...student, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        const getStudent = async () => {
            const res = await axios.get("http://localhost:5000/students/" + id)
            setStudent(res.data)
        }
        getStudent()
    }, [])

    const handleEditStudent = async (e) => {
        e.preventDefault()
        await axios.put("http://localhost:5000/students/" + id, student, {
            headers: {
                "Authorization": "Bearer " + currentUser.accessToken
            }
        })
        navigate("/students")
    }

    return (
        <div>
            <h3 className='text-[24px]'>Edit Student</h3>
            <Link className='inline-flex items-center gap-2 bg-[#918E98] text-white px-2 py-1 my-4' to="/students">
                <AiOutlineLeft color='white' />
                <span>Back</span>
            </Link>
            <Form handleChange={handleStudentChange} entityInfo={student} handleAction={handleEditStudent} formInputs={formInputs} title="Student" type="edit" />
        </div>
    )
}

export default EditStudentPage

