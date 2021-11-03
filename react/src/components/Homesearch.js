import React from 'react';
import Filter from './Filter';

var api = "https://tesla-clone-naga.herokuapp.com"

class Homesearch extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            restaurants:[],
            filters:[],
            states:[]
        }
    }

    componentDidMount(){
        fetch(api+'/locations?states=1')
        .then(res=>res.json())
        .then((data)=>{
            var temp = [];
            data.map((state)=>{
                temp.push({id:state.id,name:state.state})
            });
            this.setState({states:temp});
        })
    }

    renderLocations = ()=>{
        return this.state.states.map((state)=>{
            console.log(state.id)
            return <option value={state.id} key={state.id}>{state.name}</option>
        });
    }

    renderRestaurants = ()=>{
        return this.state.filters.map((restaurant)=>{
            return <Filter url={restaurant.url} name={restaurant.name} address={restaurant.address}/>
        })
    }

    changeRestaurants = (event)=>{
        console.log(event.target.value)
        fetch(api+`/restaurants?state=${event.target.value}`)
        .then(res=>res.json())
        .then((data)=>{
            var temp = [];
            data.map((restaurant)=>{
                temp.push({
                    url:restaurant.restaurant_thumb,
                    name:restaurant.restaurant_name,
                    address:restaurant.address
                })
            });
            this.setState({restaurants:temp});
        });
    }

    filterRestaurants = (event)=>{
        document.getElementById('homeheaderfilterContainer').style.visibility = 'visible';
        var userText = event.target.value;
        var temp = [];
        temp = this.state.restaurants.filter((restaurant)=>{
            return (restaurant.name.toLowerCase().indexOf(userText.toLowerCase())>-1 ||  restaurant.address.toLowerCase().indexOf(userText.toLowerCase())>-1);
        })
        this.setState({filters:temp});
    }

    hideFilterResults = (event) =>{
        document.getElementById('homeheaderfilterContainer').style.visibility = 'hidden';
    }

    render(){
        return (
            <div id="header-input-container">
                <select id="headerInput1" type="text" class="header-input" onChange={this.changeRestaurants}>
                    <option>---Select Location---</option>
                    {this.renderLocations()}
                </select>
                <div id="headerInput2Container">
                    <input id="headerInput2" type="text" class="header-input" placeholder="search a restaurant" onInput={this.filterRestaurants} onBlur={this.hideFilterResults} onFocus={this.filterRestaurants}/>
                    <div id="homeheaderfilterContainer">
                        {this.renderRestaurants()}
                    </div>
                </div>
            </div>
        );
    }
};

export default Homesearch;