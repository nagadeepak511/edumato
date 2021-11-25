import React,{Component} from 'react';
import Header from './Header';
import RenderRestaurants from './RenderRestaurants';
import {Link} from 'react-router-dom'

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

    redirect = ()=>{
        var r = this.state.redirect;
        r = !r;
        this.setState({redirect: r});
        console.log(this.state.redirect, "from FilterPage.redirect")
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
                <Header redirect={this.redirect}/>
                {sessionStorage.getItem('ltk')?<RenderRestaurants listData={this.state.restaurants} updateData={this.getRestaurants} mealtype={this.props.match.params.mealtype}/>:(()=>{
                    return (
                        <div class="container">
                            <div class="alert">Please login to proceed</div>
                            <h1>Or go to <Link to="/">Home</Link></h1>
                        </div>
                    )
                })()}
            </>
        );
    }
};

export default FilterPage;