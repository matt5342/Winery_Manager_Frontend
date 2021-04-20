import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Header, Dropdown } from 'semantic-ui-react'
import fetchWorkOrders from '../actions/fetchWorkOrders';
import SingleWorkOrder from './SingleWorkOrder';



class WorkOrderList extends Component {
    state = {
        sort: 'All', 
    }

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    workOrderSort = () => {

        const workOrdersSortedByDateInitialized = this.props.workOrders.sort((a, b) => {
            if(a.created_at > b.created_at){
                return -1
            }
            else if(a.created_at < b.created_at){
                return 1
            }
            else {return 0}
        }
        )
        let noResults = true;
        let results;
        // debugger
        if (this.state.sort === 'All'){
            if (this.props.workOrders.length > 0){
                return workOrdersSortedByDateInitialized.map(workOrder => <SingleWorkOrder workOrder={workOrder} />)
            }
            else {
                return <p>No Work Orders yet.</p>
            }
        }
        if (this.state.sort === 'Initialized'){
            results = workOrdersSortedByDateInitialized.map(workOrder => {
                if (workOrder.status === 'Initialized'){
                    noResults = false
                    return <SingleWorkOrder workOrder={workOrder} />
                }
            })
            if (noResults === true){
                return <p>No {this.state.sort} Work Orders.</p>
            }
            else{ return results; }
        }
        if (this.state.sort === 'Completed'){
            results = workOrdersSortedByDateInitialized.map(workOrder => {
                if (workOrder.status === 'Completed'){
                    noResults = false
                    return <SingleWorkOrder workOrder={workOrder} />
                }
            })
            if (noResults === true){
                return <p>No {this.state.sort} Work Orders.</p>
            }
            else{ return results; }
        }
    }
    
    render(){
        const sortOptions = [
            {key: 'a', text: 'All', value: 'All'}, 
            {key: 'i', text: 'Initialized', value: 'Initialized'}, 
            {key: 'c', text: 'Completed', value: 'Completed'}, 
        ]
        return(
            <div id='work-order-list'>
                <Header>{this.state.sort} Work Orders</Header>
                <Dropdown placeholder="By Staus" selection name='sort' options={sortOptions} onChange={this.handleChange} />
                {' '}
                {/* <Dropdown placeholder="By Date" selection name='sort' options={sortOptions} onChange={this.handleChange} /> */}
                <br />
                <br />
                <Card.Group className='ui centered'>
                    {Array.isArray(this.props.workOrders) ? 
                     this.workOrderSort()
                    : null}
                </Card.Group>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return{
        workOrders: state.workOrders.workOrders
    }
  }

export default connect(mapStateToProps, { fetchWorkOrders })(WorkOrderList);