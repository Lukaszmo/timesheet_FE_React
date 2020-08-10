import React, { Component } from "react";
import { Link } from 'react-router-dom';

import { Icon, Menu } from 'semantic-ui-react';
import './Menu.css';


export default class MenuComponent extends Component {

    /*constructor(props) {
        super(props);

        this.state = {
            activeItem: 'HOME'
        }
    } */

    handleItemClick = (e, { name }) => {

        this.props.handleMenuItemClick(name);
    }

    render() {


        const menu = this.props.menu;

        console.log(this.props.activeMenuItem);

        return (

            <div className="main-menu" >
                <div className="logo">Logo</div>

                <div className="menu-list">

                    {menu.map((element, index) => {

                        const id = element.id;
                        const activeItem = this.props.activeMenuItem;
                        let active = false;

                        if (id === activeItem) { active = true; }

                        return (
                            <Menu.Item
                                as={Link}
                                to={element.redirect}
                                name={element.id}
                                key={index}
                                className="menu-item"
                                //active={activeItem === { id }}
                                active={active}
                                onClick={this.handleItemClick}>
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