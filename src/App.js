import React, {useState, useEffect} from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import DashBoard from 'screens/DashBoard/index.js'
import Home from 'screens/Home/index.js'

function App() {
  return (
      <Router>
        <Route exact path="/dashboard/*" component={DashBoard}/>
        <Route exact path="/dashboard" component={DashBoard}/>
        <Route exact path="/" component={Home}/>
      </Router>
  );
}

export default App;
