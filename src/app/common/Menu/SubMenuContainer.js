import React, { Component } from "react";

import SubMenuComponent from "./SubMenuComponent";
import { setSubMenu } from "../Menu/Menu";


class SubMenuContainer extends Component {

    subMenu = setSubMenu(this.props.data.menuId);

    render() {
        console.log(this.subMenu);
        return (
            <SubMenuComponent
                menu={this.subMenu}

            />
        )
    }
}

export default SubMenuContainer;