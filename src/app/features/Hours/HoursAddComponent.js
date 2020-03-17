import React, { Component } from "react";

import { Formik } from 'formik';
import { Grid, Segment, Header, Input, Dropdown, Button, Form } from 'semantic-ui-react';
import './HoursComponent.css';



class HoursAddComponent extends Component {

    state = {}

    onSubmit(values) {

        const type = this.state.type;
        const object = {
            ...values,
            type
        };

        this.props.onSubmit(object);
    }

    dropdownHandleChange = (e, data) => {

        this.setState({ type: data.value });

    }

    render() {

        //console.log(this.props.types);
        return (

            <Segment color="teal">
                <Header size='medium'>Rejestracja czasu</Header>
                <Formik
                    initialValues={{ date: '', quantity: '' }}

                    onSubmit={(values, { setSubmitting }) => {
                        this.onSubmit(values);
                        setSubmitting(false);
                    }}

                >
                    {({
                        values,
                        handleSubmit,
                        handleChange

                    }) => (
                            <Form onSubmit={handleSubmit}>
                                <Grid columns={2} textAlign="right" verticalAlign="middle" >
                                    <Grid.Row>
                                        <Grid.Column width={2}>
                                            Typ
                                        </Grid.Column >
                                        <Grid.Column width={2}>
                                            <Dropdown fluid
                                                name='type'
                                                placeholder="Wybierz.."
                                                value={this.state.type}
                                                onChange={(e, data) => this.dropdownHandleChange(e, data)}
                                                options={this.props.types} />
                                        </Grid.Column>
                                    </Grid.Row>

                                    <Grid.Row>
                                        <Grid.Column width={2}>
                                            Data
                                        </Grid.Column >
                                        <Grid.Column width={2}>
                                            <Input
                                                type='date'
                                                name='date'
                                                value={values.date}
                                                onChange={handleChange} />
                                        </Grid.Column>
                                    </Grid.Row>

                                    <Grid.Row>
                                        <Grid.Column width={2}>
                                            Ilość godzin
                                        </Grid.Column >
                                        <Grid.Column width={2}>
                                            <Input
                                                type='number'
                                                name='quantity'
                                                value={values.quantity}
                                                onChange={handleChange} />
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>

                                <Button
                                    type='submit'
                                    className='addButton'
                                    color='teal'>
                                    {/*onClick={this.props.onButtonClick}>*/}
                                    Dodaj rekord
                                </Button>
                            </Form>
                        )}
                </Formik>
            </Segment>

        )
    }
}

export default HoursAddComponent;