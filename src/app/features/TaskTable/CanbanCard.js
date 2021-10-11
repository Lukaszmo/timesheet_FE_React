import React, { Component } from "react";
import { Card, Divider } from 'semantic-ui-react';
import './CanbanCard.css';

class CanbanCard extends Component {


    render() {

        const cls = (this.props.stage === 1) ? 'todo' : (this.props.stage === 2) ? 'in-progress' : (this.props.stage === 3) ? 'done' : null;

        return (

            <Card className={cls} onClick={this.props.onclick}>
                <Card.Content>
                    <Card.Header className='canban'>Task {this.props.id}</Card.Header>
                    <Divider></Divider>

                    <Card.Meta>{this.props.title}</Card.Meta>
                    <Card.Description>
                        {this.props.description}
                    </Card.Description>
                </Card.Content>
            </Card>
        )
    }
}

export default CanbanCard;