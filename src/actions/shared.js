import { showLoading, hideLoading } from 'react-redux-loading'
import { getInitialData, saveQuestionAnswer, saveQuestion } from '../utils/api'
import { recieveUsers, recieveAnswer, addUserQuestion } from './users'
import { recieveQuestions, recieveVotes, addNewQuestion } from './questions'
import { setAuthedUser } from './authedUser'

const AUTHED_ID = ""

export function handleInitialData(){
    return (dispatch) => {
        return getInitialData().then(({users, questions}) => {
            dispatch(showLoading())
            dispatch(recieveUsers(users))
            dispatch(recieveQuestions(questions))
            dispatch(setAuthedUser(AUTHED_ID))
            dispatch(hideLoading())
        })
    }
}

export function saveAnswer(info){
    return (dispatch) => {
        saveQuestionAnswer(info).then(() => {
            dispatch(recieveAnswer(info))
            dispatch(recieveVotes(info))
        })
    }
}

export function handleAddQuestion(optionOneText, optionTwoText){
    return (dispatch, getState) => {
        const { authedUser } = getState()

        dispatch(showLoading())
        return saveQuestion({ 
            author: authedUser,
            optionOneText,
            optionTwoText,
        }).then((formattedQuestion) => {
            dispatch(addNewQuestion(formattedQuestion))
            dispatch(addUserQuestion(formattedQuestion))
        }).then(() => dispatch(hideLoading()))
    }
}