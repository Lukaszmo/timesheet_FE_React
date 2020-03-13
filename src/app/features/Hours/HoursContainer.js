import React, { Component } from 'react';
import { connect } from 'react-redux';

import HoursComponent from "./HoursComponent";
import HoursAddComponent from "./HoursAddComponent";
import { fetchAllTypes, fetchAllRecords, addRecord, removeRecord, updateHourList } from "./Hours";
import { Container } from 'semantic-ui-react';

class HoursContainer extends Component {

    componentDidMount() {

        this.props.fetchAllTypes();
        this.props.fetchAllRecords();
    }

    onTableChange = (rowAction, rowId) => {

        this.setState({ selectedId: rowId });
        console.log(rowAction, rowId);

        if (rowAction === 'DELETE') {

            this.props.removeRecord(rowId);
            let filteredArray = this.props.data.filter(item => item.id !== rowId)
            this.props.updateHourList(filteredArray);
        }

    }

    onSubmit = (object) => {

        this.props.addRecord(object);

    }

    headers = [
        {
            id: "1",
            columnName: "data",
            className: "width20",
            dataField: 'date',
            type: "data"
        },
        {
            id: "2",
            columnName: "rodzaj",
            className: "width20",
            dataField: 'type',
            type: "data"
        },
        {
            id: "3",
            columnName: "",
            className: "width5",
            dataField: 'name2',
            type: "button",
            action: "edit",
            iconName: "edit outline"
        },
        {
            id: "4",
            columnName: "",
            className: "width5",
            dataField: 'name2',
            type: "button",
            action: "delete",
            iconName: "trash alternate"
        }
    ]

    render() {
        console.log(this.props);

        return (
            <Container className="hours">
                <HoursAddComponent types={this.props.hourTypes} onSubmit={this.onSubmit} />
                <HoursComponent headers={this.headers} data={this.props.data} onTableChange={this.onTableChange} />
            </Container>
        );
    }
}

//pobiera stan ze store i przekazuje do propsów komponentu
const mapStateToProps = state => ({
    hourTypes: state.hour.types,
    data: state.hour.records,
})

const mapDispatchToProps = dispatch => ({
    fetchAllTypes: () => dispatch(fetchAllTypes()),
    fetchAllRecords: () => dispatch(fetchAllRecords()),
    addRecord: (object) => dispatch(addRecord(object)),
    removeRecord: (id) => dispatch(removeRecord(id)),
    updateHourList: (records) => dispatch(updateHourList(records))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HoursContainer);
