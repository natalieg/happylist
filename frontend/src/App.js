import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
import Areas from './Components/Areas'
import GenerateList from './Components/GenerateList'
import './App.scss';

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Navbar/>
          <Switch>
            <Route path="/">
              <Areas />
            </Route>
            <Route path="/generateList" exact>
              <GenerateList />
            </Route>
          </Switch>
        </Router>
      </div>
    )
  }
}

