import React,{Component} from 'react';
import Header from './Header';
import RenderRestaurants from './RenderRestaurants';

var api = 'https://edumato-naga.herokuapp.com';
class FilterPage extends Component{
    constructor(props){
        super(props);
        this.state={
            restaurants:[]
        }
    }

    getRestaurants = (data)=>{
        this.setState({restaurants: data});
    }

    componentDidMount(){
        fetch(api+'/restaurants?mealtype='+this.props.match.params.mealtype+`&state=${localStorage.getItem('location')}&cuisine=${localStorage.getItem('cuisine')}&sort=${localStorage.getItem('sort')}&lcost=${localStorage.getItem('cost').split(',')[0]}&hcost=${localStorage.getItem('cost').split(',')[1]}`)
        .then((res)=>{return res.json()})
        .then((data)=>{
            console.log(data, api+'/restaurants?mealtype='+this.props.match.params.mealtype+`&state=${localStorage.getItem('location')}&cuisine=${localStorage.getItem('cuisine')}&sort=${localStorage.getItem('sort')}&lcost=${localStorage.getItem('cost').split(',')[0]}&hcost=${localStorage.getItem('cost').split(',')[1]}`)
            this.setState({restaurants: data});})
    }

    renderHotels = ()=>{
        var data = this.state.restaurants
    }

    render(){
        return (
            <>
                <Header/>
                <RenderRestaurants listData={this.state.restaurants} updateData={this.getRestaurants} mealtype={this.props.match.params.mealtype}/>
            </>
        );
    }
};

export default FilterPage;