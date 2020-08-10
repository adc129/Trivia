import React from "react";
import Container from 'react-bootstrap/Container';
import '../style.css'
import { Row } from 'react-bootstrap';
import {Motion, spring} from 'react-motion';

class Splash extends React.Component {

    render() {
        return(
            <Container style={{backgroundColor: "#d5f4e6", maxHeight: "100%", textAlign:"center"}} className={"asd"}>
                    <Row>
                        <img src={require("../imgs/2.png")} alt={require("../imgs/3.png")}/>
                        <img src={require("../imgs/3.png")} alt={require("../imgs/2.png")}/>
                        <img src={require("../imgs/4.png")} alt={require("../imgs/3.png")}/>
                        <img src={require("../imgs/5.png")} alt={require("../imgs/3.png")}/>
                        <img src={require("../imgs/6.png")} alt={require("../imgs/3.png")}/>
                    </Row>

                    <Motion defaultStyle={{y:-200, opacity:0}} style={{y: spring(0), opacity: spring(1)}}>
                        {(style)=>(
                            <img
                                style={{transform: `translateY(${style.y}px)`, opacity: style.opacity, y: style.y}}
                                className={"letterhead"}
                                src={require("../imgs/LH4.png")}
                                alt={require("../imgs/2.png")}/>

                        )}
                    </Motion>
                    <Row>
                        <img src={require("../imgs/1.png")} alt={require("../imgs/3.png")}/>
                        <img src={require("../imgs/6.png")} alt={require("../imgs/3.png")}/>
                        <img src={require("../imgs/3.png")} alt={require("../imgs/2.png")}/>
                        <img src={require("../imgs/2.png")} alt={require("../imgs/3.png")}/>
                        <img src={require("../imgs/4.png")} alt={require("../imgs/3.png")}/>
                    </Row>
                </Container>
        );
    }
}

export default Splash;
