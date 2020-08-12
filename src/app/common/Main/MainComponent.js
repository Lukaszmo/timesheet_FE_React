import React, { Component } from "react";

import MenuContainer from "../Menu/MenuContainer";
import SubMenuContainer from "../Menu/SubMenuContainer";
import './Main.css'
import Header from "./Header";
//import Footer from "./Footer";
//import Content from "./Content/Content";

class MainComponent extends Component {


    render() {

        const menuId = this.props.menuId;

        let subMenu = <SubMenuContainer data={this.props} submenuId={this.props.submenuId}></SubMenuContainer>

        if (menuId === 'HOME') {

            subMenu = null;
        }

        return (
            <div className="main-container">
                <Header menuId={menuId} />
                <MenuContainer menuId={this.props.menuId} />

                {/* <Content content={this.props.content} /> content przekazywany w App.js*/}

                {subMenu}
                {this.props.content}

                {/*<Footer /> */}
            </div>
        )
    }
}

export default MainComponent;