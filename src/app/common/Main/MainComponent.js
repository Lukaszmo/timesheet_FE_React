import React, { Component } from "react";

import MenuContainer from "../Menu/MenuContainer";
import SubMenuContainer from "../Menu/SubMenuContainer";
import './Main.css'
import Header from "./Header";
//import Footer from "./Footer";
//import Content from "./Content/Content";

class MainComponent extends Component {


    render() {


        return (
            <div className="main-container">
                <MenuContainer menuId={this.props.menuId} />



                <Header />
                {/* <Content content={this.props.content} /> content przekazywany w App.js*/}

                <SubMenuContainer data={this.props} submenuId={this.props.submenuId}></SubMenuContainer>
                {this.props.content}

                {/*<Footer /> */}
            </div>
        )
    }
}

export default MainComponent;