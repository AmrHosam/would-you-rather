import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Question extends Component{
    render(){
        const { author, question } = this.props

        return(
            <div className="question">
                <div className="author">
                    <h3>{author.name} asks:</h3>
                </div>
                <div className="info">
                    <div className="user-info">
                        <img
                            src={author.avatarURL}
                            alt={`Avatar of ${author.name}`}
                            className="avatar"
                        />
                        <hr width="0" size="135"/>
                    </div>
                    <div className="question-info center">
                        <h3>Would you rather</h3>
                        <p>...{question.optionOne.text.substr(0,10)}...</p>
                        <Link to={`/question/${question.id}`}>
                            <button className="view-btn">View Poll</button>
                        </Link>
                    </div>

                </div>
            </div>
        )
    }
}

function mapStateToProps({authedUser, questions, users}, {id}){
    return{
        authedUser,
        question: questions[id] ? questions[id] : null,
        author: questions[id]? users[questions[id].author] : null,
    }
}

export default  connect(mapStateToProps)(Question)