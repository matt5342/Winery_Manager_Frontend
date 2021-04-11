import React, { Component } from 'react';
import { connect } from 'react-redux';
import fetchWineries from '../actions/fetchWineries'
import { Card, Popup, Form, Input, Message, Button } from 'semantic-ui-react'
let default_winery = require(`../assets/default_winery_photo.jpg`) 

class WineryContainer extends Component {

    renderCards = () => {
        return this.props.wineries.map(winery => {
            return (
                <Card
                    image={default_winery.default}
                    header={winery.name}
                    key={winery.id}
                    href={`/winery/${winery.id}`}
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
    return(
        state.wineries
    ) 
    
  }

export default connect(mapStateToProps)(WineryContainer);