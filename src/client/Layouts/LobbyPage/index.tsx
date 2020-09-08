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
    messages: {type: string, title: string, desc: string}[],
    user: any;

}
class LobbyPage extends React.Component<Props, State> {
    constructor(props) {
        super(props);

        this.state = {
            roomName: "",
            roomLink: "",
            gameList: [],
            game: "",
            messages: [],
            user: {
                nickname: "Sidore",
                isVerified: false
            }
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
                <div className="gamelist-item" key={index} onClick={() => this.setState({
                    ...this.state,
                    game: el.url
                })}>
                    {/* <button onClick={() => this.chooseRoom(el.name)}>{el.name}</button> */}
                    {el.title}
                </div>
            )
        })

        
        // console.log(user);

        return (
            <div className="lobby">
                <div className="lobby__user-info">
                    <div className="lobby__user-info__logo container">
                        <div className="lobby__user-info__logo-img" >
                            
                        </div>
                        <div className="lobby__user-info__logo-details">
                            <div className="lobby__user-info__logo-details-nick">
                                {this.state.user.nickname}
                            </div>
                            <div className="lobby__user-info__logo-details-logout">
                                Logout
                            </div>
                        </div>
                    </div>
                    <div className="lobby__user-info__stats container">
                        {/* <div className="lobby__user-info__stats-img"></div> */}
                        <div className="lobby__user-info__stats-text">Ранг<span className="label alert">Новичек</span></div>
                        <div className="lobby__user-info__stats-text">Кол. игр <span className="label counter">113</span></div>
                        <div className="lobby__user-info__stats-text">Время в игре <span className="label achievment">22 часа</span></div>
                        <hr/>
                        <div className="lobby__user-info__stats-text">Достижения <span className="label achievment">12</span></div>
                        <div className="lobby__user-info__stats-text">Чат <span className="label counter">22</span></div>
                        <hr/>
                        <div className="lobby__user-info__stats-text" onClick={() => { 
                            this.setState({
                                ...this.state,
                                user: {
                                    ...this.state.user,
                                    isVerified: !this.state.user.isVerified
                                }
                            })

                            this.forceUpdate()
                        }}>You are <span className={this.state.user.isVerified ? "label achievment" : "label alert"}>{this.state.user.isVerified ? "verified" : "not verified"}</span></div>
                        {/* <div className="lobby__user-info__stats-text">Чат <span className="label counter">22</span></div> */}
                        
                    </div>
                    <div className="lobby__user-info__contact container">
                        <div className="lobby__user-info__contact-email">
                            {this.state.user.email}
                        </div>
                        {/* <div className="lobby__user-info__contact-tel">
                            no tel
                        </div> */}
                        {/* <div className="lobby__user-info__contact-verified">
                            You are {user.isVerified ? "verified" : "not verified"} user
                        </div> */}
                        <div>
                    Links: 
                        <Link to="/admin">admin</Link>
                    </div>
                    </div>
                </div>
                <div className="lobby__user-filters ">
                    
                    
                    <div className="lobby__user-filters__gamelist container">
                            {list}
                    </div>

                    {this.state.game && <iframe src={this.state.game} className="lobby__user-filters__frame container">

                    </iframe>}

                    {!this.state.game && <div className="lobby__user-filters__frame container">
                        chose the game
                        </div>}
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
        // user: {nickname : "Sidore"}, // TODO import user,
        rooms: state.rooms.rooms
    }
}

function mapDispatchToProps(): dispatchProps {
    return {}
}

export default connect<stateProps, dispatchProps, ownProps>
    (mapStateToProps, mapDispatchToProps)(LobbyPage)