import * as React from 'react';
import { Redirect, Link } from "react-router-dom";
import "./index.scss";
import { connect } from 'react-redux';
import { AppState } from '../../store'
import { IGame  } from '../../../models/Game/IGame';


const dev = location && location.hostname == "localhost" || false;
const serverUrl = dev ? "http://localhost:2503" : "";

interface ownProps {
}

interface stateProps {
    token: string;
    user: any;
    rooms: IGame[];
}

interface dispatchProps {
}

type Props = stateProps & dispatchProps & ownProps

interface State {
    roomName: string,
    roomLink: string,
    game: string,
    [key: string]: any,
    gameList: IGame[],
    messages: {type: string, title: string, desc: string}[]
}
class LobbyPage extends React.Component<Props, State> {
    constructor(props) {
        super(props);

        this.state = {
            roomName: "",
            roomLink: "",
            gameList: [],
            game: "",
            messages: []
        }

        this.createRoom = this.createRoom.bind(this);
        this.getGames = this.getGames.bind(this);
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

                this.getGames();
            }
        };
        req.send(JSON.stringify({
            name: this.state.roomName
        }));
    }

    chooseRoom(roomName) {
        this.setState({
            roomLink: roomName
        })
    }

    getGames() {
        fetch(`${serverUrl}/api/game`)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    ...this.state,
                    gameList: [...this.state.gameList, ...data]
                })
            })
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
        this.getGames();
    }

    render() {

        // if (this.state.roomLink) {
        //     const link = `/rooms/${this.state.roomLink}`;
        //     return <Redirect to={link} />
        // }

        const list = this.state.gameList.map((el, index) => {
            return (
                <li key={index}>
                    {/* <button onClick={() => this.chooseRoom(el.name)}>{el.name}</button> */}
                    <button onClick={() => this.setState({
                        ...this.state,
                        game: el.url
                    })}>{el.title}</button>
                </li>
            )
        })

        const user = this.props.user;
        // console.log(user);

        return (
            <div className="lobby">
                <div className="lobby__user-info">
                    <div className="lobby__user-info__logo container">
                        <div className="lobby__user-info__logo-img" ></div>
                        <div className="lobby__user-info__logo-nick">
                            {user.nickname}
                        </div>
                    </div>
                    <div className="lobby__user-info__stats container">
                        <div className="lobby__user-info__stats-img"></div>
                        <div className="lobby__user-info__stats-text">Ранг - Новичек</div>
                        <div className="lobby__user-info__stats-text">Кол. игр - 113</div>
                        <div className="lobby__user-info__stats-text">Время в игре - 22 часа</div>
                    </div>
                    <div className="lobby__user-info__contact container">
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
                <div className="lobby__user-filters container">
                    <div>
                    Links: 
                        <Link to="/admin">admin</Link>
                    </div>
                    <div>Last games</div>
                    <div>filter</div>
                    <div>games list
                        <ul>
                            {list}
                        </ul>
                    </div>
                    <iframe src={this.state.game} height="100%" width="100%">

                    </iframe>
                </div>
                <div className="lobby__new-rooms container">
                    {/* <label>
                        room name:
                            <input type="text" name="roomName" value={this.state.roomName} onChange={this.handleChange} />
                    </label>

                    <button onClick={this.createRoom}>
                        create new room
                        </button> */}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state: AppState, ownProps: ownProps): stateProps {
    return {
        token: state.token.token,
        user: {}, // TODO import user,
        rooms: state.rooms.rooms
    }
}

function mapDispatchToProps(): dispatchProps {
    return {}
}

export default connect<stateProps, dispatchProps, ownProps>
    (mapStateToProps, mapDispatchToProps)(LobbyPage)