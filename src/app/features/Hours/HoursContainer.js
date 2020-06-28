import React, { Component } from 'react';
import { connect } from 'react-redux';

import HoursAddComponent from "./HoursAddComponent";
import { fetchAllTypes, addRecord, HourValidationSchema } from "./Hours";
import { Container } from 'semantic-ui-react';

class HoursContainer extends Component {

    componentDidMount() {

        this.props.fetchAllTypes();
    }

    onSubmit = (object) => {

        this.props.addRecord(object, this.props.user.id);
    }

    render() {

        return (
            <Container className="hours">
                <HoursAddComponent types={this.props.hourTypes} onSubmit={this.onSubmit} validationSchema={HourValidationSchema} />
            </Container>
        );
    }
}

//pobiera stan ze store i przekazuje do propsów komponentu
const mapStateToProps = state => ({
    hourTypes: state.hour.types,
    user: state.user,
})

const mapDispatchToProps = dispatch => ({
    fetchAllTypes: () => dispatch(fetchAllTypes()),
    addRecord: (object, id) => dispatch(addRecord(object, id))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HoursContainer);
