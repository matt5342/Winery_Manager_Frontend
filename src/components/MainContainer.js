import React, { Component } from 'react';
import { connect } from 'react-redux';
import fetchWineries from '../actions/fetchWineries'
import { Popup, Form, Input, Message, Button } from 'semantic-ui-react'
import WineryContainer from './WineryContainer';

class MainContainer extends Component {
    state = {
        isOpen: false
    }
    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    componentDidMount(){
        if (localStorage.getItem("token")){
            this.props.fetchWineries()
        }
    }
    renderWineryForm = () => {
        return (
            <div>
                <Form style={{width: '300px'}} onSubmit={this.handleWinerySubmit}>
                    <Form.Field
                        style={{width: '300px'}}
                        id='form-input-control-name'
                        control={Input}
                        label='Name:'
                        name='name'
                        placeholder='Reserve Estates'
                        className='eight wide field'
                        onChange={this.handleChange}
                    />
                    <Form.Field
                        id='form-button-control-public'
                        control={Button}
                        content='Create'
                        // href='tankmap'
                    /> 
                </Form>
            </div>
        )
    }

    handleWinerySubmit = e => {
        e.preventDefault()
        let reqObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
                "Authorization": localStorage.getItem("token")
            },
            body: JSON.stringify({
                winery: {
                    name: this.state.name
                }
            })
        }
        fetch('http://localhost:3000/winery', reqObj)
        .then(r => r.json())
        .then(data => {
                // debugger
                // localStorage.setItem("token", data.jwt)
                this.props.fetchWineries()
            }) 
    }
    
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
    
    checkForWinery = () => {
        // debugger
        if (Object.keys(this.props.wineries.wineries).includes("error")){
            return (
                <div>
                    <Message>
                        <Message.Header>No Winery Created Yet</Message.Header>
                        <p>
                            Please create your winery to continue.
                        </p>
                        <Popup
                            trigger={ <Button name='winery' color='purple' content="Create My Winery"/> }
                            content={this.renderWineryForm()}
                            on='click'
                            open={this.state.wineryIsOpen}
                            onClose={this.handleClose}
                            onOpen={this.handleOpen}
                            position='bottom center'
                            width={8}
                        />
                    </Message>
                </div>
            ) 
        }
        else if (Array.isArray(this.props.wineries.wineries)) {
            // debugger
            return (
                <div>
                    <Popup
                        trigger={ <Button name='winery' color='purple' content="Add a Winery"/> }
                        content={this.renderWineryForm()}
                        on='click'
                        open={this.state.wineryIsOpen}
                        onClose={this.handleClose}
                        onOpen={this.handleOpen}
                        position='bottom center'
                        width={8}
                        />
                    <WineryContainer />
                </div>
            )
        }
    }

    render(){
        return(
            <>
                <h1>Choose a Winery</h1>
                {this.checkForWinery()}
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        wineries: state.wineries
    }
  }

export default connect(mapStateToProps, { fetchWineries })(MainContainer);