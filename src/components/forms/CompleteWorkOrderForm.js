import React, { Component } from 'react';
import { connect } from 'react-redux';
import postWorkOrder from '../../actions/postWorkOrder'
import { Popup, Modal, Form, TextArea, Input, Message, Button } from 'semantic-ui-react'
import patchWorkOrder from '../../actions/patchWorkOrder';




class CompleteWorkOrderForm extends Component {
    state = {
        in_tank: this.props.workOrder.in_tank
    }

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    handleCompleteSubmit = () => {
        let attributes;
        if (this.props.workOrder.name === "Rack")
            attributes = { 
                work_order_id: this.props.workOrder.id, 
                final_volume: this.state.final_volume, 
                in_tank: this.state.in_tank
        }
        else if (this.props.workOrder.name === "Addition"){
            attributes = { 
                work_order_id: this.props.workOrder.id, 
                final_volume: null, 
                in_tank: null
            }

        }
        this.props.patchWorkOrder(attributes)
    }
    renderCompleteForm = () => {
        const workOrders = [
            {key: 'r', text: 'Rack', value: 'Rack'},
            {key: 'a', text: 'Addition', value: 'Addition'}
        ]
        const tankNames = []
        // debugger
        // const default_recieval_tank = null
        // if (this.props.workOrder){

        // }
        // default_recieval_tank = this.props.tanks.find(tank => tank.name === this.props.workOrder.in_tank)
        // const default_out_tank
        this.props.tanks.map(tank => tankNames.push({key: tank.id, text: tank.name, value: tank}))
        if (this.props.workOrder.name === 'Rack'){
            return (
                <div>
                <Form style={{width: '300px'}} onSubmit={this.handleCompleteSubmit}>
                    <Form.Select 
                        label='Recieval Tank:' 
                        options={tankNames}
                        placeholder={this.state.in_tank}
                        name='in_tank'
                        onChange={this.handleChange}
                    />
                    <Form.Field
                        style={{width: '300px'}}
                        id='form-input-control-name'
                        control={Input}
                        label='Final Volume:'
                        name='final_volume'
                        placeholder='Volume (L)'
                        className='eight wide field'
                        onChange={this.handleChange}
                    />
                    <Form.Field
                        id='form-button-control-public'
                        control={Button}
                        content='Complete'
                    /> 
                </Form>
            </div>
            )
        }
        else if(this.props.workOrder.name === "Addition"){
            // debugger
            return (
                <div>
                <Form style={{width: '300px'}} onSubmit={this.handleCompleteSubmit}>
                    <h5>Instructions:</h5>
                    <p>{this.props.workOrder.notes}</p>
                    <Form.Field
                        id='form-button-control-public'
                        control={Button}
                        content='Complete'
                    /> 
                </Form>
            </div>
            )
        }
    }

    render(){
        return(
            <div>
                {Array.isArray(this.props.tanks) ? this.renderCompleteForm() : null}
            </div>
        )
    }

}

const mapStateToProps = state => {
    // debugger
    return {
        tanks: state.tanks.tanks
    }
  }

export default connect(mapStateToProps, { patchWorkOrder })(CompleteWorkOrderForm);