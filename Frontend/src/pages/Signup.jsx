import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PasswordInput from '../components/PasswordInput';
import axiosInstance from '../utils/axiosInstance';

const Signup = () => {
  const navigate = useNavigate()

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState(null)

  const createAccount = async(e) => {
    e.preventDefault();

    if(!name){
      setError("Enter Valid Name!")
      return;
    }
    if(!email){
      setError("Enter Valid Email!")
      return;
    }
    if(!pass){
      setError("Enter Valid Password!")
      return;
    }

    setError(null)

    try {
      const response = await axiosInstance.post("/signup", {
        fullName: name,
        email: email,
        password: pass
      });

      if(response.data && response.data.message)
        navigate('/login')

      if(response.data.error)
        setError(response.data.message)
    } catch (error) {
      if(error.response && error.response.data && error.response.data.message)
        setError(error.response.data.message)
      else
        setError("An unexpected error occured. Please try again!")
    }
  }

  return (
    <>
      <div className='flex justify-center items-center mt-28'>
        <div className='w-96 border-gray-700 rounded bg-[#252525] p-10'>
          <form onSubmit={createAccount}>
            <h4 className='text-white text-3xl mb-6'>Signup</h4>
            <input type="text" placeholder='Name' className='input-box' value={name} onChange={e => setName(e.target.value)}/>
            <input type="text" placeholder='Email' className='input-box' value={email} onChange={e => setEmail(e.target.value)}/>
            <PasswordInput value={pass} onChange={e => setPass(e.target.value)}/>

            { error && <p className='text-red-300 mt-9 text-xs'>{error}</p> }

            <button type='submit' className='btn-primary'>Create an Account</button>

            <p className='text-white text-sm text-center mt-4'>Already have an account? <Link to="/login" className='font-medium text-amber-500 underline'>
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  )
}

export default Signup