import * as React from 'react';
import { Redirect } from "react-router-dom";
import "./index.styl";


const dev = location && location.hostname == "localhost" || false;
const serverUrl = dev ? "http://localhost:2503" : "";
export default class LobbyPage extends React.Component {

    state = {
        roomName : "",
        rooms : [],
        roomLink : ""
    }

    props: {
        token,
        user
    }

    constructor(props) {
        super(props);
        this.createRoom = this.createRoom.bind(this);
        this.getRooms = this.getRooms.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.chooseRoom = this.chooseRoom.bind(this);
    }

    createRoom() {
        let req = new XMLHttpRequest();
          req.open('POST', `${serverUrl}/api/gameroom`); 
          req.setRequestHeader("Content-Type", "application/json");
          req.setRequestHeader("Authorization", "Bearer " + this.props.token);
          req.onreadystatechange = () => {
          if (req.readyState == 4) {
                //   document.getElementById("output").innerHTML = req.responseText;
                  console.log(JSON.parse(req.responseText));

                  this.setState({
                      roomName: ""
                  })

                  this.getRooms();
            }
          };
          req.send(JSON.stringify({
              name : this.state.roomName
          }));
    }

    chooseRoom(roomName) {
        this.setState({
            roomLink : roomName
        })
    }

    getRooms() {
        let req = new XMLHttpRequest();
          req.open('GET', `${serverUrl}/api/gameroom`); 
          req.setRequestHeader("Content-Type", "application/json");
          req.setRequestHeader("Authorization", "Bearer " + this.props.token);
          req.onreadystatechange = () => {
          if (req.readyState == 4) {
              if(req.status == 200) {
                    const response = JSON.parse(req.responseText);
                    console.log(response);
                    this.setState({
                        rooms : response
                    })
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

    componentWillMount() {
        this.getRooms();
    }

    render() {

        if (this.state.roomLink) {
            const link = `/rooms/${this.state.roomLink}`;
            return <Redirect to={link} />
          }

        const list = this.state.rooms.map((el,index) => {
            return (
                <li key={index}>
                    <button onClick={() => this.chooseRoom(el.name)}>{el.name}</button>
                </li>
            )
        })

        const user = this.props.user;
        console.log(user);

        return (
            <div className="lobby">
                <div className="lobby__user-info">
                    <div className="lobby__user-info__logo">
                        <div className="lobby__user-info__logo-img" ></div>
                        <div className="lobby__user-info__logo-nick">
                            {user.nickname}
                        </div>
                    </div>
                    <div className="lobby__user-info__stats">
                        <div className="lobby__user-info__stats-img"></div>
                        <div className="lobby__user-info__stats-text">Ранг - Новичек</div>
                        <div className="lobby__user-info__stats-text">Кол. игр - 113</div>
                        <div className="lobby__user-info__stats-text">Время в игре - 22 часа</div>
                    </div>
                    <div className="lobby__user-info__contact">
                        <div className="lobby__user-info__contact-email">
                            {user.email}
                        </div>
                        <div className="lobby__user-info__contact-tel">
                            no tel
                        </div>
                        <div className="lobby__user-info__contact-verified">
                            You are {user.isVerified ? "verified" : "not verified"} user
                        </div>
                    </div>
                </div>
                <div className="lobby__user-filters">
                    <div>Last games</div>
                    <div>filter</div>
                    <div>games list
                        <ul>
                            {list}
                        </ul>
                    </div>
                </div>
                <div className="lobby__new-rooms">
                        <label>
                            room name:
                            <input type="text" name="roomName" value={this.state.roomName} onChange={this.handleChange} />
                        </label>

                        <button onClick={this.createRoom}>
                            create new room
                        </button>
                </div>
            </div>
        )
    }
}