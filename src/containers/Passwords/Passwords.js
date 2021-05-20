import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Passwords.css';
import Password from '../../components/Password/Password';
import axios from '../../axios-passdata';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import Modal from '../../components/UI/Modal/Modal';
import PasswordDetail from '../../components/Password/PasswordDetails/PasswordDetail';
import Search from './SearchPass/SearchPass';
import Message from '../../components/UI/Message/Message';

class Passwords extends Component {
    state = {
        showModal: null,
        showDelModal: null,
        deleteName: null,
        searching: false
    }

    componentDidMount () {
        this.props.onFetchPass(this.props.token, this.props.userId);
    };

    getModalHandler = (value) => {
        this.setState({showModal: value});
    }

    hideModalHandler = () => {
        this.setState({showModal: null});
    }

    getDelModalHandler = (value, name) => {
        this.setState({showDelModal: value, deleteName: name});
    }

    hideDelModalHandler = () => {
        this.setState({showDelModal: null});
    }

    removeCollection(key) {
        axios.delete(`/passdata/${key}.json`).then(response => {
            this.props.onFetchPass(this.props.token, this.props.userId, null);
        })
        this.setState({showDelModal: null});
    }

    getByValue(map, searchValue) {
        for (let [key, value] of map.entries()) {
          if (value === searchValue)
            return key;
        }
    }

    render () {
        //If showModal isn't null that means I want to show something and I render with the 
        //index which item in the array I want to show
        let modalPass = null;
        if (this.state.showModal !== null) {
            modalPass = <PasswordDetail 
                    name={this.props.passwords[this.state.showModal].formData.application}
                    email={this.props.passwords[this.state.showModal].formData.email}
                    username={ this.props.passwords[this.state.showModal].formData.username}
                    password={this.props.passwords[this.state.showModal].formData.password} 
                    back={() => this.hideModalHandler()}
                />
        }
        
        let passwords = <Spinner /> ;
        if ( !this.props.loading ) {
            if (this.props.passwords.length === 0) {
                passwords = (<p></p>);
            } else {
                passwords = this.props.passwords.map((password, key) => {
                    return <div key={key}>
                            <Password
                                key={JSON.stringify(password.id)}
                                name={password.formData.application}
                                email={password.formData.email}
                                username={password.formData.username}
                                // password={password.formData.password} 
                                clickedDel={() => this.getDelModalHandler(password.id, password.formData.application)}
                                clickedView={() => this.getModalHandler(key)}
                            />
                        </div>
                });
            } 
        }

        
        return (
            <div>
                <Search />
                {this.props.passwords.length
                ? null
                : <p className={classes.Text}>No passwords here...</p>}
                <div className={classes.Grid}>
                    {passwords}
                </div>
                <Modal
                    show={this.state.showModal !== null}
                    modalClosed={() => this.hideModalHandler()}>
                    {modalPass}
                </Modal>
                <Modal
                    show={this.state.showDelModal !== null}
                    modalClosed={() => this.hideDelModalHandler()}>
                    <Message
                        message={"Are you sure you want to delete " + this.state.deleteName + "?"}
                        btnType={"Success"}
                        btnName={"BACK"}
                        back={() => this.hideDelModalHandler()}
                        btnType2={"Danger"}
                        btnName2={"DELETE"}
                        back2={() => this.removeCollection(this.state.showDelModal)}>
                    </Message>
                </Modal>
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

export default connect( mapStateToProps, mapDispatchToProps )( withErrorHandler( Passwords, axios ) );