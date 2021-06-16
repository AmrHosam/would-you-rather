import { showLoading, hideLoading } from 'react-redux-loading'
import { getInitialData } from '../utils/api'
import { recieveUsers } from './users'
import { recieveQuestions } from './questions'
import { setAuthedUser } from './authedUser'


const AUTHED_ID = "tylermcginnis"

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