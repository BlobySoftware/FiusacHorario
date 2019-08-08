import React, { Component } from 'react'
import M from 'materialize-css/dist/js/materialize.min.js';
import Course from '../Course/Course';
import gest from './gesture.png'
import detail from './details.jpg';
import './Tutorial.css';

class Tutorial extends Component{
  componentDidMount(){
    //Select elements
    const el = document.querySelector('.carousel');
    const tut = document.getElementById('tuto');
    //Init carousel
    setTimeout(()=>tut.style.opacity=1,10);
    M.Carousel.init(el, {
      fullWidth: true,
      indicators: true,
      shift:100,
      noWrap:true
    }); 
  }
  render(){
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
	    <hr></hr>
	    <h4>Orden</h4>
	    <p>Los cursos se muestran en un orden cronologico en cualquier seccion de la applicación, se ordenan de acuerdo a su hora inicio y no a su duración total.</p>
	    <hr></hr>
	    <h4>Detalles</h4>
	    <p>Cada curso contiene información extra en su interior, estas tarjetas se encuentran en los cursos o en la caja busqueda.</p>
	    <div id="detailsTutorial">
	      <img src={detail} alt="CourseDetails"/>
	      <p>Cuando presionas sobre un curso este abrira una nueva ventana con información mas detallada como:<br/><br/>Codigo •<br/>Dias •<br/>Lugar •<br/></p>
	    </div>
          </div>
        </div>
      </div>
    )	
  }
}
export default Tutorial;
