import * as React from 'react';
import LazyLoad from "../../components/LazyLoad";

const dev = location && location.hostname == "localhost" || false;
const serverUrl = dev ? "http://localhost:2503" : "";
export default class GamePage extends React.Component {

    constructor(props) {
        super(props);

        this.getGamesList = this.getGamesList.bind(this);
        this.chooseGame = this.chooseGame.bind(this);
        this.setUpSocketsToGame = this.setUpSocketsToGame.bind(this);
    }

    state = {
        gameList: [],
        game: null
    }

    props: {
        token,
        match
    }

    getGamesList() {
        let req = new XMLHttpRequest();
        req.open('GET', `${serverUrl}/api/gameroom/${this.props.match.params.id}/game`);
        req.setRequestHeader("Content-Type", "application/json");
        req.setRequestHeader("Authorization", "Bearer " + this.props.token);
        req.onreadystatechange = () => {
            if (req.readyState == 4) {
                console.log(JSON.parse(req.responseText));

                this.setState({
                    gameList: JSON.parse(req.responseText)
                })
            }
        };

        req.send();
    }

    chooseGame(gameName) {
        let req = new XMLHttpRequest();
        req.open('POST', `${serverUrl}/api/gameroom/${this.props.match.params.id}/game/${gameName}`);
        req.setRequestHeader("Content-Type", "application/json");
        req.setRequestHeader("Authorization", "Bearer " + this.props.token);
        req.onreadystatechange = () => {
            if (req.readyState == 4) {
                console.log(JSON.parse(req.responseText));
                this.setUpSocketsToGame(gameName);
            }
        };

        req.send();
    }

    setUpSocketsToGame(gameName) {
        // console.log("try to set up sockets");

        const socket = new WebSocket("ws://localhost:8081");

        socket.onopen = () => {
            socket.send(JSON.stringify({
                type: "auth",
                roomTitle: this.props.match.params.id,
                gameTitle: gameName,
                user: {
                    nickname: "lol"
                }
            }));
        }

        socket.onmessage = function (event) {
            var incomingMessage = event.data;
            console.log(incomingMessage);
        };
        // socket.send(JSON.stringify({
        //     type: this.type.value,
        //     message: outgoingMessage
        // }));

        this.setState({
            game: gameName
        })
    }

    componentDidMount() {
        this.getGamesList();
    }

    render() {

        if (this.state.game) {
            return <LazyLoad resolve={() => import('../../../games/WhosBigger/client')} />
        } else {
            const list = this.state.gameList.map((game, index) => {
                return (<li key={index}>
                    <button onClick={() => { this.chooseGame(game) }}>
                        {game}
                    </button>
                </li>)
            })

            return (
                <div>
                    <ul>
                        {list}
                    </ul>
                </div>
            )
        }


    }
}