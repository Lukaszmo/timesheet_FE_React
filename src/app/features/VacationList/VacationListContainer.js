import React, { Component } from 'react';
import { connect } from 'react-redux';


import { Container } from 'semantic-ui-react';
import VacationListComponent from "./VacationListComponent";
import { fetchAllRecords } from "../Vacation/Vacation";



class VacationListContainer extends Component {

    componentDidMount() {

        this.props.fetchAllRecords(this.props.user.id);
    }


    render() {

        return (
            <Container className="vacation">
                <VacationListComponent data={this.props.requests}></VacationListComponent>

            </Container>
        );

    }
}



const mapStateToProps = state => ({
    user: state.user,
    requests: state.vacation.records,
})

const mapDispatchToProps = dispatch => ({
    fetchAllRecords: (id) => dispatch(fetchAllRecords(id)),
})


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(VacationListContainer);



