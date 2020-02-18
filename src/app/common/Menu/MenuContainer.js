import React, { Component } from "react";
//import { connect } from 'react-redux';

import MenuComponent from "./MenuComponent";
import { setMenu } from "../Menu/Menu";

class MenuContainer extends Component {

    menu = setMenu();

    render() {
        return (
            <MenuComponent
                menu={this.menu}
            />
        )
    }
}

export default MenuContainer;
