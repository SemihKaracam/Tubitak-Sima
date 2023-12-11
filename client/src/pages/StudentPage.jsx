import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Calendar from '../components/Calendar'
import axios from 'axios'
import { useSelector } from 'react-redux'

const StudentPage = () => {
    const location = useLocation()
    const id = location.pathname.split("/")[2]
    const [student, setStudent] = useState()
    const [lessons, setLessons] = useState([])
    const [selectedLesson, setSelectedLesson] = useState("DEFAULT")

    useEffect(() => {
        const getStudent = async () => {
            const res = await axios.get("http://localhost:5000/students/" + id);
            setStudent(res.data)
        }
        getStudent()
    }, [id])

    useEffect(() => {
        const getLessons = async () => {
            const res = await axios.get("http://localhost:5000/lessons/kayitli" + id);
            setLessons(res.data)
        }
        getLessons()
    }, [])

    console.log(selectedLesson)

    return (
        <div>
            <div>
                <h3 className='text-[24px] mb-6'> <b>{student?.ad} {student?.soyad}</b> adlı kişinin <b>{selectedLesson}</b> dersindeki yoklama bilgisi</h3>
            </div>
            <div className='mb-4'>
                <span className='mr-3 font-semibold text-[18px]'>Ders</span>
                <select defaultValue="DEFAULT" onChange={(e) => setSelectedLesson(e.target.value)} className='border-black border-[2px] py-1 px-2'>
                    <option value="DEFAULT" disabled>Bir ders seçin ...</option>
                    {
                        lessons.map((lesson) => (
                            <option key={lesson._id} value={lesson.dersAdi}>{lesson.dersAdi}</option>
                        ))
                    }
                </select>
            </div>
            <div className='mb-4'>
                <div className='flex gap-2 items-center mb-2'>
                    <div className='bg-red-500 w-6 h-6'></div>
                    <span>Derse gelmedi</span>
                </div>
                <div className='flex gap-2 items-center'>
                    <div className='bg-green-500 w-6 h-6'></div>
                    <span>Derse geldi</span>
                </div>
            </div>
            <Calendar ders={selectedLesson} studentId={id}/>
        </div>
    )
}

export default StudentPage

