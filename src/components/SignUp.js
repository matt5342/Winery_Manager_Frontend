import React, { Component } from 'react'
import { Header } from 'semantic-ui-react'
import { connect } from 'react-redux'
import fetchUser from '../actions/fetchUser'
import { push } from 'connected-react-router'
import SignUpForm from './forms/SignUpForm';
import { Modal } from 'semantic-ui-react';


class SignUp extends Component {
    state = {
        modalOpen: false, 
        modalContent: ''
    }
  
    // handleChange = (e, { name, value }) => this.setState({ [name]: value })
  
    handleSubmit = values => {

    let reqObj = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            owner: {
                username: values.username,
                password: values.password, 
                email: values.email,
                winery_name: values.winery_name
            }
        })
    }
    fetch('http://localhost:3000/signup', reqObj)
    .then(r => r.json())
    .then(data => {
        // debugger
        if (Object.keys(data).includes("email")) {
            // debugger
            this.setState({modalOpen: true, modalContent: data.email[0]})
        }
        else if (Object.keys(data).includes("username")) {
            // debugger
            this.setState({modalOpen: true, modalContent: data.username[0]})
        }
        else {
            localStorage.setItem("token", data.jwt)
            this.props.fetchUser()
            this.props.push('/home')
        }
        }) 
}

    render() {
        return(
            <div>
                <Header>Sign Up</Header>
                {<SignUpForm handleSubmit={this.handleSubmit} />}
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
export default connect(null, { fetchUser, push })(SignUp)