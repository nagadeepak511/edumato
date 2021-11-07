import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import '../../ss/filterpage/filterpageheader.css'

class Header extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <React.Fragment>
                <header id="filterpageheader">
                    <div id="filterpagelogo"><Link to="/" style={{"textDecoration":"none", color:"#ce0505"}}>e!</Link></div>
                    <div id="header-links">
                        <a href="">Login</a>
                        <a href="" id="createAccount">Create account</a>
                    </div>
                </header>
            </React.Fragment>
        );
    }
};

export default Header;