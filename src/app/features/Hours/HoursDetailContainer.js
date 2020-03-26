import React, { Component } from "react";
import { connect } from 'react-redux';

import TableComponent from '../../common/Table/TableComponent.js';
import HoursEditModal from "./HoursEditModal";
import { updateRecord } from "./Hours";

class HoursDetailContainer extends Component {

    onEditFormSubmit = (id, values) => {

        this.props.updateRecord(id, values);
    }

    render() {
        //  console.log(this.props);

        let hoursEditModal;

        //renderuj modal warunkowo
        if (this.props.open === false) {
            hoursEditModal = null
        } else {
            hoursEditModal = <HoursEditModal
                open={this.props.open}
                recordDetails={this.props.recordDetails}
                closeModal={this.props.closeModal}
                validationSchema={this.props.validationSchema}
                types={this.props.types}
                onEditFormSubmit={this.onEditFormSubmit} />
        }

        return (
            <div>
                <TableComponent headers={this.props.headers} data={this.props.data} onTableChange={this.props.onTableChange} rowsPerPage={5} />
                {hoursEditModal}
            </div>
        )
    }
}

//pobiera stan ze store i przekazuje do propsów komponentu
const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
    updateRecord: (id, values) => dispatch(updateRecord(id, values))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HoursDetailContainer);
