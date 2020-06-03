import React, { Component } from "react";

import { Formik } from 'formik';
import { Grid, Segment, Header, Input, Dropdown, Button, Form, TextArea } from 'semantic-ui-react';
import CustomLabel from '../../common/CustomLabel/CustomLabel';
import './VacApplComponent.css';

class VacApplComponent extends Component {

    constructor(props) {
        super(props);

        this.defaultDate = new Date().toISOString().slice(0, 10);

        this.state = {
            datefrom: this.defaultDate,
            dateto: this.defaultDate,
        }
    }

    //do testów
    options = [
        { key: 1, text: "Urlop wypoczynkowy", value: "TYPE1" },
        { key: 2, text: "Urlop na żądanie", value: "TYPE2" },
        { key: 3, text: "Urlop okolicznościowy", value: "TYPE3" },

    ]


    dateHandleChange(e, data, setFieldValue) {

        setFieldValue(data.name, data.value);

        if (data.name === 'datefrom') this.setState({ datefrom: data.value });
        if (data.name === 'dateto') this.setState({ dateto: data.value });
    }

    calculateWorkingDays(datefrom, dateto) {

        //TODO exclude holidays

        let curDate = new Date(datefrom);
        let endDate = new Date(dateto);
        let count = 0;

        while (curDate <= endDate) {
            let dayOfWeek = curDate.getDay();
            if (!((dayOfWeek == 6) || (dayOfWeek == 0)))
                count++;
            curDate.setDate(curDate.getDate() + 1);
        }

        return count;
    }

    render() {

        return (
            <Segment color="teal">
                <Header size='medium'>Nowy wniosek</Header>
                <Formik
                    initialValues={{ datefrom: this.defaultDate, dateto: this.defaultDate }}

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
                                <Grid columns={4} textAlign="right" verticalAlign="middle" >
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
                                            <p className='data-field-header'>Dni urlopu od:</p>
                                        </Grid.Column >
                                        <Grid.Column width={3}>
                                            <Input
                                                type='date'
                                                name='datefrom'
                                                value={values.datefrom}
                                                onChange={(e, data) => this.dateHandleChange(e, data, setFieldValue)} />

                                        </Grid.Column>
                                        <Grid.Column width={1}>
                                            <p className='data-field-header'>do: </p>
                                        </Grid.Column >

                                        <Grid.Column width={2}>
                                            <Input
                                                type='date'
                                                name='dateto'
                                                value={values.dateto}
                                                onChange={(e, data) => this.dateHandleChange(e, data, setFieldValue)} />

                                        </Grid.Column>
                                    </Grid.Row>

                                    <Grid.Row>
                                        <Grid.Column width={2}>
                                            <p className='data-field-header'>Liczba dni urlopu</p>
                                        </Grid.Column >
                                        <Grid.Column width={2}>
                                            <Input disabled
                                                name='noOfDays'
                                                //value={this.state.noOfDays} >
                                                value={this.calculateWorkingDays(this.state.datefrom, this.state.dateto)}>
                                            </Input>
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Grid.Column width={2}>
                                            <p className='data-field-header'>Łączna liczba godzin</p>
                                        </Grid.Column >
                                        <Grid.Column width={2}>
                                            <Input disabled
                                                value={16} >
                                            </Input>
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