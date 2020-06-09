import React, { Component } from "react";

import { Formik } from 'formik';
import { Grid, Segment, Header, Input, Dropdown, Button, Form, TextArea } from 'semantic-ui-react';
import CustomLabel from '../../common/CustomLabel/CustomLabel';
import './VacApplComponent.css';

class VacApplComponent extends Component {

    constructor(props) {
        super(props);

        this.defaultDate = new Date().toISOString().slice(0, 10);
        this.input = React.createRef();

        this.state = {
            datefrom: this.defaultDate,
            dateto: this.defaultDate,
            nofdays: 1,
        }
    }

    //do testów
    options = [
        { key: 1, text: "Urlop wypoczynkowy", value: "TYPE1" },
        { key: 2, text: "Urlop na żądanie", value: "TYPE2" },
        { key: 3, text: "Urlop okolicznościowy", value: "TYPE3" },

    ]

    onSubmit(values) {

        let nofdays = this.input.current.props.value
        values = { ...values, nofdays: nofdays };

        console.log(values);
        this.props.onSubmit(values);
    }

    handleChange(e, data, setFieldValue) {

        setFieldValue(data.name, data.value);
    }

    dateHandleChange(e, data, setFieldValue) {

        setFieldValue(data.name, data.value);

        let datefrom = '';
        let dateto = '';

        if (data.name === 'datefrom') {
            this.setState({ datefrom: data.value });
            datefrom = data.value;
            dateto = this.state.dateto;
        }

        if (data.name === 'dateto') {
            this.setState({ dateto: data.value });
            datefrom = this.state.datefrom;
            dateto = data.value;
        }

        this.setState({ nofdays: this.calculateWorkingDays(datefrom, dateto) });
    }

    calculateWorkingDays(datefrom, dateto) {

        //TODO exclude holidays

        if ((datefrom === '') || (dateto === '')) return 0;

        let curDate = new Date(datefrom);
        let endDate = new Date(dateto);
        let count = 0;

        while (curDate <= endDate) {
            let dayOfWeek = curDate.getDay();
            if (!((dayOfWeek === 6) || (dayOfWeek === 0)))
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
                    initialValues={{ type: '', datefrom: this.defaultDate, dateto: this.defaultDate, nofdays: '', comment: '' }}

                    validationSchema={this.props.validationSchema}

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
                                                onChange={(e, data) => this.handleChange(e, data, setFieldValue)}
                                                options={this.options} />
                                            {errors.type && touched.type ? <div><CustomLabel text={errors.type}></CustomLabel></div> : null}
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
                                            {errors.datefrom && touched.datefrom ? <div><CustomLabel text={errors.datefrom}></CustomLabel></div> : null}
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
                                            {errors.dateto && touched.dateto ? <div><CustomLabel text={errors.dadateto}></CustomLabel></div> : null}
                                        </Grid.Column>
                                    </Grid.Row>

                                    <Grid.Row>
                                        <Grid.Column width={2}>
                                            <p className='data-field-header'>Liczba dni urlopu</p>
                                        </Grid.Column >
                                        <Grid.Column width={2}>
                                            <Input disabled
                                                type='number'
                                                name='nofdays'
                                                value={this.state.nofdays}
                                                ref={this.input} />
                                        </Grid.Column>
                                    </Grid.Row>

                                    <Grid.Row>
                                        <Grid.Column width={2}>
                                            <p className='data-field-header'>Komentarz</p>
                                        </Grid.Column >
                                        <Grid.Column width={2}>
                                            <TextArea
                                                name='comment'
                                                value={values.comment}
                                                onChange={(e, data) => this.handleChange(e, data, setFieldValue)} />
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