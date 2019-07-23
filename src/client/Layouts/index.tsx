import * as React from 'react';
// import Counter from "../components/Counter";
import Lobby from "./LobbyPage";
import Auth from "./AuthPage";
import Game from "./GamePage";

import { Provider } from "react-redux";
import { createStore } from "redux";
// import rootReducer from './reducers'

import "./index.styl";


import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

export default class MainLayout extends React.Component {
  state = {
    token: ""
  };

  constructor(props) {
    super(props);

    this.tokenHandler = this.tokenHandler.bind(this);
  }

  tokenHandler(token) {
    this.setState({
      token
    });
  }



  render () {
    return (
      <div>
        <Router>
          <div>
            <nav>
              <ul className="title">
                <li>
                  <Link to="/">Lobby</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/rooms/lol">Game</Link>
                </li>
              </ul>
            </nav>

            <Route path="/login" render={() => (
                this.state.token ? 
                  (<Redirect to="/"/>) :
                  (<Auth onToken={this.tokenHandler}/>)
                )} 
              />            

            <Route path="/" exact render={() => (
                !this.state.token ? 
                  (<Redirect to="/login"/>) : 
                  (<Lobby token={this.state.token}/>)
                )}
              />

            <Route path="/rooms/:id" render={(props) => (
                !this.state.token ?
                (<Redirect to="/login"/>) : 
                (<Game token={this.state.token} {...props}/>)
              )} 
              />
          </div>
        </Router>
        <hr/>
        <i>{this.state.token}</i>
      </div>
    );
  }
}