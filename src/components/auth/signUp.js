import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from '@material-ui/core/Button';
import instance from '../../config/axiosConfig';

console.log(instance)
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
            <form className={classes.root} noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
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
                <TextField
                    id="standard-basic"
                    label="Confirm password"
                    type="password"
                    name="confirmPassword"
                    className={classes.input}
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                />
                <TextField
                    id="standard-basic"
                    label="Invite code"
                    className={classes.input}
                    name="inviteCode"
                    value={formik.values.inviteCode}
                    onChange={formik.handleChange}
                />
                <InputLabel htmlFor="age-native-simple">Company</InputLabel>
                <Select
                    native
                    value={'company'}
                    onChange={''}
                    inputProps={{
                        name: 'business',
                        id: 'age-native-simple',
                    }}
                    className={classes.input}
                >
                    <option aria-label="None" value="" />
                    <option value={10}>Ten</option>
                    <option value={20}>Twenty</option>
                    <option value={30}>Thirty</option>
                </Select>
                <Button type="submit">Submit</Button>
            </form>
        </div>
    )
}