import React, { useEffect, useState } from 'react'
import Pagination from '../components/Pagination.jsx'
import { AiOutlineEdit } from "react-icons/ai"
import { RiDeleteBin6Line } from "react-icons/ri"
import { GrFormView } from "react-icons/gr"
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useSelector } from 'react-redux'
import DataTable from 'react-data-table-component';

const StudentsPage = () => {
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
      name: 'İşlemler',
      cell: (row) => (
        <div className='flex items-center gap-4'>
          <Link to={"/students/edit/" + row._id}> <AiOutlineEdit cursor="pointer" size={20} color='blue' /></Link>
          <RiDeleteBin6Line onClick={() => handleDelete(row._id)} cursor="pointer" size={20} color='red' />
          <Link to={"/students/" + row._id}><GrFormView cursor="pointer" size={28}/></Link>
        </div>
      )
    },
  ];
  const [students, setStudents] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const { currentUser } = useSelector(state => state.user)
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 10
  const lastPostIndex = postsPerPage * currentPage
  const firstPostIndex = lastPostIndex - postsPerPage
  const currentPosts = students?.slice(firstPostIndex, lastPostIndex)

  useEffect(() => {
    const getStudents = async () => {
      const res = await axios.get("http://localhost:5000/students")
      console.log(res.data)
      setStudents(res.data)
    }
    getStudents()
  }, [])

  const handleDelete = async (id) => {
    console.log(id)
    console.log(currentUser.accessToken)
    try {
      await axios.delete("http://localhost:5000/students/" + id, {
        headers: {
          "Authorization": "Bearer " + currentUser.accessToken
        }
      })
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div>
      <Link to="/students/create" className='inline-block bg-greenBg text-white font-[400] rounded-sm px-2 py-1 mb-4'>Add New Student</Link>
      <DataTable
        columns={columns}
        data={students}
      />
      <Pagination totalPosts={students?.length} postsPerPage={postsPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div >
  )
}


export default StudentsPage




















