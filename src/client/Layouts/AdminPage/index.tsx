import React from "react";
import { IGame } from "../../../models/Game/IGame";
const dev = location && location.hostname == "localhost" || false;
const serverUrl = dev ? "http://localhost:2503" : "";
class AdminPage extends React.Component<{}, {
    gameList: IGame[],
    title: string,
    url: string,
    logo: string,
    description: string,
    token: string
}> {

    state = {
        gameList: [],
        title: "",
        url: "",
        logo: "",
        description: "",
        token: ""
    }

    getGameList() {
        fetch(`${serverUrl}/api/game`)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    ...this.state,
                    gameList: [...this.state.gameList, ...data]
                })
            })
    }

    addGame() {
        fetch(`${serverUrl}/api/game`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: this.state.title,
                url: this.state.url,
                logo: this.state.logo,
                description: this.state.description,
                token: this.state.token
            })
        }).then(() => {
            this.getGameList()
        })
    }

    componentDidMount() {
        this.getGameList()
    }

    render() {
        return <div>

            {
                this.state.gameList.map((game) => {
                    console.log(game)
                    return (
                        <div key={game._id}>
                            {game.title} +
                            {game.url} +
                            {game.description} +
                            {game.logo}
                        </div>
                    )
                })
            }

            <div>
                <input type="" name="" id="title" placeholder="title" onChange={(e) => this.setState({
                    ...this.state, title: e.target.value
                })} />
                <input type="" name="" id="url" placeholder="url" onChange={(e) => this.setState({
                    ...this.state, url: e.target.value
                })} />
                <input type="" name="" id="logo" placeholder="logo" onChange={(e) => this.setState({
                    ...this.state, logo: e.target.value
                })} />
                <input type="" name="" id="desc" placeholder="desc" onChange={(e) => this.setState({
                    ...this.state, description: e.target.value
                })} />

                <button onClick={() => this.addGame()}>add</button>
            </div>

        </div>
    }
}

export default AdminPage;