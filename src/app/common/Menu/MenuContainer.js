import React, { Component, Fragment } from "react";

import MenuComponent from "./MenuComponent";
import { setMenu } from "../Menu/Menu";
import * as AuthService from '../../utils/AuthService';
import { Redirect } from "react-router-dom";

class MenuContainer extends Component {

    menu = setMenu();

    render() {
        if (!AuthService.isAuthenticated()) {
            return <Redirect push to="/login" />
        }

        return (
            <MenuComponent
                menu={this.menu}
                activeMenuItem={this.props.menuId}
            />

        )
    }
}

export default MenuContainer;
