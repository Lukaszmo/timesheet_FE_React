import React, { Component } from 'react';
import { connect } from 'react-redux';


import { Container } from 'semantic-ui-react';
import VacationListComponent from "./VacationListComponent";



class VacationListContainer extends Component {



    render() {
        console.log(this.props);

        return (
            <Container className="vacation">
                <VacationListComponent ></VacationListComponent>

            </Container>
        );

    }
}



/*export default connect(
    mapStateToProps
)(VacationListContainer); */


export default VacationListContainer;



