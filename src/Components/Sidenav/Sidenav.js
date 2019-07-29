import React, { Component } from "react";
import { Link } from 'react-router-dom';
import M from "materialize-css/dist/js/materialize.min.js";
import 'materialize-css/dist/css/materialize.min.css';
import './Sidenav.css';

class Sidenav extends Component{
  componentDidMount(){
    let list = document.querySelector('.sidenav');
    let s = M.Sidenav.init(list);
    let route = window.location.pathname.substr(1);
    let sBtn = document.querySelectorAll('.sBtn');
    
    let shareBtn = document.querySelector(".shareBtn");
    shareBtn.addEventListener("click", () =>{
	if (navigator.share) {
  	  navigator.share({
      	  title: 'FIUSAC (Helper)',
	  text: 'Prueba esta aplicación 😀 ',
     	  url: window.location
  	})
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing', error));
	}else alert('Tu navegador no es compatible');
     })

    for(let i = 0;i<2;i++){
      sBtn[i].classList.remove('active');
      sBtn[i].addEventListener('click', e => {
        sBtn[0].classList.remove('active');    
	sBtn[1].classList.remove('active');
        sBtn[i].classList.add('active');
	s.close();
      })
      let btnText = sBtn[i].innerHTML.substr(sBtn[i].innerHTML.indexOf('i>')+2,sBtn[i].innerHTML.length-sBtn[i].innerHTML.indexOf('i>')-6);
      if(route===btnText.toLowerCase()){
        sBtn[i].classList.add('active');
      }else if(route === '') sBtn[0].classList.add('active');
    }
    let deferredPrompt;
    const addBtn = document.querySelector('.add-button');
    addBtn.style.display = 'none';
    window.addEventListener('beforeinstallprompt', e => {
      e.preventDefault();
      deferredPrompt = e;
      addBtn.style.display = 'block';
      addBtn.addEventListener('click', e => {
        addBtn.style.display = 'none';
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') console.log('User accepted app prompt');
          else console.log('User dismissed the app prompt');
          deferredPrompt = null;
        });
      });
   });
  }
  render(){
    return (
      <ul class="sidenav" id="side1">
        <li>
          <div class="user-view">
	    <a role="button" class="userInfo">
	      <span class="name">FIUSAC Horario</span>
	      <span class="email">Version beta v0.67</span>
	    </a>
	  </div>
	</li>
	<Link to="/"><li class="sBtn homeBtn">
          <a role="button" class="waves-effect">
            <i class="material-icons">home</i>Inicio
          </a>
        </li></Link>
	<Link to="/horario"><li class="sBtn shBtn">
          <a role="button" class="waves-effect">
            <i class="material-icons">today</i>Horario
          </a>
        </li></Link>
        <li>
	  <div class="divider"></div>
	</li>
	<li>
	  <a class="subheader" href="#!">Applicación</a>
	</li> 
	<div id="accountSection">
	<li>
	  <a role="button" class="waves-effect">
	    <i class="material-icons">settings</i>Configuracion
	  </a>
	</li>	
	<li>
	  <a role="button" id="logout" class="waves-effect">
	    <i class="material-icons">logout</i>Cerrar sesión
	  </a>
	</li>
	</div>
	<li class="sBtn login">
	  <a role="button" id="login" class="waves-effect">
	    <i class="material-icons">person</i>Iniciar sesión
	  </a>
	</li>
	<li class="sBtn shareBtn" >
	  <a role="button" class="waves-effect">
	    <i class="material-icons">share</i>Compartir
	  </a>
	</li>
	<li class="sBtn download">
	  <a role="button" class="waves-effect add-button">
	    <i class="material-icons">arrow_downward</i>Descargar app
	  </a>
	</li>
      </ul> 
    );
  }
}

export default Sidenav;
