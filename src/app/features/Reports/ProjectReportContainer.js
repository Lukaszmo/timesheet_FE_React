import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Segment, Header, Divider, TransitionablePortal } from 'semantic-ui-react';
import './Reports.css';
import ProjectReportComponent from './ProjectReportComponent';
import { getHoursRange, fetchHoursByTaskType } from '../Hours/Hours';
import { getFirstDayOfMonth, getLastDayOfMonth } from '../../utils/Utils.js';
import { getMonths } from './ReportsUtility';
import { fetchAllProjects } from '../Admin/Projects/Project';


class ProjectReportContainer extends Component {

    state = {
        datefrom: getFirstDayOfMonth(new Date()),
        dateto: getLastDayOfMonth(new Date()),
        projectList: null,
        showReport: false
    }

    componentDidMount() {

        fetchAllProjects().then(resp => this.setState({ projectList: resp }));
    }

    onSubmit = (values) => {

        let filters = {
            datefrom: values.datefrom,
            dateto: values.dateto,
            projectId: values.project
        }

        fetchHoursByTaskType(filters).then(resp => this.setState({ data: resp.data }));
        this.setState({ showReport: true });
    }

    render() {

        return (
            <Container className='reports'>
                <ProjectReportComponent
                    showReport={this.state.showReport}
                    onSubmit={this.onSubmit}
                    projectList={this.state.projectList}
                    reportData={this.state.data}
                    datefrom={this.state.datefrom}
                    dateto={this.state.dateto}>
                </ProjectReportComponent>
            </Container>
        );
    }
}




export default ProjectReportContainer;



