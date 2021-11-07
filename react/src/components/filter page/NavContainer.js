import React from 'react';
import '../../ss/filterpage/navcontainer.css';

class NavContainer extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      pageNumber:1
    }
  }

  static getDerivedStateFromProps(props, state){
    return {pageNumber:props.pgNo}
  }

  updateHotels = (event)=>{
    this.props.handler(Number(event.target.innerHTML));
  }

  renderNavButtons = ()=>{
    var x = []
    for(var i=1; i<=this.props.number; i++){
      x.push(i);
    }
    return (x.map((item)=>{
      return <button class={"nav-box" + (this.state.pageNumber == item?" nav-active":"")} onClick={this.updateHotels} key={item}>{item}</button>
    }));
  }

  changeFocusPagination = (event)=>{
    console.log(event.target.innerText == '<' , event.target.innerText == '>', this.state.pageNumber, this.props.number)
    var n = this.state.pageNumber
    if(event.target.innerText == "<" && Number(this.state.pageNumber)>1) n--
    else if(event.target.innerText == ">" && (Number(this.state.pageNumber)<Number(this.props.number))) n++
    this.props.handler(n);
  }

  render(){
    return (
      <>
        <div class="nav-container">
            <button class="nav-box" onClick={this.changeFocusPagination}>{"<"}</button>
            {this.renderNavButtons()}
            <button class="nav-box" onClick={this.changeFocusPagination}>{">"}</button>
        </div>
      </>
    );
  }
};

export default NavContainer;