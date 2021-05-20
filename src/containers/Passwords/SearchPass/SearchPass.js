import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './SearchPass.css';
import * as actions from '../../../store/actions/index';
import Input from '../../../components/UI/Input/Input';
import { updateObject, checkValidity } from '../../../shared/utility';
// import Button from '../../../components/UI/Button/Button';
// import SearchIcon from '../../../assets/images/search.png'

class Passwords extends Component {
    state = {
      searchForm: {
          search: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Search on App Name'
            },
            value: '',
            validation: {
                required: false,
                minLength: 0
            },
            valid: false,
            touched: false
          },
        },
        searching: false
    }

    inputChangedHandler = (event) => {
        
      const updatedFormElement = updateObject(this.state.searchForm.search, {
          value: event.target.value,
          valid: checkValidity(event.target.value, this.state.searchForm.search.validation),
          touched: true
      });
      const updatedsearchForm = updateObject(this.state.searchForm, {
          search: updatedFormElement
      });
      
      let formIsValid = true;
      for (let inputIdentifier in updatedsearchForm) {
          formIsValid = updatedsearchForm[inputIdentifier].valid && formIsValid;
      }
      this.setState({searchForm: updatedsearchForm, formIsValid: formIsValid});
  }
  
  searchHandler = ( event ) => {
    event.preventDefault();
    const searchQuery = this.state.searchForm.search.value.toLowerCase();
    this.props.onFetchPass(this.props.token, this.props.userId, searchQuery);
  }


    render () {
        
        return (
              <div className={classes.SearchPass}>
                <form onSubmit={this.searchHandler}>
                  <Input className={classes.Input}
                    key={0}
                    elementType={this.state.searchForm.search.elementType}
                    elementConfig={this.state.searchForm.search.elementConfig}
                    value={this.state.searchForm.search.value}
                    invalid={!this.state.searchForm.search.valid}
                    shouldValidate={this.state.searchForm.search.validation}
                    touched={this.state.searchForm.search.touched}
                    changed={(event) => this.inputChangedHandler(event)} />
                </form>
              </div>
              
        );
    }
}

const mapStateToProps = state => {
    return {
        passwords: state.addPass.passwords,
        loading: state.addPass.loading,
        token: state.auth.token,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchPass: (token, userId, isSearch) => dispatch( actions.fetchPass(token, userId, isSearch) )
    };
};

export default connect( mapStateToProps, mapDispatchToProps )(Passwords);