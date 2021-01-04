import React, {useEffect, useState} from 'react'
import instance from '../../config/axiosConfig'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AssignOrderForm from './assignOrderForm';

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
    const [isOpen, setModalOpen] = useState(false)
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
    const handleModalOpen = ()=>{
        setModalOpen(true)
    }
    const handleModalClose = ()=>{
        setModalOpen(false)
    }
    return (
        <div>
        {orders.map((order) => (
            <Card className={classes.root} variant="outlined">
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                       {order.name}({order.quantity})
                    </Typography>
                    <Typography>Customer name: {order.customer}</Typography>
                    <Typography>Date ordered: {order.order_date}</Typography>
                    <Typography>Status: {order.status}</Typography>
                    <Button size="small" onClick={handleModalOpen}>Assign</Button>
                    <AssignOrderForm isOpen={isOpen} modalClose={handleModalClose} order={order}/>
                </CardContent>
            </Card>
        ))}
    </div>
    )
}