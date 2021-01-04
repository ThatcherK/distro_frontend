import React, { useState, useEffect } from 'react'
import ReactModal from 'react-modal';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import instance from '../../config/axiosConfig'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    selectInput: {
        width: '200px',
    }
});
export default function AssignOrderForm(props) {
    const classes = useStyles()
    const [transporters, setTransporters] = useState([])
    const formik = useFormik({
        initialValues: {
            transporter_id: '',
        },
        validationSchema: Yup.object({
            transporter_id: Yup.number().required('Required!'),
        }),
        onSubmit: (values, onSubmitProps) => {
            handleOrderAssignment();
            onSubmitProps.resetForm()
        }
    });
    useEffect(() => {
        ReactModal.setAppElement('body')
        instance.get('/staff')
            .then((response) => {
                let staff = response.data.staff
                setTransporters(staff.filter((person) => person.role.name === "driver"))
            })
    }, [])

    const payload = {
        transporter_id: formik.values.transporter_id,
    }

    const handleOrderAssignment = () => {
        instance
            .patch(`/orders/${props.order.id}`, payload)
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
                contentLabel="Edit Order details"
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
                    {transporters.map((transporter) => (
                        <TextField
                            select
                            value={formik.values.transporter_id}
                            label="Transporter"
                            name="transporter_id"
                            onChange={formik.handleChange}
                            className={classes.selectInput} >
                            <option value={transporter.id} >{transporter.username}</option>
                        </TextField>
                    ))}
                    <Button type="submit">Submit</Button>
                </form>
            </ReactModal>
        </div>
    )
}