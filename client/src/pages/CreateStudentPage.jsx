import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineLeft } from "react-icons/ai"
import axios from 'axios'
import { useSelector } from 'react-redux'
import Form from '../components/Form'

export const formInputs = [
    {
        label: "Id",
        name: "_id"
    },
    {
        label: "Ad",
        name: "ad"
    },
    {
        label: "Soyad",
        name: "soyad"
    },
    {
        label: "Okul Numarası",
        name: "okulNo"
    },
    {
        label: "Bölüm Adı",
        name: "bolum"
    },
    {
        label: "Kullanıcı ID",
        name: "userId"
    },
]

const CreateStudentPage = () => {
    const [student, setStudent] = useState({})
    const { currentUser } = useSelector(state => state.user)
    console.log(student)
    const navigate = useNavigate()
    const handleStudentChange = (e) => {
        setStudent({ ...student, [e.target.name]: e.target.value })
    }
    const handleAddStudent = async (e) => {
        e.preventDefault()
        await axios.post("http://localhost:5000/students", student, {
            headers: {
                "Authorization": "Bearer " + currentUser.accessToken
            }
        })
        navigate("/students")
    }
    return (
        <div>
            <h3 className='text-[24px]'>Create New Student</h3>
            <Link className='inline-flex items-center gap-2 bg-[#918E98] text-white px-2 py-1 my-4' to="/students">
                <AiOutlineLeft color='white' />
                <span>Back</span>
            </Link>
            <Form handleChange={handleStudentChange} handleAction={handleAddStudent} formInputs={formInputs} title="Student" type="create"/>
        </div>
    )
}

export default CreateStudentPage