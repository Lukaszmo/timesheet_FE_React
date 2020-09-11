import React, { Component } from 'react';
import { connect } from 'react-redux';


import { Container } from 'semantic-ui-react';
import VacationListComponent from "./VacationListComponent";
import { fetchAllRecords } from "../Vacation/Vacation";
import { fetchInferiors, generateUserListForDropdown } from "../User/User";
import { getFirstDayOfMonth, getLastDayOfMonth } from '../../utils/Utils.js';


class VacationListContainer extends Component {

    state = {
        dateFrom: getFirstDayOfMonth(new Date()),
        dateTo: getLastDayOfMonth(new Date())
    };

    componentDidMount() {

        const filters = {
            dateFrom: this.state.dateFrom,
            dateTo: this.state.dateTo
        }

        this.props.fetchInferiors(this.props.user.id);
        this.props.fetchAllRecords(this.props.user.id, filters);
    }

    filterData(data) {

        const filteredData = data.map(function (object) {

            object = { ...object, employeeFullname: object.user.firstname + ' ' + object.user.lastname }
            return object;
        })

        return filteredData;
    }

    onFilterSubmit = (userid, filters) => {

        this.props.fetchAllRecords(userid, filters);
    }

    render() {

        if (this.props.requests) {
            return (
                <Container className="vacation">
                    <VacationListComponent
                        data={this.filterData(this.props.requests)}
                        loggedUser={this.props.user}
                        userList={generateUserListForDropdown(this.props.inferiors, this.props.user)}
                        onFilterSubmit={this.onFilterSubmit}
                        dateFrom={this.state.dateFrom}
                        dateTo={this.state.dateTo}
                    />
                </Container >
            );
        }
        else return null;
    }
}

const mapStateToProps = state => ({
    user: state.user,
    requests: state.vacation.records,
    inferiors: state.user.inferiors
})

const mapDispatchToProps = dispatch => ({
    fetchAllRecords: (id, filters) => dispatch(fetchAllRecords(id, filters)),
    fetchInferiors: (managerid) => dispatch(fetchInferiors(managerid))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(VacationListContainer);



