import React, { Component } from 'react';
import M from "materialize-css/dist/js/materialize.min.js";
import 'materialize-css/dist/css/materialize.min.css';
import './Floating.css';

class Floating extends Component{
  render(){
    return(
      <div class="fixed-action-btn action">
        <a class="btn-floating btn-large waves-effect z-depth-3">
	  <i class="large material-icons">add</i>
	</a>
      </div>
    )
  }
}

export default Floating;
