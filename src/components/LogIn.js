import React, { Component } from 'react'
import { connect } from 'react-redux'
import fetchUser from '../actions/fetchUser'
import { push } from 'connected-react-router'
import LogInForm from './forms/LogInForm';
import { Modal } from 'semantic-ui-react';

class LogIn extends Component {
  
    state = {
        modalOpen: false
    }

    handleSubmit = values => {
        // debugger
        let reqObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                owner: {
                    username: values.username,
                    password: values.password, 
                }
            })
        }
        fetch('https://winery-manager.herokuapp.com/login', reqObj)
        .then(r => r.json())
        .then(data => {
            console.log(data)
            // debugger
            if (Object.keys(data).includes("message")) {
                this.setState({modalOpen: true})
                    // alert('Invalid username or password')
                }
                else{
                    localStorage.setItem("token", data.jwt)
                    this.props.fetchUser()
                    this.props.push('/home')
                }
            }) 

        }
        
        render() {
            return(
                <div>
                {<LogInForm handleSubmit={this.handleSubmit} />}
                {
                    <Modal size='mini' open={this.state.modalOpen} content='Invalid username or password.'
                            header='Invalid'
                            actions={[{ key: 'dismiss', content: 'Dismiss', positive: true}]}
                            onClose={() => this.setState({modalOpen: false})}
                    />
                }
            </div>
        )
    }
}

export default connect(null, { fetchUser, push })(LogIn)