import React, { Component } from 'react';
import { connect } from 'react-redux';
import fetchSections from '../actions/fetchSections'
import { Card, Popup, Form, Input, Message, Button } from 'semantic-ui-react'
let default_section = require(`../assets/default_winery_photo.jpg`) 

class SectionContainer extends Component {

    renderCards = () => {
        // debugger
        return this.props.sections.map(section => {
            return (
                <Card
                    header={section.name}
                    image={default_section.default}
                    key={section.id}
                    href={`/section/${section.id}`}
                />

            )
        })
    }
    
    render(){
        return(
            <div >
                <br />
                <Card.Group className='ui centered'>
                    {this.renderCards()}
                </Card.Group>
            </div>
        )
    }

}

const mapStateToProps = state => {
    // debugger
    return(
        state.sections
    ) 
  }

export default connect(mapStateToProps)(SectionContainer);