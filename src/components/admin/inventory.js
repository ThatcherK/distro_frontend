import React, {useEffect, useState} from 'react'
import instance from '../../config/axiosConfig'

export default function Inventory(){
    const [inventory,setInventory] = useState([])

    useEffect(()=>{
        instance.get('/inventory')
        .then((response)=>{
            console.log(response.data)
            setInventory(response.data.inventory)
        })
    },[])
    return (
        <div>
            <ul>
                {inventory.map((item) => <li>{item.name}</li>)}
            </ul>
        </div>
    )
}