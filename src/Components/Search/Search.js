import React, { Component } from 'react';
import Course from '../Course/Course';
import CourseExpanded from '../CourseExpanded/CourseExpanded';
import CourseData from '../Calendar/courses.json';
import 'materialize-css/dist/css/materialize.min.css';
import './Search.css';

class Search extends Component{
  constructor(props){
    super(props)
    
    this.laps = new Date();
    this.current = [];
    this.setCurrent = this.setCurrent.bind(this);
  }
  setCurrent(){
    const k = this.props.keyword.toLowerCase();
    this.current = CourseData.map((e,i)=>{
      if(k.includes('codigo') || k.includes('código')){
	if(e.codigo.toString().includes(k.split(' ')[1])) return e;
	else return false;
      }
      else if(k.includes('seccion') || k.includes('sección')){
	if(e.seccion.toString().toLowerCase().includes(k.split(' ')[1])) return e;
	else return false;
      }
      else if(k.includes('salon') || k.includes('salón')){
	if(k.includes('edificio')){
          if(e.salon.toString().includes(k.split(' ')[1]) && e.edificio.toLowerCase().includes(k.split(' ')[3])) return e;
	  else return false;
	}
	else if(e.salon.toString().includes(k.split(' ')[1])) return e;
	else return false;
      }
      else if(k.includes('edificio')){
	if(e.edificio.toLowerCase().includes(k.split(' ')[1])) return e;
	else return false;
      }
      else{
	if(e.nombre.toLowerCase().includes(k) || e.codigo.toString().includes(k) || e.seccion.toString().toLowerCase().includes(k) || e.catedratico.toLowerCase().includes(k) || e.salon.toString().includes(k) || e.edificio.toLowerCase().includes(k) || e.horaInicio.includes(k) || e.horaFinal.includes(k) ) return e;
	else return false
      }
    }).filter(Boolean);
  }
  componentDidUpdate(prev, st){
    if(prev.keyword !== this.props.keyword) this.setCurrent();
  }
  
  render(){
    this.setCurrent();
    const laps = this.laps.getMilliseconds()/1000;
    const rss = this.current.length===1?'resultado':'resultados';
    return(
      <div id="listOf">
        <h3 id="srcTitle">Resultados de busqueda<br/><h4>Se a econtrado {this.current.length} {rss} en {laps}s</h4></h3>
        <div id={this.current.length===1?'allOneSrc':'allSrc'}>
	  <div class={this.current.length===1?'hide':'timeLine'}></div>
          {this.current.map(e =>{
	    let days = [e.domingo, e.lunes, e.martes, e.miercoles, e.jueves, e.viernes, e.sabado].map(e=>{if(e===undefined) return false;else return true});
	    if(this.current.length === 1){
	      return(
	      <CourseExpanded
		name={e.nombre}
		timeStart={e.horaInicio}
		timeEnd={e.horaFinal}
		room={e.salon}
		build={e.edificio}
		section={e.seccion}
		prof={e.catedratico}
		days={days}
		code={e.codigo}
	      />)
	    }else if(this.current.length > 1){
	    return (
              <Course 
	        name={e.nombre}
	        timeStart={e.horaInicio}
	        timeEnd={e.horaFinal}
	        room={e.salon}
		code={e.codigo}
	        build={e.edificio}
	        section={e.seccion}
	        prof={e.catedratico}
	        count={1}
	        days={days}
	      />
	    )
	   }
	  })}
	<div class='rights'><p>FIUSAC Horario 2019 ®<br/>todos los derechos res
ervados.</p>
          </div>
        </div>
      </div>
    )	  
  }
}

export default Search;
