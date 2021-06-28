import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'


class SignIn extends Component{

    handleSubmit = (e) => {
        const { dispatch } = this.props
        e.preventDefault()
        const name = e.target[0].value
        dispatch(setAuthedUser(name))
        
    }

    render(){
        const { users } = this.props
        return(
            <div className="container">
                <div className="center">
                <h3>Welcome to the Would You Rather App!</h3>
                <p>Please sign in to continue</p>
                </div>
                <hr width="100%"/>
                <h3 className="center"> Sign in</h3>
                <form className="center" onSubmit={this.handleSubmit}>
                <select name="names" className="dropdown">
                    {Object.keys(users).map((id) => (
                        <option value={id} key={id}>{users[id].name}</option>
                    ))}
                </select>
                <button type="submit" className="submit-btn">Sign in</button>
                </form>
            </div>
        )
    }
}

function mapStateToProps({users}){
return{
    users,
}
}

export default connect(mapStateToProps)(SignIn)