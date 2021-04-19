import React, { Component } from 'react';
import { connect } from 'react-redux';
import fetchTanks from '../actions/fetchTanks'
import postLot from '../actions/postLot'
import postWorkOrder from '../actions/postWorkOrder'
import { Popup, Message, Modal, Button } from 'semantic-ui-react'
import TankContainer from './TankContainer';
import WorkOrderForm from './forms/WorkOrderForm';
import TankForm from './forms/TankForm.js';
import LotForm from './forms/LotForm';

class TankMap extends Component {
    state = {
        modalOpen: false, 
        modalContent: ''
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
            // debugger
            if (Object.keys(data).includes("message")) {
                this.setState({modalOpen: true, modalContent: data.message[0]})
            }
            else{
                this.props.fetchTanks(this.props.section_id)
            }
        }) 
    }

    handleLotSubmit = values => {
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
            <div id='tank-map'>
                {this.checkForTanks()}
                {
                    <Modal size='mini' open={this.state.modalOpen} content={this.state.modalContent}
                            header='Invalid'
                            actions={[{ key: 'dismiss', content: 'Dismiss', positive: true}]}
                            onClose={() => this.setState({modalOpen: false})}
                    />
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        tanks: state.tanks.tanks,
        section_id: state.router.location.pathname.split('/')[2]
    }
}


export default connect(mapStateToProps, { fetchTanks, postLot, postWorkOrder })(TankMap);

