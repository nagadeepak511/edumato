import React,{Component} from 'react';
import '../../ss/filterpage/filterform.css'

var api = "https://edumato-naga.herokuapp.com"

class FilterForm extends Component {
    constructor(props){
        super(props);
        this.state = {
          locations:[],
          query:'?state=',
          selectedState:"",
          selectedCuisines:[]
        }
    }

    componentDidMount=()=>{
      fetch(`${api}/locations?states=1`)
      .then((res)=>{return res.json()})
      .then((data)=>{
        this.setState({locations : data, selectedState:data[0].state});
      })
    }

    renderLocations = ()=>{
      return this.state.locations.map((item)=>{
        return (<option value={""+item.id}  for="state">{item.state}</option>);
      })
    }

    changeLocation = (event)=>{
      if(event.target.value) {
        var temp = this.state.locations.filter((item)=>{return item.id==event.target.value})[0]
        this.setState({selectedState:temp.state})
        this.props.sendRestaurants(temp.id)
        console.log(temp.id)
      }
    }

    changeCuisine = (event)=>{
      let temp;
      if(event.target.checked) {
        temp = this.state.selectedCuisines;
        if(temp.indexOf(Number(event.target.value))==-1) temp.push(Number(event.target.value))
      }
      else{
        temp = this.state.selectedCuisines
        temp = temp.filter((item)=>{return item!=Number(event.target.value)})
        console.log("temp is ", temp)
      }
      this.setState({selectedCuisines: temp})
      this.props.sendRestaurants(Number(this.state.locations.filter((item)=>{return item.state == this.state.selectedState})[0].id), `&cuisine=`+temp.toString())
      console.log(this.state.locations.filter((item)=>{return item.state == this.state.selectedState})[0].id)
    }

    render(){
        return(
            <React.Fragment>
                <div id="filterFormHeading">Best hotels <span id="recommendation"> in {this.state.selectedState}</span></div>
                <div id="filter-container-collapse">Filers/Sort</div>
                <div id="filter-container">
                    <div id="filters-heading">Filters</div>
                    <div className="sub-heading-filters">Select location</div>
                    <select name="state" id="filter-location-input" onChange={this.changeLocation}>
                        <option value="" for="state">Select location</option>
                        {this.renderLocations()}
                    </select>
                    <div className="sub-heading-filters">Cuisine</div>
                    <div className="filter-input-container"><input onChange={this.changeCuisine} type="checkbox" value={1}/><span>North Indian</span></div>
                    <div className="filter-input-container"><input onChange={this.changeCuisine} type="checkbox" value="2"/><span>South Indian</span></div>
                    <div className="filter-input-container"><input onChange={this.changeCuisine} type="checkbox" value="4"/><span>Fast Food</span></div>
                    <div className="filter-input-container"><input onChange={this.changeCuisine} type="checkbox" value="5"/><span>Street food</span></div>
                    <div className="filter-input-container"><input onChange={this.changeCuisine} type="checkbox" value="3"/><span>Chineese</span></div>
                    
                    <div id="costfortwo" className="sub-heading-filters">Cost for two</div>
                    <div className="filter-input-container"><input type="radio" name="costfortwo"/><span>Less than &#8377; 1500</span></div>
                    <div className="filter-input-container"><input type="radio" name="costfortwo"/><span>&#8377; 1500 to &#8377; 1800</span></div>
                    <div className="filter-input-container"><input type="radio" name="costfortwo"/><span>&#8377; 1800 to &#8377; 11000</span></div>
                    <div className="filter-input-container"><input type="radio" name="costfortwo"/><span>&#8377; 11000+</span></div>

                    <div id="sort" className="sub-heading-filters">Sort</div>
                    <div className="filter-input-container"><input type="radio" name="sort"/><span>Price Low to high</span></div>
                    <div className="filter-input-container"><input type="radio" name="sort"/><span>Price High to low</span></div>
                </div>
            </React.Fragment>
        );
    }
};

export default FilterForm;