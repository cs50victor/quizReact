import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./Assets/style.scss";
import API from "./API";
import QuestionBox from "./Components/QuestionBox";
import Result from "./Components/Result";

class Quiz extends Component{
    state = {
        questionBank:[],
        score: 0,
        response: 0
    };
    getQuestions = () =>{
        API().then(question => {
            this.setState({
                questionBank: question
            });
        });
    };
    computeAnswer = (answer, correctAnswer) =>{
        if (answer === correctAnswer){
            this.setState({
                score: this.state.score + 1
            });
        }
        this.setState({
            response: this.state.response < 5 ? this.state.response + 1 : 5
        });
    };
    playAgain = () =>{
        this.getQuestions();
        this.setState({
            score: 0,
            response: 0
        });
    }
    componentDidMount(){
        this.getQuestions();
    }
    render(){
        return(
            <div className="container">
                <h1 className="title">Quiz</h1>
                {this.state.questionBank.length > 0 && this.state.response <5 && this.state.questionBank.map(
                    ({question, answers, correct, questionId}) => (
                        <QuestionBox 
                            question={question}
                            options={answers}
                            key={questionId}
                            selected={answer => this.computeAnswer(answer, correct)}
                        />
                    )
                )}
                {this.state.response === 5 ? ( 
                    <Result score={this.state.score} playAgain={this.playAgain} />
                ): null}
            </div>
        );
    }
}

ReactDOM.render(<Quiz/>, document.getElementById("root"));