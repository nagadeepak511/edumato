import React,{Component} from 'react';
import Cuisine from './filterFormComponents/Cuisine';
import Location from './filterFormComponents/Location';
import Cost from './filterFormComponents/Cost';
import Sort from './filterFormComponents/Sort';
import '../../ss/filterpage/filterform.css'

var api = 'https://edumato-naga.herokuapp.com';

class FilterForm extends Component{
  constructor(props){
    super(props);
    this.state = {state:"Delhi"}
  }

  updateValues = ()=>{
    fetch(`${api}/restaurants?mealtype=${this.props.mealtype}&state=${localStorage.getItem('location')}&cuisine=${localStorage.getItem('cuisine').replace(',','')}&sort=${localStorage.getItem('sort')}&lcost=${localStorage.getItem('cost').split(',')[0]}&hcost=${localStorage.getItem('cost').split(',')[1]}`)
    .then((res)=>{return res.json()})
    .then((data)=>{
      this.props.updateData(data);
    })
    // this.setState(
    //   {
    //     state:localStorage.getItem('stateName'),
    //     cuisine:localStorage.getItem('cuisine').split(','),
    //     cost:localStorage.getItem('cost'),
    //     sort:localStorage.getItem('sort')
    //   }
    // )
  }

  componentDidMount(){
    this.setState({
      state:localStorage.getItem('stateName')
    })
  }

  render(){
    return (
      <>
        <div id="filterFormHeading">Best hotels <span id="recommendation"> in {this.state.state}</span></div>
        <div id="filter-container-collapse">Filers/Sort</div>
        <div id="filter-container">
          <div id="filters-heading">Filters</div>
          <div className="sub-heading-filters">Select location</div>
          <Location getLocation={this.updateValues}/>
          <Cuisine getCuisine={this.updateValues}/>
          <Cost/>
          <Sort/>
        </div>
      </>
    );
  }
};

export default FilterForm;