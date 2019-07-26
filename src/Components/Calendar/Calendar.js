import React, { Component } from 'react';
import SwipeListener from 'swipe-listener';
import './Calendar.css';
import 'materialize-css/dist/css/materialize.min.css';
import Logo from './fiusac.png';
import CourseData from './courses.json';
import Course from '../Course/Course';

class Calendar extends Component{
  constructor(props){
    super(props);
    const courses = JSON.parse(window.localStorage.getItem('courses'));
    this.current=[];
    CourseData.map((e,p)=>{
      return courses.map(i=>{
	if(e.codigo === i.codigo.toString() && e.seccion === i.seccion) this.current.push(e);
	return e
      })
    });
    this.current.sort( (a,b) =>{
	const as = a.horaInicio.split(':');
	const bs = b.horaInicio.split(':');
	return (parseInt(as[0]) + parseInt(as[1]/100)) - (parseInt(bs[0]) + parseInt(bs[1]/100)) 
    })
   this.months=['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
    this.dd=['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
    this.state={normal:new Date()}
    this.allCt=React.createRef();
    this.tuto = React.createRef();
  }
  componentDidMount(){
    const mainDate = document.getElementById('mainDate');
    const all = document.getElementById('all');
    animDate();
    function animDate(){
      mainDate.style.transition="unset";
      mainDate.style.opacity=0;
      all.style.transition="unset";
      all.style.opacity=0;
      setTimeout(()=>{
        mainDate.style.transition="opacity 0.3s ease";
        mainDate.style.opacity=1;
	all.style.transition="opacity 0.2s ease";
        all.style.opacity=1;
      }, 100);
    }

    function slide(e, dir){
      let cp = e.state.normal;                                                         cp.setDate(cp.getDate()+dir);                                                    e.setState({normal:cp});
      animDate();
    }
    
    SwipeListener(this.allCt.current);
    const classAct=this;
    mainDate.addEventListener('click', ()=>{
      classAct.setState({normal:new Date()});
      animDate();
    });
    this.allCt.current.addEventListener('swipe',e =>{
      let directions = e.detail.directions;
      if(directions.left) slide(classAct, 1);
      if(directions.right) slide(classAct, -1);
    })
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  render(){
    const year = this.state.normal.getFullYear();
    const today =  this.dd[this.state.normal.getDay()]
    const cMonth = this.months[this.state.normal.getMonth()];
    const tDate = this.state.normal.getDate();
    let fails = 0;
    let counter = 0;
    return(
      <div ref={this.allCt}>
        <div id="header">
	  <h3 id="mainDate" class={today==='Miércoles'?'rss':today==='Domingo'?'rsd':'exp'}>{today} <br/><span>{cMonth} {tDate}</span></h3>
	  <div id="main">
	    <div id="bans">
	    <img src={Logo} alt="Logo FIUSAC"/>
	    <h4>Facultad de<br/>Ingeniería</h4>
	    </div>
            <span>Semestre II {year}</span><br/>
	  </div>
	</div>
	<section id='all'>
	 {this.current.map((e,i)=>{
           let days = [e.domingo, e.lunes, e.martes, e.miercoles, e.jueves, e.viernes, e.sabado].map(e=>{if(e===undefined) return false;else return true});
	   
	 if(days[this.state.normal.getDay()]){
	   counter++;
	   return(
          <Course
	    name={e.nombre}
	    timeStart={e.horaInicio}
	    timeEnd={e.horaFinal}
	    room={e.salon}
	    build={e.edificio}
	    section={e.seccion}
	    prof={e.catedratico}
	    code={e.codigo}	
	    count={counter}
	  />)      
	  }else fails++;
	 })}
	  <div id="emptyCourses" class={fails===6?'show':'hide'}>
            <i class="material-icons">assignment_late</i>
	    <p>Descansa, para hoy no tienes ningún curso asignado.</p>
	  </div>
	  <div id='rights'><p>FIUSAC Horario 2019 ®<br/>todos los derechos reservados.</p>
	  </div>
        </section>
	<div id="swipeArea"></div>
      </div>
    );
  }
}

export default Calendar;
