import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { connect } from 'react-redux';


class Nav extends Component {
  state = {}
  handleLogout = () => {
    localStorage.removeItem("token")
  }
  handleSignedInState = () => {
    if (localStorage.getItem("token")){
      return (
        <>
            <Menu.Item
              name='username'
            >
                {this.props.user.user.username}
            </Menu.Item>
            <Menu.Item
              name='logout'
              href='/home'
              onClick={this.handleLogout}
              >
              Logout
            </Menu.Item>
        </>
      )
    }
    else {
      return (
        <>
            <Menu.Item
              name='login'
              href='/login'
            >
                Login
            </Menu.Item>
            <Menu.Item
              name='signup'
              href='/signup'
              >
              Sign Up
            </Menu.Item>

        </>
      )
    }
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu pointing>
        <Menu.Item
          name='home'
          href='/home'
          active={activeItem === 'home'}
          onClick={this.handleItemClick}
        >
          Home
        </Menu.Item>
        <Menu.Item
          name='sections'
          href='/sections'
          active={activeItem === 'sections'}
          onClick={this.handleItemClick}
        >
          Sections
        </Menu.Item>

        {/* <Menu.Item
          name='log'
          href='/log'
          active={activeItem === 'log'}
          onClick={this.handleItemClick}
        >
          Log
        </Menu.Item>

        <Menu.Item
          name='inventory'
          href='/inventory'
          active={activeItem === 'inventory'}
          onClick={this.handleItemClick}
        >
          Inventory
        </Menu.Item> */}
        <Menu.Item
          name='workOrders'
          href='/work_orders'
          active={activeItem === 'workOrders'}
          onClick={this.handleItemClick}
        >
          Work Orders
        </Menu.Item>
        <Menu.Menu position='right'>
          {this.handleSignedInState()}
        </Menu.Menu>
      </Menu>
    )
  }
}
const mapStateToProps = state => {
  return {
    user: state.user,
    requesting: state.requesting
  }
}
export default connect(mapStateToProps)(Nav);