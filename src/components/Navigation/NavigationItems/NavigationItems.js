import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        { props.isAuth
        ? <NavigationItem link="/passwords">Passwords</NavigationItem>
        : null }
        { props.isAuth
        ? <NavigationItem link="/add-password">Add Password</NavigationItem>
        : null }
        { props.isAuth
        ? <NavigationItem link="/generate-password">Generate Password</NavigationItem>
        : null}
        { props.isAuth 
        ? <NavigationItem link="/logout">Logout</NavigationItem>
        : null}
        
        {/* { !props.isAuth 
        ? <NavigationItem link="/auth">Login</NavigationItem>
        : <NavigationItem link="/logout">Logout</NavigationItem>} */}
    </ul>
);

export default navigationItems;