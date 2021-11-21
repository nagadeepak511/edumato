import React,{Component} from 'react';
import Header from './Header';
import FilterForm from './FilterForm';
import FilterPageHotel from "./FilterPageHotel";
import NavContainer from './NavContainer';
import {Link} from 'react-router-dom';
import '../../ss/filterpage/filterpageresponsive.css';

var api = "https://edumato-naga.herokuapp.com"

var getQParam = (name, props)=>{
    return Number(props.location.search.split('?')[1].split('&').filter((i)=>{
        return i.indexOf(name)!=-1;
    })[0].split('=')[1])
}

class FilterPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            location:1,
            mealtype:1,
            restaurants:[],
            totalCount:0,
            page:[],
            currentpage:1,
            statesList:[],
            stateName:""
        }
    }

    static getDerivedStateFromProps(props, state){
        return {
            mealtype:Number(props.match.params.mealtype),
            location:getQParam('location',props)
        }
    }

    updatePage = (page)=>{
        var temp = []
        if(this.state.restaurants.length>(page-1)*2) temp.push(this.state.restaurants[(page-1)*2])
        if(this.state.restaurants.length>(page-1)*2+1) temp.push(this.state.restaurants[(page-1)*2+1])
        return temp;
    }

    changePage = (page)=>{
        this.setState({currentpage:page, page:this.updatePage(page)});
    }

    componentDidMount(){
        let newState = {};
        fetch(`${api}/restaurants?mealtype=${this.state.mealtype}&state=${this.state.location}`)
        .then((res)=>{return res.json()})
        .then((data)=>{
            newState = {restaurants:data, totalCount:data.length, page:this.updatePage(this.state.currentpage)};
        });

        fetch(`${api}/locations?states=1`)
        .then((res)=>{return res.json()})
        .then((data)=>{
            newState.statesList = data;
            this.setState(newState)
        })
    }

    renderHotels = (page)=>{
        console.log(this.props)
        var i=0;
        return (page.map((item)=>{
            return (
                <Link to={"/details/"+item.restaurant_id}>
                    <FilterPageHotel hotelid={(i++)==0?"top-hotel-container":""} name={item.restaurant_name} address={item.address} cuisine="Bakery" costfortwo={item.cost} hotelimg="https://i.ibb.co/4tM0gZc/hotel.png"/>
                </Link>
            );
        }));
    }

    fetchRestaurants = (state,cuisineQParam='', costQParam='', sortQParam='')=>{
        console.log(`${api}/restaurants?mealtype=${this.state.mealtype}&state=${state}`+cuisineQParam+costQParam+sortQParam)
        fetch(`${api}/restaurants?mealtype=${this.state.mealtype}&state=${state}`+cuisineQParam+costQParam+sortQParam)
        .then((res)=>{return res.json()})
        .then((data)=>{
            this.setState({restaurants:data, totalCount:data.length, page:this.updatePage(this.state.currentpage), location:state});
        });
    }

    render(){
        return (
            <React.Fragment>
                <Header/>
                <div id="content-container">
                    <FilterForm sendRestaurants={this.fetchRestaurants} stateName={}/>
                    {this.renderHotels(this.updatePage(this.state.currentpage))}
                </div>
                <NavContainer number={(this.state.totalCount+this.state.totalCount%2)/2} handler={this.changePage} pgNo={this.state.currentpage}/>
            </React.Fragment>
        );
    }
};

export default FilterPage;