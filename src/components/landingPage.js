import React,{useState} from 'react'
import SignIn from './auth/signIn'
import SignUp from './auth/signUp'
import Button from '@material-ui/core/Button'

export default function LandingPage(){
    const [showSignUp,setShowSignUp] = useState(false)
    const [showSignIn,setShowSignIn] = useState(false)

    const handleSignUpClick = ()=>{
        setShowSignUp(true)
        setShowSignIn(false)
    }
    const handleSignInClick = ()=>{
        setShowSignIn(true)
        setShowSignUp(false)
    }
    return (
       
        <div>
            <Button variant="outlined" onClick={handleSignUpClick}>Sign up</Button>
            /
            <Button variant="outlined" onClick={handleSignInClick}>Sign in</Button>
            {showSignUp? <SignUp/>: null}
            {showSignIn? <SignIn/>: null}
        </div>
    )
}