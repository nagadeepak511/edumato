import React from 'react';

class Cost extends React.Component {
    componentDidMount(){
        localStorage.setItem('cost','0,1500')
    }

    setCost = (event)=>{localStorage.setItem('cost', event.target.value)}

    render(){
        return (
            <div onChange={this.setCost}>
                <div id="costfortwo" className="sub-heading-filters">Cost for two</div>
                <div className="filter-input-container"><input type="radio" name="costfortwo" value="0,1500"/><span>Less than &#8377; 1500</span></div>
                <div className="filter-input-container"><input type="radio" name="costfortwo" value="1500,1800"/><span>&#8377; 1500 to &#8377; 1800</span></div>
                <div className="filter-input-container"><input type="radio" name="costfortwo" value="1800,11000"/><span>&#8377; 1800 to &#8377; 11000</span></div>
                <div className="filter-input-container"><input type="radio" name="costfortwo" value="11000,1000000"/><span>&#8377; 11000+</span></div>
            </div>
        );
    }
};

export default Cost;