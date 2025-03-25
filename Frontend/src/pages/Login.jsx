import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PasswordInput from '../components/PasswordInput'
import { isValidEmail } from '../utils/helper'
import axiosInstance from '../utils/axiosInstance'

const Login = () => {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();

    if(!isValidEmail(email)){
      setError("Invalid email entered!")
      return; 
    }

    if(!pass){
      setError("Please enter the password")
      return;
    }

    setError(null)

    try{
      const response = await axiosInstance.post("/login", {
        email: email,
        password: pass
      })

      if(response.data && response.data.accessToken){
        setError(null)
        localStorage.setItem("token", response.data.accessToken)
        navigate('/dashboard')
      }

      if(response.data.error)
        setError(response.data.message)
    }catch(error){
      if(error.response && error.response.data && error.response.data.message)
        setError(error.response.data.message)
      else
        setError("An unexpected error occured. Please try again!")
    }
  }
  return (
    <>
      {/* <Nav/> */}

      <div className='flex justify-center items-center mt-28'>
        <div className='w-96 border-gray-700 rounded bg-[#252525] p-10'>
          <form onSubmit={handleLogin}>
            <h4 className='text-white text-3xl mb-6'>Login</h4>
            <input type="text" placeholder='Email' className='input-box' value={email} onChange={(e) => setEmail(e.target.value)}/>
            <PasswordInput value={pass} onChange={(e) => setPass(e.target.value)}/>

            { error && <p className='text-red-300 mt-9 text-xs'>{error}</p> }

            <button type='submit' className='btn-primary'>Login</button>

            <p className='text-white text-sm text-center mt-4'>Not registred yet? <Link to="/signup" className='font-medium text-amber-500 underline'>
                Create an account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login