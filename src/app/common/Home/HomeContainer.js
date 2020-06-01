import React, { Component } from "react";
import { connect } from 'react-redux';

import { getUserDetails } from "../../features/User/User";
import HomeComponent from "./HomeComponent";

class HomeContainer extends Component {

    componentDidMount() {

        this.props.getUserDetails(this.props.login.userId);
    }

    render() {

        return (
            <HomeComponent
                user={this.props.user}
            />
        )
    }
}

//pobiera stan ze store i przekazuje do komponentu
const mapStateToProps = state => ({
    user: state.user,
    login: state.login
})

const mapDispatchToProps = dispatch => ({
    getUserDetails: (id) => dispatch(getUserDetails(id))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeContainer);

