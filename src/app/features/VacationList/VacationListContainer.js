import React, { Component } from 'react';
import { connect } from 'react-redux';


import { Container } from 'semantic-ui-react';
import VacationListComponent from "./VacationListComponent";
import { fetchAllRecords } from "../Vacation/Vacation";


class VacationListContainer extends Component {

    componentDidMount() {

        this.props.fetchAllRecords(this.props.user.id);
    }

    filterData(data) {

        const filteredData = data.map(function (object) {

            object = { ...object, employeeFullname: object.userid.firstname + ' ' + object.userid.lastname }
            return object;
        })

        return filteredData;
    }

    render() {

        if (this.props.requests) {
            return (
                <Container className="vacation">
                    <VacationListComponent data={this.filterData(this.props.requests)}></VacationListComponent>

                </Container>
            );
        }
        else return null;
    }
}

const mapStateToProps = state => ({
    user: state.user,
    requests: state.vacation.records,
})

const mapDispatchToProps = dispatch => ({
    fetchAllRecords: (id) => dispatch(fetchAllRecords(id)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(VacationListContainer);



