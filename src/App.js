import React from 'react';
import './App.css';
import 'regenerator-runtime/runtime';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import LoginPage from './components/LoginPage';
import ChatPage from './components/ChatPage';

function App() {
  return (
    <React.StrictMode>
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/rooms/:id?">
            <ChatPage />
          </Route>
        </Switch>
      </Router>
    </React.StrictMode>
  );
}

export default App;
