import React, { Component } from "react";

import { Input, Header, Grid, Container, Segment, Label } from 'semantic-ui-react';
import './HomeComponent.css';
import '../../../index.css';


class HomeComponent extends Component {

    render() {
        return (

            <Container className="userDetails">
                <Segment color="teal">
                    <Header size='medium'>Dane użytkownika</Header>
                    <Grid columns={2} textAlign="right" verticalAlign="middle" >
                        <Grid.Row>
                            <Grid.Column width={2}>
                                <p className='data-field-header'>Id</p>
                            </Grid.Column >
                            <Grid.Column width={2}>
                                <p className='data-field'>{this.props.user.id}</p>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column width={2}>
                                <p className='data-field-header'>Imię i nazwisko</p>
                            </Grid.Column >
                            <Grid.Column width={2}>
                                <p className='data-field'>{this.props.user.firstname} {this.props.user.lastname} </p>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column width={2}>
                                <p className='data-field-header'>Stanowisko/Dział</p>
                            </Grid.Column >
                            <Grid.Column width={2}>
                                <p className='data-field'>{this.props.user.position} </p>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column width={2} >
                                <p className='data-field-header'>Email</p>
                            </Grid.Column>
                            <Grid.Column width={2}>
                                <p className='data-field'>{this.props.user.email} </p>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column width={2} >
                                <p className='data-field-header'>Klasa użytkownika</p>
                            </Grid.Column>
                            <Grid.Column width={2}>
                                <p className='data-field'>{this.props.user.userclass} </p>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
            </Container>
        )
    }
}
// <Content content={this.props.content} /> content przekazywany w App.js*
export default HomeComponent;