import React from 'react';

class Cuisine extends React.Component{
    componentDidMount(){
        localStorage.setItem('cuisine','1')
    }

    setCuisine = (event)=>{
        localStorage.setItem('cuisine',event.target.value)
        this.props.getCuisine()
    }

    render(){
        return (
            <div onChange={this.setCuisine}>
                <div className="sub-heading-filters">Cuisine</div>
                <div className="filter-input-container"><input onChange={this.changeCuisine} type="radio" value={1} name="cuisine"/><span>North Indian</span></div>
                <div className="filter-input-container"><input onChange={this.changeCuisine} type="radio" value="2" name="cuisine"/><span>South Indian</span></div>
                <div className="filter-input-container"><input onChange={this.changeCuisine} type="radio" value="4" name="cuisine"/><span>Fast Food</span></div>
                <div className="filter-input-container"><input onChange={this.changeCuisine} type="radio" value="5" name="cuisine"/><span>Street food</span></div>
                <div className="filter-input-container"><input onChange={this.changeCuisine} type="radio" value="3" name="cuisine"/><span>Chineese</span></div>
            </div>
        );
    }
};

export default Cuisine;