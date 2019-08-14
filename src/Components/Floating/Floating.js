import React, { Component } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import './Floating.css';

class Floating extends Component{
  render(){
    return(
      <div class="fixed-action-btn action">
        <a class={`btn-floating btn-large waves-effect z-depth-3 ${this.props.pulse?'pulse':'n'}`} href="#add">
	  <i class="large material-icons">{this.props.icon}</i>
	</a>
      </div>
    )
  }
}

export default Floating;
