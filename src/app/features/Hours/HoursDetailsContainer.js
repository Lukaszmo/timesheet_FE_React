import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Container } from 'semantic-ui-react';
import HoursDetailsComponent from "./HoursDetailsComponent";
import { updateRecord, HourValidationSchema } from "../Hours/Hours";
import { getUserDetails } from "../User/User";
import { fetchProjectTasks, generateTasksForDropdown } from "../Admin/Tasks/Tasks";

class HoursDetailsContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            recordDetails: this.props.location.state.recordDetails,
            disabled: false,
            mode: 'EDIT',
            acceptor: null,     //dane kierownika który zaakceptował nadgodziny
            acceptorid: null    //id zalogowanego kierownika akceptującego nadgodziny
        }

    }

    componentDidMount() {

        const recordOwnerId = this.state.recordDetails[0].userid.id;
        const overtAcceptance = this.state.recordDetails[0].overtacceptance;
        const projectId = this.state.recordDetails[0].project.id;

        this.isRecordOwner(recordOwnerId);

        if (overtAcceptance === 1) {
            const acceptorId = this.state.recordDetails[0].acceptorid;
            getUserDetails(acceptorId).then(resp => this.setState({ acceptor: resp.data }));
        }

        fetchProjectTasks(projectId).then(resp => this.setState({ tasks: generateTasksForDropdown(resp.data) }));
    }

    onEditFormSubmit = (id, values, msg) => {

        this.props.updateRecord(id, values, msg)

    }

    onProjectDropdownChange = (projectId) => {

        fetchProjectTasks(projectId).then(resp => this.setState({ tasks: generateTasksForDropdown(resp.data) }));

    }

    isRecordOwner(recordOwnerId) {

        //recordOwnerId = 2; //dla testów

        console.log('isRecordOwner');


        if (this.props.user.id !== recordOwnerId) {

            this.setState({
                disabled: true,
                mode: 'ACCEPTANCE',
                acceptorid: this.props.user.id,
            })
        }
    }


    render() {
        console.log(this.state);
        return (
            <Container className="hours">
                <HoursDetailsComponent
                    types={this.props.hourTypes}
                    validationSchema={HourValidationSchema}
                    recordDetails={this.state.recordDetails}
                    onEditFormSubmit={this.onEditFormSubmit}
                    disabled={this.state.disabled}
                    mode={this.state.mode}
                    acceptor={this.state.acceptor}
                    acceptorid={this.state.acceptorid}
                    projects={this.props.user.projectList}
                    tasks={this.state.tasks}
                    onProjectDropdownChange={this.onProjectDropdownChange} />
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
    updateRecord: (id, values, msg) => dispatch(updateRecord(id, values, msg))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HoursDetailsContainer);



