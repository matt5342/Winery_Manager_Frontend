import React, { Component } from 'react';
import { connect } from 'react-redux';
import fetchSections from '../actions/fetchSections'
import { Grid, Segment, Divider, Icon, Header, Message, Button, List } from 'semantic-ui-react'


class Home extends Component {

    handleLogout = () => {
        localStorage.removeItem("token")
      }
    renderHome = () => {

        return (
            <div>
                <Header as='h1'>
                    Winery Manager
                </Header>
                <Message>
                    <List bulleted>
                        <List.Header as='h5'>A place to design your winery from scratch </List.Header>
                        <List.Item>Add your tanks and position them to match your actual winery</List.Item>
                        <List.Item>Create new lots to fill your tanks</List.Item>
                        <List.Item>Move the lots between tanks by creating work orders</List.Item>
                        <List.Item>Track wine movements and see active work orders</List.Item>
                    </List>


                </Message>
                
                <Segment placeholder>
            {
                localStorage.getItem("token") ?
                    <Grid columns={2} stackable textAlign='center'>
                    <Divider vertical>Or</Divider>
                    <Grid.Row verticalAlign='middle'>
                        <Grid.Column>
                        <Header href='/sections' icon>
                            <Icon name='warehouse' />
                            <Button href='/sections' primary>My Sections</Button>
                        </Header>
                        </Grid.Column>
                
                        <Grid.Column>
                        <Header href='/home' icon>
                            <Icon name='sign-out' />
                        </Header>
                        <Button primary               
                            href='/home'
                            onClick={this.handleLogout}
                        >Log Out</Button>
                        </Grid.Column>
                    </Grid.Row>
                    </Grid>
                :
                    <Grid columns={2} stackable textAlign='center'>
                    <Divider vertical>Or</Divider>
                    <Grid.Row verticalAlign='middle'>
                        <Grid.Column>
                        <Header href='/signup' icon>
                            <Icon name='signup' />
                            <Button primary href='/signup'>Sign Up</Button>
                        </Header>
                        </Grid.Column>
                
                        <Grid.Column>
                        <Header href='/login' icon>
                            <Icon name='sign-in' />
                        </Header>
                        <Button primary href='/login'>Log In</Button>
                        </Grid.Column>
                    </Grid.Row>
                    </Grid>
                
            }
            </Segment>

            </div>
        )
    }
    
    render(){
        return(
            <div >
                <br />
                {this.renderHome()}
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

export default connect(mapStateToProps)(Home);