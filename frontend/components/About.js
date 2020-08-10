import React from "react";
import Container from 'react-bootstrap/Container';
import {Row, Col} from "react-bootstrap";

class About extends React.Component {
  constructor(props) {
    super(props);
    //Note(Trevor): I'll fix this later, learning how to get these talking.
    //let url = https://my-json-server.typicode.com/CS3398-HOUNDS/API/Leaderboard;
    //let leaders = $.get(URL,data,function(data,status,xhr),dataType)
  }

  render() {
    return(
      <Container style={{backgroundColor: "white"}}>
        <h1>About Trivia Knights</h1>
        <p>
          Trivia Knights is a software engineering project by Team Klingons to
          provide an environment in which to apply concepts covered in CS3398,
          a computer science course in Software Engineering at Texas State University.
        </p>
        <br />
        <p>
          You can contact the members of Team Klingons by email:
          <ul>
          <li><a href="jwa58@txstate.edu">Jackson Ayers</a></li>
          <li><a href="adc129@txstate.edu">Aaron Carrasco</a></li>
          <li><a href="t_c296@txstate.edu">Trevor Chaney</a></li>
          <li><a href="dlg143@txstate.edu<">Donevan Gonzales</a></li>
          <li><a href="158@txstate.edu">Sohail Selky</a></li>
          </ul>
        </p>
        <br />
        <p>
          You can also view the source on github.com: <a href="https://github.com/CS3398-HOUNDS/CS3398-Klingons-S2020">Team Klingons</a>
        </p>
        <br />
        <p>
          We would like to thank you for your time and consideration, we hope 
          you have enjoied playing Trivia Knights. We as a team have expresed
          interest in continuing to develop this project and are more than open
          to contributors outside of the initial members listed above. Please
          feel free to contact a member. And again,
        </p>
        <br />
        <Row>
          <Col>
            <h2>Thanks for playing</h2>
            <hr />
            <p>
              <a href="http://www.apache.org/licenses/">Apache License</a>, Version 2.0, January 2004
            </p>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default About;
