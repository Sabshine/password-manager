import React, { Component } from 'react';
import { connect } from 'react-redux';
import CryptoJS from 'crypto-js';
// import  { Redirect } from 'react-router-dom'

import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './AddPass.css';
import axios from '../../axios-passdata';
import Input from '../../components/UI/Input/Input';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import { updateObject, checkValidity } from '../../shared/utility';
import Modal from '../../components/UI/Modal/Modal';
import Message from '../../components/UI/Message/Message';

class AddPass extends Component {
    state = {
        passForm: {
            application: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Application name*'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 3
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'E-Mail*'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true,
                    minLength: 3
                },
                valid: false,
                touched: false
            },
            username: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Username'
                },
                value: '',
                validation: {},
                valid: true,
                touched: true
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password*'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
        },
        formIsValid: false,
        showModal: null
    }

    getModalHandler = (value) => {
        this.setState({showModal: value});
    }

    hideModalHandler = () => {
        this.setState({showModal: null});
    }

    addPassHandler = ( event ) => {
        event.preventDefault();
        const formData = {};
        for (let formElementIdentifier in this.state.passForm) {
            if (formElementIdentifier === "password") {
                const encryptedPass = CryptoJS.AES.encrypt(this.state.passForm[formElementIdentifier].value, 'secret key 123').toString();
                formData[formElementIdentifier] = encryptedPass;
            } else {
                formData[formElementIdentifier] = this.state.passForm[formElementIdentifier].value;
            }
        }
        const data = {
            formData: formData,
            userId: this.props.userId
        }

        this.setState({showModal: true})
        this.props.onAddPass(data, this.props.token);
        // this.props.history.replace('/passwords');
    }

    inputChangedHandler = (event, inputIdentifier) => {
        
        const updatedFormElement = updateObject(this.state.passForm[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.passForm[inputIdentifier].validation),
            touched: true
        });
        const updatedPassForm = updateObject(this.state.passForm, {
            [inputIdentifier]: updatedFormElement
        });
        
        let formIsValid = true;
        for (let inputIdentifier in updatedPassForm) {
            formIsValid = updatedPassForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({passForm: updatedPassForm, formIsValid: formIsValid});
    }

    render () {
        const formElementsArray = [];
        for (let key in this.state.passForm) {
            formElementsArray.push({
                id: key,
                config: this.state.passForm[key]
            });
        }
        let form = (
            <form onSubmit={this.addPassHandler}>
                {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
                <Button 
                    disabled={!this.state.formIsValid}
                    btnType="Success">SAVE</Button>
            </form>

        );
        if ( this.props.loading ) {
            form = <Spinner />;
        }
        return (
            <div>
                <div className={classes.AddPass}>
                    <h4>Add Password</h4>
                    {form}
                </div>
                <Modal
                    show={this.state.showModal !== null}
                    modalClosed={() => this.hideModalHandler()}>
                    <Message
                        message={this.state.passForm.application.value + " is succesfully added!"}
                        btnType={"Success"}
                        btnName={"OK"}
                        back={() => this.hideModalHandler()}>
                    </Message>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.addPass.loading,
        token: state.auth.token,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddPass: (passData, token) => dispatch(actions.addPass(passData, token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(AddPass, axios));