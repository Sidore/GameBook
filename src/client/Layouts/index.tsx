import * as React from 'react';
import Counter from "../components/Counter";
import Hall from "./Hall";

export default class MainLayout extends React.Component {
  state = {
    title: "lolka"
  };

  render () {
    return (
      <div>
        <h1>{this.state.title}</h1>
        {/* <Counter/> */}
        <Hall/>
      </div>
    );
  }
}