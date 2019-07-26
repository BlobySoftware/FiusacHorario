import React, { Component } from 'react'
import M from 'materialize-css/dist/js/materialize.min.js';
import Course from '../Course/Course';
import './Tutorial.css';
import gest from './gesture.png';
class Tutorial extends Component{
  componentDidMount(){
    const el = document.querySelector('.carousel');
    const tut = document.getElementById('tuto');
   setTimeout(()=>tut.style.opacity=1,10);
    M.Carousel.init(el, {
      fullWidth: true,
      indicators: true,
      shift:100
    }); 
  }
  render(){
    return(
      <div id="tuto">   
	<div class="carousel carousel-slider center">
	  <div class="carousel-item">                                           
	    <h5>Estado del curso</h5>                      
	    <p>El comportamiento de cada curso cambia su color en su estado actual, los colores se interpretan de la siguiente manera:</p>                  
	    <Course
	      name='Nombre | Curso'                                        
	      timeStart='Inicio'                             
	      timeEnd='Final'                                
	      room='N#'                                      
	      build='#'                                      
	      section='#'                                    
	      prof='Nombre de Catedratico'                   
	      days={[true,true,true,true,true,true,true]}
	      today={new Date()}                      
	      count={1}
            />
            <ul>
              <li><span class="bls">Inactivo</span> Indica un curso no proximo en el tiempo o ya finalizado.</li>
              <li><span class="yls">Proximo</span> Indica un curso que esta por empezar en menos de 10 minutos.</li>
              <li><span class="gls">Activo</span> Indica el curso actual segun hora de incio en su intervalo de tiempo.</li>
            </ul>
          </div>
	  <div class="carousel-item">
   	    <h5>Navega entre dias</h5>
	    <p>Si deseas navegar en el calendario solo desliza en cualquier parte de el horario, cada curso simula el dia en el que navegues.<br/><br/>La aplicacion determina que cursos mostrar y los cursos cambian de estado de forma independiente del resto.</p>
	    <Course                                                                      name='Nombre | Curso'                                                      timeStart='0:00'
              timeEnd='24:00'
              room='N#'                                                                  build='#'
              section='#'                                                                prof='Nombre de Catedratico'                                               days={[true,true,true,true,true,true,true]}
              today={new Date()}
              count={1}
            />
	    <img src={gest} alt="Swipe Gesture" id="gest"/>
	  </div>
        </div>
        </div>
    )	
  }
}
export default Tutorial;
