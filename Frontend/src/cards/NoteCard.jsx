import React from 'react'
import { TiPinOutline, TiPin } from "react-icons/ti";
import { MdDelete, MdModeEditOutline } from "react-icons/md";

const NoteCard = ({ title, date, content, tags, isPinned, onEdit, onDelete, onPinnedNote }) => {
    return (
        <div className='rounded border-2 border-gray-700 p-4'>
            <div className='flex items-center justify-between'>
                <h4 className='text-white text-sm font-medium'>{title}</h4>
                {
                    isPinned ? <TiPin color='white' size={20} /> : <TiPinOutline color='white' size={20} />
                }
            </div>
            <h4 className='text-gray-400'>{date}</h4>
            <h4 className='text-gray-400 mt-4 pr-2'>{content?.slice(0, 60)}</h4>
            <div className='flex items-center justify-between'>
                <h4 className='text-gray-500 text-sm font-medium mt-4'>{tags}</h4>
                <div className='flex items-center justify-center'>
                    <MdDelete color='white' size={20} className='mr-4'/>
                    <MdModeEditOutline color='white' size={20} />
                </div>
            </div>
        </div>
    )
}

export default NoteCard