import React, { useEffect, useState } from 'react'
import instance from '../../config/axiosConfig'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddItemForm from './addItemForm';
import EditInventoryForm from './editInventoryForm';
import OrderForm from './orderForm'

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

export default function Inventory() {
    const [inventory, setInventory] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [isOrderOpen, setIsOrderOpen] = useState(false)
    const classes = useStyles();
    useEffect(() => {
        instance.get('/inventory')
            .then((response) => {
                setInventory(response.data.inventory)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    const handleModalOpen = () => {
        setIsOpen(true)
    }
    const modalClose = () => {
        setIsOpen(false)
    }
    const handleEditModalOpen = () => {
        setIsEditOpen(true)
    }
    const handleEditModalClose = () => {
        setIsEditOpen(false)
    }
    const handleOrderModalOpen = () => {
        setIsOrderOpen(true)
    }
    const handleOrderModalClose = () => {
        setIsOrderOpen(false)
    }
    return (
        <div>
            <Button onClick={handleModalOpen}>Add Item</Button>
            <AddItemForm isOpen={isOpen} modalClose={modalClose} />
            {inventory.map((item) => (
                <Card className={classes.root} variant="outlined">
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            {item.name}
                        </Typography>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Stock: {item.quantity}
                        </Typography>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            UGX{item.price}
                        </Typography>
                        <Button size="small" onClick={handleEditModalOpen}>Edit</Button>
                        <EditInventoryForm isOpen={isEditOpen} modalClose={handleEditModalClose} item={item} />
                        <Button onClick={handleOrderModalOpen}>Order</Button>
                        <OrderForm isOpen={isOrderOpen} modalClose={handleOrderModalClose} item={item} />
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

