import React, { Component } from 'react'
import { Form, Input, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import fetchUser from '../actions/fetchUser'
import { push } from 'connected-react-router'

class LogIn extends Component {
    state = {}
  
    handleChange = (e, { name, value }) => this.setState({ [name]: value })
  
    // handleSubmit = () => this.setState({ email: '', name: '' })
    handleSubmit = (e) => {
    e.preventDefault()
    debugger
    let reqObj = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            owner: {
                username: this.state.username,
                password: this.state.password, 
            }
        })
    }
    fetch('http://localhost:3000/login', reqObj)
    .then(r => r.json())
    .then(data => {
            localStorage.setItem("token", data.jwt)
            this.props.fetchUser()
            this.props.push('/tankmap')
            // this.props.setUser(data.user)
            // this.props.changeView('home')
        }) 
}

    render() {
        const { name } = this.state

        return(
            <Form onSubmit={this.handleSubmit}>
                <Form.Field
                    id='form-input-control-username'
                    control={Input}
                    label='Username'
                    name='username'
                    placeholder='Username'
                    className='eight wide field'
                    onChange={this.handleChange}
                />
                <Form.Field
                    id='form-input-control-password'
                    control={Input}
                    type='password'
                    name='password'
                    label='Password'
                    placeholder='Password'
                    className='eight wide field'
                    onChange={this.handleChange}
                />
                <Form.Field
                id='form-button-control-public'
                control={Button}
                content='Log In'
                // href='/tankmap'
                // label='Label with htmlFor'
                />    
        </Form>
        )
    }
}

export default connect(null, { fetchUser, push })(LogIn)