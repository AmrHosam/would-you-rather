import { RECIEVE_USERS, RECIEVE_ANSWER, ADD_USER_QUESTION } from '../actions/users'

export default function users(state = {}, action){
    switch(action.type){
        case RECIEVE_USERS:
            return{
                ...state,
                ...action.users
            }
        case RECIEVE_ANSWER:
            return{
                ...state,
                [action.authedUser]:{
                    ...state[action.authedUser],
                    answers:{
                        ...state[action.authedUser].answers,
                        [action.qid]:action.answer
                    }
                }
            }
        case ADD_USER_QUESTION:
            return{
                ...state,
                [action.author]:{
                    ...state[action.author],
                    questions: state[action.author].questions.concat([action.qid])
                }
            }
        default:
            return state
    }
}