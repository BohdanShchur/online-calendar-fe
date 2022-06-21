import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import { client } from './utils/client';

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root')
);
