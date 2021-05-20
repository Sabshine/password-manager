import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../components/UI/Button/Button';
import classes from './GeneratePass.css';
import axios from '../../axios-passdata';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

class GeneratePass extends Component {
    state = {
        password: null,
        length: 10,
        charset: null
    }

    generatePassHandler = () => {
        const length = this.state.length;
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!#$%&'()*+,-./:;<=>?@[]^_`{|}~";
        let password = "";
        for (let i = 0, n = charset.length; i < length; ++i) {
            password += charset.charAt(Math.floor(Math.random() * n));
        }
        this.setState({password: password});
    }

    inputChangeHandler = (event) => {
        this.setState({ length: event.target.value });
      };

    render () {
        let data = (
          <p className={classes.PassInv}> 0 </p>
        )
        if ( this.state.password !== null ) {
            data = <p className={classes.Pass}>{this.state.password}</p>
        }
        return (
            <div className={classes.GeneratePass}>
                <h4>Generate Password</h4>
                {data}
                <p className={classes.Text}>select password length:</p>
                <div className={classes.Center}>
                    <input className={classes.Slider}
                    onChange={(event) => this.inputChangeHandler(event)}
                    type={"range"}
                    min={10}
                    defaultValue={10}
                    max={30}
                    step={1}
                    />
                    <span className={classes.Output}>{this.state.length}</span>
                </div>
                <Button className={classes.Button}
                  btnType="Success"
                  clicked={() => this.generatePassHandler()}
                  >GENERATE</Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.addPass.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddPass: (passData) => dispatch(actions.addPass(passData))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(GeneratePass, axios));