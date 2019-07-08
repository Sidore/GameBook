import * as React from 'react';
// import Counter from "../components/Counter";
import Lobby from "./LobbyPage";
import Auth from "./AuthPage";
import Game from "./GamePage";


import { BrowserRouter as Router, Route, Link } from "react-router-dom";


export default class MainLayout extends React.Component {
  state = {
    title: "lolka",
    output: ""
  };

  statusHandler(params) {
    console.log("statusHandler", params);
  }

  render () {
    return (
      // <div>
      //   <h1>{this.state.title}</h1>
        /* <Counter/> */
        /* <Hall onStatusChange={this.statusHandler.bind(this)}/>
        <div>
          {this.state.output}
        </div> */
        <Router>
          <div>
            <nav>
              <ul>
                <li>
                  <Link to="/">Lobby</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/game/">Game</Link>
                </li>
              </ul>
            </nav>

            <Route path="/" exact component={Lobby} />
            <Route path="/login" component={Auth} />
            <Route path="/game/" component={Game} />
          </div>
        </Router>
      // </div>
    );
  }
}