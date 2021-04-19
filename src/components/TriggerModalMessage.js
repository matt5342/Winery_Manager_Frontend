import React, { Component } from 'react';
import { Modal } from 'semantic-ui-react'

class TriggerModalMessage extends Component {

    
    state = {
        modalOpen: true, 
    }
    render(){
        return (
            <div>
                {
                    <Modal size='mini' open={this.state.modalOpen} content={this.props.message}
                            header='Invalid'
                            actions={[{ key: 'dismiss', content: 'Dismiss', positive: true}]}
                            onClose={() => this.setState({modalOpen: false})}
                    />
                }            
            </div>
        )
    }
} 
export default TriggerModalMessage