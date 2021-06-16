import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'

class Home extends Component{

    state = {
        answered : false,
    }

    handleTabsChange = (e) => {
        e.preventDefault()
        this.setState(() => ({
            answered: e.target.name === "answered" ? true : false
        }))

    }

    render(){
        const { answered } = this.state
        const toBeDisplayed = answered? this.props.answeredId:this.props.unansweredId
        return(
            <div className="questions-list">
                <div className="tabs">
                    <button className={!answered?"clicked-btn":""} name="unanswered" onClick={this.handleTabsChange}>Unanswered Questions</button>
                    <button name="answered" className={answered?"clicked-btn":""} onClick={this.handleTabsChange}>Answered Questions</button>
                </div>
                <ul className="">
                    {toBeDisplayed.map((id) => (
                        <li key={id}>
                            <Question id={id} viewed={true}/>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

function mapStateToProps({users, questions, authedUser}){
    const userAnswers = users[authedUser].answers
    const questionsId = Object.keys(questions).sort((a, b) => questions[b].timestamp - questions[a].timestamp)
    const answeredId =  Object.keys(userAnswers).sort((a, b) => userAnswers[b].timestamp - userAnswers[a].timestamp)
    return{
        answeredId: answeredId,
        unansweredId: questionsId.filter((question) => !answeredId.includes(question))
    }
}

export default connect(mapStateToProps)(Home)