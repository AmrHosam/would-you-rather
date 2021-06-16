import React, { Component } from 'react'
import { connect } from 'react-redux'

class Question extends Component{
    render(){
        const { author, question, viewed } = this.props

        if(question === null){
            return <p>This Question does not exist.</p>
        }
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
                    {!viewed
                        ?(
                            <div className="question-info center">
                                <h3>Would you rather</h3>
                                <p>...{question.optionOne.text.substr(0,10)}...</p>
                                <button className="view-btn">View Poll</button>
                            </div>)
                        :(
                            <div className="question-info">
                                <h3>Would You Rather ...</h3>
                                <form>
                                    <input type="radio" id={question.optionOne.text} name="option" className="option" value="one" checked/>
                                    <label for={question.optionOne.text}>{question.optionOne.text}</label><br/>
                                    <input type="radio" id={question.optionTwo.text} name="option" className="option" value="two"/>
                                    <label for={question.optionTwo.text}>{question.optionTwo.text}</label><br/>
                                    <button type="submit" className="submit-btn">Submit</button>
                                </form>
                            </div>
                        )}

                </div>
            </div>
        )
    }
}

function mapStateToProps({questions, users}, {id, viewed}){
    return{
        question: questions[id] ? questions[id] : null,
        author: questions[id]? users[questions[id].author] : null,
        viewed,
    }
}

export default  connect(mapStateToProps)(Question)