import React from 'react';

import classes from './Toolbar.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = ( props ) => (
    <header className={classes.Toolbar}>
        <DrawerToggle clicked={props.drawerToggleClicked} isAuth={props.isAuth}/>
        <p className={classes.Name}>NeverForget</p>
        <nav className={classes.DesktopOnly}>
            <NavigationItems isAuth={props.isAuth}/>
        </nav>
    </header>
);

export default toolbar;