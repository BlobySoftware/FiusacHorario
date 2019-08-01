import React, { Component } from 'react'
import './CourseExpanded.css';

class CourseExpanded extends Component{
  render(){
    const days = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado']
    return(
      <div id="detailsContainer">
        <div id="detailsShadow"></div>
        <h1 class="titleExp">{this.props.name.toLowerCase()}</h1>
	<h6 class="docExp">{this.props.prof.toLowerCase()}</h6>
	<h6 class="secExp">Sección {this.props.section}</h6>
	<h6 class="secExp">Código {this.props.code}</h6>
	<h3 class="placeExp">Tiempo:</h3>
	<p>Los dias: <br/><span>{this.props.days.map((e,i) =>{
	  if(e) return days[i]
	}).filter(Boolean).join(', ')}</span><br/>de <span>{this.props.timeStart}</span> a <span>{this.props.timeEnd}</span>.</p>
	<h3 class="placeExp">Lugar:</h3>
	<p>En el salon <span>{this.props.room}</span> del edificio <span>{this.props.build}</span></p>
	<iframe class="gmap" height="400" src={`https://maps.google.com/maps?q=Usac%20edificio%20${this.props.build}&t=&z=19&ie=UTF8&iwloc=&output=embed`} frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
      </div>
    );
  }
}

export default CourseExpanded;
