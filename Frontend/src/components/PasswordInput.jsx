import React from 'react'
import { useState } from 'react'
import {FaRegEye, FaRegEyeSlash} from 'react-icons/fa6'

const PasswordInput = ({value, onChange, placeholder}) => {
    const [isPassShow, setPassShow] = useState(false)

    const togglePassword = () => {
        setPassShow(!isPassShow)
    }
  return (
    <div className='flex items-center justify-around bg-transparent border-[1.5px] px-5 rounded mb-3 border-gray-500'>
        <input
        value={value}
        onChange={onChange}
        placeholder={placeholder || "Password"} 
        type={isPassShow ? "text" : "password"}
        className='w-full text-white text-sm bg-transparent py-3 mr-3 rounded outline-none border-gray-500'/>

        {
            isPassShow ? (<FaRegEye
                size={22}
                className='text-amber-500 cursor-pointer transition-all'
                onClick={()=>togglePassword()}/>)
                 : (<FaRegEyeSlash
                size={22}
                className='text-amber-500 cursor-pointer transition-all'
                onClick={()=>togglePassword()}/>)
        }
    </div>
  )
}

export default PasswordInput