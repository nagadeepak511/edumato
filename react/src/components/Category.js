import React from 'react';
import {Link} from 'react-router-dom';

class Category extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name:"",
            url:"",
            desc:"",
            id:""
        }
    }

    static getDerivedStateFromProps(props, state){
        return {name:props.name, url:props.url, desc:props.desc, id:props.mealtype_id};
    }

    render(){
        return (
            <Link to={"/filterpage/"+this.state.id}>
                <div class="category">
                    <div class="category-image" style={{backgroundImage:`url(${this.state.url})`}}></div>
                    <div class="category-content-container">
                        <h1 class="category-name">{this.state.name[0].toUpperCase() + this.state.name.slice(1)}</h1>
                        <h2 class="category-description">{this.state.desc}</h2>
                    </div>
                </div>
            </Link>
        );
    }
};

export default Category;