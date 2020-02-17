import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Areas from './Components/Areas'
import Navbar from './Components/Navbar/Navbar'
import './App.scss';

export default class App extends Component {
  render() {
    return (
      <div>
        <Areas />
      </div>
    )
  }
}

