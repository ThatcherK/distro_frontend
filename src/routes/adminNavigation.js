import React from 'react'
import { Switch, Route } from 'react-router-dom';
import AdminDashboard from '../components/admin/adminDashboard'
import Inventory from '../components/admin/inventory'
import InviteUsers from '../components/admin/inviteUsers'
import RegisterBusiness from '../components/admin/registerBusiness';
import Staff from '../components/admin/staff'
import Orders from '../components/admin/orders'

export default function AdminNavigation() {
    return (
        <Switch>
        <Route exact path="/" component={AdminDashboard} />
        <Route exact path="/admin/inventory" component={Inventory} />
        <Route exact path="/admin/invite" component={InviteUsers} />
        <Route exact path="/admin/staff" component={Staff} />
        <Route exact path="/admin/register" component={RegisterBusiness}/>
        <Route exact path="/admin/orders" component={Orders}/>
    </Switch>
    )
}