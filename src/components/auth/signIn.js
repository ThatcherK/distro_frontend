import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

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
export default function SignIn(){
    const classes = useStyles()
    return (
        <div>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField id="standard-basic" label="Username"className={classes.input} />
                <TextField id="standard-basic" label="Password" type="password" className={classes.input}/>

            </form>
        </div>
    )
}