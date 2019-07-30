import React, { Component } from 'react'
import {BrowserRouter, Route} from 'react-router-dom';
import Sidenav from '../Sidenav/Sidenav';
import Navbar from '../Navbar/Navbar';
import Floating from '../Floating/Floating';
import Calendar from '../Calendar/Calendar';
import Home from '../Home/Home';
import Tutorial from '../Tutorial/Tutorial';
import './App.css';
import 'material-design-icons/iconfont/material-icons.css';
import 'materialize-css/dist/css/materialize.min.css';

class App extends Component {
    render(){
    return (
      <main>
        <BrowserRouter>
          <div>
	    <Sidenav />
	    <Navbar />
	    <Route exact path="/" component={Home} />
            <Route exact path="/horario" component={Calendar} />
	    <Route exact path="/tutorial" component={Tutorial} />
          </div>
        </BrowserRouter>
	<Floating />
      </main>
    )
  }
}

export default App;
