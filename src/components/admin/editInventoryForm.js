import React, { useEffect } from 'react'
import ReactModal from 'react-modal';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import instance from '../../config/axiosConfig'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({

});

export default function EditInventoryForm(props) {
    const classes = useStyles()
    const formik = useFormik({
        initialValues: {
            name: '',
            quantity: '',
            price: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Required!'),
            quantity: Yup.number().required('Required!'),
            price: Yup.number().required('Required!'),
        }),
        onSubmit: (values, onSubmitProps) => {
            handleEdit();
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

    const handleEdit = () => {
        console.log(payload)
        instance
            .patch(`/inventory/${props.item.id}`, payload)
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
                contentLabel="Edit Inventory details"
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
                    <TextField value={formik.values.name} label="Name" name="name" onChange={formik.handleChange} />
                    <TextField value={formik.values.quantity} label="Quantity" name="quantity" onChange={formik.handleChange} />
                    <TextField value={formik.values.price} label="Price" name="price" onChange={formik.handleChange} />
                    <Button type="submit">Submit</Button>
                </form>
            </ReactModal>
        </div>
    )

}