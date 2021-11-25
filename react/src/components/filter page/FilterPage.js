import React,{Component} from 'react';
import Header from './Header';
import RenderRestaurants from './RenderRestaurants';

var api = 'https://edumato-naga.herokuapp.com';
class FilterPage extends Component{
    constructor(props){
        super(props);
        this.state={
            restaurants:[],
            redirect:false
        }
    }

    getRestaurants = (data)=>{
        this.setState({restaurants: data});
    }

    componentDidMount(){
        if(!sessionStorage.getItem('ltk')) {
            this.props.history.push('/')
            alert('Please login to proceed')
        }
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
                {
                    (!sessionStorage.getItem('ltk'))?()=>{
                        this.props.history.push('/')
                        alert('Please login to proceed')
                        return null
                    }:null
                }
                <Header redirect={()=>{var r=!this.state.redirect; this.setState({redirect:r})}}/>
                <RenderRestaurants listData={this.state.restaurants} updateData={this.getRestaurants} mealtype={this.props.match.params.mealtype}/>
            </>
        );
    }
};

export default FilterPage;