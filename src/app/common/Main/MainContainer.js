import React, { Component } from "react";
import { connect } from 'react-redux';

import MainComponent from "./MainComponent";
import { setMenuOpenFlag } from "../Menu/Menu";

class MainContainer extends Component {

    setOpen = () => {

        let isOpen = (this.props.open === true) ? false : true;
        this.props.setMenuOpenFlag(isOpen);
    }

    render() {

        return (
            <MainComponent
                open={this.props.open}
                setOpen={this.setOpen}
                {...this.props}
            />
        )
    }
}

const mapStateToProps = state => ({
    open: state.menu.open
})

const mapDispatchToProps = dispatch => ({
    setMenuOpenFlag: (isOpen) => dispatch(setMenuOpenFlag(isOpen))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainContainer);

