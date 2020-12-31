import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from '@material-ui/core/Button';
import instance from '../../config/axiosConfig';

const useStyles = makeStyles((theme) => ({
    root: {
        //   margin: theme.spacing(6, 0, 3),
        display: 'flex',
        flexDirection: 'column',
        width: '50%',

    },
    input: {
        marginBottom: '10px',
        marginRight: theme.spacing(1),
    },
}));
export default function SignIn() {
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
                console.log(response)
            })
            .catch((error) => {
                console.log(error.response.data)
            })
    }
    return (
        <div>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField
                    id="standard-basic"
                    label="Username"
                    className={classes.input}
                    name="username"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                />
                <TextField
                    id="standard-basic"
                    label="Password"
                    type="password"
                    className={classes.input}
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                />
                <Button type="submit">Submit</Button>
            </form>
        </div>
    )
}