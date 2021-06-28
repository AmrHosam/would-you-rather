import React, { Component } from 'react'
import { connect } from 'react-redux'
import { saveAnswer } from '../actions/shared'
import { Redirect } from 'react-router-dom'
// import ProgressBar from 'react-bootstrap/ProgressBar'

class QuestionPage extends Component{

    handleSubmit = (e) => {
        e.preventDefault()
        const { currentUser, question, dispatch } = this.props
        dispatch(saveAnswer({
            authedUser: currentUser.id,
            qid: question.id,
            answer: e.target[0].checked ? "optionOne" : "optionTwo"
        }))
    }

    render(){

        const { author, question, currentUser } = this.props

        if(question === null){
            return <Redirect to="/404" />
        }

        const answered = Object.keys(currentUser.answers).find((id) => id === question.id) ? true : false

        let optionOneVotes = 0
        let optionTwoVotes = 0
        let totalVotes = 0
        let answerIsOptionOne = false

        if(answered){
            optionOneVotes = question.optionOne.votes.length
            optionTwoVotes = question.optionTwo.votes.length
            totalVotes = optionOneVotes + optionTwoVotes
            answerIsOptionOne = currentUser.answers[question.id] === "optionOne"? true : false
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
                            style={{marginBottom:'40%'}}
                        />
                        <hr width="0" size="220"/>
                    </div>
                    {!answered? (
                        <div className="question-info">
                            <h3>Would You Rather ...</h3>
                            <form onSubmit={this.handleSubmit}>
                                <input type="radio" id={question.optionOne.text} name="option" className="choice" value="optionOne" defaultChecked/>
                                <label htmlFor={question.optionOne.text}>{question.optionOne.text}</label><br/>
                                <input type="radio" id={question.optionTwo.text} name="option" className="choice" value="optionTwo"/>
                                <label htmlFor={question.optionTwo.text}>{question.optionTwo.text}</label><br/>
                                <button type="submit" className="submit-btn">Submit</button>
                            </form>
                        </div>    
                        ):(
                            <div className="question-info">
                                <h3>Results:</h3>
                                <h5>Would you rather {question.optionOne.text}? {answerIsOptionOne&&<span style={{textDecoration: 'underline'}}>Your vote</span>}</h5>
                                {/* <ProgressBar min-width="20" label={`${optionOneVotes}/${totalVotes}`} now={(optionOneVotes/totalVotes)*100} /> */}
                                <h6 className="center">{`${optionOneVotes} out of ${totalVotes} votes`}</h6>
                                <h5>Would you rather {question.optionTwo.text}? {!answerIsOptionOne&&<span style={{textDecoration: 'underline'}}>Your vote</span>}</h5>
                                <h6 className="center">{`${optionTwoVotes} out of ${totalVotes} votes`}</h6>
                                {/* <ProgressBar label={`${optionTwoVotes}/${totalVotes}`} now={(optionTwoVotes/totalVotes)*100} /> */}
                            </div>
                        )}


                </div>
            </div>
        )
    }
}

function mapStateToProps({authedUser, questions, users}, {match}){
    const id = match.params.id
    return{
        currentUser: users[authedUser],
        question: questions[id] ? questions[id] : null,
        author: questions[id]? users[questions[id].author] : null,
    }
}

export default  connect(mapStateToProps)(QuestionPage)