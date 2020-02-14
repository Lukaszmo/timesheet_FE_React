import React, { Component } from "react";

import MainComponent from "./MainComponent";

class MainContainer extends Component {

    render() {
        return (
            <MainComponent
                {...this.props}
            />
        )
    }
}

export default MainContainer;

