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
            let colorCode = 'grey';
            if (tank.lots[0]){
                switch (tank.lots[0].color) {
                    case "Red":
                        colorCode = "rgba(122, 36, 72, 0.822)"
                        break;
                    case "White":
                        colorCode = "rgba(238, 210, 84, 0.842)"
                        break;
                    case "Rosé":
                        colorCode = "rgba(210, 101, 134, 0.842)"
                        break;
                    default:
                        colorCode = "grey"
                        break;
                }
            }
            // color for reds: rgba(122, 36, 72, 0.822)
            // rose: rgba(210, 101, 134, 0.842)
            // white: rgba(238, 210, 84, 0.842);
            return (
                <div key={tank.id} 
                    data-grid={{x: tank.xaxis, y: tank.yaxis, w: tank.width, h: tank.height}}
                    style={{ backgroundColor: colorCode }}
                >
                    <span className='text' style={{fontWeight: 'bold'}}>
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