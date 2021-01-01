import React, { useState, useEffect } from 'react'
import instance from '../../config/axiosConfig'

export default function Staff() {
    const [staffData, setStaffData] = useState([])

    useEffect(() => {
        instance.get('/staff')
            .then((response) => {
                console.log(response.data)
                setStaffData(response.data.staff)
            })
    }, [])
    return (
        <div>
            <ul>
                {staffData.map((user) => <li>{user.username}</li>)}
            </ul>

        </div>
    )
}