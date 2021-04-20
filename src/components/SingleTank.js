import React, { Component } from 'react';
import { connect } from 'react-redux';
import fetchSingleTank from '../actions/fetchSingleTank'
import postLot from '../actions/postLot'
import postWorkOrder from '../actions/postWorkOrder'
import { Popup, Header, Table, Modal, Form, TextArea, Input, Message, Button, Card } from 'semantic-ui-react'
import TankContainer from './TankContainer';
import WorkOrderForm from './forms/WorkOrderForm';
import fetchAllTanks from '../actions/fetchAllTanks';
import SingleWorkOrder from './SingleWorkOrder';


class SingleTank extends Component {
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
            this.props.fetchAllTanks()
        }
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
    renderSingleTank = () => {
        let tank = this.props.tanks[0]
        tank = this.props.tanks.find(tank => tank.id === parseInt(this.props.tank_id))
        let colorCode = 'grey';
        let volume = 0;
        let percentFilled = 0;
        let lotName = 'None';
        let openWorkOrders = []
        if(tank){
            if (tank.lots){
                if(tank.lots.length > 0){
                    tank.lots.forEach(lot => {
                        volume += lot.volume
                        lotName = lot.name
                    })
    
                    if (tank.work_orders){
                        
                        tank.work_orders.forEach(work_order => {
                            if (work_order.status === "Initialized"){
                                openWorkOrders.push(work_order)
                            }
                        })
                    }
                    switch (tank.lots[0].color) {
                        case "Red":
                            colorCode = "rgba(122, 36, 72, 0.822)"
                            break;
                        case "White":
                            colorCode = "rgba(238, 210, 84, 0.842)"
                            break;
                        case "Rosé":
                            colorCode = "rgba(210, 101, 134, 0.842)"
                            break;
                        default:
                            colorCode = "grey"
                            break;
                    }
                }
            }
            percentFilled = volume / tank.volume * 100
        }
        let percentEmpty = 100 - percentFilled
        percentFilled = percentFilled.toString() + '%'
        percentEmpty = percentEmpty.toString() + '%'

        return (
            <div>
                {tank ? 
                    <div>
                    <Header as='h1' >{tank.name}</Header>
                    <div className='tank-shape'>
                        <div className='tank-content' 
                            style={{ backgroundColor: colorCode, height: percentFilled, top: percentEmpty}}
                            >
                        </div>
                    </div>
                    <Popup
                            trigger={ <Button name='workOrder' data-id={tank.id} color='grey' content="New Work Order"/> }
                            content={<WorkOrderForm  tank={tank} handleSubmitClose={this.handleSubmitClose} />}
                            on='click'
                            open={this.state.workOrderIsOpen}
                            onClose={this.handleClose}
                            onOpen={this.handleOpen}
                            position='bottom center'
                            width={8}
                        />
                    <Table align='center' style={{margin: '0 auto'}} collapsing striped>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell colSpan='2'>Details</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {/* <Table.Row>
                                <Table.Cell>Status</Table.Cell>
                                <Table.Cell>{tank.status}</Table.Cell>
                            </Table.Row> */}
                            <Table.Row>
                                <Table.Cell>Lot</Table.Cell>
                                <Table.Cell>{lotName}</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Current Volume </Table.Cell>
                                <Table.Cell>{volume} L</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Tank Capacity</Table.Cell>
                                <Table.Cell>{tank.volume} L</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Material</Table.Cell>
                                <Table.Cell>{tank.material}</Table.Cell>
                            </Table.Row>
                        </Table.Body>
                        {openWorkOrders.length > 0 ? 
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell colSpan='2'>Open Work Orders:</Table.HeaderCell>
                                </Table.Row>
                                {openWorkOrders.map(workOrder => {
                                    return (
                                        <Card.Group className='ui centered'>
                                            <SingleWorkOrder workOrder={workOrder} /> 
                                        </Card.Group>
                                    )
                                } ) }
                            </Table.Header>
                            : null 
                        }
                    </Table>
                </div>
                :
                null}
            </div>
        )
    }

    render(){
        return(
            <div id='single-tank'>
                {Array.isArray(this.props.tanks) ? 
                    this.props.tanks.length > 0 ? this.renderSingleTank() : null
                    : null}
            </div>
        )
    }
}

const mapStateToProps = state => {
    // debugger
    return {
        tanks: state.tanks.tanks,
        tank_id: state.router.location.pathname.split('/')[2]
    }
  }

export default connect(mapStateToProps, { fetchSingleTank, fetchAllTanks, postLot, postWorkOrder })(SingleTank);