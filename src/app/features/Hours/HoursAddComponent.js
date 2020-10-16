import React, { Component, Fragment } from "react";

import { Formik } from 'formik';
import { Grid, Segment, Header, Input, Dropdown, Button, Form, TextArea, Divider, Icon } from 'semantic-ui-react';
import './HoursComponent.css';
import CustomLabel from '../../common/CustomLabel/CustomLabel';
import { timeToNumber } from '../../utils/Utils';
import Media from 'react-media';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';


class HoursAddComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            taskDropdownDisabled: 1,
            time: moment('08:00', 'HH:mm')  //docelowo będzie brane z konfiguracji pracownika
        }
    }


    onSubmit(values) {

        values = { ...values, quantity: timeToNumber(this.state.time.format('HH:mm')), time: this.state.time.format('HH:mm') }

        this.props.onSubmit(values);
    }

    dropdownHandleChange(e, data, setFieldValue) {

        if (data.name === 'project') {

            this.props.onProjectDropdownChange(data.value);
            this.setState({ taskDropdownDisabled: 0 })
        }

        setFieldValue(data.name, data.value);
    }

    handleTimeInputChange = time => {

        this.setState({ time: moment(time, 'HH:mm') });

    };

    render() {

        const clockIcon = <Icon name='clock' className='clock-icon'></Icon>

        return (
            <Segment color="teal">
                <Header size='medium'>Rejestracja czasu</Header>
                <Divider></Divider>
                <Formik
                    initialValues={{ date: '', type: 1, project: '', task: '', comment: '' }}

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
                                <Media queries={{
                                    small: "(max-width: 599px)",                            //mobile 
                                    medium: "(min-width: 600px) and (max-width: 1199px)",   //tablet
                                    large: "(min-width: 1200px)"                            //laptop
                                }}>
                                    {matches => (

                                        <Fragment>
                                            {/*laptop*/}
                                            {matches.large &&
                                                <Grid columns={2} textAlign="right" verticalAlign="middle" >

                                                    <Grid.Row >
                                                        <Grid.Column width={2}>
                                                            <p className='data-field-header'>Rodzaj</p>
                                                        </Grid.Column >
                                                        <Grid.Column width={3}>
                                                            <Dropdown fluid selection
                                                                name='type'
                                                                className='dropdown-hour-types'
                                                                placeholder="Wybierz.."
                                                                value={values.type}
                                                                onChange={(e, data) => this.dropdownHandleChange(e, data, setFieldValue)}
                                                                options={this.props.types} />
                                                            {errors.type && touched.type ? <div><CustomLabel text={errors.type}></CustomLabel></div> : null}
                                                        </Grid.Column>

                                                        <Grid.Column width={2}>
                                                            <p className='data-field-header'>Projekt</p>
                                                        </Grid.Column >
                                                        <Grid.Column width={3}>
                                                            <Dropdown fluid selection
                                                                name='project'
                                                                className='dropdown-hour-project'
                                                                placeholder="Wybierz.."
                                                                value={values.project}
                                                                onChange={(e, data) => this.dropdownHandleChange(e, data, setFieldValue)}
                                                                options={this.props.projectList} />
                                                            {errors.project && touched.project ? <div><CustomLabel text={errors.project}></CustomLabel></div> : null}
                                                        </Grid.Column>
                                                    </Grid.Row>

                                                    <Grid.Row>
                                                        <Grid.Column width={2}>
                                                            <p className='data-field-header'>Data</p>
                                                        </Grid.Column >
                                                        <Grid.Column width={3}>
                                                            <Input
                                                                type='date'
                                                                name='date'
                                                                className='input-date'
                                                                value={values.date}
                                                                onChange={handleChange} />
                                                            {errors.date && touched.date ? <div><CustomLabel text={errors.date}></CustomLabel></div> : null}
                                                        </Grid.Column>

                                                        <Grid.Column width={2}>
                                                            <p className='data-field-header'>Zadanie</p>
                                                        </Grid.Column >
                                                        <Grid.Column width={3}>
                                                            <Dropdown fluid selection
                                                                disabled={this.state.taskDropdownDisabled}
                                                                name='task'
                                                                className='dropdown-hour-task'
                                                                placeholder="Wybierz.."
                                                                value={values.task}
                                                                onChange={(e, data) => this.dropdownHandleChange(e, data, setFieldValue)}
                                                                options={this.props.tasks} />
                                                            {errors.task && touched.task ? <div><CustomLabel text={errors.task}></CustomLabel></div> : null}
                                                        </Grid.Column>
                                                    </Grid.Row>

                                                    <Grid.Row>
                                                        <Grid.Column width={2}>
                                                            <p className='data-field-header'>Ilość godzin</p>
                                                        </Grid.Column >
                                                        <Grid.Column width={3}>

                                                            <TimePicker
                                                                className='hours-quantity'
                                                                name='quantity'
                                                                value={this.state.time}
                                                                onChange={this.handleTimeInputChange}
                                                                showSecond={false}
                                                                minuteStep={15}
                                                                inputIcon={clockIcon}
                                                            />

                                                            {/*}   <Input
                                                                type='time'
                                                                step="900"
                                                                name='quantity'
                                                                className='hours-quantity'
                                                                value={values.quantity}
                                                                onChange={handleChange}
                                                            />
                                                            {errors.quantity && touched.quantity ? <div><CustomLabel text={errors.quantity}></CustomLabel></div> : null}
                                            */}
                                                        </Grid.Column>

                                                    </Grid.Row>

                                                    <Grid.Row>
                                                        <Grid.Column width={2}>
                                                            <p className='data-field-header'>Komentarz</p>
                                                        </Grid.Column >
                                                        <Grid.Column width={3}>
                                                            <TextArea
                                                                name='comment'
                                                                className='hours-comment'
                                                                value={values.comment}
                                                                onChange={handleChange} />
                                                            {errors.comment && touched.comment ? <div><CustomLabel text={errors.comment}></CustomLabel></div> : null}
                                                        </Grid.Column>
                                                    </Grid.Row>
                                                </Grid>
                                            }

                                            {/*urządzenia mobline lub tablet*/}
                                            {(matches.small || matches.medium) &&
                                                <Grid textAlign="left" verticalAlign="middle" >
                                                    <Grid.Row >
                                                        <Grid.Column>
                                                            <p className='data-field-header'>Rodzaj</p>
                                                        </Grid.Column >
                                                        <Grid.Column >
                                                            <Dropdown fluid selection
                                                                name='type'
                                                                className='dropdown-hour-types'
                                                                placeholder="Wybierz.."
                                                                value={values.type}
                                                                onChange={(e, data) => this.dropdownHandleChange(e, data, setFieldValue)}
                                                                options={this.props.types} />
                                                            {errors.type && touched.type ? <div><CustomLabel text={errors.type}></CustomLabel></div> : null}
                                                        </Grid.Column>
                                                    </Grid.Row>

                                                    <Grid.Row>
                                                        <Grid.Column>
                                                            <p className='data-field-header'>Data</p>
                                                        </Grid.Column >
                                                        <Grid.Column>
                                                            <Input
                                                                type='date'
                                                                name='date'
                                                                className='input-date'
                                                                value={values.date}
                                                                onChange={handleChange} />
                                                            {errors.date && touched.date ? <div><CustomLabel text={errors.date}></CustomLabel></div> : null}
                                                        </Grid.Column>
                                                    </Grid.Row>

                                                    <Grid.Row>
                                                        <Grid.Column>
                                                            <p className='data-field-header'>Projekt</p>
                                                        </Grid.Column >
                                                        <Grid.Column>
                                                            <Dropdown fluid selection
                                                                name='project'
                                                                className='dropdown-hour-project'
                                                                placeholder="Wybierz.."
                                                                value={values.project}
                                                                onChange={(e, data) => this.dropdownHandleChange(e, data, setFieldValue)}
                                                                options={this.props.projectList} />
                                                            {errors.project && touched.project ? <div><CustomLabel text={errors.project}></CustomLabel></div> : null}
                                                        </Grid.Column>
                                                    </Grid.Row>

                                                    <Grid.Row>
                                                        <Grid.Column>
                                                            <p className='data-field-header'>Zadanie</p>
                                                        </Grid.Column>
                                                        <Grid.Column>
                                                            <Dropdown fluid selection
                                                                disabled={this.state.taskDropdownDisabled}
                                                                name='task'
                                                                className='dropdown-hour-task'
                                                                placeholder="Wybierz.."
                                                                value={values.task}
                                                                onChange={(e, data) => this.dropdownHandleChange(e, data, setFieldValue)}
                                                                options={this.props.tasks} />
                                                            {errors.task && touched.task ? <div><CustomLabel text={errors.task}></CustomLabel></div> : null}
                                                        </Grid.Column>
                                                    </Grid.Row>

                                                    <Grid.Row>
                                                        <Grid.Column >
                                                            <p className='data-field-header'>Ilość godzin</p>
                                                        </Grid.Column >
                                                        <Grid.Column >
                                                            <TimePicker
                                                                className='hours-quantity'
                                                                name='quantity'
                                                                value={this.state.time}
                                                                onChange={this.handleTimeInputChange}
                                                                showSecond={false}
                                                                minuteStep={15}
                                                                inputIcon={clockIcon}
                                                            />
                                                        </Grid.Column>
                                                    </Grid.Row>

                                                    <Grid.Row>
                                                        <Grid.Column >
                                                            <p className='data-field-header'>Komentarz</p>
                                                        </Grid.Column >
                                                        <Grid.Column >
                                                            <TextArea
                                                                name='comment'
                                                                className='hours-comment'
                                                                value={values.comment}
                                                                onChange={handleChange} />
                                                            {errors.comment && touched.comment ? <div><CustomLabel text={errors.comment}></CustomLabel></div> : null}
                                                        </Grid.Column>
                                                    </Grid.Row>
                                                </Grid>
                                            }
                                        </Fragment>
                                    )}
                                </Media>
                                <div className='button-row'>
                                    <Button
                                        type='submit'
                                        className='saveButton'
                                        color='teal'>
                                        {/*onClick={this.props.onButtonClick}>*/}
                                    Dodaj rekord
                                </Button>
                                </div>
                            </Form>
                        )}
                </Formik>
            </Segment >

        )
    }
}

export default HoursAddComponent;