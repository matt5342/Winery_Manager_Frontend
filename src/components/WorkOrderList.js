import React, { Component } from 'react';
import { connect } from 'react-redux';
// import fetchSections from '../actions/fetchSections'
// let default_section = require(`../assets/default_winery_photo.jpg`) 
import { Card, Popup, Form, Input, Message, Button } from 'semantic-ui-react'
import fetchWorkOrders from '../actions/fetchWorkOrders';
import CompleteWorkOrderForm from './CompleteWorkOrderForm';



class WorkOrderList extends Component {
    state={

    }

    renderCards = () => {

        return this.props.workOrders.map(workOrder => {
            // href={`/workOrder/${workOrder.id}`}
            return (
                <Card key={workOrder.id} >
                    <Card.Content>
                        <Card.Header>{workOrder.name}</Card.Header>
                        <Card.Meta>{workOrder.status}</Card.Meta>
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
        })
    }
    
    render(){
        return(
            <div >
                <br />
                <Card.Group className='ui centered'>
                    {Array.isArray(this.props.workOrders) ? this.renderCards() : null}
                </Card.Group>
            </div>
        )
    }

}

const mapStateToProps = state => {
    // debugger
    return{
        workOrders: state.workOrders.workOrders
    }
  }

export default connect(mapStateToProps, { fetchWorkOrders })(WorkOrderList);