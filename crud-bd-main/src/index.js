import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/styles.scss';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
}); 

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={ client }>

        <App />

    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();
