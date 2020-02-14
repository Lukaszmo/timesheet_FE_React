import React, { Component } from "react";
import { Link } from 'react-router-dom';

import { Button, Icon, Image } from 'semantic-ui-react';


import './Header.css';

class Header extends Component {

    logoutOperation = () => {
        localStorage.clear();
    }

    render() {
        return (
            <div className="header-container">
                Header

                <div className="logout">
                    <Link to="/login" onClick={this.logoutOperation} id="logout-link">Logout</Link>
                </div>

            </div>
        )
    }
}

export default Header;


