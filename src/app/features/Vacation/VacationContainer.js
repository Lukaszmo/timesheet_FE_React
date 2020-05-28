import React, { Component } from 'react';
import { connect } from 'react-redux';

import VacApplComponent from "./VacApplComponent";
import { Container } from 'semantic-ui-react';


class VacationContainer extends Component {



    render() {
        console.log(this.props);

        return (
            <Container className="vacation">
                <VacApplComponent user={this.props.user}></VacApplComponent>

            </Container>
        );

    }
}

const mapStateToProps = state => ({
    user: state.user,
})

export default connect(
    mapStateToProps
)(VacationContainer);



