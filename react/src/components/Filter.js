import React from 'react';
import Style from '../ss/Filter.css';

class Filter extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            imgUrl:"",
            name:"",
            address:""
        };
    }

    static getDerivedStateFromProps(props, state){
        return {
            imgUrl:props.url,
            name:props.name,
            address:props.address
        };
    }
    
    render(){
        return (
            <>
                <div class="filterContainer">
                    <img class="filterImg" src={this.state.imgUrl} alt=""/>
                    <div class="filterContent">
                        <h1 class="filterContentName">{this.state.name}</h1>
                        <h3 class="filterContentAddress">{this.state.address}</h3>
                    </div>
                </div>
            </>
        );
    }
};

export default Filter;