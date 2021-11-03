import React from 'react';
import Homesearch from './Homesearch'
import Category from './Category'

var api = "https://tesla-clone-naga.herokuapp.com"

class Homeheader extends React.Component{
    constructor(props){
        super(props);
        this.state = {images : []};
    }

    componentDidMount(){
        fetch(api+'/mealtypes')
        .then( res => res.json())
        .then((data)=>{
            var temp = [];
            data.map((mealtype)=>{
                temp.push({
                    name:mealtype.mealtype, 
                    url:mealtype.meal_image, 
                    desc:mealtype.content
                });
            });
            this.setState({images:temp});
        })
    }

    updateImages = () =>{
        return this.state.images.map((img) => {
            return ( <Category name={img.name} url={img.url} desc={img.desc}/> );
        });
    }
    
    render(){
        return (
            <>
                <header id="homeheader">
                    <div class="header-link-container">
                        <a href="" class="header-link">Login</a>
                        <a href="" class="header-link" id="signup">Create an account</a>
                    </div>
                    <div id="logo">
                        <h1 id="brandName">e!</h1>
                    </div>
                    <h1 id="header-description">Find the best Restaurants, Caf&eacute;s and Bars</h1>
                    <Homesearch />
                </header>
                <div id="content-container">
                    <div id="heading">Quick searches</div>
                    <div id="content-description">Discover restaurants by type of meal</div>
                    <div id="category-container">
                        {this.updateImages()}
                    </div>
                </div>
            </>
        );
    }
};

export default Homeheader;