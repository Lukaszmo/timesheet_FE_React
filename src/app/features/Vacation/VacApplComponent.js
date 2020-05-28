import React, { Component } from "react";

import { Formik } from 'formik';
import { Grid, Segment, Header, Input, Dropdown, Button, Form, TextArea } from 'semantic-ui-react';
import CustomLabel from '../../common/CustomLabel/CustomLabel';
import './VacApplComponent.css';

class VacApplComponent extends Component {


    //do testów
    options = [
        { key: 1, text: "Urlop wypoczynkowy", value: "TYPE1" },
        { key: 2, text: "Urlop na żądanie", value: "TYPE2" },
        { key: 3, text: "Urlop okolicznościowy", value: "TYPE3" },

    ]


    render() {

        return (
            <Segment color="teal">
                <Header size='medium'>Nowy wniosek</Header>
                <Formik
                    initialValues={{ date: '', quantity: '', type: '' }}

                    //validationSchema={this.props.validationSchema}

                    onSubmit={(values, { setSubmitting }) => {
                        this.onSubmit(values);
                        setSubmitting(false);
                    }}>

                    {({
                        values,
                        handleSubmit,
                        handleChange,
                        setFieldValue,
                        errors,
                        touched
                    }) => (
                            <Form onSubmit={handleSubmit}>
                                <Grid columns={2} textAlign="right" verticalAlign="middle" >
                                    <Grid.Row>
                                        <Grid.Column width={2}>
                                            <p className='data-field-header'>Imię i nazwisko</p>
                                        </Grid.Column >
                                        <Grid.Column width={2}>
                                            <p className='data-field'>{this.props.user.firstname} {this.props.user.lastname}</p>
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Grid.Column width={2}>
                                            <p className='data-field-header'>Stanowisko/Dział</p>
                                        </Grid.Column >
                                        <Grid.Column width={2}>
                                            <p className='data-field'>{this.props.user.position}</p>
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Grid.Column width={2}>
                                            <p className='data-field-header'>Rodzaj wniosku</p>
                                        </Grid.Column >
                                        <Grid.Column width={2}>
                                            <Dropdown fluid selection
                                                name='type'
                                                className='dropdown-vacation-types'
                                                placeholder="Wybierz.."
                                                value={values.type}
                                                //   onChange={(e, data) => this.dropdownHandleChange(e, data, setFieldValue)}
                                                options={this.options} />

                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Grid.Column width={2}>
                                            <p className='data-field-header'>Data urlopu</p>
                                        </Grid.Column >
                                        <Grid.Column width={2}>

                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Grid.Column width={2}>
                                            <p className='data-field-header'>Liczba dni urlopu</p>
                                        </Grid.Column >
                                        <Grid.Column width={2}>

                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Grid.Column width={2}>
                                            <p className='data-field-header'>Łączna liczba godzin</p>
                                        </Grid.Column >
                                        <Grid.Column width={2}>

                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Grid.Column width={2}>
                                            <p className='data-field-header'>Komentarz</p>
                                        </Grid.Column >
                                        <Grid.Column width={2}>
                                            <TextArea>

                                            </TextArea>

                                        </Grid.Column>
                                    </Grid.Row>





                                </Grid>

                                <Button
                                    type='submit'
                                    className='addButton'
                                    color='teal'>
                                    {/*onClick={this.props.onButtonClick}>*/}
                                    Utwórz wniosek
                                </Button>
                            </Form>
                        )}
                </Formik>
            </Segment >

        )
    }
}

export default VacApplComponent;