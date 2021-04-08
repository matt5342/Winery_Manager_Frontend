import React, { Component } from 'react'
import { Form, Input, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import fetchUser from '../actions/fetchUser'

class SignUpForm extends Component {
    state = {}
  
    handleChange = (e, { name, value }) => this.setState({ [name]: value })
  
    // handleSubmit = () => this.setState({ email: '', name: '' })
    handleSubmit = (e) => {
    e.preventDefault()
    let reqObj = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            owner: {
                username: this.state.username,
                password: this.state.password, 
                email: this.state.email
            }
        })
    }
    fetch('http://localhost:3000/signup', reqObj)
    .then(r => r.json())
    .then(data => {
            localStorage.setItem("token", data.jwt)
            this.props.fetchUser()
        }) 
}

    render() {
        const { name, email } = this.state

        return(
            <Form onSubmit={this.handleSubmit}>
                <Form.Field
                id='form-input-control-error-email'
                control={Input}
                type='email'
                name='email'
                label='Email'
                placeholder='winemaker@winery.com'
                className='eight wide field'
                onChange={this.handleChange}
                // error={{
                //     content: 'Please enter a valid email address',
                //     pointing: 'below',
                // }}
                />
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
                content='Sign Up'
                href='tankmap'
                // label='Label with htmlFor'
                />    
        </Form>
        )
    }
}
export default connect(null, { fetchUser })(SignUpForm)