import React from 'react'
import {useNavigate} from 'react-router-dom'

const Nav = ({userInfo}) => {
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.clear();
    navigate('/login')
  }
  return (
    <div className='bg-[#252525] flex items-center justify-between px-6 py-4 drop-shadow-2xl'>
        <h2 className='font-medium text-xl text-white'>Notes</h2>
        <h2 className='font-medium text-xl text-white' onClick={handleLogout}>{userInfo ? `Hey, ${userInfo.user.fullName}!` : "Admin"}</h2>
    </div>
  ) 
}

export default Nav