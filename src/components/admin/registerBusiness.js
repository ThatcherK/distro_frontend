import React from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import instance from '../../config/axiosConfig'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    input: {
        marginRight: theme.spacing(1),
    },
    label: {

    },
    submitButton: {
        '&:hover': {
            background: "#52796f",
        },
    }
}));
export default function RegisterBusiness() {
    const classes = useStyles()
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
            <form onSubmit={formik.handleSubmit} className="registerBusinessForm">
                <TextField
                    id="outlined-basic"
                    label="Business name"
                    variant="outlined"
                    name="name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
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