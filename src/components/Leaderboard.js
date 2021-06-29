import React, { Component }from 'react'
import { connect } from 'react-redux'

class Leaderboard extends Component{
    render(){
        return(
            this.props.list.map((user) => (
            <div className="question" key={user.id}>
                <div className="info">
                    <div className="user-info">
                        <img
                            src={user.avatarURL}
                            alt={`Avatar of ${user.name}`}
                            className="avatar"
                        />
                        <hr width="0" size="135"/>
                    </div>
                    <div className="score">
                        <h3>{user.name}</h3>
                        <p>Created questions: {user.questions.length}</p>
                        <p>Answered questions: {Object.keys(user.answers).length}</p>
                        <h3>Score: {user.questions.length + Object.keys(user.answers).length}</h3>
                    </div>
                </div>
            </div>
        )))
    }
}
function mapStateToProps({ users }){
    const sortedUsers = Object.keys(users).sort((a,b) => {
        const scoreA = users[a].questions.length + Object.keys(users[a].answers).length
        const scoreB = users[b].questions.length + Object.keys(users[b].answers).length
        return scoreB - scoreA
        })
    return{
        list: sortedUsers.map((user) => users[user])
    }
}

export default connect(mapStateToProps)(Leaderboard)