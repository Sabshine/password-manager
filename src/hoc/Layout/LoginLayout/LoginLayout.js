import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../Auxiliary/Auxiliary';
import classes from './LoginLayout.css';
import Toolbar from '../../../components/Navigation/Toolbar/ToolbarLogin/ToolbarLogin';

class LoginLayout extends Component {
    render () {
        return (
            <Aux>
                <Toolbar />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return{
        isAuthenticated: state.auth.token !== null
    };
};

export default connect(mapStateToProps)(LoginLayout);