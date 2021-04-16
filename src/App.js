import React, { Component } from 'react';
import './App.css';
import Nav from './components/Nav'
import SignUpForm from './components/SignUp'
import LogIn from './components/LogIn'
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router' // react-router v4/v5
import { ConnectedRouter } from 'connected-react-router'
import configureStore, { history } from './configureStore'
import fetchUser from './actions/fetchUser'
import fetchWorkOrders from './actions/fetchWorkOrders'
import MainContainer from './components/MainContainer';
import TankMap from './components/TankMap';
import WorkOrderList from './components/WorkOrderList';
import fetchAllTanks from './actions/fetchAllTanks';
import fetchLots from './actions/fetchLots';
import SingleTank from './components/SingleTank';


const store = configureStore(/* provide initial state if any */)

class App extends Component {

  componentDidMount(){
    if(localStorage.getItem("token")){
      this.props.fetchUser()
      this.props.fetchWorkOrders()
      // this.props.fetchAllTanks()
      // this.props.fetchLots()
    }
  }

  render(){
    return (
      <div className="App">
      {/* <Provider store={store}> */}
        <ConnectedRouter history={history}>
          <>
            <Nav />
            <Switch>
              {/* <Route exact path='/'  /> */}
              <Route exact path='/signup' component={SignUpForm} />
              <Route exact path='/login' component={LogIn} />
              <Route exact path='/tankmap' component={MainContainer} />
              <Route path='/section/' component={TankMap} />
              <Route path='/work_orders/' component={WorkOrderList} />
              <Route path='/tank/' component={SingleTank} />
              <Route render={() => (<div>Miss</div>)} />
            </Switch>  
          </>
        </ConnectedRouter>
      {/* </Provider> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    requesting: state.requesting
  }
}
export default connect(mapStateToProps, { fetchUser, fetchWorkOrders, fetchAllTanks, fetchLots })(App);
