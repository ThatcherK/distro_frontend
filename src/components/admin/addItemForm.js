
import React, { useEffect } from 'react'
import ReactModal from 'react-modal';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import instance from '../../config/axiosConfig'

export default function AddItemForm(props) {

    const formik = useFormik({
        initialValues: {
            name: '',
            quantity: 0,
            price: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Required!'),
            quantity: Yup.number().required('Required!'),
            price:Yup.number().required('Required')
        }),
        onSubmit: (values, onSubmitProps) => {
            handleAddItem();
            onSubmitProps.resetForm()
        }
    });
    useEffect(() => {
        ReactModal.setAppElement('body')
    })
     const payload = {
        name: formik.values.name,
        quantity: formik.values.quantity,
        price: formik.values.price
    }
   
    const handleAddItem = () => {
        console.log(payload)
        instance
            .post('/inventory', payload)
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
                    <TextField value={formik.values.name} name="name" onChange={formik.handleChange} label="Name" />
                    <TextField type="number" value={formik.values.quantity} name="quantity" onChange={formik.handleChange} label="Quantity"/>
                    <TextField type="number" value={formik.values.price} name="price" onChange={formik.handleChange} label="Price"/>
                    <Button type="submit">Submit</Button>
                </form>

            </ReactModal>
        </div>
    )
}