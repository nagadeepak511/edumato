import React from 'react';
import Homesearch from './Homesearch'
import Category from './Category'
import {Link} from 'react-router-dom'

var api = "https://edumato-naga.herokuapp.com"
var url = 'http://localhost:5000/api/auth/userInfo';

class Homeheader extends React.Component{
    constructor(props){
        super(props);
        this.state = {images : [],userData:{}};
    }

    componentDidMount(){
        fetch(api+'/mealtypes')
        .then( res => res.json())
        .then((data)=>{
            var temp = [];
            data.map((mealtype)=>{
                temp.push({
                    id:mealtype.mealtype_id,
                    name:mealtype.mealtype, 
                    url:mealtype.meal_image, 
                    desc:mealtype.content
                });
            });
            this.setState({images:temp});
        })

        fetch(url,{
            method:'GET',
            headers:{
                'x-access-token':sessionStorage.getItem('ltk')
            }
        })
        .then((res) => res.json())
        .then((data) => { 
                this.setState({
                    userData:data
                })
            })
    }

    handleLogout = () => {
        this.setState({userData:''});
        sessionStorage.removeItem('ltk');
        sessionStorage.removeItem('userData');
        // this.props.history.push('/')
    }

    updateImages = () =>{
        return this.state.images.map((img) => {
            return ( <Category name={img.name} url={img.url} desc={img.desc} mealtype_id={img.id}/> );
        });
    }

    conditionalHeader = ()=>{
        if(this.state.userData.name){
            let data = this.state.userData;
            let outputArry = [data.name,data.email,data.phone,data.role];
            sessionStorage.setItem('userData', outputArry);
            return(
                <>
                    <button className="btn btn-info">Hi {this.state.userData.name}</button>
                    &nbsp;
                    <button className="btn btn-warning" onClick={this.handleLogout}>Logout</button>
                </>
            )
        }else{
            return(
                <>
                    <Link to="/login" class="header-link"  data-toggle="modal" data-target="#myModal">Login</Link>
                    <Link to="" class="header-link" data-toggle="modal" data-target="#id01" id="signup">Create an account</Link>
                </>
            )
        }
    }
    
    render(){
        return (
            <>
                <header id="homeheader">
                    <div class="header-link-container">
                        {this.conditionalHeader()}
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