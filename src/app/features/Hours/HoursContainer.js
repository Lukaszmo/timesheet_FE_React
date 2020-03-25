import React, { Component } from 'react';
import { connect } from 'react-redux';

import HoursAddComponent from "./HoursAddComponent";
import HoursDetailContainer from "./HoursDetailContainer";
import { fetchAllTypes, fetchAllRecords, addRecord, removeRecord, updateHourList, HourValidationSchema } from "./Hours";
import { Container } from 'semantic-ui-react';

class HoursContainer extends Component {

    state = { modalOpen: false }

    componentDidMount() {

        this.props.fetchAllTypes();
        this.props.fetchAllRecords();
    }

    onTableChange = (rowAction, rowId) => {
        //console.log(rowAction, rowId);

        if (rowAction === 'EDIT') {

            this.setState({ selectedId: rowId });
            this.setState({ modalOpen: true });

            let record = this.props.data.filter(item => item.id === rowId);
            this.setState({ recordDetails: record });
        }

        if (rowAction === 'DELETE') {

            this.props.removeRecord(rowId);
            let filteredArray = this.props.data.filter(item => item.id !== rowId)
            this.props.updateHourList(filteredArray);
        }

    }

    onSubmit = (object) => {

        this.props.addRecord(object);

    }

    closeModal = () => {
        this.setState({ modalOpen: false });
    }

    headers = [
        {
            id: "1",
            columnName: "data",
            className: "width10",
            dataField: 'date',
            type: "data"
        },
        {
            id: "2",
            columnName: "typ",
            className: "width10",
            dataField: 'type',
            type: "data"
        },
        {
            id: "3",
            columnName: "ilość godzin",
            className: "width5",
            dataField: 'quantity',
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
        //console.log(this.props);

        return (
            <Container className="hours">
                <HoursAddComponent types={this.props.hourTypes} onSubmit={this.onSubmit} validationSchema={HourValidationSchema} />
                <HoursDetailContainer
                    headers={this.headers}
                    data={this.props.data}
                    onTableChange={this.onTableChange}
                    open={this.state.modalOpen}
                    types={this.props.hourTypes}
                    recordDetails={this.state.recordDetails}
                    validationSchema={HourValidationSchema}
                    closeModal={this.closeModal} />
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
