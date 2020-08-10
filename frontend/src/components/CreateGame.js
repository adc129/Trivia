import React from "react";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Row, Col} from 'react-bootstrap';
import '../style.css';
import {Formik} from 'formik';


class CreateGame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    };

// This is the main logic for submission button. Its so large because it has to set states, calculate URL and handle the
//fetch. After execution, question data is held in (this.state.questionBank)
    fetchData = (values, questionBank) => {
        let amount = values.questionCount;
        let type = "";
        let category = null;
        let url = "";
        let timer = values.timerLength;

        //This block builds the URL for the api call to make questions
        if (values.qType === "Multiple Choice") {
            type = "multiple"
        } else {
            type = "boolean"
        }
        if (values.triviaCategories === "Sports") {
            category = 21
        } else if (values.triviaCategories === "Music") {
            category = 12
        } else if (values.triviaCategories === "General Knowledge") {
            category = 9
        } else if (values.triviaCategories === "History") {
            category = 23
        } else {
            category = 11 //movies
        }
        if (values.timerLength === "10s") {
            timer = 10
        } else if (values.timerLength === "7s") {
            timer = 7
        } else if (values.timerLength === "20s") {
            timer = 20
        } else if (values.timerLength === "60s") {
            timer = 60
        } else {
            timer = 0
        }
        //set the url
        url = "https://opentdb.com/api.php?amount=" + amount + "&category=" + category + "&type=" + type + "&encode=url3986"

        this.props.callbackGameData(url, type, timer, amount)
        this.props.switchToTrivia("TriviaGame")
    };

    render() {
        return (
            <Container style={{textAlign: "center"}}>

                <img className={"LetterHead"} src={require("../imgs/LH4.png")} alt={require("../imgs/3.png")} style={{
                    width: "350px",
                    height: "auto",
                    opacity: "1",
                    padding: "2",
                    textAlign: "center"
                }} alt={require("../imgs/5.png")}/>

                <Formik initialValues={{
                    triviaCategories: "General Knowledge",
                    qType: "Multiple Choice",
                    questionCount: 10,
                    timerLength: "10s"
                }}
                        onSubmit={(values, {setSubmitting, resetForm}) => {
                            // When button submits form and form is in the process of submitting, submit button is disabled
                            setSubmitting(true);
                            this.fetchData(values)
                            setTimeout(() => {

                                //alert(JSON.stringify(values, null, 2));
                                setSubmitting(false);
                            }, 500);

                            /* Resets form after submission is complete
                            resetForm();

                            // Sets setSubmitting to false after form is reset
                            setSubmitting(false);*/
                        }}
                >
                    {/* Callback function containing Formik state and helpers that handle common form actions */}
                    {({
                          values,
                          handleChange,
                          handleSubmit,
                          isSubmitting
                      }) => (
                        <Form onSubmit={handleSubmit}>

                            <Form.Group controlId={"triviaCategories"}>
                                <Row>
                                    <Form.Label column={"lg"} lg={3}>
                                        Trivia Category:
                                    </Form.Label>
                                    <Col sm={2}>
                                        <Form.Control
                                            as={"select"}
                                            onChange={handleChange}
                                            value={values.triviaCategories}>
                                            <option>General Knowledge</option>
                                            <option>History</option>
                                            <option>Sports</option>
                                            <option>Music</option>
                                            <option>Movies</option>
                                        </Form.Control>
                                    </Col>
                                </Row>
                            </Form.Group>

                            <Form.Group controlId={"qType"}>
                                <Row>
                                    <Form.Label column="lg" lg={3}>Question Types:</Form.Label>
                                    <Col sm={2}>
                                        <Form.Control
                                            as={"select"}
                                            onChange={handleChange}
                                            value={values.qType}>
                                            <option>Multiple Choice</option>
                                            <option>True or False</option>
                                        </Form.Control>
                                    </Col>
                                </Row>
                            </Form.Group>

                            <Form.Group controlId={"questionCount"}>
                                <Row>
                                    <Form.Label column="lg" lg={3}>Number of Questions:</Form.Label>
                                    <Col sm={2}>
                                        <Form.Control as={"select"}
                                                      onChange={handleChange}
                                                      value={values.questionCount}>
                                            <option>5</option>
                                            <option>10</option>
                                            <option>15</option>
                                            <option>30</option>
                                        </Form.Control>
                                    </Col>
                                </Row>
                            </Form.Group>

                            <Form.Group controlId={"timerLength"}>
                                <Row>
                                    <Form.Label column="lg" lg={3}>Question Timer:</Form.Label>
                                    <Col sm={2}>
                                        <Form.Control
                                            as={"select"}
                                            onChange={handleChange}
                                            value={values.timerLength}>
                                            <option>7s</option>
                                            <option>10s</option>
                                            <option>20s</option>
                                            <option>60s</option>
                                        </Form.Control>
                                    </Col>
                                </Row>
                            </Form.Group>

                            <Button type={"submit"} disabled={isSubmitting}>Create New Game</Button>

                        </Form>)}
                </Formik>
                <div style={{maxWidth:"400px", textAlign:"center", margin: "0 auto"}}>
                    <ul>
                        <li>Shorter timers = bigger score multipliers!</li>
                        <li>Answer quickly to score maximum points!</li>
                        <li>Multiple choice questions are worth much more than True/False questions!</li>
                    </ul>
                </div>
            </Container>

        );
    }
}

export default CreateGame;
