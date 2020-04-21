import React, { Component } from 'react';
import { connect } from 'react-redux';

import HoursAddComponent from "./HoursAddComponent";
import TableComponent from '../../common/Table/TableComponent.js';
import HoursEditModal from "./HoursEditModal";
import { fetchAllTypes, fetchAllRecords, addRecord, updateRecord, removeRecord, HourValidationSchema } from "./Hours";
import { Container } from 'semantic-ui-react';

class HoursContainer extends Component {

    state = { modalOpen: false }

    componentDidMount() {

        this.props.fetchAllTypes();
        this.props.fetchAllRecords();
    }

    onTableChange = (rowAction, rowId) => {

        if (rowAction === 'EDIT') {

            this.setState({ modalOpen: true });

            let record = this.props.data.filter(item => item.id === rowId);
            this.setState({ recordDetails: record });
        }

        if (rowAction === 'DELETE') {

            this.props.removeRecord(rowId);
        }

    }

    onSubmit = (object) => {

        this.props.addRecord(object);

    }

    onEditFormSubmit = (id, values) => {

        this.props.updateRecord(id, values)
            .then(() => this.closeModal());
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
            className: "width20",
            dataField: 'type',
            subField: 'description',
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

        let hoursEditModal;

        //renderuj modal w trybie edycji
        if (this.state.modalOpen === false) {
            hoursEditModal = null
        } else {
            hoursEditModal = <HoursEditModal
                open={this.state.modalOpen}
                recordDetails={this.state.recordDetails}
                closeModal={this.closeModal}
                validationSchema={HourValidationSchema}
                types={this.props.hourTypes}
                onEditFormSubmit={this.onEditFormSubmit} />
        }

        return (
            <Container className="hours">
                <HoursAddComponent types={this.props.hourTypes} onSubmit={this.onSubmit} validationSchema={HourValidationSchema} />
                <TableComponent headers={this.headers} data={this.props.data} onTableChange={this.onTableChange} rowsPerPage={5} />
                {hoursEditModal}
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
    updateRecord: (id, values) => dispatch(updateRecord(id, values))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HoursContainer);
