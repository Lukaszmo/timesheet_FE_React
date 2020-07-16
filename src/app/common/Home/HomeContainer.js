import React, { Component } from "react";
import { connect } from 'react-redux';

import { getLoggedUser } from "../../features/User/User";
import HomeComponent from "./HomeComponent";

class HomeContainer extends Component {

    componentDidMount() {

        this.props.getLoggedUser(this.props.login.userId);
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
    getLoggedUser: (id) => dispatch(getLoggedUser(id))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeContainer);

