import React, { Component } from 'react';
import { connect } from 'react-redux';

import LoginComponent from "./LoginComponent";
import { userLoginOperation } from './Login';


class LoginContainer extends Component {

    loginOperation = (login, password) => {

        const user = {
            login: login,
            password: password
        }
        this.props.userLoginOperation(user);
    }

    render() {
        //if isAuthenticated redirect to home

        return (

            <LoginComponent login={this.loginOperation} />
        );
    }
}


//pobiera stan ze store i przekazuje do komponentu
const mapStateToProps = state => ({
    loginFailureCounter: state.login.loginFailureCounter
})

//mapuje akcje na propsy, podajemy nazwy funkcji, które komponent bedzie mógł wywoływać, aby zlecić zmianę danych w store
const mapDispatchToProps = dispatch => ({
    userLoginOperation: (user) => dispatch(userLoginOperation(user))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginContainer);