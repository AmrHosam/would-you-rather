import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'
import { handleInitialData } from '../actions/shared'
import Home from './Home'
import NewQuestion from './NewQuestion'
import Leaderboard from './Leaderboard'
import Nav from './Nav'
import QuestionPage from './QuestionPage'
import SignIn from './SignIn'
import NotFoundPage from './NotFoundPage' 

class App extends Component {
  componentDidMount(){
    this.props.dispatch(handleInitialData())
  }
  render(){
    return (
      <Router>
        <Fragment>
          <LoadingBar/>
          <div className="App">
            <Nav/>
            {this.props.loading === true
              ? null
              : 
              this.props.loggedout === true
                ? <SignIn/>
              :
              <div>
                <Route path="/" exact component={Home} />
                <Route path='/question/:id' component={QuestionPage} />
                <Route path="/add" component={NewQuestion} />
                <Route path="/leaderboard" component={Leaderboard}/>
                <Route path="/404" component={NotFoundPage}/>
              </div>}
          </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({ authedUser }){
  return{
    loading: authedUser===null,
    loggedout: authedUser === ""
  }
}

export default connect(mapStateToProps)(App)
