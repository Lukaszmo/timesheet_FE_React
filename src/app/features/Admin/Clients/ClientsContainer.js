import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';
import ClientCreateComponent from './ClientCreateComponent';
import { addRecord } from '../Clients/Client';

class ClientsContainer extends Component {

    addClient = (values) => {

        this.props.addRecord(values);
    }

    render() {

        return (
            <Container className='clients'>
                <ClientCreateComponent
                    onSubmit={this.addClient}
                />
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    data: state.client.records
})

const mapDispatchToProps = dispatch => ({
    addRecord: (object) => dispatch(addRecord(object))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ClientsContainer);



