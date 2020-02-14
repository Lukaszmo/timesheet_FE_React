import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Dropdown } from 'semantic-ui-react';

import './Menu.css';

const MenuComponent = ({ menu }) => {

    console.log(menu);
    return (

        <div className="main-menu">
            <div className="logo">Logo</div>
            <div className="menu-list">
                {menu.map((element, index) => {
                    return (
                        <Link to={element.redirect} key={index} className="menu-item">{element.name}</Link>
                    )
                })}
            </div>
        </div>
    )
}


export default MenuComponent;