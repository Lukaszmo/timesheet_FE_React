import React, { Component } from 'react';
import { connect } from 'react-redux';
import history from '../../../history';

import { Container } from 'semantic-ui-react';
import HoursListComponent from "./HoursListComponent";
import { fetchAllRecords, removeRecord } from "../Hours/Hours";


class HoursListContainer extends Component {

    componentDidMount() {

        this.props.fetchAllRecords(this.props.user.id);
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

    render() {

        if (this.props.data) {
            return (
                <Container className="hours">
                    <HoursListComponent data={this.props.data} onTableChange={this.onTableChange} />
                </Container>
            );
        }
        else return null;
    }
}

const mapStateToProps = state => ({
    data: state.hour.records,
    user: state.user,
})

const mapDispatchToProps = dispatch => ({
    fetchAllRecords: (userid) => dispatch(fetchAllRecords(userid)),
    removeRecord: (id) => dispatch(removeRecord(id)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HoursListContainer);



