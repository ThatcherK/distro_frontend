import React, { useContext, useState } from 'react'
import SignIn from './auth/signIn'
import SignUp from './auth/signUp'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles';
import { authContext } from '../context/authenticate';
import AdminPage from './dashboards/adminPage'

const useStyles = makeStyles((theme) => ({

    button: {
        width: 'fit-content',
        borderColor: '#cad2c5',
        margin: '20px',
        padding: '8px',
        color: '#cad2c5',
        '&:hover': {
            background: "#52796f",
        },
    },
}));
export default function LandingPage() {
    const classes = useStyles()
    const [showSignUp, setShowSignUp] = useState(false)
    const [showSignIn, setShowSignIn] = useState(false)
    const { isLoggedIn } = useContext(authContext)
    const localStorageToken = localStorage.getItem('token')
    const localStorageRole = localStorage.getItem('role')

    const handleSignUpClick = () => {
        setShowSignUp(true)
        setShowSignIn(false)
    }
    const handleSignInClick = () => {
        setShowSignIn(true)
        setShowSignUp(false)
    }

    const showPage = (role) => {
        switch (role) {
            case 'business_owner':
                return <AdminPage />;

            case 'transport_manager':
                return <div />;
            case 'driver':
                return <div />;
            case 'store_manager':
                return <div />;
            default:
                return <div />;
        }
    };

    return (

        <div className="landingPageContainer">

            {(isLoggedIn || localStorageToken) ? (
                showPage(localStorageRole)
            ) : (
                    <div>
                        <h1>DISTRO IQ</h1>
                        <p>Let's do the heavy lifting for you!</p>
                        <Button variant="outlined" onClick={handleSignUpClick} className={classes.button}>Sign up</Button>
                        <Button variant="outlined" onClick={handleSignInClick} className={classes.button}>Sign in</Button>
                        {showSignUp ? <SignUp /> : null}
                        {showSignIn ? <SignIn /> : null}
                    </div>
                )}
        </div>
    )
}