import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Container } from 'semantic-ui-react';
import HoursDetailsComponent from "./HoursDetailsComponent";
import { updateRecord, HourValidationSchema } from "../Hours/Hours";


class HoursDetailsContainer extends Component {

    onEditFormSubmit = (id, values) => {

        this.props.updateRecord(id, values)

    }


    render() {

        const recordDetails = this.props.location.state.recordDetails

        return (
            <Container className="hours">
                <HoursDetailsComponent types={this.props.hourTypes} validationSchema={HourValidationSchema} recordDetails={recordDetails} onEditFormSubmit={this.onEditFormSubmit} />
            </Container>
        );


    }
}

const mapStateToProps = state => ({
    hourTypes: state.hour.types,
    data: state.hour.records,
    user: state.user,
})

const mapDispatchToProps = dispatch => ({
    updateRecord: (id, values) => dispatch(updateRecord(id, values))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HoursDetailsContainer);



