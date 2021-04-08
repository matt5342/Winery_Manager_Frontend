import React, { Component } from 'react';
import { connect } from 'react-redux';
import fetchWineries from '../actions/fetchWineries'
import { Popup, Form, Input, Message, Button } from 'semantic-ui-react'

class TankMap extends Component {
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
        // debugger
        return (
            <div>
                <Form style={{width: '300px'}} onSubmit={this.handleSubmit}>
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
    handleSubmit = e => {
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
                debugger
                // localStorage.setItem("token", data.jwt)
                this.props.fetchWineries()
            }) 
    }
    
    handleOpen = () => {
        this.setState({ isOpen: true })
      }
    
      handleClose = () => {
        this.setState({ isOpen: false })
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
                            trigger={ <Button color='purple' content="Create My Winery"/> }
                            content={this.renderWineryForm()}
                            on='click'
                            open={this.state.isOpen}
                            onClose={this.handleClose}
                            onOpen={this.handleOpen}
                            position='bottom'
                            width={8}
                        />
                    </Message>
                </div>
            ) 
        }
    }

    render(){
        return(
            <>
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

export default connect(mapStateToProps, { fetchWineries })(TankMap);