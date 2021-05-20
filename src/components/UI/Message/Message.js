import React from 'react';

import Button from '../../UI/Button/Button';
import classes from './Message.css';

const message = (props) => {
    return (
        <div className={classes.Message}>
            <h4>{props.message}</h4>
            { props.btnName
            ? <Button 
                btnType={props.btnType} 
                clicked={props.back}>{props.btnName}</Button>
            : null }
            { props.btnName2
            ? <Button 
                btnType={props.btnType2} 
                clicked={props.back2}>{props.btnName2}</Button>
            : null }
            
        </div>
    );
}

export default message;