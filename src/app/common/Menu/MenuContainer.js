import React, { Component } from "react";
import { connect } from 'react-redux';

import MenuComponent from "./MenuComponent";
import { setMenu, setActiveMenuItemId } from "../Menu/Menu";

class MenuContainer extends Component {

    handleMenuItemClick = (menuItemId) => {

        this.props.setActiveMenuItemId(menuItemId);
    }

    menu = setMenu();

    render() {

        console.log(this.props.menu.activeMenuItem);
        return (
            <MenuComponent
                menu={this.menu}
                handleMenuItemClick={this.handleMenuItemClick}
                activeMenuItem={this.props.menu.activeMenuItem}
            />
        )
    }
}

const mapStateToProps = state => ({
    menu: state.menu
})

const mapDispatchToProps = dispatch => ({
    setActiveMenuItemId: (id) => dispatch(setActiveMenuItemId(id))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MenuContainer);
