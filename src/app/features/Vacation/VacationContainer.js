import React, { Component } from 'react';
import { connect } from 'react-redux';

import VacApplComponent from "./VacApplComponent";
import { Container } from 'semantic-ui-react';
import { addHolidayRequest, validationSchema, fetchVacRequestTypes } from "./Vacation";


class VacationContainer extends Component {

    componentDidMount() {

        this.props.fetchVacRequestTypes();
    }

    onSubmit = (object) => {

        object = { ...object, userid: this.props.user.id, state: 1 }; //status: 1 - wniosek utworzony
        addHolidayRequest(object);

    }

    render() {

        return (
            <Container className="vacation">
                <VacApplComponent types={this.props.types} user={this.props.user} onSubmit={this.onSubmit} validationSchema={validationSchema}></VacApplComponent>

            </Container>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user,
    types: state.vacation.types,
})

const mapDispatchToProps = dispatch => ({
    fetchVacRequestTypes: () => dispatch(fetchVacRequestTypes()),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(VacationContainer);



