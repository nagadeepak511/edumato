import React from 'react';

class Sort extends React.Component{
    componentDidMount(){
        localStorage.setItem('sort','1')
    }

    setSort = (event)=>{
        localStorage.setItem('sort',event.target.value)
        this.props.getSort()
    }

    render(){
        return (
            <div onChange={this.setSort}>
                <div id="sort" className="sub-heading-filters">Sort</div>
                <div className="filter-input-container"><input type="radio" name="sort" value="1"/><span>Price Low to high</span></div>
                <div className="filter-input-container"><input type="radio" name="sort" value="-1"/><span>Price High to low</span></div>
            </div>
        );
    }
};

export default Sort;