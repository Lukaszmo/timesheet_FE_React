import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';
import history from '../../../../history';

import { getRoleAccessList } from '../Authorization/RoleAccess';
import AuthorizationListComponent from './AuthorizationListComponent';


class AuthorizationListContainer extends Component {

    componentDidMount() {

        this.props.getRoleAccessList();
    }

    onTableChange = (rowAction, rowId) => {

        /*   if (rowAction === 'EDIT') {
               let record = this.props.data.filter(item => item.id === rowId);
               history.push({ pathname: '/panel-admina/autoryzacja-edycja', state: { recordDetails: record } });
           }
   
           if (rowAction === 'DELETE') {
   
               this.props.removeRecord(rowId);
           } */
    }

    render() {

        if (this.props.data) {
            return (
                <Container className=''>
                    <AuthorizationListComponent
                        data={this.props.data}
                        onTableChange={this.onTableChange}
                    />
                </Container>
            );
        }
        else return null;
    }
}

const mapStateToProps = state => ({
    data: state.roleAccessList.records
})

const mapDispatchToProps = dispatch => ({
    getRoleAccessList: () => dispatch(getRoleAccessList()),
    //  removeRecord: (id) => dispatch(removeRecord(id))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthorizationListContainer);



