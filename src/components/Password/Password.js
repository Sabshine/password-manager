import React from 'react';

import classes from './Password.css';
import Button from '../UI/Button/Button';
// import axios from '../../axios-passdata';

const password = ( props ) => {
    
    return (
        <div className={classes.Card}>
                <article>
                    <h4>{props.name}</h4>
                    {props.username
                    ? <p>{props.username}</p> 
                    : <p>{props.email}</p>}
                    
                    <Button 
                        btnType="Danger"
                        clicked={props.clickedDel}> DELETE </Button>
                    <Button 
                        btnType="Success"
                        clicked={props.clickedView}> SHOW </Button>
                </article>
        </div>
    );
};

export default password;