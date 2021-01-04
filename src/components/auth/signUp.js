import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from '@material-ui/core/Button';
import instance from '../../config/axiosConfig';

const useStyles = makeStyles((theme) => ({
    root: {
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

export default function SignUp() {
    const classes = useStyles()

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            confirmPassword: '',
            inviteCode: ''
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Required!'),
            password: Yup.string().min(8, 'Minimum 8 characters').required('Required!'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password')], 'Password is not a match')
                .required('Required!'),
            inviteCode: Yup.string().required('Required')
        }),
        onSubmit: (values, onSubmitProps) => {
            handleSignUp();
            onSubmitProps.resetForm()
        }
    });

    const payload = {
        username: formik.values.username,
        password: formik.values.password,
        invite_code: formik.values.inviteCode
    }

    const handleSignUp = () => {
        instance
            .post('/register', payload)
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error.response.data)
            })
    }
    return (
        <div>
            <form className={classes.root} autoComplete="off" onSubmit={formik.handleSubmit}>
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
                <TextField
                    id="standard-basic"
                    label="Confirm password"
                    type="password"
                    name="confirmPassword"
                    className={classes.input}
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    InputProps={{
                        className: classes.input
                    }}
                    InputLabelProps={{
                        className: classes.label
                    }}
                />
                <TextField
                    id="standard-basic"
                    label="Invite code"
                    className={classes.input}
                    name="inviteCode"
                    value={formik.values.inviteCode}
                    onChange={formik.handleChange}
                    InputProps={{
                        className: classes.input
                    }}
                    InputLabelProps={{
                        className: classes.label
                    }}
                />
                <Button type="submit" variant="outlined" className={classes.submitButton}>Submit</Button>
            </form>
        </div>
    )
}