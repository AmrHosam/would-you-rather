export const RECIEVE_QUESTIONS = "RECIEVE_QUESTIONS"
export const RECIEVE_VOTES = "RECIEVE_VOTES"
export const ADD_QUESTION = "ADD_QUESTION"

export function recieveQuestions(questions){
    return{
        type: RECIEVE_QUESTIONS,
        questions,
    }
}

export function recieveVotes({ authedUser, qid, answer }){
    return{
        type: RECIEVE_VOTES,
        authedUser,
        qid,
        answer,
    }
}

export function addNewQuestion(question){
    return{
        type: ADD_QUESTION,
        question,
    }
}