import React, {Component} from 'react';
import './Home.css';

class Home extends Component{
  componentDidMount(){
    const items = [{codigo:147,seccion:"C-"},{codigo:348,seccion:"C"},{codigo:107,seccion:"C"},{codigo:19,seccion:"K"},{codigo:5,seccion:"E"}];
      window.localStorage.setItem('courses',JSON.stringify(items));
  }
  render(){
    return(<h5>Pagina de inicio.</h5>)
  }
}

export default Home;

