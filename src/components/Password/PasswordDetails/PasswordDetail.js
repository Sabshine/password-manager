import React from 'react';

import Button from '../../UI/Button/Button';
import classes from './PasswordDetail.css';

const passwordDetail = (props) => {
    return (
        <div className={classes.PasswordDetail}>
            <h3>{props.name} details</h3>
            <hr className={classes.Line}/>
            <div style={{
                width: '100%',
                margin: 'auto'
            }}>
                <p>Email: {props.email}</p>
                {props.username 
                ? <p>Username: {props.username}</p>
                : null
                }
                <p>Password: {props.password}</p>
            </div>
            <Button 
                btnType="Danger" 
                clicked={props.back}>BACK</Button>
        </div>
    );
}

export default passwordDetail;