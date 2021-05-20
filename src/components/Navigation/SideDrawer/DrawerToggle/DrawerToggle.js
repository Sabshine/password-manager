import React from 'react';

import classes from './DrawerToggle.css';

const drawerToggle = (props) => (
    <div className={classes.ExtraDiv}>
        { props.isAuth 
        ? <div className={classes.DrawerToggle} onClick={props.clicked}>
            <div className={classes.Menu}></div>
            <div className={classes.Menu}></div>
            <div className={classes.Menu}></div>
          </div>
        : null}
    </div>
);

export default drawerToggle;