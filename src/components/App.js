import React, { Component } from 'react'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'
import { handleInitialData } from '../actions/shared'
import Home from './Home'

class App extends Component {
  componentDidMount(){
    this.props.dispatch(handleInitialData())
  }
  render(){
    return (
      <div className="App">
        <LoadingBar/>
        {this.props.loading === true
          ? null
          : <Home/> }
      </div>
    );
  }
}

function mapStateToProps({ authedUser }){
  return{
    loading: authedUser===null
  }
}

export default connect(mapStateToProps)(App)
