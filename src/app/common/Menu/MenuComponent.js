import React, { Component } from "react";
import { Link } from 'react-router-dom';

import { Icon, Menu } from 'semantic-ui-react';
import './Menu.css';


export default class MenuComponent extends Component {

    render() {

        const menu = this.props.menu;

        return (

            <div className="main-menu" >
                <div className="logo">Logo</div>

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
                                active={active}>
                                <Icon name={element.icon}></Icon>
                                &nbsp;&nbsp; {element.name}
                            </Menu.Item>

                        )
                    })}

                </div>

            </div >
        )
    }
}


//export default MenuComponent;