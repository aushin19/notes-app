import React from 'react'
import { Link } from 'react-router-dom'
import PasswordInput from '../components/PasswordInput';

const Signup = () => {
  return (
    <>
      <div className='flex justify-center items-center mt-28'>
        <div className='w-96 border-gray-700 rounded bg-[#252525] p-10'>
          <form onSubmit={() => {}}>
            <h4 className='text-white text-3xl mb-6'>Signup</h4>
            <input type="text" placeholder='Name' className='input-box'/>
            <input type="email" placeholder='Email' className='input-box'/>
            <PasswordInput/>

            <button className='btn-primary'>Create an Account</button>

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