// import React from 'react'
// import { NavLink, Redirect } from 'react-router-dom';
// import AdminNavigation from '../../routes/adminNavigation';
// import TopBar from './topBar';

// export default function AdminPage() {
//     return (
//         <div>
//             <div>
//                 <TopBar/>
//             </div>
//             <div>
//                 <NavLink exact to="/">Dashboard</NavLink>
//                 <NavLink exact to="/admin/register">Register Business</NavLink>
//                 <NavLink to="/admin/inventory">Inventory</NavLink>
//                 <NavLink to="/admin/staff">Staff</NavLink>
//                 <NavLink to="/admin/invite">Invite Users</NavLink>
//             </div>
//             <AdminNavigation/>

//         </div>
//     )
// }

import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import AdminNavigation from '../../routes/adminNavigation';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },

    appBar: {
        backgroundColor: '#2f3e46',
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

function ResponsiveDrawer(props) {
    const { window } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <div className={classes.toolbar} />
            <Divider />
            <List>
                <ListItem button component={NavLink} to="/">
                    <ListItemText primary={'Dashboard'} />
                </ListItem>
                <ListItem button component={NavLink} to="/admin/register">
                    <ListItemText primary={'Register Business'} />
                </ListItem>
                <ListItem button component={NavLink} to="/admin/inventory">
                    <ListItemText primary={'Inventory'} />
                </ListItem>
                <ListItem button component={NavLink} to="/admin/orders">
                    <ListItemText primary={'Orders'} />
                </ListItem>
                <ListItem button component={NavLink} to="/admin/staff">
                    <ListItemText primary={'Staff'} />
                </ListItem>
                <ListItem button component={NavLink} to="/admin/invite">
                    <ListItemText primary={'Invite Users'} />
                </ListItem>
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                    </IconButton>
                    <Typography variant="h6" className={classes.title} noWrap>
                        DistroIQ
                    </Typography>
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="mailbox folders">
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <AdminNavigation />
            </main>
        </div>
    );
}

ResponsiveDrawer.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default ResponsiveDrawer;
