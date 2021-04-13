import React, { Component } from 'react';
import { connect } from 'react-redux';
import postWorkOrder from '../actions/postWorkOrder'
import { Popup, Modal, Form, TextArea, Input, Message, Button } from 'semantic-ui-react'
import TankMap from './TankMap';



class WorkOrder extends Component {
    state = {
        step: "selectType"
    }

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    handleRackSubmit = () => {
        // debugger
        let attributes = { 
            name: this.state.workOrder,
            lot_id: this.state.exit_tank.lots[0].id, //change for blending
            tank_id: this.state.exit_tank.id, 
            notes: this.state.notes,
            status: 'Initialized'
        }
        this.props.postWorkOrder(attributes)
    }
    renderWorkOrderSelector = () => {
        const workOrders = [
            {key: 'r', text: 'Rack', value: 'Rack'}
        ]
        const tankNames = []
        this.props.tanks.tanks.map(tank => tankNames.push({key: tank.id, text: tank.name, value: tank}))
        switch (this.state.step) {
            case "selectType":
                return (
                    <div>
                        <Form style={{width: '300px'}} onSubmit={this.nextStep}>
                            <Form.Select 
                                label='Type:' 
                                options={workOrders}
                                placeholder='Choose Type...'
                                name='workOrder'
                                onChange={this.handleChange}
                            />
                            <Form.Field
                                id='form-button-control-public'
                                control={Button}
                                content='Next'
                            /> 
                        </Form>
                    </div>
                )
                case "Rack":
                    return (
                        <div>
                        <Form style={{width: '300px'}} onSubmit={this.handleRackSubmit}>
                            <Form.Select 
                                label='From Tank:' 
                                options={tankNames}
                                placeholder='Choose Tank...'
                                name='exit_tank'
                                onChange={this.handleChange}
                            />
                            <Form.Select 
                                label='To Tank:' 
                                options={tankNames}
                                placeholder='Choose Tank...'
                                name='enter_tank'
                                onChange={this.handleChange}
                            />
                            <Form.Field
                                style={{width: '300px'}}
                                id='form-input-control-name'
                                control={TextArea}
                                label='Notes:'
                                name='notes'
                                placeholder='Notes'
                                className='eight wide field'
                                onChange={this.handleChange}
                            />
                            <Form.Field
                                id='form-button-control-public'
                                control={Button}
                                content='Back'
                                onClick={this.previousStep}
                            /> 
                            <Form.Field
                                id='form-button-control-public'
                                control={Button}
                                content='Submit Rack'
                            /> 
                        </Form>
                    </div>
                )
        
            default:
                break;
        }
    }
    nextStep = () => {
        this.setState({step: this.state.workOrder})
    }
    previousStep = () => {
        this.setState({step: "selectType"})
    }
    render(){
        return(
            <div>
                {this.renderWorkOrderSelector()}
            </div>
        )
    }

}

const mapStateToProps = state => {
    // debugger
    return {
        tanks: state.tanks,
        section_id: state.router.location.pathname.split('/')[2]
    }
  }

export default connect(mapStateToProps, { postWorkOrder })(WorkOrder);