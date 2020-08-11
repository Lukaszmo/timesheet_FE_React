import React, { Component } from "react";

import MenuComponent from "./MenuComponent";
import { setMenu } from "../Menu/Menu";

class MenuContainer extends Component {

    menu = setMenu();

    render() {

        return (
            <MenuComponent
                menu={this.menu}
                activeMenuItem={this.props.menuId}
            />
        )
    }
}

export default MenuContainer;
