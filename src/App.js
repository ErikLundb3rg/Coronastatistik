import React from 'react';
import './App.css'
import Header from "./header/header.js"
import Top from "./components/top.js"
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import GoToRegion from "./components/goto/gotoregion.js";
import GoToCountry from "./components/goto/gotocountry.js";
import Om from "./components/om/om.js"
import Compare from "./components/compare/compare.js"
import News from "./components/news/news.js"

function App() {
  return (
    <div>

    <Router>
      <Header/>
      <Switch>
        <Route exact path = "/" component = {Top}/>
        <Route exact path = "/region/:id" component = {GoToRegion}/>
        <Route exact path = "/land/:id" component = {GoToCountry}/>
        <Route exact path = "/nyheter" component = {News}/>
        <Route exact path = "/jämför" component = {Compare}/>
        <Route exact path = "/om" component = {Om}/>
      </Switch>
    </Router>
      
    </div>
  )
}

export default App;
