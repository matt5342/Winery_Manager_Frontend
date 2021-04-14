import React, { Component } from 'react';
import { connect } from 'react-redux';
import fetchTanks from '../actions/fetchTanks'
import postLot from '../actions/postLot'
import postWorkOrder from '../actions/postWorkOrder'
import { Popup, Modal, Form, TextArea, Input, Message, Button } from 'semantic-ui-react'
import TankContainer from './TankContainer';
import WorkOrderForm from './WorkOrderForm';

class TankMap extends Component {
    state = {
    }
    handleChange = (e, { name, value }) => this.setState({ [name]: value })
    
    handleOpen = event => {
        let whichOpen = event.target.name + 'IsOpen'
        this.setState({ [whichOpen]: true })
    }
    handleSubmitClose = name => {
        this.setState({ [name]: false})
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
    
    componentDidMount(){
        if (localStorage.getItem("token")){
            this.props.fetchTanks(this.props.section_id)
        }
    }
    handleTankSubmit = e => {
        e.preventDefault()
        this.setState({ tankIsOpen: false })
        let reqObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
                "Authorization": localStorage.getItem("token")
            },
            body: JSON.stringify({
                tank: {
                    name: this.state.name, 
                    volume: this.state.volume, 
                    material: this.state.material, 
                    status: "Clean",
                    xaxis: 18, 
                    yaxis: 2, 
                    width: 3, 
                    height: 3
                }
            })
        }
        fetch('http://localhost:3000/section/' + this.props.section_id + '/new_tank', reqObj)
        .then(r => r.json())
        .then(data => {
            this.props.fetchTanks(this.props.section_id)
        }) 
    }
    handleLotSubmit = () => {
        this.setState({ lotIsOpen: false })
        let attributes = { 
            name: this.state.name,
            color: this.state.color,
            vintage: this.state.vintage, 
            volume: this.state.lotVolume, 
            tank_id: this.state.tank_id, 
            section_id: this.props.section_id
        }
        this.props.postLot(attributes)
    }
    renderTankForm = () => {
        const materials = [
            {key: 's', text: 'Stainless Steel', value: 'Stainless Steel'}, 
            {key: 'c', text: 'Concrete', value: 'Concrete'}, 
            {key: 'o', text: 'Oak', value: 'Oak'}, 
            {key: 'p', text: 'Plastic', value: 'Plastic'}, 
            {key: 'a', text: 'Amphora', value: 'Amphora'}, 
            {key: 'g', text: 'Glass', value: 'Glass'}, 
            {key: '*', text: 'Other', value: 'Other'}
        
        ]
        return (
            <div>
                <Form style={{width: '300px'}} onSubmit={this.handleTankSubmit}>
                    <Form.Field
                        style={{width: '300px'}}
                        id='form-input-control-name'
                        control={Input}
                        label='Name:'
                        name='name'
                        placeholder='Tank Name'
                        className='eight wide field'
                        onChange={this.handleChange}
                    />
                    <Form.Field
                        style={{width: '300px'}}
                        id='form-input-control-name'
                        control={Input}
                        label='Volume:'
                        name='volume'
                        placeholder='Volume (L)'
                        className='eight wide field'
                        onChange={this.handleChange}
                    />
                    <Form.Select 
                        label='Material:' 
                        options={materials}
                        placeholder='Choose Material...'
                        name='material'
                        onChange={this.handleChange}
                    />
                    <Form.Field
                        id='form-button-control-public'
                        control={Button}
                        content='Create'
                    /> 
                </Form>
            </div>
        )
        
    }
    renderLotForm = () => {
        const colors = [
            {key: 'r', text: 'Red', value: 'Red'}, 
            {key: 'w', text: 'White', value: 'White'}, 
            {key: 's', text: 'Rosé', value: 'Rosé'}, 
        ]
        const tankNames = []
        this.props.tanks.tanks.map(tank => tankNames.push({key: tank.id, text: tank.name, value: tank.id}))
        return (
            <div>
                <Form style={{width: '300px'}} onSubmit={this.handleLotSubmit}>
                    <Form.Field
                        style={{width: '300px'}}
                        id='form-input-control-name'
                        control={Input}
                        label='Name:'
                        name='name'
                        placeholder='Lot Name'
                        className='eight wide field'
                        onChange={this.handleChange}
                    />
                    <Form.Field
                        style={{width: '300px'}}
                        id='form-input-control-name'
                        control={Input}
                        label='Volume:'
                        name='lotVolume'
                        placeholder='Volume (L)'
                        className='eight wide field'
                        onChange={this.handleChange}
                    />
                    <Form.Select 
                        label='Tank:' 
                        options={tankNames}
                        placeholder='Choose Tank...'
                        name='tank_id'
                        onChange={this.handleChange}
                    />
                    <Form.Field
                        style={{width: '300px'}}
                        id='form-input-control-name'
                        control={Input}
                        label='Vintage:'
                        name='vintage'
                        placeholder='Vintage'
                        className='eight wide field'
                        onChange={this.handleChange}
                    />
                    <Form.Select 
                        label='Color:' 
                        options={colors}
                        placeholder='Choose Color...'
                        name='color'
                        onChange={this.handleChange}
                    />
                    <Form.Field
                        id='form-button-control-public'
                        control={Button}
                        content='Create'
                    /> 
                </Form>
            </div>
        )
    }

    checkForTanks = () => {
        if (Object.keys(this.props.tanks.tanks).includes("error")){
            return (
                <div>
                    <Message>
                        <Message.Header>No Tanks Yet</Message.Header>
                        <p>
                            Please add some tanks to continue.
                        </p>
                        <Popup
                            trigger={ <Button name='tank' color='grey' content="Create A Tank"/> }
                            content={this.renderTankForm()}
                            on='click'
                            open={this.state.tankIsOpen}
                            onClose={this.handleClose}
                            onOpen={this.handleOpen}
                            position='bottom center'
                            width={8}
                        />
                    </Message>
                </div>
            ) 
        }
        else if (Array.isArray(this.props.tanks.tanks)) {
            return (
                <div>
                    <Popup
                        trigger={ <Button name='tank' color='grey' content="Add A Tank"/> }
                        content={this.renderTankForm()}
                        on='click'
                        open={this.state.tankIsOpen}
                        onClose={this.handleClose}
                        onOpen={this.handleOpen}
                        position='bottom center'
                        width={8}
                    />
                    <Popup
                        trigger={ <Button name='lot' color='grey' content="New Lot"/> }
                        content={this.renderLotForm()}
                        on='click'
                        open={this.state.lotIsOpen}
                        onClose={this.handleClose}
                        onOpen={this.handleOpen}
                        position='bottom center'
                        width={8}
                    />
                    <Popup
                        trigger={ <Button name='workOrder' color='grey' content="New Work Order"/> }
                        content={<WorkOrderForm handleSubmitClose={this.handleSubmitClose} />}
                        on='click'
                        open={this.state.workOrderIsOpen}
                        onClose={this.handleClose}
                        onOpen={this.handleOpen}
                        position='bottom center'
                        width={8}
                    />
                    <TankContainer />
                </div>
            )
        }
    }

    render(){
        return(
            <div>
                {this.checkForTanks()}
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

export default connect(mapStateToProps, { fetchTanks, postLot, postWorkOrder })(TankMap);