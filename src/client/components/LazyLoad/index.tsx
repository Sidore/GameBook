import * as React from "react";

export default class LazyLoadModule extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      module: null
    };
  }

  state = {
    module: null
  }

  props: {
    resolve
  }

  // after the initial render, wait for module to load
  async componentDidMount() {
    const { resolve } = this.props;
    const { default: module } = await resolve();
    this.setState({ module });
  }

  render() {
    const { module } = this.state;

    if (!module) return <div>Loading module...</div>;
    if (module) return React.createElement(module);

  }
}