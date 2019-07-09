import * as React from 'react';

export default class LobbyPage extends React.Component {

    state = {
        roomName : ""
    }

    props: {
        token
    }

    constructor(props) {
        super(props);

        this.createRoom = this.createRoom.bind(this);
        this.getRooms = this.getRooms.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    createRoom() {
        let req = new XMLHttpRequest();
          req.open('POST', 'http://localhost:2503/api/gameroom'); 
          req.setRequestHeader("Content-Type", "application/json");
          req.setRequestHeader("Authorization", "Bearer " + this.props.token);
          req.onreadystatechange = function() {
          if (req.readyState == 4) {
                //   document.getElementById("output").innerHTML = req.responseText;
                  console.log(JSON.parse(req.responseText));
          }
          };
          req.send(JSON.stringify({
              name : this.state.roomName
          }));
    }

    getRooms() {
        let req = new XMLHttpRequest();
          req.open('GET', 'http://localhost:2503/api/gameroom'); 
          req.setRequestHeader("Content-Type", "application/json");
          req.setRequestHeader("Authorization", "Bearer " + this.props.token);
          req.onreadystatechange = function() {
          if (req.readyState == 4) {
              if(req.status == 200) {
                    const response = JSON.parse(req.responseText);
                    console.log(response);
              }
          }
          };
  
          req.send();
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <div>
                <div>User info</div>
                <div>
                    <div>Last games</div>
                    <div>filter</div>
                    <div>games list</div>
                </div>
                <div>create new room
                        <label>
                            room name:
                            <input type="text" name="email" value={this.state.roomName} onChange={this.handleChange} />
                        </label>
                </div>
            </div>
        )
    }
}