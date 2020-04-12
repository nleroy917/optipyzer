import React from 'react';
import './App.css';

// Import the React Router Components
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

// Import Custom Pages
import Landing from './Pages/Landing'
import Optimize from './Pages/Optimize'
import Results from './Pages/Results'
import About from './Pages/About'
import Dev from './Pages/Dev'

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/dev/" component={Dev}>
          </Route>
          <Route path="/optimize/" component={Optimize}>
          </Route>
          <Route path="/about/" component={About}>
          </Route>
          <Route path="/results/" component={Results}>
          </Route>
          <Route path="/" exact component={Landing}>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
