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
        label: "Ünvan",
        name: "unvan"
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

const CreateTeacherPage = () => {
    const [teacher, setTeacher] = useState({})
    const { currentUser } = useSelector(state => state.user)
    const navigate = useNavigate()

    const handleTeacherChange = (e) => {
        setTeacher({ ...teacher, [e.target.name]: e.target.value })
    }
    const handleAddTeacher = async (e) => {
        e.preventDefault()
        await axios.post("http://localhost:5000/academicians", teacher, {
            headers: {
                "Authorization": "Bearer " + currentUser.accessToken
            }
        })
        navigate("/teachers")
    }
    return (
        <div>
            <h3 className='text-[24px]'>Create New Teacher</h3>
            <Link className='inline-flex items-center gap-2 bg-[#918E98] text-white px-2 py-1 my-4' to="/teachers">
                <AiOutlineLeft color='white' />
                <span>Back</span>
            </Link>
            <Form handleChange={handleTeacherChange} handleAction={handleAddTeacher} formInputs={formInputs} entityInfo={teacher} title="Teacher" type="create"/>
        </div>
    )
}

export default CreateTeacherPage