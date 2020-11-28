import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';
import UserListComponent from './UserListComponent';
import history from '../../../../history';

import { getAllUsers } from '../Users/User';


class UserListContainer extends Component {

    state = {

    }


    componentDidMount() {

        getAllUsers().then(resp => this.setState({ userList: resp }));

    }

    onTableChange = (rowAction, rowId) => {

        let record = this.state.userList.filter(item => item.id === rowId);
        history.push({ pathname: '/panel-admina/uzytkownicy-edycja', state: { recordDetails: record } });
    }

    render() {

        console.log(this.props);

        return (
            <Container className=''>
                <UserListComponent
                    data={this.state.userList}
                    onTableChange={this.onTableChange}

                >
                </UserListComponent>

            </Container>
        );
    }
}

export default UserListContainer;



