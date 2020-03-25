import React, { Component } from "react";
import { connect } from 'react-redux';

import TableComponent from '../../common/Table/TableComponent.js';
import HoursEditModal from "./HoursEditModal";

class HoursDetailContainer extends Component {

    render() {
        console.log(this.props);

        //renderuj modal warunkowo
        let hoursEditModal;

        if (this.props.open === false) {
            hoursEditModal = null
        } else {
            hoursEditModal = <HoursEditModal
                open={this.props.open}
                recordDetails={this.props.recordDetails}
                closeModal={this.props.closeModal}
                validationSchema={this.props.validationSchema}
                types={this.props.types} />
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
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HoursDetailContainer);
