import React from "react";
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';

class Leaderboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        user0Rank: "---",
        user0Icon: "---",
        user0Username: "BigBrain",
        user0UserId: -1,
        user0Score: -1,
        user1Rank: "---",
        user1Icon: "---",
        user1Username: "ThunderDome",
        user1UserId: -1,
        user1Score: -1,
        user2Rank: "---",
        user2Icon: "---",
        user2Username: "TheWokenOne",
        user2UserId: -1,
        user2Score: -1,
        user3Rank: "---",
        user3Icon: "---",
        user3Username: "SmartyPants",
        user3UserId: -1,
        user3Score: -1,
        user4Rank: "---",
        user4Icon: "---",
        user4Username: "Unknown",
        user4UserId: -1,
        user4Score: -1,

    }
  }

  getLeaderboardUsers() {
      let token = this.props.token;
      let requestUrl = "https://klingons.pythonanywhere.com/api/v1/profile/?ordering=-score";

      let response = fetch(requestUrl, {
          method: "GET",
          dataType: "JSON",
          mode: "cors",
          headers: {
              "Authorization": token,
          }
      }).then((resp) => {
          return resp.json();
      }).then((resp) => {
          let users = resp.results;
          this.setState({
              user0Rank: users[0].rank,
              user0Icon: users[0].image_url,
              user0Username: users[0]['user'].username,
              user0UserId: users[0]['user'].id,
              user0Score: users[0].score,
              user1Rank: users[1].rank,
              user1Icon: users[1].image_url,
              user1Username: users[1]['user'].username,
              user1UserId: users[1]['user'].id,
              user1Score: users[1].score,
              user2Rank: users[2].rank,
              user2Icon: users[2].image_url,
              user2Username: users[2]['user'].username,
              user2UserId: users[2]['user'].id,
              user2Score: users[2].score,
              user3Rank: users[3].rank,
              user3Icon: users[3].image_url,
              user3Username: users[3]['user'].username,
              user3UserId: users[3]['user'].id,
              user3Score: users[3].score,
              user4Rank: users[4].rank,
              user4Icon: users[4].image_url,
              user4Username: users[4]['user'].username,
              user4UserId: users[4]['user'].id,
              user4Score: users[4].score
          });
      }).catch((error) => {
          console.log(error, "Error in getLeaderboardUsers()");
      })
  }

  render() {
    this.getLeaderboardUsers();
    return(
      <Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Rank</th>
              <th>Score</th>
              <th>Username</th>
              <th>UserID</th>
              <th>Icon</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>1</th>
              <th>{this.state.user0Rank}</th>
              <th>{this.state.user0Score}</th>
              <th>{this.state.user0Username}</th>
              <th>{this.state.user0UserId}</th>
              <th><img src={this.state.user0Icon}/ ></th>
            </tr>
            <tr>
              <th>2</th>
              <th>{this.state.user1Rank}</th>
              <th>{this.state.user1Score}</th>
              <th>{this.state.user1Username}</th>
              <th>{this.state.user1UserId}</th>
              <th><img src={this.state.user1Icon}/ ></th>
            </tr>
            <tr>
              <th>3</th>
              <th>{this.state.user2Rank}</th>
              <th>{this.state.user2Score}</th>
              <th>{this.state.user2Username}</th>
              <th>{this.state.user2UserId}</th>
              <th><img src={this.state.user2Icon}/ ></th>
            </tr>
            <tr>
              <th>4</th>
              <th>{this.state.user3Rank}</th>
              <th>{this.state.user3Score}</th>
              <th>{this.state.user3Username}</th>
              <th>{this.state.user3UserId}</th>
              <th><img src={this.state.user3Icon}/ ></th>
            </tr>
            <tr>
              <th>5</th>
              <th>{this.state.user4Rank}</th>
              <th>{this.state.user4Score}</th>
              <th>{this.state.user4Username}</th>
              <th>{this.state.user4UserId}</th>
              <th><img src={this.state.user4Icon}/ ></th>
            </tr>
          </tbody>
        </Table>
      </Container>
    );
  }
}

export default Leaderboard;
