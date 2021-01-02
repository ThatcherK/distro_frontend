import React, { useState, useEffect } from 'react'
import instance from '../../config/axiosConfig'
import ReactModal from 'react-modal';
import EditStaffForm from './editStaffForm';

export default function Staff() {
    const [staffData, setStaffData] = useState([])
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        instance.get('/staff')
            .then((response) => {
                console.log(response.data)
                setStaffData(response.data.staff)
            })
    }, [])
    const openModal = (user)=>{
        console.log(user)
        setIsOpen(true)
    }
    const modalClose = ()=>{
        setIsOpen(false)
    }
    return (
        <div>
            <ul>
                {staffData.map((user) => (
                    <div>
                        <li>{user.username}</li>
                        <button onClick={()=>openModal(user)} >Edit</button>
                        <EditStaffForm isOpen={isOpen} modalClose={modalClose} user={user}/>
                    </div>
                    
                ))}
            </ul>

        </div>
    )
}