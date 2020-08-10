import React, {Component, useEffect} from "react";
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import MCBlock from './MCBlock'
import TFBlock from './TFBlock'
import Col from "react-bootstrap/Col";
import Timer from "./Timer";
import Row from "react-bootstrap/Row";
import ReverseTimer from "./ReverseTimer";
import ProgressBar from "react-bootstrap/ProgressBar";
import DateTimerPercent from "./DateTimerPercent";


let QuestionCounterDisplay = (props) => {
    return (
        <>
            <h1>Question <b>{props.counter + 1}</b> out
                of <b>{props.maxQuestions}</b></h1>
            <h4>score: {props.score > 0 ? props.score : "---"}</h4>
        </>
    )
};

function DisplayJumbo(props) {
    return props.currentQuestion
}

function DisplayAnswer(props) {
    //(score, correct, points, questionsLeft, startNextQuestion)
    const usrWasCorrect = props.correct;
    const points = props.points;
    const timerScore = props.timerScore
    const questionsLeft = props.questionsLeft;
    const grats = ["Nice!", "Correct!", "Bingo!", "Excellent!", "Yahtzee!", "Grats!"]
    const shucks = ["Shucks...", "Darn...", "Breh...", "Bummer...", "Wiff...", "Bust..."]
    const goodJob = shuffle(grats, "Wicked!");
    const scold = shuffle(shucks, "Dang...");

    return (
        <div>

            {/*grats on correct answer, harsh scolding on incorrect answer*/}
            {usrWasCorrect ? <h3>{goodJob[0]} You earned <b>+{timerScore}</b> points out of {points}!</h3> : <h3>{scold[0]}</h3>}
            {/*On the last page, make a button to go to results*/}
            {questionsLeft === 0 &&
            <>
                {props.disableTimer()}
            <Button
                variant="primary"
                onClick={() => {
                    props.initNextQuestion()
                }}
            > Get Results!</Button>
            </>
            }
        </div>
    )
};

function shuffle(incorrect, correct) {
    // stores all answer  choices into one array
    let array = incorrect;
    array.push(correct);

    // for testing
    if (correct !== "Wicked!" && correct !== "Dang...")
        console.log("correct answer is " + decodeURIComponent(correct));

    let currentIndex = array.length,
        tempValue,
        randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        tempValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = tempValue;
    }
    return array;
}

class TriviaGame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            currentQuestion: '',
            questionBank: [],
            maxScore: 0,
            gameDifficulty: 0,
            questions: [],
            //Score set to -1 to differentiate between a score of 0 and not having a score yet without using null
            score: 0,
            counter: 0,
            answerChoice: "",
            gameOver: false,
            displaying: -1,
            scoresPosted: false,
            timerScore: null,
            disableTimer: false

        }
        ;
        this.setA = this.setA.bind(this);
        this.setTF = this.setTF.bind(this);
        this.toggleQA = this.toggleQA.bind(this);
        this.setScore = this.setScore.bind(this);
        this.setTimerScore = this.setTimerScore.bind(this)
        this.disableTimer = this.disableTimer.bind(this)
    }

    disableTimer(){
        console.log("disabled timers")
        if(!this.state.disableTimer)
            this.setState({disableTimer: true})
    }

    async componentDidMount() {
        var self = this;
        //DO NOT REMOVE THIS LINE
        this.getUserInfo()

        let response = fetch(this.props.requestUrl, {
            method: "GET",
            dataType: "JSON",
            ContentType: "charset=url3986"
        })
            .then((resp) => {
                return resp.json();
            })
            .then((resp) => {
                this.setState({
                    questionBank: resp.results,
                    maxQuestions: this.props.maxQuestions - 1,
                    timer: this.props.timer,
                    type: this.props.type
                });
            })
            .catch((error) => {
                console.log(error, "catch the hoop")
            });

        //Sets the game difficulty multiplier for score (1: 10secs, 1/2: 20secs, 1/60:60secs)

    }

    setScore() {
        //this.state.score,this.state.maxScore,this.determineCorrect(this.state.answerChoice, this.getCorrect([this.state.counter]))this.toggleQA()
        let crct = this.determineCorrect(this.state.answerChoice, this.getCorrect([this.state.counter]));
        let maxScore = this.state.maxScore;
        let timerScore = this.state.timerScore;
        let ptval = this.calcPointValue(this.state.counter);
        if (crct) {
            this.setState({score: this.state.score + timerScore, maxScore: maxScore + ptval})
        } else {
            this.setState({score: this.state.score, maxScore: maxScore + ptval})
        }
        this.toggleQA()
    }

    getUserInfo() {
        let token = this.props.token;
        let requestUrl = "https://klingons.pythonanywhere.com/api/v1/profile/" +
            this.props.id + "/";
        let response = fetch(requestUrl, {
            method: "GET",
            dataType: "JSON",
            headers: {
                "Authorization": token,
            }
        }).then((resp) => {
            return resp.json();
        }).then((resp) => {
            this.setState({userScoreTotal: resp.score})
        }).catch((error) => {
            console.log(error, "Error in getUserInfo()");
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.questionBank !== this.state.questionBank) {
            //TF questions don't have incorrect answers to shuffle
            if (this.state.type === "multiple") {
                this.setState({
                    questions: shuffle(this.state.questionBank[this.state.counter].incorrect_answers, this.state.questionBank[this.state.counter].correct_answer),
                    currentQuestion: this.state.questionBank[0].question
                })
            }
            this.setState({loading: false, currentQuestion: decodeURIComponent(this.state.questionBank[0].question)});
        }
    }

    getCorrect(num) {
        return this.state.questionBank[num].correct_answer
    }

    determineCorrect(myAnswer, Answer) {
        if (myAnswer === Answer) {
            return true;
        }
        return false;
    }

    calcPointValue(currentQuestion) {
        if (this.state.questionBank[currentQuestion].difficulty === "easy") {
            if(this.state.type === "multiple")
                return 100;
            else
                return 50;
        } else if (this.state.questionBank[currentQuestion].difficulty === "medium") {
            if(this.state.type === "multiple")
                return 500;
            else
                return 100;
        } else {
            if(this.state.type === "multiple")
                return 1000;
            else
                return 200;
        }
    }

    toggleQA() {
        //toggle the question and answer displays
        let currentQuestion = this.state.counter, displaying = this.state.displaying, gameover = false, answers = [];

        if (displaying === -1) {
           //display answers
            if (this.state.counter <= this.state.maxQuestions)
                this.setState({displaying: 0})
        } else if (displaying === 0) {               //display correct answers
            if (this.state.counter <= this.state.maxQuestions)
                this.setState({displaying: 1})
        } else if (displaying === 1) {              //display question
            displaying = -1;
            //prevent going over the number of questions
            if (currentQuestion < this.state.maxQuestions) {
                currentQuestion += 1;
            } else {
                gameover = true;
            }
            //
            if (this.state.type === "multiple") {
                answers = shuffle(this.state.questionBank[currentQuestion].incorrect_answers, this.state.questionBank[currentQuestion].correct_answer);
            }
            this.setState({
                displaying: displaying,
                gameOver: gameover,
                counter: currentQuestion,
                questions: answers,
                answerChoice: null,
                currentQuestion: decodeURIComponent(this.state.questionBank[currentQuestion].question)
            });
        }
    }

    setTF(value) {
        this.setState({answerChoice: value});
    }

    setA(value) {
        this.setState({answerChoice: this.state.questions[value]});

    };

    setTimerScore(timerScore){
        let ptval = this.calcPointValue(this.state.counter);
        let timerScoreA;
        if(timerScore < 75)
            timerScoreA = (timerScore + 25)/100;
        else
            timerScoreA = 1
        this.setState({

            timerScore: Math.round(timerScoreA * ptval)
        })
    }

    scoreMultiplier(max, timer) {
        let p = 0;
        if (timer !== 0) {
            p = (timer * 100);
            p = 10000 / p;
            p = Math.round(p);
            p = p * .2;
            if (p < .03) {
                p = .28
            }
            p *= 100;
            p = Math.round(p)
        }
        p /= 100;
        p= Math.round(p)
        return p
    }

    loadingResults(waitVar, s, total, accountTotal, timer, max) {
        if (waitVar === null) {
            return <h1>Loading Results...</h1>
        }else if (timer > 0){
            return<div>
                <h1>You scored {total} out of {max}!</h1>
                <h3>Timer multiplier: <b>{s * 10}0%</b></h3>
                <h1>Total: <b>{s * total} points!</b></h1>
                <br/>
                <h1><b>Your account total is : {accountTotal + s * total}</b></h1>
                <h1>Shorter timers, bigger multipliers!</h1>
            </div>
        }else{
            return<div>
                <h1>You scored {total} out of {max}!</h1>
                <h3>Timer multiplier: <b>0%</b></h3>
                <h1>Total: <b>{Math.round((s * total))} points!</b></h1>
                <h1>Play with timers on to collect points! Shorter timers, bigger multipliers!</h1>
            </div>
        }
    }

    DisplayResults(total, max, timer) {


        const s = this.scoreMultiplier(max, timer);
        let accountTotal = this.state.userScoreTotal
        let d;
        let response;
        let token = this.props.token;
        const requestUrl = "https://klingons.pythonanywhere.com/api/v1/profile/" + this.props.id + "/";

        if(!this.state.scoresPosted){response = fetch(requestUrl, {
            method: "PATCH",
            dataType: "JSON",
            headers: {
                "Authorization": token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "score": accountTotal + (s * total)
            })
        })
            .then((resp) => {
                return resp.json();
            })
            .then((resp) => {
                this.setState({scoresPosted: true})
            })
            .catch((error) => {
                console.log(error, "catch the hoop")
            });}

        return this.loadingResults(response, s, total, accountTotal, timer, max)
    }


    render() {

        return (
            <Container>
                {this.state.timer > 0 && this.state.displaying === 0 ?
                    <DateTimerPercent                                       //question Timer
                        tValue={this.props.timer}
                        display={true}
                        reset={this.state.counter}
                        getTimeValue={this.state.answerChoice}
                        getTime = {this.setTimerScore}
                        callback = {this.toggleQA}
                        maxPointsForQuestion = {this.calcPointValue(this.state.counter)}
                    />
                    :
                    [this.state.displaying === 1 && !this.state.disableTimer ?
                        <>
                            <ProgressBar now={0}/>
                            <Timer                       // reveal answer timer
                                display={false}
                                tValue={4}
                                show={this.state.displaying}
                                reset={this.props.displaying}
                                timeEndCallback={this.setScore}/>
                        </>
                        : [!this.state.disableTimer ?
                        <ReverseTimer                           //readthequestiontimer
                            display={true}
                            tValue={3}
                            show={this.state.displaying}
                            reset={this.props.displaying}
                            timeEndCallback={this.toggleQA}/>:
                            <ProgressBar now={0}/>
                        ]]}
                <br/>
                <center>
                    {this.state.loading || this.state.questionBank === [] ? (
                        <p>loading game...</p>
                    ) : (
                        <div>
                            {!this.state.gameOver ? (
                                <div>
                                    <div align={"left"}>
                                        <Row>
                                            <Col>

                                                <QuestionCounterDisplay
                                                    counter={this.state.counter}
                                                    maxQuestions={this.state.maxQuestions + 1}
                                                    score={this.state.score}
                                                />

                                            </Col>
                                            <Col>
                                                {this.state.displaying !== -1 && this.state.answerChoice !== null &&
                                                <h1>{this.state.timerScore}</h1>}
                                                {/*spacer element*/}
                                                <button style={{visibility: "hidden"}}/>
                                            </Col>
                                        </Row>
                                    </div>

                                    <Jumbotron className="question align-items-center"
                                               style={{backgroundColor: "FloralWhite"}}>
                                        <h2>
                                            {this.state.displaying <= 0 ?
                                                <DisplayJumbo
                                                    currentQuestion={this.state.currentQuestion}
                                                />
                                                :
                                                <DisplayAnswer
                                                    score={this.state.score}
                                                    correct={this.determineCorrect(this.state.answerChoice, this.getCorrect([this.state.counter]))}
                                                    points={this.calcPointValue(this.state.counter)}
                                                    questionsLeft={this.state.maxQuestions - this.state.counter}
                                                    initNextQuestion={this.toggleQA}
                                                    timerScore = {this.state.timerScore}
                                                    returnScores={this.setScore}
                                                    disableTimer = {this.disableTimer}
                                                />

                                            }
                                        </h2>
                                    </Jumbotron>
                                    {/* This block renders the appropriate answer selection*/}
                                    {this.state.type === "multiple" && this.state.displaying >= 0 ?
                                        <MCBlock
                                            questions={this.state.questions}
                                            answerCallback={this.setA}
                                            answerDisplay={this.state.displaying}
                                            correctAnswer={this.getCorrect(this.state.counter)}/>
                                        : [
                                            this.state.type === "boolean" && this.state.displaying >= 0 &&
                                            <TFBlock
                                                questions={this.state.questions}
                                                answerDisplay={this.state.displaying}
                                                counter={this.state.counter}
                                                correctAnswer={this.getCorrect(this.state.counter)}
                                                answerCallback={this.setTF}/>]}
                                    {/*counter must be passed to TF even though it does not use then, because it resets the selection*/}
                                    <br/>
                                    <Container>
                                        <Row>
                                            <Col>
                                                <button style={{visibility: "hidden"}}/>
                                                {this.state.displaying === 0 &&
                                                <Button
                                                    onClick={() => this.toggleQA()}
                                                    style={{visibility: "hidden"}}
                                                    variant="secondary">
                                                    Submit

                                                </Button>}
                                            </Col>
                                            <Col>
                                                {this.state.displaying === 1 && this.state.counter < this.state.maxQuestions ?
                                                    <Button
                                                        onClick={() => {
                                                            this.setScore()
                                                        }}
                                                        style={{visibility: "hidden"}}
                                                        variant="secondary">
                                                        Next
                                                    </Button> : ""}
                                                <button style={{visibility: "hidden"}}/>
                                            </Col>
                                        </Row>
                                    </Container>
                                </div>

                            ) : (
                                <div>
                                    {this.DisplayResults(this.state.score, this.state.maxScore, this.state.timer)}
                                </div>
                            )}
                        </div>
                    )}
                </center>
            </Container>
        )
    }
}


export default TriviaGame;
