import React, { Component } from 'react';
import { Card, Popup, Form, Input, Message, Button } from 'semantic-ui-react'
import CompleteWorkOrderForm from './forms/CompleteWorkOrderForm';


class SingleWorkOrder extends Component {
    state={

    }
    // Add a sort!
    handleOpen = event => {
        let whichOpen = event.target.name + 'IsOpen'
        this.setState({ [whichOpen]: true })
    }
    
    handleClose = event => {
        if (event.target.name === undefined){
            this.setState({ lotIsOpen: false, tankIsOpen: false, workOrderIsOpen: false })
        }
        else{
            let whichOpen = event.target.name + 'IsOpen'
            this.setState({ [whichOpen]: false })
        }
    }
    render() {
        const { workOrder } = this.props
        let date;
        workOrder.status === "Initialized" ? date = new Date(workOrder.created_at) : date = new Date(workOrder.updated_at)
        // debugger
        return (
            <Card key={workOrder.id} >
                <Card.Content>
                    <Card.Header>{workOrder.name}</Card.Header>
                    <Card.Meta>{workOrder.status + " on " + date.toDateString()}</Card.Meta>
                    <Card.Description>{workOrder.notes}</Card.Description>
                    <Card.Description>From Tank: {workOrder.out_tank}</Card.Description>
                    <Card.Description>To Tank: {workOrder.in_tank}</Card.Description>
                </Card.Content >
                {workOrder.status === 'Initialized' ?
                    <Card.Content>
                        <div className='ui two buttons'>
                            <Popup
                                trigger={ <Button name='workOrder' color='green' content="Complete Work Order"/> }
                                content={ <CompleteWorkOrderForm workOrder={ workOrder } />}
                                on='click'
                                open={this.state.workOrderIsOpen}
                                onClose={this.handleClose}
                                onOpen={this.handleOpen}
                                position='bottom center'
                                width={8}
                            />
                        </div>
                    </Card.Content>
                 : null}
            </Card>
        )
    }
}

export default SingleWorkOrder;