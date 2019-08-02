import * as React from 'react';
// import Counter from "../components/Counter";
import Lobby from "./LobbyPage";
import Auth from "./AuthPage";
import Game from "./GamePage";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import { Provider } from "react-redux";
import { createStore } from "redux";

import { AppState, rootReducer } from '../store'

import "./index.styl";

import { BrowserRouter as Router, Route, Link, Redirect , Switch} from "react-router-dom";

const client = new ApolloClient({
  uri: "/graphql"
})

const store = createStore(rootReducer);

export default class MainLayout extends React.Component {
  state = {
    token: "",
    user : {}
  };

  constructor(props) {
    super(props);

    this.tokenHandler = this.tokenHandler.bind(this);
    this.userHandler = this.userHandler.bind(this);
  }

  tokenHandler(token) {
    this.setState({
      token
    });
  }

  userHandler(user) {
    console.log("userHandler", user)
    this.setState({
      user
    })
  }


  render () {
    return (
        <Provider store={store}>
          <ApolloProvider client={client}>
            <Router>
              <div className="root-div">
                <Switch>
                  <Route path="/login" render={() => (
                      this.state.token ? 
                        (<Redirect to="/"/>) :
                        (<Auth onToken={this.tokenHandler} onUser={this.userHandler}/>)
                      )} 
                    />            
                  <Route path="/" exact render={() => (
                      !this.state.token ? 
                        (<Redirect to="/login"/>) : 
                        (<Lobby token={this.state.token} user={this.state.user}/>)
                      )}
                    />
                  <Route path="/rooms/:id" render={(props) => (
                      !this.state.token ?
                      (<Redirect to="/login"/>) : 
                      (<Game token={this.state.token} {...props}/>)
                    )} 
                    />
                  <Route render={() => (
                      !this.state.token ? 
                        (<Redirect to="/login"/>) : 
                        (<Lobby token={this.state.token} user={this.state.user}/>)
                      )}
                    />  
                </Switch>
              </div>
            </Router>
          </ApolloProvider>
        </Provider>
    );
  }
}