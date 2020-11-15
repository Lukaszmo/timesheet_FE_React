import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';
import UsersComponent from './UsersComponent';




class UsersContainer extends Component {




    render() {

        console.log(this.props);

        return (
            <Container className='reports'>
                <UsersComponent>

                </UsersComponent>
            </Container>
        );
    }
}

export default UsersContainer;



