import axios from 'axios';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { AiOutlineEdit } from 'react-icons/ai';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { Link } from 'react-router-dom'

const TeachersPage = () => {
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
      name: 'Ünvan',
      selector: row => row.unvan,
    },
    {
      name: 'Bölüm',
      selector: row => row.bolum,
    },
    {
      name: 'İşlemler',
      cell: (row) => (
        <div className='flex items-center gap-4'>
          <Link to={"/teachers/edit/" + row._id}> <AiOutlineEdit cursor="pointer" size={20} color='blue' /></Link>
          <RiDeleteBin6Line onClick={() => handleDelete(row._id)} cursor="pointer"  size={20} color='red' />
        </div>
      )
    },
  ];
  const [teachers, setTeachers] = useState  ([])
  useEffect(()=>{
    const getTeachers = async () => {
      const res = await axios.get("http://localhost:5000/academicians")
      setTeachers(res.data)
    }
    getTeachers()
  },[])
  const handleDelete = async (id) => {
    console.log(id)
    console.log(currentUser.accessToken)
    try {
      await axios.delete("http://localhost:5000/teachers/" + id, {
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
      <Link to="/teachers/create" className='inline-block bg-greenBg text-white font-[400] rounded-sm px-2 py-1 mb-4'>Add New Teacher</Link>
      <DataTable
        columns={columns}
        data={teachers}
      />
    </div>
  )
}

export default TeachersPage