import React, { Component } from 'react';
import { connect } from 'react-redux';
import history from '../../../history';

import { Container } from 'semantic-ui-react';
import HoursListComponent from "./HoursListComponent";
import { fetchAllRecords, removeRecord } from "../Hours/Hours";
import { fetchInferiors, generateUserListForDropdown } from "../User/User";
import { getFirstDayOfMonth, getLastDayOfMonth } from '../../utils/Utils.js';


class HoursListContainer extends Component {

    state = {
        dateFrom: getFirstDayOfMonth(new Date()),
        dateTo: getLastDayOfMonth(new Date()),
        deleteDisabled: false
    };

    componentDidMount() {

        const filters = {
            dateFrom: this.state.dateFrom,
            dateTo: this.state.dateTo
        }

        this.props.fetchInferiors(this.props.user.id);
        this.props.fetchAllRecords(this.props.user.id, filters);
    }

    onTableChange = (rowAction, rowId) => {

        if (rowAction === 'EDIT') {

            let record = this.props.data.filter(item => item.id === rowId);
            history.push({ pathname: '/czas-pracy-edycja', state: { recordDetails: record } });
        }

        if (rowAction === 'DELETE') {

            this.props.removeRecord(rowId);
        }

    }

    onFilterSubmit = (userid, filters) => {

        this.props.fetchAllRecords(userid, filters);

        if (userid !== this.props.user.id) {
            this.setState({ deleteDisabled: true });
        }
        else { this.setState({ deleteDisabled: false }); }
    }

    render() {
        console.log(this.props.inferiors);
        if (this.props.data) {
            return (
                <Container className="hours">
                    <HoursListComponent
                        data={this.props.data}
                        onTableChange={this.onTableChange}
                        userList={generateUserListForDropdown(this.props.inferiors, this.props.user)}
                        loggedUser={this.props.user}
                        onFilterSubmit={this.onFilterSubmit}
                        dateFrom={this.state.dateFrom}
                        dateTo={this.state.dateTo}
                        deleteDisabled={this.state.deleteDisabled}
                    />
                </Container>
            );
        }
        else return null;
    }
}

const mapStateToProps = state => ({
    data: state.hour.records,
    user: state.user,
    inferiors: state.user.inferiors
})

const mapDispatchToProps = dispatch => ({
    fetchAllRecords: (userid, filters) => dispatch(fetchAllRecords(userid, filters)),
    fetchInferiors: (managerid) => dispatch(fetchInferiors(managerid)),
    removeRecord: (id) => dispatch(removeRecord(id)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HoursListContainer);



