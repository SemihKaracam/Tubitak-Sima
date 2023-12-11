import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const UnauthorizedPage = () => {
    const navigate = useNavigate()
    const { currentUser } = useSelector(state => state.user)
    const goBack = (e) => {
        e.preventDefault()
        if(currentUser?.role=="admin"){
            navigate("/home/admin")
        }else if(currentUser.role=="student"){
            navigate("/home/student")
        }
        else if(currentUser.role=="student"){
            navigate("/home/teacher")
        }
    }
    return (
        <div className='flex justify-center items-center flex-col gap-2 mt-10'>
            <h3 className='text-[30px] font-bold'>Unauthorized</h3>
            <p className='text-[20px]'>You don't have access to the requested page</p>
            <button type='button' className='bg-gray-400 py-2 px-3 font-semibold' onClick={goBack}>
                Go Back
            </button>
        </div>
    )
}

export default UnauthorizedPage