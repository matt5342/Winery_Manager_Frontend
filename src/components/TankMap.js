import React, { Component } from 'react';
import { connect } from 'react-redux';
import fetchTanks from '../actions/fetchTanks'
import { Popup, Form, Input, Message, Button } from 'semantic-ui-react'
import TankContainer from './TankContainer';

const materials = [
    {key: 's', text: 'Stainless Steel', value: 'Stainless Steel'}, 
    {key: 'c', text: 'Concrete', value: 'Concrete'}, 
    {key: 'o', text: 'Oak', value: 'Oak'}, 
    {key: 'p', text: 'Plastic', value: 'Plastic'}, 
    {key: 'a', text: 'Amphora', value: 'Amphora'}, 
    {key: 'g', text: 'Glass', value: 'Glass'}, 
    {key: '*', text: 'Other', value: 'Other'}

]
class TankMap extends Component {
    state = {
        isOpen: false
    }
    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    handleOpen = event => {
        // debugger
        let whichOpen = event.target.name + 'IsOpen'
        this.setState({ [whichOpen]: true })
    }
    
    handleClose = event => {
        if (event.target.name === undefined){
            this.setState({ wineryIsOpen: false, tankIsOpen: false})
        }
        else{
            let whichOpen = event.target.name + 'IsOpen'
            this.setState({ [whichOpen]: false })
        }
    }

    componentDidMount(){
        this.props.fetchTanks(this.props.winery_id)
    }
    handleTankSubmit = e => {
        e.preventDefault()
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
        // debugger
        fetch('http://localhost:3000/winery/' + this.props.winery_id + '/new_tank', reqObj)
        .then(r => r.json())
        .then(data => {
                // debugger
                this.props.fetchTanks(this.props.winery_id)
            }) 
    }
    renderTankForm = () => {
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
                    {/* <Form.Field
                        style={{width: '300px'}}
                        id='form-input-control-name'
                        control={Input}
                        label='Material:'
                        name='material'
                        placeholder='Stainless Steel'
                        className='eight wide field'
                        onChange={this.handleChange}
                    /> */}
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

    checkForTanks = () => {
        // debugger
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
            // debugger
            return (
                <div>
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
        winery_id: state.router.location.pathname.split('/')[2]
    }
  }

export default connect(mapStateToProps, { fetchTanks })(TankMap);