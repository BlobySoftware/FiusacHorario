import React, { Component } from 'react';
import SwipeListener from 'swipe-listener';
import Course from '../Course/Course';
import gest from './gesture.png'
import detail from './details.jpg';
import './Tutorial.css';

class Tutorial extends Component{
  constructor(props){super(props)
    this.items = 0;
  }
  componentDidMount(){
    //Select elements
    const tut = document.getElementById('tuto');
    const cont = document.querySelector('.cont');
    const dots = document.getElementById('dots');
    this.items = cont.childNodes.length - 1;
    let current = 0;

    //Animation
    setTimeout(()=>tut.style.opacity=1,10);
    dots.childNodes[current].childNodes[0].classList.add('currentDot');
    //Init Swipe
    SwipeListener(tut);

    tut.addEventListener('swipe',e =>{
      const dir = e.detail.directions;
      if(dir.left) current++;
      if(dir.right) current--;
      if(current <= 0) current = 0;
      if(current >= this.items) current = this.items;
      cont.style.left=`-${current}00%`;
      for(let i=0;i<this.items+1;i++){
        dots.childNodes[i].childNodes[0].classList.remove('currentDot');
      }
      dots.childNodes[current].childNodes[0].classList.add('currentDot');
    })
    this.setState({ref:true});
  }
  render(){
    const lis = [];
    for(let i=0;i<this.items+1;i++){
      lis.push(<li><i class="material-icons">lens</i></li>);
    }
    return(
      <div id="tuto">   
	<div class="cont">
	  <div class="item">  
	    <h5>Cursos</h5>
  	    <hr></hr>
	    <h4>Comportamiento</h4>
	    <p>Cada curso cambia su color en su estado actual, los colores se interpretan de la siguiente manera:</p>             
            <ul>
              <li><span class="bls">Inactivo</span> Indica un curso no proximo en el tiempo o ya finalizado.</li>
              <li><span class="yls">Proximo</span> Indica un curso que esta por empezar en menos de 10 minutos.</li>
              <li><span class="gls">Activo</span> Indica el curso actual segun hora de incio en su intervalo de tiempo.</li>
            </ul>
	    <hr></hr>
	    <h4>Navegación</h4>
	    <p>Si deseas navegar en el calendario solo desliza en cualquier parte de el horario, cada curso simula el dia en el que navegues.</p>
	    <Course 
	      name='Nombre | Curso'
	      timeStart='Inicio'
	      timeEnd='Final'
	      room='N#'
	      build='T-7'
	      section='#'
	      prof='Nombre de Catedratico'
	      days={[true,true,true,true,true,true,true]}
	      today={new Date()}
	      updateCourse={()=>console.log("Updated")}
	      count={1}
	    />
	    <img src={gest} alt="Swipe Gesture" id="gest"/>
	    <div id="block"></div>
	  </div>
	  <div class="item">
	    <h4>Orden</h4>
	    <p>Los cursos se muestran en un orden cronologico en cualquier seccion de la applicación, se ordenan de acuerdo a su hora inicio y no a su duración total.</p>
	    <hr></hr>
	    <h4>Detalles</h4>
	    <p>Cada curso contiene información extra en su interior, estas tarjetas se encuentran en los cursos o en la caja busqueda.</p>
	    <div id="detailsTutorial">
	      <img src={detail} alt="CourseDetails"/>
	      <p>Cuando presionas sobre un curso este abrira una nueva ventana con información mas detallada como:<br/><br/>Código del curso •<br/>Días del curso •<br/>Lugar del salón •<br/></p>
	    </div>
          </div>
	  <div class="item bs">
	    <h5>Buscador</h5>
	    <hr></hr>
	    <p>Puedes buscar por: nombre, sección, docente, codigo, salón, edificio, hora, lugar, termino similar, etc y cualquier cosa relacionada con los cursos.<br/> para acceder a la busqueda avanzada debes escribir en el siguiente formato:</p>
	    <p><h4>Código</h4> "numero de código"</p>
	    <p><h4>Edificio</h4> "nombre del edificio"</p>
	    <p><h4>Salón</h4> "nombre del salon" <h4>del</h4> "nombre del edificio"</p>
	    <p><h4>Empieza a las</h4> "inicio (hh:mm)" <h4>termina a las</h4> "final (hh:mm)"</p>
	    <div class="add">
	      <i class="material-icons">info_outline</i><h4> Información importante</h4><br/>
	      <span>La busqueda avanzada solo funciona si escribes el formato exactamente como se muestra, incluyendo acentos, y no agregues signos de puntuación como "_ - , :" etc.</span>
	    </div>
	  </div>
        </div>
	<ul id="dots">
            {lis}
        </ul>
      </div>
    )	
  }
}
export default Tutorial;
