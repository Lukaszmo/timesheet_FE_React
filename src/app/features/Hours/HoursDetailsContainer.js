import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Container } from 'semantic-ui-react';
import HoursDetailsComponent from "./HoursDetailsComponent";
import { updateRecord, HourValidationSchema } from "../Hours/Hours";


class HoursDetailsContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            recordDetails: this.props.location.state.recordDetails,
            disabled: false,
            mode: 'edit'
        }

    }

    componentDidMount() {

        const recordOwnerId = this.state.recordDetails[0].userid.id;
        this.isRecordOwner(recordOwnerId);
    }

    onEditFormSubmit = (id, values) => {

        this.props.updateRecord(id, values)

    }

    isRecordOwner(recordOwnerId) {

        recordOwnerId = 2; //dla testów
        if (this.props.user.id !== recordOwnerId) {
            this.setState({ disabled: true, mode: 'acceptance' })
        }
    }


    render() {

        return (
            <Container className="hours">
                <HoursDetailsComponent types={this.props.hourTypes} validationSchema={HourValidationSchema} recordDetails={this.state.recordDetails} onEditFormSubmit={this.onEditFormSubmit} disabled={this.state.disabled} mode={this.state.mode} />
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



