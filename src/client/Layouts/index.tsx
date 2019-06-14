import * as React from 'react';
import Counter from "../components/Counter";
import Hall from "./Hall";

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
        <Hall onStatusChange={this.statusHandler.bind(this)}/>
        <div>
          {this.state.output}
        </div>
      </div>
    );
  }
}