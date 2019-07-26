import * as React from 'react';
// import Counter from "../components/Counter";
import Lobby from "./LobbyPage";
import Auth from "./AuthPage";
import Game from "./GamePage";

import { Provider } from "react-redux";
import { createStore } from "redux";

import { AppState, rootReducer } from '../store'

import "./index.styl";

import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";


const store = createStore(rootReducer);

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
        <Provider store={store}>
          <Router>
            <div className="root-div">
              {/* <nav className="nav-bar">
                <ul className="nav-bar__ul">
                  <li className="nav-bar__link-container">
                    <Link to="/" className="nav-bar__link-a">Lobby</Link>
                  </li>
                  <li className="nav-bar__link-container">
                    <Link to="/login" className="nav-bar__link-a">Login</Link>
                  </li>
                  <li className="nav-bar__link-container">
                    <Link to="/rooms/lol" className="nav-bar__link-a">Game</Link>
                  </li>
                </ul>
              </nav> */}

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
        </Provider>
    );
  }
}