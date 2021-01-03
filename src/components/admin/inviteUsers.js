import React from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import instance from '../../config/axiosConfig'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    input: {
        margin: '10px',
        width: '60%',
    },
    label: {

    },
    submitButton: {
        margin: '10px',
        width: '60%',
        '&:hover': {
            background: "#52796f",
        },
    }
}));

export default function InviteUsers() {
    const classes = useStyles()
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
            <form className={classes.root} noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
                <TextField
                    variant="outlined"
                    label="Email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    className={classes.input}
                />
                <TextField
                    id="standard-select"
                    select
                    label="Role"
                    variant="outlined"
                    name="role_id"
                    value={formik.values.role_id}
                    onChange={formik.handleChange}
                    className={classes.input}
                >
                   
                    <option value={2} >Transport Manager</option>
                    <option value={3}>Driver</option>
                    <option value={4}>Store Manager</option>
                </TextField>
                <Button variant="outlined" type="submit" className={classes.submitButton}>Submit</Button>
            </form>
        </div>
    )
}