import React, { Component } from "react";

import { Grid, Segment, Header, Input, Dropdown } from 'semantic-ui-react';
import './HoursComponent.css';



class HoursAddComponent extends Component {

    render() {

        //console.log(this.props.types);
        return (
            <Segment color="teal">
                <Header size='medium'>Test</Header>

                <Grid columns={2} textAlign="right" verticalAlign="middle" >
                    <Grid.Row>
                        <Grid.Column width={2}>
                            Props1
                        </Grid.Column >
                        <Grid.Column width={2}>
                            <Dropdown placeholder="Wybierz.." fluid options={this.props.types} />
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column width={2}>
                            Props2
                            </Grid.Column >
                        <Grid.Column width={2}>
                            <Input />
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column width={2}>
                            Props3
                            </Grid.Column >
                        <Grid.Column width={2}>
                            <Input />
                        </Grid.Column>
                    </Grid.Row>

                </Grid>

            </Segment>
        )
    }
}

export default HoursAddComponent;