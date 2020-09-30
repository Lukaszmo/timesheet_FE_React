import React, { Component } from "react";
import { Link } from 'react-router-dom';

import { Icon, Menu, Grid } from 'semantic-ui-react';
import './Menu.css';


export default class MenuComponent extends Component {


    handleItemClick = (e, { name }) => {

        this.props.handleMenuItemClick(name);
    }

    render() {

        const menu = this.props.menu;

        return (

            < Menu fixed="left" className="main-menu" >
                <div className="menu-list">

                    {menu.map((element, index) => {

                        let active = false;
                        if (element.id === this.props.activeMenuItem) { active = true; }

                        return (
                            <Menu.Item
                                as={Link}
                                to={element.redirect}
                                name={element.id}
                                key={index}
                                className="menu-item"
                                active={active}
                                onClick={this.handleItemClick}>
                                <Icon name={element.icon}></Icon>
                                &nbsp;&nbsp; {element.name}
                            </Menu.Item>

                        )
                    })}

                </div>
            </Menu >

        )

    }
}


//export default MenuComponent;