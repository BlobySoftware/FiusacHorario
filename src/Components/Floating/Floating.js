import React, { Component } from 'react';
import M from "materialize-css/dist/js/materialize.min.js";
import 'materialize-css/dist/css/materialize.min.css';
import './Floating.css';

class Floating extends Component{
  componentDidMount(){
    let btn  = document.querySelectorAll('.fixed-action-btn');
    M.FloatingActionButton.init(btn);
  }
  render(){
    return(
      <div class="fixed-action-btn action">
        <a class="btn-floating btn-large waves-effect z-depth-3">
	  <i class="large material-icons">add</i>
	</a>
	<ul>
	  <li>
	    <a class="btn-floating eColor">
	      <i class="material-icons">color_lens</i>
	    </a>
	  </li>
	  <li>
	    <a class="btn-floating eBtn">
	      <i class="material-icons">email</i>
	    </a>
	  </li>
        </ul>
      </div>
    )
  }
}

export default Floating;
