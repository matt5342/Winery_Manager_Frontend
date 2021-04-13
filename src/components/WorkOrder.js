import React, { Component } from 'react';
import { connect } from 'react-redux';
import postAction from '../actions/postAction'
import { Popup, Modal, Form, TextArea, Input, Message, Button } from 'semantic-ui-react'
import TankMap from './TankMap';



class WorkOrder extends Component {
    state = {
        step: "selectAction"
    }

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    handleRackSubmit = () => {
        // debugger
        let attributes = { 
            name: this.state.action,
            lot_id: this.state.exit_tank.lots[0].id, //change for blending
            tank_id: this.state.exit_tank.id, 
            notes: this.state.notes,
            status: 'Initialized'
        }
        this.props.postAction(attributes)
    }
    renderActionSelector = () => {
        const actions = [
            {key: 'r', text: 'Rack', value: 'Rack'}
        ]
        const tankNames = []
        this.props.tanks.tanks.map(tank => tankNames.push({key: tank.id, text: tank.name, value: tank}))
        switch (this.state.step) {
            case "selectAction":
                return (
                    <div>
                        <Form style={{width: '300px'}} onSubmit={this.nextStep}>
                            <Form.Select 
                                label='Action:' 
                                options={actions}
                                placeholder='Choose Action...'
                                name='action'
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
        this.setState({step: this.state.action})
    }
    previousStep = () => {
        this.setState({step: "selectAction"})
    }
    render(){
        return(
            <div>
                {this.renderActionSelector()}
            </div>
        )
    }

}

const mapStateToProps = state => {
    // debugger
    return {
        tanks: state.tanks,
        winery_id: state.router.location.pathname.split('/')[2]
    }
  }

export default connect(mapStateToProps, { postAction })(WorkOrder);