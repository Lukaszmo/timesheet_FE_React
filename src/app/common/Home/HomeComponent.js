import React, { Component } from "react";

import { Label, Input, Header, Grid, Container, Segment } from 'semantic-ui-react';
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
                                User Id
                            </Grid.Column >
                            <Grid.Column width={2}>
                                <Input disabled className="disabledInput" placeholder={this.props.user.id} />
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column width={2}>
                                Firstname
                            </Grid.Column >
                            <Grid.Column width={2}>
                                <Input disabled className="disabledInput" placeholder={this.props.user.firstname} />
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column width={2}>
                                Lastname
                            </Grid.Column >
                            <Grid.Column width={2}>
                                <Input disabled className="disabledInput" placeholder={this.props.user.lastname} />
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column width={2}>
                                Position
                            </Grid.Column >
                            <Grid.Column width={2}>
                                <Input disabled className="disabledInput" placeholder={this.props.user.position} />
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column width={2} >
                                Email
                            </Grid.Column>
                            <Grid.Column width={2}>
                                <Input disabled className="disabledInput" placeholder={this.props.user.email} />
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column width={2} >
                                User class
                            </Grid.Column>
                            <Grid.Column width={2}>
                                <Input disabled className="disabledInput" placeholder={this.props.user.userclass} />
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