export const RECIEVE_USERS = "RECIEVE_USERS"
export const RECIEVE_ANSWER = "RECIEVE_ANSWER"
export const ADD_USER_QUESTION = "ADD_USER_QUESTION"


export function recieveUsers(users){
    return{
        type: RECIEVE_USERS,
        users,
    }
}

export function recieveAnswer({ authedUser, qid, answer })
{
    return{
        type: RECIEVE_ANSWER,
        authedUser,
        qid,
        answer
    }
}

export function addUserQuestion({ id, author })
{
    return{
        type: ADD_USER_QUESTION,
        qid: id,
        author,
    }
}