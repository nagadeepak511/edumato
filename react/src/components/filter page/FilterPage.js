import React,{Component} from 'react';
import FilterForm from './FilterForm';
import Header from './Header';

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
        fetch(api+'/restaurants?mealtype='+this.props.match.params.mealtype)
        .then((res)=>{return res.json()})
        .then((data)=>{this.setState({restaurants: data});})
    }

    render(){
        return (
            <>
                <Header/>
                <FilterForm mealtype={this.props.match.params.mealtype} updateData={this.getRestaurants}/>               
            </>
        );
    }
};

export default FilterPage;