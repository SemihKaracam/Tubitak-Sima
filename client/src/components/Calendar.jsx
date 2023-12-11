import React, { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import axios from 'axios'

const Calendar = ({ studentId,ders }) => {
    const [attendance,setAttendance] = useState([])
    const [isLoading,setIsLoading] = useState("false")
    console.log(ders)
    useEffect(()=>{
        const getAttendance = async() =>{
            try{
                setIsLoading(true)
                const res = await axios.get("http://localhost:5000/lessons/yoklama/"+studentId+"?ders="+ders);
                setAttendance(res.data[0])
            }catch(err){
                console.log(err)
            }
            setIsLoading(false)
        }
        getAttendance()
    },[ders,studentId])
    console.log(attendance?.tarihler)
    return (
        <>
            {
                ders=="DEFAULT" ?
                <>
                    <h3 className='font-semibold'>Yoklama bilgisini görüntülemek istediğiniz dersi seçmelisiniz</h3>
                </>
                :
                (
                    !isLoading ?
                    <FullCalendar
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                    dayCellDidMount={(item) => {
                        attendance?.tarihler?.forEach((date) => {
                            const takvimDate = item.date.toDateString()
                            const apiDate = new Date(date).toDateString()
                            if (takvimDate == apiDate) { //Takvimi iterate ederken öğrencinin yoklamada gelmediği güne rastlanırsa kırmızıya boyanacak.
                                item.el.classList.add("dayCellRed")
                            }
                        })
                    }}
                    dayCellClassNames="dayCellGreen"
                    />:"loading"
                )
            }    
        </>
    )
}

export default Calendar