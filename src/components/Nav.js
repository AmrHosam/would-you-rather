import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'


class Nav extends Component {

  handleSubmit = (e) => {
    e.preventDefault()
    const { dispatch } = this.props
    dispatch(setAuthedUser(""))    

  }

  render(){
    const { user } = this.props
    return (
      <nav className='nav'>
        <ul>
          <li>
            <NavLink to='/' exact activeClassName='active'>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/add' activeClassName='active'>
              New Question
            </NavLink>
          </li>
          <li>
            <NavLink to='/leaderboard' activeClassName='active'>
              Leader Board
            </NavLink>
          </li>
          {user === undefined
          ? null :
          <li className="hello-msg">
            Hello {user.name}
            <form className="logout">
              <button type="submit">Logout</button>
            </form>
          </li>
          }
        </ul>
      </nav>
    )
  }
}

function mapStateToProps({authedUser, users}){
  return{
    user: users[authedUser]
  }
}

export default connect(mapStateToProps)(Nav)