import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import instance from '../../config/axiosConfig'
import EditStaffForm from './editStaffForm';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
   
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

export default function OutlinedCard() {
    const classes = useStyles();
    const [staffData, setStaffData] = useState([])
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        instance.get('/staff')
            .then((response) => {
                console.log(response.data)
                setStaffData(response.data.staff)
            })
    }, [])
    const openModal = (user) => {
        console.log(user)
        setIsOpen(true)
    }
    const modalClose = () => {
        setIsOpen(false)
    }
    const bull = <span className={classes.bullet}>•</span>;

    return (
        <div>
            {staffData.map((user) => (
                <Card className={classes.root} variant="outlined">
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {user.username}
                    </Typography>
                    <Button size="small" onClick={() => openModal(user)}>Edit</Button>
                    <EditStaffForm isOpen={isOpen} modalClose={modalClose} user={user} />
                </CardContent>
                </Card>
            ))}
        </div>
            
       
    );
}
