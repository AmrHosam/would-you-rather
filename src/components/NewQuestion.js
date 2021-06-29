import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/shared'
import { Redirect } from 'react-router-dom'

class NewQuestion extends Component{
    state = {
        optionOne: '',
        optionTwo: '',
        toHome: false,
    }
    
    handleChange = (e) => {
        e.preventDefault()
        const option = e.target.name
        const text = e.target.value
        if(option === "optionOne"){
            this.setState((prevState) => ({
                optionOne: text,
                optionTwo: prevState.optionTwo

            }))
        } else if(option === "optionTwo"){
            this.setState((prevState) => ({
                optionOne: prevState.optionOne,
                optionTwo: text
            }))
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        
        const { optionOne, optionTwo } = this.state

        //add question to store
        const { dispatch } = this.props
        dispatch(handleAddQuestion(optionOne, optionTwo))

        this.setState(() => ({
            optionOne: '',
            optionTwo: '',
            toHome: true,
        }))

    }
    render(){
        const { optionOne, optionTwo, toHome } = this.state
        if(toHome === true){
            return <Redirect to="/" />
        }
        return(
            <div className="container center">
                <h1 className="center">Create New Question</h1>
                <hr width="100%"></hr>
                <p>Complete the question</p>
                <h3>Would you rather ...</h3>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" className="option" placeholder="Enter Option One Text Here" name="optionOne" onChange={this.handleChange} value={optionOne}/>
                    <h3 className="center"> OR </h3>
                    <input type="text" className="option" placeholder="Enter Option Two Text Here" name="optionTwo" onChange={this.handleChange} value={optionTwo}/>
                    <button type="submit" className="submit-btn" disabled={optionOne === "" || optionTwo === ""}>Submit</button>
                </form>
            </div>
        )
    }
}

export default connect()(NewQuestion)