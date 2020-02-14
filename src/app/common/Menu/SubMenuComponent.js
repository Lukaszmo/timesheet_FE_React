import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Dropdown } from 'semantic-ui-react';

import './Menu.css'

const SubMenuComponent = ({ menu }) => {

    return (

        <div className="submenu">
            <div className="submenu-list">
                {menu.subMenu.map((element, index) => {
                    return (
                        <Link to={element.redirect} key={index} className="submenu-item">{element.name}</Link>
                    )
                })}
            </div>
        </div>

    )

}

export default SubMenuComponent;