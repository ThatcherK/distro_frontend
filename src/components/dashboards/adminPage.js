import React from 'react'
import { NavLink, Redirect } from 'react-router-dom';
import AdminNavigation from '../../routes/adminNavigation';

export default function AdminPage() {
    return (
        <div>
            <div>
                <button>Log out</button>
            </div>
            <div>
                <NavLink exact to="/">Dashboard</NavLink>
                <NavLink to="/admin/inventory">Inventory</NavLink>
                <NavLink to="/admin/staff">Staff</NavLink>
                <NavLink to="/admin/invite">Invite Users</NavLink>
            </div>
            <AdminNavigation/>

        </div>
    )
}