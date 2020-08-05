import React, { Component } from "react";
import { Icon } from 'semantic-ui-react';

import history from '../../../history';

import './Header.css';

class Header extends Component {

    logoutOperation = () => {
        localStorage.clear();
        history.push('/login');
    }

    render() {
        return (
            <div className="header-container">
                Header

                <div className="logout" onClick={this.logoutOperation}>

                    <Icon name='power off'></Icon><br></br>
                    <p>Wyloguj</p>

                </div>

            </div>
        )
    }
}

export default Header;


