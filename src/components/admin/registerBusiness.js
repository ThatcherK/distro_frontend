import React from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import instance from '../../config/axiosConfig'

export default function RegisterBusiness(){

    const formik = useFormik({
        initialValues: {
            name: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Required!'),
        }),
        onSubmit: (values, onSubmitProps) => {
            handleRegister();
            onSubmitProps.resetForm()
        }
    });

    const payload = {
        name: formik.values.name
    }
    console.log(payload)
    const handleRegister = () => {

        instance
            .post('/business', payload)
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
                <input placeholder="Enter Business Name" name="name" onChange={formik.handleChange} value={formik.values.name}/>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}