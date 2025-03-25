import React, { useEffect, useState } from 'react'
import Nav from '../components/Nav'
import NoteCard from '../cards/NoteCard'
import axiosInstance from '../utils/axiosInstance'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const [userInfo, setUserInfo] = useState(null)
  const [notes, setNotes] = useState([])
  const navigate = useNavigate()

  const getUser = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user)
        setUserInfo(response.data)
    } catch (error) {
      localStorage.clear();
      navigate('/login')
    }
  }

  const getNotes = async() => {
    try {
      const response = await axiosInstance.get("/get-all-notes");
      console.log(response)
      if(response.data && response.data.notes)
        setNotes(response.data.notes)
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  }

  useEffect(() => {
    getUser();
    getNotes();
  }, [])

  return (
    <>
      <Nav userInfo={userInfo} />

      <div className='p-8 mx-auto'>
        <div className='grid grid-cols-3 gap-4'>
          {notes.length > 0 ? (
            notes.map((item) => (
              <NoteCard 
                key={item._id} 
                title={item.title}
                date={item.createdOn}
                content={item.content}
                tags={item.tags}
                isPinned={item.isPinned}
              />
            ))
          ) : (
            <p className='text-white'>No Notes Found</p>
          )}
        </div>
      </div>
    </>
  )
}

export default Home