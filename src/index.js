import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { API_URL, AUTH_TOKEN } from "./config";

const client = new ApolloClient({
  uri: API_URL,
  headers: {
    Authorization: AUTH_TOKEN
  }
});

const app = (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

ReactDOM.render(app, document.getElementById("root"));

serviceWorker.unregister();
