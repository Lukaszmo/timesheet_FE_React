import React, { Component } from "react";
import { Link } from 'react-router-dom';

import { Menu, Grid } from 'semantic-ui-react';
import './Menu.css'


export default class SubMenuComponent extends Component {

    handleItemClick = (e, { name }) => {

        this.props.handleSubMenuItemClick(name);
    }


    render() {

        const menu = this.props.submenu;

        return (

            <Grid>
                <Grid.Column width={2}>
                    < Menu fixed="left" className="submenu" >
                        <div className="submenu-list">
                            {menu.subMenu.map((element, index) => {

                                let active = false;
                                if (element.id === this.props.activeSubMenuItem) { active = true; }

                                return (
                                    < Menu.Item
                                        as={Link}
                                        to={element.redirect}
                                        name={element.id}
                                        key={index}
                                        className="submenu-item"
                                        active={active}
                                        onClick={this.handleItemClick}>
                                        {element.name}
                                    </Menu.Item>
                                )
                            })}
                        </div>
                    </Menu>
                </Grid.Column>
            </Grid>
        )
    }
}