import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import M from 'materialize-css/dist/js/materialize.min.js';
import './Navbar.css';
import Tutorial from '../Tutorial/Tutorial';
import CourseData from '../Calendar/courses.json';

class Navbar extends Component{
  constructor(props){
    super(props);
    //Global Functions
    this.openSearch = this.openSearch.bind(this);
    this.openTut=this.openTut.bind(this);
    this.closeTut=this.closeTut.bind(this);
    this.state={tut:false}
    //Set autocomplete data
    this.courses={};
    CourseData.map(e =>{
     if(e.nombre !== undefined && e.nombre.length > 2) this.courses[e.nombre.toLowerCase()]=null;
     if(e.catedratico !== undefined && e.catedratico.length > 2) this.courses[e.catedratico.toLowerCase()]=null;
     if(e.codigo !== undefined && e.codigo.length > 0) this.courses["Código "+e.codigo] =  null;
     if(e.seccion !== undefined && e.seccion.length > 0) this.courses["Sección "+e.seccion] =  null;
     if(e.edificio !== undefined && e.edificio.length > 0) this.courses["Edificio "+e.edificio] =  null;
     if(e.salon !== undefined && e.salon.length > 0) this.courses["Salón "+e.salon+" del Edificio "+e.edificio] =  null;
     if(e.horaInicio !== undefined && e.horaInicio.length > 0) this.courses["Empieza a las "+e.horaInicio+" termina a las "+e.horaFinal] =  null;
    });
  }

  //Bind to tutorial component
  openTut(){ this.setState({tut:true}) };
  closeTut(){
    const tuts = document.getElementById('tuto');
    const closeT = document.querySelector('.closeT');
    closeT.classList.add('hide');
    tuts.style.opacity=0;
    setTimeout(()=>this.setState({tut:false}),300);
  };

  openSearch(){
    //Selecr input field
    let cont = document.getElementById('search-container');
    let inp = document.getElementById('search-input');
    let shadowS = document.getElementById('searchShadow');
    //Hide shadows and placeholder
    shadowS.style.display="block";
    cont.style.display='block';
    inp.setAttribute('placeholder', 'Buscar');
    //Show input
    setTimeout(()=> {
      inp.focus();
      shadowS.style.opacity=1;
    },10)
    //Hide search on lose focus
    inp.addEventListener('focusout',()=>{
      inp.setAttribute('placeholder','');
      inp.value='';
      shadowS.style.opacity=0;
      cont.style.opacity=1;
      setTimeout(()=>{
	cont.style.display="none";
	shadowS.style.display="none";
      },200);
    })
  }
  componentDidMount(){
    //Init autocomplete
    const drop = document.querySelectorAll('.dropdown-trigger');
    const searchInput = document.getElementById('search-input');
    M.Dropdown.init(drop);
    M.Autocomplete.init(searchInput, { data:this.courses })
  }
  render(){
    //Update state tu show tutorial
    const { location } = this.props
    let tutComp = ' ';
    if(this.state.tut) tutComp = (<Tutorial />);
   
    return(
      <div>
        <nav>
          <div class="nav-wrapper">
	    <a data-target="side1" class="nbtn sidenav-trigger waves-effect">
	      <i class="material-icons">menu</i>
	    </a>
            <a class="brand-logo"><span>{location.pathname.substr(1)}</span></a>
	    <a class="nbtn right waves-effect dropdown-trigger" data-target='dropdown1'>
	      <i class="material-icons">more_vert</i>
	    </a>
	    <a class="nbtn right waves-effect" onClick={this.openSearch}>
	      <i class="material-icons">search</i>
	    </a>	
	    <div class="input-field" id="search-container">
              <input id="search-input" type="search" placeholder="Buscar"/>
	      <i class="material-icons">search</i>
	      <i class="material-icons" id="bck">arrow_back</i>
            </div>
	  </div>
          <div id="searchShadow"></div>
	  <ul id='dropdown1' class='dropdown-content z-depth-3'>
    	    <li><a class="black-text waves-effect" onClick={this.openTut}>Información</a></li>
	    <li><a class="black-text waves-effect">Configuración</a></li>
  	  </ul>
        </nav>
	<i class={this.state.tut?"material-icons closeT":"hide"} onClick={this.closeTut}>close</i>
        {tutComp}
      </div>
    )
  }
}

export default withRouter(Navbar);
