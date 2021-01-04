import React, {useEffect, useState} from 'react'
import ReactModal from 'react-modal'; 
import { useFormik } from 'formik';
import * as Yup from 'yup';
import instance from '../../config/axiosConfig'

export default function EditStaffForm(props){
    const formik = useFormik({
        initialValues: {
            username: '',
            role_id: '',
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Required!'),
            role_id: Yup.number().required('Required!'),
        }),
        onSubmit: (values, onSubmitProps) => {
            handleEdit();
            onSubmitProps.resetForm()
        }
    });
    
    useEffect(()=>{
        ReactModal.setAppElement('body')
    })

    const payload = {
        username: formik.values.username,
        role_id: formik.values.role_id,
    }
   
    const handleEdit = () => {
        console.log(payload)
        instance
            .patch(`/staff/${props.user.id}`, payload)
            .then((response) => {
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error.response.data)
            })
    }
    return (
        <div>
            <ReactModal
			isOpen={props.isOpen}
			contentLabel="Edit staff details"
			onRequestClose={props.modalClose}
			style={{
				overlay: {
					position: 'fixed',
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					backgroundColor: 'rgba(0, 0, 0, 0.6)'
				},
				content: {
					position: 'fixed',
					background: '#c0bfc0',
					width: 'fit-content',
					minWidth: '200px',
					maxWidth: '300px',
					height: 'fit-content',
					padding: '20px',
					borderRadius: '6px',
					top: '50%',
					left: '50%',
					display: 'flex',
					justifyContent: 'center',
					transform: 'translate(-50%, -50%)'
				}
			}}
		>
            <form onSubmit={formik.handleSubmit}>
                <input value={formik.values.username} name="username" onChange={formik.handleChange}/>
                <select name="role_id" value={formik.values.role_id} onChange={formik.handleChange} >
					<option value="">Role</option>
					<option value={2} >Transport Manager</option>
					<option value={3}>Driver</option>
					<option value={4}>Store Manager</option>
				</select>
                <button type="submit">Submit</button>
            </form>
		
		</ReactModal>
        </div>
    )
}