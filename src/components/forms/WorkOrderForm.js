import React, { Component } from 'react';
import { connect } from 'react-redux';
import postWorkOrder from '../../actions/postWorkOrder'
import { Popup, Modal, Form, TextArea, Input, Message, Button } from 'semantic-ui-react'




class WorkOrderForm extends Component {
    state = {
        step: "selectType"
    }

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    handleRackSubmit = () => {
        // debugger
        this.props.handleSubmitClose("workOrderIsOpen")
        let attributes = { 
            name: this.state.name,
            lot_id: this.state.out_tank.lots[0].id, //change for blending
            out_tank: this.state.out_tank.name, 
            in_tank: this.state.in_tank.name, 
            notes: this.state.notes,
            status: 'Initialized'
        }
        this.props.postWorkOrder(attributes)
    }
    handleAdditionSubmit = () => {
        this.props.handleSubmitClose("workOrderIsOpen")
        let attributes = { 
            name: this.state.name,
            lot_id: this.state.out_tank.lots[0].id, //change for blending
            out_tank: this.state.out_tank.name, 
            in_tank: null, 
            notes: this.state.notes,
            status: 'Initialized'
        }
        this.props.postWorkOrder(attributes)
    }
    renderWorkOrderSelector = () => {
        const workOrders = [
            {key: 'r', text: 'Rack', value: 'Rack'},
            {key: 'a', text: 'Addition', value: 'Addition'}
        ]
        let tankNames = []
        this.props.tanks.map(tank => tankNames.push({key: tank.id, text: tank.name, value: tank}))

        let default_out_tank = null
        if (this.props.tank){
            // debugger
            default_out_tank = this.props.tank
            if (!this.state.out_tank){
                this.setState({out_tank: this.props.tank})
            }
        }
        switch (this.state.step) {
            case "selectType":
                return (
                    <div>
                        <Form style={{width: '300px'}} onSubmit={this.nextStep}>
                            <Form.Select 
                                label='Type:' 
                                options={workOrders}
                                placeholder='Choose Type...'
                                name='name'
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
                            placeholder={default_out_tank ? default_out_tank.name : 'Choose Tank...'}
                            name='out_tank'
                            onChange={this.handleChange}
                        />
                        <Form.Select 
                            label='To Tank:' 
                            options={tankNames}
                            placeholder='Choose Tank...'
                            name='in_tank'
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
            case 'Addition':
                return (
                    <div>
                        <Form style={{width: '300px'}} onSubmit={this.handleAdditionSubmit}>
                        <Form.Select 
                            label='Into Tank:' 
                            options={tankNames}
                            placeholder={default_out_tank ? default_out_tank.name : 'Choose Tank...'}
                            name='out_tank'
                            onChange={this.handleChange}
                        />
                        <Form.Field
                            style={{width: '300px'}}
                            id='form-input-control-name'
                            control={TextArea}
                            label='Instructions:'
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
                            content='Submit Addition'
                        /> 
                        </Form>
                    </div>
                )
            
            default:
                break;
        }
    }
    nextStep = () => {
        this.setState({step: this.state.name})
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
        tanks: state.tanks.tanks,
        section_id: state.router.location.pathname.split('/')[2]
    }
  }

export default connect(mapStateToProps, { postWorkOrder })(WorkOrderForm);
