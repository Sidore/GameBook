import * as React from 'react';
import Counter from "../components/Counter";
import Hall from "./Hall";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function Index() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

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
      <div>
        <h1>{this.state.title}</h1>
        {/* <Counter/> */}
        {/* <Hall onStatusChange={this.statusHandler.bind(this)}/>
        <div>
          {this.state.output}
        </div> */}
        <Router>
          <div>
            <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/about/">About</Link>
                </li>
                <li>
                  <Link to="/users/">Users</Link>
                </li>
              </ul>
            </nav>

            <Route path="/" exact component={Index} />
            <Route path="/about/" component={About} />
            <Route path="/users/" component={Users} />
          </div>
        </Router>
      </div>
    );
  }
}