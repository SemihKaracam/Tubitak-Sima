import React, { useState } from 'react'
import axios from "axios"
import { useDispatch } from "react-redux"
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice.js"
import { useNavigate } from 'react-router-dom'
const LoginPage = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogin = async (e) => {
    e.preventDefault()
    dispatch(loginStart())
    try {
      const { data } = await axios.post("http://localhost:5000/auth/signin", { username, password })
      dispatch(loginSuccess(data))
      if(data.role=="student"){
        navigate("/home/student")
      }
      else if(data.role == "academician"){
        navigate("/home/academician")
      }
      else if(data.role == "admin"){
        navigate("/home/admin")
      }
    } catch (err) {
      dispatch(loginFailure())
    }
  }

  return (
    <div className='flex items-center justify-center w-full h-full'>
      <form className='border-[1px] border-black w-[30%] h-[50%] p-4'>
        <h3 className='text-center text-[24px] font-[500] mb-2'>Login</h3>
        <div>
          <label className='mb-1'>Username</label>
          <input value={username} onChange={(e) => setUsername(e.target.value)} className='w-full border-[1px] p-2 rounded-md' placeholder='Username' type="text" />
        </div>
        <div className='mt-4'>
          <label className='mb-1'>Password</label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} className='w-full border-[1px] p-2 rounded-md' placeholder='Password' type="password" />
        </div>
        <div className='text-center mt-8'>
          <button onClick={handleLogin} className='bg-blueBg text-white text-center w-[50%] py-3 rounded-[20px]'>Sign In</button>
        </div>
      </form>
    </div>
  )
}

export default LoginPage