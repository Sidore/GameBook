import * as React from "react";
import BaseLayout from "./BaseLayout";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { Provider } from "react-redux";
import { store } from "../store";
import "./index.scss";
import { BrowserRouter as Router } from "react-router-dom";

const client = new ApolloClient({
  uri: "/graphql"
})

export default class MainLayout extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <ApolloProvider client={client}>
          <Router>
            <BaseLayout />
          </Router>
        </ApolloProvider>
      </Provider>
    );
  }
}
