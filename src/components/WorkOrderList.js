import React, { Component } from 'react';
import { connect } from 'react-redux';
// import fetchSections from '../actions/fetchSections'
// let default_section = require(`../assets/default_winery_photo.jpg`) 
import { Card, Header, Dropdown, Popup, Form, Input, Message, Button } from 'semantic-ui-react'
import fetchWorkOrders from '../actions/fetchWorkOrders';
import CompleteWorkOrderForm from './forms/CompleteWorkOrderForm';
import SingleWorkOrder from './SingleWorkOrder';



class WorkOrderList extends Component {
    state = {
        sort: 'All', 

    }

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    workOrderSort = () => {
        if (this.state.sort === 'All'){
            return this.props.workOrders.map(workOrder => <SingleWorkOrder workOrder={workOrder} />)
        }
        if (this.state.sort === 'Initialized'){
            return this.props.workOrders.map(workOrder => {
                // debugger
                if (workOrder.status === 'Initialized'){
                    return <SingleWorkOrder workOrder={workOrder} />
                }
                else {return null}
            })
        }
        if (this.state.sort === 'Completed'){
            return this.props.workOrders.map(workOrder => {
                // debugger
                if (workOrder.status === 'Completed'){
                    return <SingleWorkOrder workOrder={workOrder} />
                }
                else {return null}
            })
        }
    }
    
    render(){
        const sortOptions = [
            {key: 'a', text: 'All', value: 'All'}, 
            {key: 'i', text: 'Initialized', value: 'Initialized'}, 
            {key: 'c', text: 'Completed', value: 'Completed'}, 
        ]
        return(
            <div >
                <Header>{this.state.sort} Work Orders</Header>
                <Dropdown placeholder="By Staus" selection name='sort' options={sortOptions} onChange={this.handleChange} />
                {' '}
                {/* <Dropdown placeholder="By Date" selection name='sort' options={sortOptions} onChange={this.handleChange} /> */}
                <br />
                <br />
                <Card.Group className='ui centered'>
                    {/* {Array.isArray(this.props.workOrders) ? this.renderCards() : null} */}
                    {Array.isArray(this.props.workOrders) ? 
                     this.workOrderSort()
                    : null}
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