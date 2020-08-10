import React, {createElement, useEffect, useState} from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Splash from './components/Splash';
import TriviaGame from './components/TriviaGame';
import Login from './components/Login';
import CreateGame from './components/CreateGame';
import UserProfile from './components/UserProfile';
import Leaderboard from './components/Leaderboard';
import About from './components/About';
import {Motion, spring} from "react-motion";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            selectedComponent: "Splash",
            userToken: "",
            userLoggedIn: false,
            username: "",
            userId: "",
            userEmail: ""
        };

        this.updateGameData = this.updateGameData.bind(this);
        this.setUserToken = this.setUserToken.bind(this);
        this.componentSelector = this.componentSelector.bind(this)
        //this.getComponent = this.getComponent.bind(this)
    }

    setUserToken(token) {
        this.setState({userToken: token})
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.userToken !== this.state.userToken && !this.state.userLoggedIn) {
            this.setState({userLoggedIn: true})
            this.getUserInfo()
        }
    }

    getUserInfo() {
        const requestUrl = "https://klingons.pythonanywhere.com/api/auth/users/me/";
        let response = fetch(requestUrl, {
            method: "GET",
            dataType: "JSON",
            headers: {
                "Authorization": this.state.userToken
            }
        })
            .then((resp) => {
                return resp.json();
            })
            .then((resp) => {

                this.setState({username: resp.username, userId: resp.id, userEmail: resp.email})
            })
            .then((resp) => {
                this.handleClick("Create")
            })
            .catch((error) => {
                console.log(error, "catch the hoop")
            });
    }

    getComponent(choice) {
        const compArray = {
            "Splash": Splash,
            "About": About,
            "Leaderboard": Leaderboard,
            "Profile": UserProfile,
            "Login": Login,
            "Create": CreateGame,
            "TriviaGame": TriviaGame,
            "": null
        };
        return compArray[choice]
    }

    componentSelector(selection) {
        let propss;
        if (selection === "Profile") {
            propss = {token: this.state.userToken, id: this.state.userId, name: this.state.username, email:this.state.userEmail}
        } else if (selection === "Leaderboard") {
            propss = {token: this.state.userToken};
        } else if (selection === "Login") {
            propss = {setToken: this.setUserToken}
        } else if (selection === "TriviaGame") {
            propss = {
                requestUrl: this.state.requestUrl,
                type: this.state.type,
                timer: this.state.timer,
                maxQuestions: this.state.maxQuestions,
                token: this.state.userToken,
                id: this.state.userId
            }
        } else if (selection === "Create") {
            propss = {callbackGameData: this.updateGameData, switchToTrivia: this.handleClick}
        } else {
            propss = null
        }
        return createElement(this.getComponent(selection), propss);
    }

    DisplayComponent(props) {

        const [rendered, setRendered] = useState("Splash");
        const [switching, setSwitching] = useState(false)
        const [seconds, setSeconds] = useState(4);
        let current = props.current;
        if(current !== rendered && !switching) {
          setSwitching(true);
        }
        let leaveY;
        let leaveX;
        if(current === "Profile" || current === "TriviaGame"){
            leaveX = 0;
            leaveY = 500;
        }else if (current === "Create" || current === "Leaderboard"){
            leaveX = 500;
            leaveY = 0;
        }else{
            leaveX = -500;
            leaveY = 0;
        }
        useEffect(() => {
            if (seconds > 0 && switching) {
              setTimeout(() => setSeconds(seconds - 1), 100);
            } else if (switching) {
              setSeconds(4)
              setSwitching(false)
              setRendered(current)
              }

        });

        return <>
            <Motion
                defaultStyle={{x: leaveX, opacity: 0, y: leaveY}}
                style={{
                   y:spring(switching? leaveY : 0), x:spring(switching ? leaveX : 0), opacity: spring(switching ? 0 : 1)
                }}>
                {(style) => (
                    <div style={{
                        transform: (current !== "Profile" && current !== "TriviaGame"? `translateX(${style.x}px)` :`translateY(${style.y}px)` ),
                        opacity: style.opacity,
                        x: style.x,
                        y: style.y}}>
                        {props.select(rendered)}
                    </div>
                )}
            </Motion>
        </>
    };


    handleClick(selection) {
        //Prompts user to confirm quit in case game is active
        //IF : currently in game, do selected confirmation window
        if (this.state.selectedComponent === "TriviaGame") {
            if (selection === "Quit") {
                if (window.confirm("Are you sure you want to quit this game?")) {
                    this.setState({selectedComponent: "Splash"});
                }
            } else {
                if (window.confirm("Leaving will quit your current game. Press OK to continue to " + selection + ".")) {
                    this.setState({selectedComponent: selection});
                }
            }
            //else (not in game): Change selected component state
        } else {
            this.setState({selectedComponent: selection});
        }
    }

    updateGameData(url, type, timer, maxQuestions) {
        this.setState({
            requestUrl: url,
            timer: timer,
            type: type,
            maxQuestions: maxQuestions,
        });


    }


    render() {
        const userSelection = this.state.selectedComponent;

        return (
            <Container fluid='true'>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand onClick={() => this.handleClick("Splash")}>Trivia Knights</Navbar.Brand>
                    <Nav className="mr-auto">
                        {this.state.selectedComponent !== "TriviaGame" &&
                        <Nav.Link
                            className="superButton"
                            style={{backgroundColor: "#0D9469"}}
                            onClick={() => {this.state.userLoggedIn ?  this.handleClick("Create") : this.handleClick("Login")}}><b>Play</b></Nav.Link>
                        }
                        {this.state.userLoggedIn ?
                            <Nav.Link onClick={() => this.handleClick("Profile")}>Profile</Nav.Link> :
                            <Nav.Link onClick={() => this.handleClick("Login")}>Login</Nav.Link>
                        }
                        <Nav.Link onClick={() => this.handleClick("About")}>About</Nav.Link>
                        {this.state.userLoggedIn && <Nav.Link onClick={() => this.handleClick("Leaderboard")}>Leaderboard</Nav.Link>}
                        {this.state.userLoggedIn && <Nav.Link onClick={() => this.setState({userLoggedIn: false, selectedComponent: "Splash"})}>Logout</Nav.Link>}

                        {/*Changes Play to Quit button if in game*/}

                      {this.state.selectedComponent === "TriviaGame" &&
                      <Nav.Link
                                className="superButton"
                                style={{backgroundColor: "#000000"}}
                                onClick={() => this.handleClick("Quit")}><b>Quit</b></Nav.Link>
                      }
                    </Nav>
                </Navbar>
                <this.DisplayComponent current={this.state.selectedComponent} select={this.componentSelector}/>
            </Container>
        );
    }
}

export default App;
