import React from "react";
import EditProfile from './EditProfile';
import Container from 'react-bootstrap/Container';
import {Row, Col} from 'react-bootstrap';
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";

class UserProfile extends React.Component {
    /* A GET request to /api/v1/profile/{id} will return this information about the user.
    {
      "user": 0,
      "bio": "string",
      "image_url": "string",
      "location": "string",
      "birth_date": "2020-04-21",
      "score": 0,
      "rank": 0
    }
    */
    constructor(props) {
        super(props);

        this.state = {
            username: this.props.name,
            userIcon: "userIconGoesHere",
            bio: "No biography supplied.",
            location: "No location supplied.",
            score: -1,
            rank: -1,
            editing: false
        };
        this.getUserInfo();
        this.getUserInfo = this.getUserInfo.bind(this);
        this.doneEditing = this.doneEditing.bind(this);
    }

    doneEditing(userData){
      this.setState({
        bio: userData.bio,
        userIcon: userData.image_url,
        location: userData.location,
        score: userData.score,
        rank: userData.rank,
        editing: false
      })
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
          this.doneEditing(resp)
        }).catch((error) => {
            console.log(error, "Error in getUserInfo()");
        })
    }

    render() {
      return (
        (!this.state.editing ?
          <Container style={{backgroundColor: "white"}}>
            <Row>
              <Col>Username: {this.state.username}</Col>
              <Col>Score: {this.state.score}</Col>
              <Col>Rank: {this.state.rank}</Col>
            </Row>
            <Col>
              <Row>
                <Image src={this.state.userIcon}/>
              </Row>
              <Row>
                <Col>Location: {this.state.location}</Col>
              </Row>
            </Col>
            <Col>
              <Row md={{span: 6, offset: 3}}>
                Bio: {this.state.bio}
              </Row>
            </Col>
              <Button onClick={() => {
                this.setState({editing: true})
              }}>Edit</Button>
          </Container>
          :
          <EditProfile
            token={this.props.token}
            id={this.props.id}
            bio={this.state.bio}
            location={this.state.location}
            update={this.doneEditing}
          />
        )
      );
    }
}

export default UserProfile;
