import React, { Component } from 'react';
import './Course.css';

class Course extends Component{
  constructor(props){ super(props)
    //Set global dates (Today as default)
    const now1 = new Date();
    const now2 = new Date();
    const time1 = this.props.timeStart.split(':');
    const time2 = this.props.timeEnd.split(':');
    now1.setHours(time1[0]);now1.setMinutes(time1[1]);
    now2.setHours(time2[0]);now2.setMinutes(time2[1])
    //Refs for colors
    this.timeEnd = now2;
    this.timeStart = now1;
    this.titleName = React.createRef();
    this.footer= React.createRef();
    this.titleNameS = React.createRef();
    this.allC = React.createRef();
    this.dot= React.createRef();
    this.line=React.createRef();
    this.badge = React.createRef();
    this.safe = false;
  }
  componentDidMount(){
    const selected = this;
    let count = 0
    this.safe = true;
    //Enter animation
    setTimeout(()=>{
      this.allC.current.style.transitionDelay=`${this.props.count*0.07}s`;
      this.allC.current.style.left=0;
      setTimeout(()=>this.line.current.style.height="calc(100% + 40px)",500);
    },5);	
    //Difference between two dates (Get Minutes)
    const compare_dates = (date1,date2) =>{
      if (date1<date2) return 1
      else if (date1.getHours()===date2.getHours() && date1.getMinutes()===date2.getMinutes()) return 2
      else if (date1>date2) return 3
      else return 4
    }	
    //Set colors for refs
    function setColor(c,sc){
     selected.footer.current.style.background=c;
      selected.titleName.current.style.color=c;
      selected.titleNameS.current.style.color=c;
      selected.dot.current.style.color=c;
      selected.dot.current.style.transform=sc;
      selected.line.current.style.background=c;
      selected.badge.current.style.background=c;
    }
    //Evaluate time
    this.ups=setInterval(()=>{
      const now = new Date();
      const res = compare_dates(now,this.timeStart);
      const resEnd = compare_dates(now,this.timeEnd);
      //If time to end a course < now < time to start a course
      if((res===3 || res===2) && resEnd===1){
	if(res===2){
	  count++
	  if(count===1) alert(`${this.props.name} en ${this.props.room} del ${this.props.build}`);
	}
	setColor('var(--secondary)','scale(1.3,1.3)');
      }else if(res === 1){
	const hours = (this.timeStart.getTime() - now.getTime())/(1000*60);      
	if(hours <= 10) setColor('var(--warning)','scale(1.15,1.15)');
      }else setColor('var(--disable)','scale(1,1');
    },500);
  }
  componentWillUnmount(){
    clearInterval(this.ups);
    this.safe = false;
  }
  render(){
    //Parse content
    let parsed = false;
    let title = this.props.name.toLowerCase().split(' ');
    //Marks and mods
    const areaTitle = title.join(' ').substr(5);
    const labTitle = title.slice(0, 4).join(' ');
    //Add Labels
    if(title[0]==='area') title = areaTitle;
    else if(title.includes('laboratorio')) title = labTitle;
    else title = title.slice(0,3).join(' ');
    if(!Number.isNaN(parseInt(title.split(' ')[2]))) parsed=true;
    //Animate component if its mounted
    if(this.safe){
      this.allC.current.style.transitionDelay=`0s`;
      this.allC.current.style.transform="scale(1.1,1.1)";
      setTimeout(()=>this.allC.current.style.transform="scale(1,1)",300);
    }
	
    return( 
      <div class="allThem">
	<div class="mainLine" ref={this.line}></div>
      	<span ref={this.badge} class={title.split(' ')[0]==='laboratorio'?'show composed':'hide'}>Laboratorio<br/></span>
      	<div class="content" ref={this.allC}>
      	  <i class="material-icons" ref={this.dot}>fiber_manual_record</i>
	  <div class='row valign-wrapper cp'>
	    <div id='pres'>
	      <h4 ref={this.titleName}>{title.split(' ')[0]==='laboratorio'?title.split(' ').slice(1,4).join(' '):parsed?title.split(' ')[0]:title}
	        <span class={parsed?'show':'hide'}><br/>{title.split(' ').slice(1.3).join(' ')}</span>
	      </h4>
	      <h5>{this.props.timeStart} - {this.props.timeEnd}</h5>
	    </div>
	    <div id='room'>
              <h4 class='right-align title' ref={this.titleNameS}>Salón: {this.props.room}</h4>
              <h5 class='right-align'>Edificio: {this.props.build}</h5>
	    </div>
      	    <div id='footer' ref={this.footer}>
	      <h5>{this.props.prof.toLowerCase().split(' ').slice(0,3).join(' ')} <span>en Sección {this.props.section}</span></h5>
      	    </div>
      	  </div>
        </div>
      </div>
    )
  }  
}

export default Course
