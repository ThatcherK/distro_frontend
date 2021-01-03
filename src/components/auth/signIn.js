import React, { useState, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from '@material-ui/core/Button';
import instance from '../../config/axiosConfig';
import { authContext } from '../../context/authenticate'

const useStyles = makeStyles((theme) => ({
    root: {
        //   margin: theme.spacing(6, 0, 3),
        display: 'flex',
        flexDirection: 'column',
        width: '100%',

    },
    input: {
        marginBottom: '10px',
        marginRight: theme.spacing(1),
        color: '#cad2c5',
        borderColor: '#84a98c',
        '&:hover': {
            color: "#52796f",
        },
    },
    label: {
        color: '#cad2c5'
    },
    submitButton: {
        color: '#cad2c5',
        borderColor: '#cad2c5',
        '&:hover': {
            background: "#52796f",
         },
    }
}));
export default function SignIn() {
    const { setRole, setAuthToken } = useContext(authContext)
    const classes = useStyles()

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Required!'),
            password: Yup.string().min(8, 'Minimum 8 characters').required('Required!'),
        }),
        onSubmit: (values, onSubmitProps) => {
            handleSignIn();
            onSubmitProps.resetForm()
        }
    });

    const payload = {
        username: formik.values.username,
        password: formik.values.password,
    }

    const handleSignIn = () => {

        instance
            .post('/login', payload)
            .then((response) => {
                console.log(response.data)
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('role', response.data.user.role.name)
                setRole(response.data.user.role.name)
                setAuthToken(response.data.token)
            })
            .catch((error) => {
                console.log(error.response.data)
            })
    }
    return (
        <div>
            <form className={classes.root} noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
                <TextField
                    id="standard-basic"
                    label="Username"
                    className={classes.input}
                    name="username"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    InputProps={{
                        className: classes.input
                    }}
                    InputLabelProps={{
                        className: classes.label
                    }}
                />
                <TextField
                    id="standard-basic"
                    label="Password"
                    type="password"
                    className={classes.input}
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    InputProps={{
                        className: classes.input
                    }}
                    InputLabelProps={{
                        className: classes.label
                    }}
                />
                <Button variant="outlined" className={classes.submitButton} type="submit">Submit</Button>
            </form>
        </div>
    )
}