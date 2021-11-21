import React from 'react';

var api = 'https://edumato-naga.herokuapp.com';

class Location extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            locations:[],
            selectedState:"Delhi"
        }
    }

    componentDidMount(){
        fetch(api+'/locations?states=1')
        .then((res)=>{return res.json();})
        .then((data)=>{
            this.setState({locations:data})
        })
    }

    renderLocations = ()=>{
        return (
            <>
                {
                    this.state.locations.map((state)=>{
                        return <option value={state.id} for="state">{state.state}</option>
                    })
                }
            </>
        )
    }

    setLocation = (event) => {
        if(!event.target.value) return;
        localStorage.setItem('location',event.target.value)
        localStorage.setItem('stateName',this.state.locations.filter((i)=>{return i.id == event.target.value})[0].state)
        this.props.getLocation();
    }

    render(){
        return (
            <>
                <select name="state" id="filter-location-input" onChange={this.setLocation}>
                    <option value="" for="state">Select location</option>
                    {this.renderLocations()}
                </select>
            </>
        )
    }
};

export default Location;