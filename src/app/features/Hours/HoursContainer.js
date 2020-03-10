import React, { Component } from 'react';
import { connect } from 'react-redux';

import HoursComponent from "./HoursComponent";
import HoursAddComponent from "./HoursAddComponent";
import { fetchAllTypes, fetchAllRecords, addRecord } from "./Hours";
import { Container } from 'semantic-ui-react';


class HoursContainer extends Component {

    componentDidMount() {

        this.props.fetchAllTypes();
        this.props.fetchAllRecords();
    }

    onTableChange = (rowAction, rowId) => {

        //TODO nowa metoda
        this.setState({ selectedId: rowId });

    }

    onSubmit = (object) => {

        this.props.addRecord(object);
    }

    headers = [
        {
            id: "1",
            columnName: "id",
            className: "width20",
            dataField: 'id',
            type: "data"
        },
        {
            id: "2",
            columnName: "date",
            className: "width20",
            dataField: 'date',
            type: "data"
        },
        {
            id: "3",
            columnName: "type",
            className: "width20",
            dataField: 'type',
            type: "data"
        },
        {
            id: "4",
            columnName: "",
            className: "width5",
            dataField: 'name2',
            type: "button",
            action: "edit",
            iconName: "edit outline"
        },
        {
            id: "5",
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
    addRecord: (object) => dispatch(addRecord(object))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HoursContainer);
