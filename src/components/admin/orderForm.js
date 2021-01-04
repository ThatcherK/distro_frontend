import React, { useEffect } from 'react'
import ReactModal from 'react-modal';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import instance from '../../config/axiosConfig'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export default function OrderForm(props) {
    const formik = useFormik({
        initialValues: {
            quantity: '',
        },
        validationSchema: Yup.object({
            quantity: Yup.number().required('Required!'),
        }),
        onSubmit: (values, onSubmitProps) => {
            handleOrder();
            onSubmitProps.resetForm()
        }
    });

    useEffect(() => {
        ReactModal.setAppElement('body')
    })

    const payload = {
        inventory_id: props.item.id,
        quantity: formik.values.quantity,
        customer_id: 1,
    }

    const handleOrder = () => {
        instance
            .post('/orders', payload)
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
                contentLabel="Make an order"
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
                    <TextField
                        value={formik.values.quantity}
                        label="Quantity"
                        name="quantity"
                        type="number"
                        onChange={formik.handleChange}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </ReactModal>
        </div>
    )

}