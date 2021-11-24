import React from 'react';

class Cost extends React.Component {
    componentDidMount(){
        localStorage.setItem('cost','0,1500')
    }

    setCost = (event)=>{
        localStorage.setItem('cost', event.target.value)
        this.props.getCost()
    }

    render(){
        return (
            <div onChange={this.setCost}>
                <div id="costfortwo" className="sub-heading-filters">Cost for two</div>
                <div className="filter-input-container"><input type="radio" name="costfortwo" value="0,500"/><span>Less than &#8377; 500</span></div>
                <div className="filter-input-container"><input type="radio" name="costfortwo" value="500,800"/><span>&#8377; 500 to &#8377; 800</span></div>
                <div className="filter-input-container"><input type="radio" name="costfortwo" value="800,1000"/><span>&#8377; 800 to &#8377; 1000</span></div>
                <div className="filter-input-container"><input type="radio" name="costfortwo" value="1000,1000000"/><span>&#8377; 1000+</span></div>
            </div>
        );
    }
};

export default Cost;