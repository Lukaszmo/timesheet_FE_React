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

        let logo2 = <div className="logo2">iProject</div>

        if (this.props.menuId === 'HOME') {
            logo2 = null;
        }

        return (
            <div className="header-container">
                <div className="logo">Logo</div>

                {logo2}

                HEADER
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


