import React from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import instance from '../../config/axiosConfig'

export default function InviteUsers(){

    const formik = useFormik({
        initialValues: {
            email: '',
            role_id: 0,
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email format').required('Required!'),
            role_id: Yup.number().required('Required!'),
        }),
        onSubmit: (values, onSubmitProps) => {
            handleInvite();
            onSubmitProps.resetForm()
        }
    });

    const payload = {
        email: formik.values.email,
        role_id: formik.values.role_id,
    }
    
    const handleInvite = () => {

        instance
            .post('/invited_users', payload)
            .then((response) => {
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error.response.data)
            })
    }
    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <input 
                placeholder="Enter email" 
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                 />
                <select name="role_id" value={formik.values.role_id} onChange={formik.handleChange} >
					<option value="">Role</option>
					<option value={2} >Transport Manager</option>
					<option value={3}>Driver</option>
					<option value={4}>Store Manager</option>
				</select>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}