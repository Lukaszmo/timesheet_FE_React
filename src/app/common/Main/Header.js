import React, { Component } from "react";
import { Icon } from 'semantic-ui-react';

import { connect } from 'react-redux';
import { userLogoutOperation } from '../../features/Login/Login';

import './Header.css';

class Header extends Component {

    logoutOperation = () => {

        this.props.userLogoutOperation(); // teraz to jest w Login.js być może trzeba przenieść do Logout?
    }

    render() {
        return (
            <div className="header-container">
                iProject
                <div className="logout" onClick={this.logoutOperation}>

                    <Icon name='power off'></Icon><br></br>
                    <p>Wyloguj</p>

                </div>

            </div>
        )
    }
}


const mapStateToProps = state => ({
    // userLogoutOperation: state.login.userLogoutOperation
})

//mapuje akcje na propsy, podajemy nazwy funkcji, które komponent bedzie mógł wywoływać, aby zlecić zmianę danych w store
const mapDispatchToProps = dispatch => ({
    userLogoutOperation: () => dispatch(userLogoutOperation())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);


