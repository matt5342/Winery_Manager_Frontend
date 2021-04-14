import React, { Component } from 'react';
import { connect } from 'react-redux';
// import fetchSections from '../actions/fetchSections'
// let default_section = require(`../assets/default_winery_photo.jpg`) 
import { Card, Popup, Form, Input, Message, Button } from 'semantic-ui-react'
import fetchWorkOrders from '../actions/fetchWorkOrders';
import CompleteWorkOrderForm from './CompleteWorkOrderForm';
import SingleWorkOrder from './SingleWorkOrder';



class WorkOrderList extends Component {


    
    render(){
        return(
            <div >
                <br />
                <Card.Group className='ui centered'>
                    {/* {Array.isArray(this.props.workOrders) ? this.renderCards() : null} */}
                    {Array.isArray(this.props.workOrders) ? this.props.workOrders.map(workOrder => <SingleWorkOrder workOrder={workOrder} />) : null}
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