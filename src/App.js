import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import MainLayout from './hoc/Layout/MainLayout';
import AddPass from './containers/AddPass/AddPass';
import Passwords from './containers/Passwords/Passwords';
import GeneratePass from './containers/GeneratePass/GeneratePass';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';

class App extends Component {
  componentDidMount () {
    this.props.onTryAutoSignup();
  }

  render () {
    let routes = (
        <Switch>
          <Route path="/auth" component={Auth} />
          <Redirect to="/auth"/>
        </Switch>
    );

    if (this.props.isAuthenticated) {
    routes = (
        <Switch>
          <Route path="/passwords" component={Passwords} />
          <Route path="/add-password" component={AddPass} />
          <Route path="/generate-password" component={GeneratePass} />
          <Route path="/logout" component={Logout} />
          <Redirect to="/passwords"/>
        </Switch>
      );
    }

    return (
      <div>
        <MainLayout>
          {routes}
        </MainLayout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch( actions.authCheckState() )
  };
};

export default withRouter( connect( mapStateToProps, mapDispatchToProps )( App ) );
