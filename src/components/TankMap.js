import React, { Component } from 'react';
import { connect } from 'react-redux';
import fetchTanks from '../actions/fetchTanks'
import postLot from '../actions/postLot'
import postWorkOrder from '../actions/postWorkOrder'
import { Popup, Modal, Form, TextArea, Input, Message, Button } from 'semantic-ui-react'
import TankContainer from './TankContainer';
import WorkOrderForm from './WorkOrderForm';
import { useFormik } from 'formik';
import TankForm from './forms/TankForm.js';
import LotForm from './forms/LotForm';

class TankMap extends Component {
    state = {
    }
    handleChange = (e, { name, value }) => this.setState({ [name]: value })
    
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
    
    handleSubmitClose = name => {
        this.setState({ [name]: false})
    }
    componentDidMount(){
        if (localStorage.getItem("token")){
            this.props.fetchTanks(this.props.section_id)
        }
    }

    handleTankSubmit = values => {
        // e.preventDefault()
        this.setState({ tankIsOpen: false })
        let reqObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
                "Authorization": localStorage.getItem("token")
            },
            body: JSON.stringify({
                tank: {
                    name: values.name, 
                    volume: values.volume, 
                    material: values.material, 
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
            if (Object.keys(data).includes("error")) {
                debugger
            }
            else{
                this.props.fetchTanks(this.props.section_id)
            }
        }) 
    }

    handleLotSubmit = values => {
        // debugger
        this.setState({ lotIsOpen: false })
        let attributes = { 
            name: values.name,
            color: values.color,
            vintage: values.vintage, 
            volume: values.lotVolume, 
            tank_id: values.tank_id, 
            section_id: this.props.section_id
        }
        this.props.postLot(attributes)
    }

    renderLotForm = () => {
        const colors = [
            {key: 'r', text: 'Red', value: 'Red'}, 
            {key: 'w', text: 'White', value: 'White'}, 
            {key: 's', text: 'Rosé', value: 'Rosé'}, 
        ]
        const tankNames = []
        this.props.tanks.map(tank => tankNames.push({key: tank.id, text: tank.name, value: tank.id}))
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
        if (Object.keys(this.props.tanks).includes("error")){
            return (
                <div>
                    <Message>
                        <Message.Header>No Tanks Yet</Message.Header>
                        <p>
                            Please add some tanks to continue.
                        </p>
                        <Popup
                            trigger={ <Button name='tank' color='grey' content="Create A Tank"/> }
                            content={ <TankForm handleTankSubmit={this.handleTankSubmit} /> }
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
        else if (Array.isArray(this.props.tanks)) {
            return (
                <div>
                    <Popup
                        trigger={ <Button name='tank' color='grey' content="Add A Tank"/> }
                        content={ <TankForm handleTankSubmit={this.handleTankSubmit} /> }
                        on='click'
                        open={this.state.tankIsOpen}
                        onClose={this.handleClose}
                        onOpen={this.handleOpen}
                        position='bottom center'
                        width={8}
                    />
                    <Popup
                        trigger={ <Button name='lot' color='grey' content="New Lot"/> }
                        content={ <LotForm tanks={this.props.tanks} handleLotSubmit={this.handleLotSubmit} /> }
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
        tanks: state.tanks.tanks,
        section_id: state.router.location.pathname.split('/')[2]
    }
}


export default connect(mapStateToProps, { fetchTanks, postLot, postWorkOrder })(TankMap);

