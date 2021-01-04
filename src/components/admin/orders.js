import React, {useEffect, useState} from 'react'
import instance from '../../config/axiosConfig'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        minWidth: 275,
        width: '20%',
    },

    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

export default function Orders(){
    const [orders, setOrders] = useState([])
    const classes = useStyles();
    useEffect(() => {
        instance.get('/orders')
            .then((response) => {
                console.log(response.data)
                setOrders(response.data.orders)
            }).catch((error)=>{
                console.log(error.message)
            })
    }, [])
    return (
        <div>
        {orders.map((order) => (
            <Card className={classes.root} variant="outlined">
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                      {order.quantity} : {order.name}
                    </Typography>
                    <Typography>Customer name: {order.customer}</Typography>
                    <Typography>Date ordered: {order.order_date}</Typography>
                    <Typography>Status: {order.status}</Typography>
                    <Button size="small">Edit</Button>
                </CardContent>
            </Card>
        ))}
    </div>
    )
}