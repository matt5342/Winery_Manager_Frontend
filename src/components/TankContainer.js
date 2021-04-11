import React, { Component } from 'react';
import { connect } from 'react-redux';
import patchTanks from '../actions/patchTanks'
import { Card, Popup, Form, Input, Message, Button } from 'semantic-ui-react'
import { Responsive, WidthProvider } from 'react-grid-layout';
//https://github.com/react-grid-layout/react-grid-layout

const ResponsiveGridLayout = WidthProvider(Responsive);


class TankContainer extends Component {
    state = {
        layout: null, 
        isDraggable: false, 
        isResizable: false
    }

    renderTanks = () => {
        return this.props.tanks.map(tank => {
            // debugger
            return (
                <div key={tank.id} 
                    data-grid={{x: tank.xaxis, y: tank.yaxis, w: tank.width, h: tank.height}}
>
                    <span className='text'>
                        {tank.name}
                    </span>
                </div>
            )
        })
    }
    onLayoutChange = (layout) => {
        this.setState({layout: layout})
        // debugger
    }
    clickEditLayout = () => {
        this.setState({
            isDraggable: !this.state.isDraggable, 
            isResizable: !this.state.isResizable
        })
    }
    clickSaveLayout = () => {
        // debugger
        this.clickEditLayout()
        this.props.patchTanks(this.state.layout, this.props.tanks[0].winery_id)
    }
    
    render(){
        return(
            <div>
                <Button onClick={this.state.isDraggable ? this.clickSaveLayout : this.clickEditLayout}>{this.state.isDraggable ? "Save Layout" : "Edit Layout"}</Button>
                <ResponsiveGridLayout 
                    className='layout' compactType={null}         
                    breakpoints={{lg: 40}}
                    rowHeight={20}
                    cols={{lg: 40}}
                    onLayoutChange={(layout) => 
                    this.onLayoutChange(layout) }
                    isDraggable={this.state.isDraggable}
                    isResizable={this.state.isResizable}
                    preventCollision={true}
                    >
                    {this.renderTanks()}
                </ResponsiveGridLayout>

            </div>
        )
    }

}

const mapStateToProps = state => {
    return(
        state.tanks
    ) 
    
  }

export default connect(mapStateToProps, { patchTanks })(TankContainer);