import axios from 'axios'
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

const AttendancePage = () => {
    const { currentUser } = useSelector(state => state.user)
    const [academician, setAcademician] = useState()
    const [selectedLesson, setSelectedLesson] = useState("DEFAULT")
    const [selectedDate, setSelectedDate] = useState("")
    const [attendance, setAttendance] = useState([])
    const [data, setData] = useState([])
    const columns = [
        {
            name: 'Ad',
            selector: row => row.ad,
        },
        {
            name: 'Soyad',
            selector: row => row.soyad,
        },
        {
            name: 'Okul Numarası',
            selector: row => row.okulNo,
        },
        {
            name: 'Bölüm',
            selector: row => row.bolum,
        },
        {
            name: 'Yoklama',
            cell: (row) => (
                <div className='flex items-center gap-4'>
                    <div className='flex flex-col items-center justify-center gap-1'>
                        <input disabled checked={attendance.includes(row._id)} type="radio" id="geldi" name={row.okulNo} value="true" />
                        <label className='block' for="true">Geldi</label>
                    </div>
                    <div className='flex flex-col items-center justify-center gap-1'>
                        <input disabled checked={!attendance?.includes(row._id)} type="radio" id="gelmedi" name={row.okulNo} value="false" />
                        <label className="block" for="false">Gelmedi</label>
                    </div>
                </div>
            )
        },
    ];
    useEffect(() => {
        const getAcademician = async () => {
            const res = await axios.get("http://localhost:5000/academicians/find/" + currentUser._id)
            setAcademician(res.data)
        }
        getAcademician()
    }, [])

    useEffect(() => {
        setData([])
    }, [attendance.length])
    console.log(selectedDate)
    // useEffect(() => {
    //     const getStudents = async () => {
    //         const res = await axios.get(`http://localhost:5000/lessons/getAttendance?lesson=${selectedLesson}`)
    //         setData(res.data)
    //     }
    //     const getAttendance = async () => {
    //         const res = await axios.get(`http://localhost:5000/lessons/attendance?lesson=${selectedLesson}&date=${selectedDate}`)
    //         setAttendance(res.data.katilim.katilanOgrenciler)
    //     }
    //     selectedLesson && getStudents() //henüz ders seçilmediyse boş yere request atma, ders seçildiğinde request at
    //     selectedDate && getAttendance() //henüz tarih seçilmediyse boş yere request atma, tarih seçildiğinde request at
    // }, [selectedLesson, selectedDate])
    // console.log(attendance)

    const handleGetir = async () => {
        const getStudents = async () => {
            /*Derse Kayıtlı öğrencileri getiriyor*/
            const res = await axios.get(`http://localhost:5000/lessons/getAttendance?lesson=${selectedLesson}`)
            setData(res.data)
            console.log(res.data)
        }
        const getAttendance = async () => {
            //Derse kayıtlı öğrenciler arasında belirlenen tarihte derse katılan öğrencileri getiriyor
            const res = await axios.get(`http://localhost:5000/lessons/attendance?lesson=${selectedLesson}&date=${selectedDate}`)
            setAttendance(res.data.katilim.katilanOgrenciler)
            console.log(res.data)

        }
        selectedLesson && getStudents() //henüz ders seçilmediyse boş yere request atma, ders seçildiğinde request at
        selectedDate && getAttendance() //henüz tarih seçilmediyse boş yere request atma, tarih seçildiğinde request at
    }

    // useEffect(() => {
    //     const getAttendance = async () => {
    //         const res2 = await axios.get(`http://localhost:5000/lessons/attendance?lesson=${selectedLesson}&date=${selectedDate}`)
    //         setAttendance(res2.data.katilim.katilanOgrenciler)
    //     }
    // }, [data])

    // useEffect(()=>{

    // },[])
    return (
        <div>
            <div className='flex gap-6 mb-6 items-center'>
                <div>
                    <h3 className='font-bold text-[20px]'>Verilen Dersler</h3>
                    {
                        <select defaultValue="DEFAULT" onChange={(e) => setSelectedLesson(e.target.value)} className='border-black border-[2px] py-1 px-2'>
                            <option value="DEFAULT" disabled>Bir ders seçin ...</option>
                            {
                                academician?.verdigiDersler?.map((ders) => (
                                    <option key={ders.dersId} value={ders.dersAdi}>{ders.dersAdi}</option>
                                ))
                            }
                        </select>
                    }
                </div>
                <div>
                    <h3 className='font-bold text-[20px]'>Tarih</h3>
                    <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
                </div>
                <div className='pt-6'>
                    <button onClick={handleGetir} className='bg-indigo-500 py-2 px-4 rounded-md font-medium text-white hover:bg-sky-700'>Getir</button>
                </div>
                {/* <Link to=>Yoklamayı düzenle</Link> */}
            </div>
            {
                ((selectedLesson != "DEFAULT" && selectedDate != '') && data.length != 0) ?
                    (<DataTable
                        columns={columns}
                        data={data}
                    />) :
                    // (selectedLesson != "DEFAULT" && selectedDate != '') && (attendance?.length == 0) && <span>Bu ders ve tarihe ait bir yoklama bilgisi yok</span>
                    (selectedLesson == "DEFAULT" && selectedDate == '') ?
                        (<>
                            <h3 className='font-semibold'>Yoklama bilgisini görüntülemek istediğiniz dersi ve tarihi seçmelisiniz</h3>
                        </>
                        ) :
                        ((selectedLesson != "DEFAULT" && selectedDate != '') && (data.length == 0) && <span>Bu ders ve tarihe ait bir yoklama bilgisi yok</span>)
            }



        </div>
    )
}

export default AttendancePage