import React, { Component, Fragment } from "react";

import MenuComponent from "./MenuComponent";
import { setMenu } from "../Menu/Menu";
import * as AuthService from '../../utils/AuthService';
import { Redirect } from "react-router-dom";
import Media from 'react-media';

class MenuContainer extends Component {

    menu = setMenu();

    render() {
        if (!AuthService.isAuthenticated()) {
            return <Redirect push to="/login" />
        }

        return (

            <Media queries={{
                small: "(max-width: 599px)",    //mobile
                medium: "(min-width: 600px) and (max-width: 1199px)",   //tablet
                large: "(min-width: 1200px)"    //laptop
            }}>
                {matches => (
                    <Fragment>
                        {(matches.large || matches.medium) &&
                            <MenuComponent
                                menu={this.menu}
                                activeMenuItem={this.props.menuId}
                            />}

                        {(matches.small) && (this.props.open === true) &&
                            //na urządzeniach mobilnych menu wyświetlamy tylko gdy użytkownik kliknął hamburgera
                            <MenuComponent
                                menu={this.menu}
                                activeMenuItem={this.props.menuId}
                            />}
                    </Fragment>
                )}
            </Media>
        )
    }
}

export default MenuContainer;
