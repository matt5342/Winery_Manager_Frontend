import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Popup, Form, Input, Message, Button } from 'semantic-ui-react'
import Draggable, {DraggableCore} from 'react-draggable';


class TankContainer extends Component {
    state = {
        activeDrags: 0,
        deltaPosition: {
          x: 0, y: 0
        },
        controlledPosition: {
          x: -400, y: 200
        }
      };
    
    handleDrag = (e, ui) => {
    const {x, y} = this.state.deltaPosition;
    this.setState({
        deltaPosition: {
        x: x + ui.deltaX,
        y: y + ui.deltaY,
        }
    });
    };

    onStart = () => {
    this.setState({activeDrags: ++this.state.activeDrags});
    };

    onStop = () => {
    this.setState({activeDrags: --this.state.activeDrags});
    };
    onDrop = (e) => {
    this.setState({activeDrags: --this.state.activeDrags});
    if (e.target.classList.contains("drop-target")) {
        alert("Dropped!");
        e.target.classList.remove('hovered');
    }
    };
    onDropAreaMouseEnter = (e) => {
    if (this.state.activeDrags) {
        e.target.classList.add('hovered');
    }
    }
    onDropAreaMouseLeave = (e) => {
    e.target.classList.remove('hovered');
    }

    renderTanks = () => {
        const dragHandlers = {onStart: this.onStart, onStop: this.onStop};
        const {deltaPosition} = this.state;
        return this.props.tanks.map(tank => {
            return (
                <div style={{height: '800px', width: '1000px', padding: '10px'}}>
                    <Draggable defaultPosition={{x:tank.xaxis, y:tank.yaxis}} bounds="parent" {...dragHandlers}>
                    <div className="tank">
                        {tank.name}
                    </div>
                    </Draggable>
                </div>
            )
        })
    }
    
    render(){
        return(
            <div>
                <div className="box" style={{height: '100%', width: '100%', position: 'center', overflow: 'auto', padding: '0'}}>
                    {this.renderTanks()}
                </div>

            </div>
        )
    }

}

const mapStateToProps = state => {
    return(
        state.tanks
    ) 
    
  }

export default connect(mapStateToProps)(TankContainer);