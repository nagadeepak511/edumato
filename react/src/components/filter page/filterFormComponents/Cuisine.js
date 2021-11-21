import React from 'react';

class Cuisine extends React.Component{
    componentDidMount(){
        localStorage.setItem('cuisine','')
    }

    setCuisine = (event)=>{
        var x = localStorage.getItem('cuisine').split(',')
        if(event.target.checked) x.push(event.target.value)
        else x = x.filter((i)=>{return i!=event.target.value})
        x = x.toString()
        localStorage.setItem('cuisine',x)
    }

    render(){
        return (
            <div onChange={this.setCuisine}>
                <div className="sub-heading-filters">Cuisine</div>
                <div className="filter-input-container"><input onChange={this.changeCuisine} type="checkbox" value={1}/><span>North Indian</span></div>
                <div className="filter-input-container"><input onChange={this.changeCuisine} type="checkbox" value="2"/><span>South Indian</span></div>
                <div className="filter-input-container"><input onChange={this.changeCuisine} type="checkbox" value="4"/><span>Fast Food</span></div>
                <div className="filter-input-container"><input onChange={this.changeCuisine} type="checkbox" value="5"/><span>Street food</span></div>
                <div className="filter-input-container"><input onChange={this.changeCuisine} type="checkbox" value="3"/><span>Chineese</span></div>
            </div>
        );
    }
};

export default Cuisine;