import React, { Component } from 'react';
import { connect } from 'react-redux';
import fetchSections from '../actions/fetchSections'
import { Popup, Form, Input, Message, Button } from 'semantic-ui-react'
import SectionContainer from './SectionContainer';

class MainContainer extends Component {
    state = {
        isOpen: false
    }
    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    componentDidMount(){
        // debugger
        if (localStorage.getItem("token")){
            this.props.fetchSections()
        }
    }
    renderSectionForm = () => {
        return (
            <div>
                <Form style={{width: '300px'}} onSubmit={this.handleSectionSubmit}>
                    <Form.Field
                        style={{width: '300px'}}
                        id='form-input-control-name'
                        control={Input}
                        label='Name:'
                        name='name'
                        placeholder='Production Room'
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

    handleSectionSubmit = e => {
        e.preventDefault()
        let reqObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
                "Authorization": localStorage.getItem("token")
            },
            body: JSON.stringify({
                section: {
                    name: this.state.name
                }
            })
        }
        fetch('http://localhost:3000/section', reqObj)
        .then(r => r.json())
        .then(data => {
                // debugger
                // localStorage.setItem("token", data.jwt)
                this.props.fetchSections()
            }) 
    }
    
    handleOpen = event => {
        // debugger
        let whichOpen = event.target.name + 'IsOpen'
        this.setState({ [whichOpen]: true })
    }
    
    handleClose = event => {
        if (event.target.name === undefined){
            this.setState({ sectionIsOpen: false, tankIsOpen: false})
        }
        else{
            let whichOpen = event.target.name + 'IsOpen'
            this.setState({ [whichOpen]: false })
        }
    }
    
    checkForSection = () => {
        // debugger
        if (Object.keys(this.props.sections.sections).includes("error") || this.props.sections.sections.length < 1){
            return (
                <div>
                    <Message>
                        <Message.Header>No Section Created Yet</Message.Header>
                        <p>
                            Please create a section to continue.
                        </p>
                        <Popup
                            trigger={ <Button name='section' color='purple' content="Create a Section"/> }
                            content={this.renderSectionForm()}
                            on='click'
                            open={this.state.sectionIsOpen}
                            onClose={this.handleClose}
                            onOpen={this.handleOpen}
                            position='bottom center'
                            width={8}
                        />
                    </Message>
                </div>
            ) 
        }
        else if (Array.isArray(this.props.sections.sections)) {
            // debugger
            return (
                <div>
                    <Popup
                        trigger={ <Button name='section' color='purple' content="Add a Section"/> }
                        content={this.renderSectionForm()}
                        on='click'
                        open={this.state.sectionIsOpen}
                        onClose={this.handleClose}
                        onOpen={this.handleOpen}
                        position='bottom center'
                        width={8}
                        />
                    <SectionContainer />
                </div>
            )
        }
    }

    render(){
        return(
            <>
                <h1>Choose a Section</h1>
                {this.checkForSection()}
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        sections: state.sections
    }
  }

export default connect(mapStateToProps, { fetchSections })(MainContainer);