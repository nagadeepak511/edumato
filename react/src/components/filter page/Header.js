import React,{Component} from 'react';
import {Link} from 'react-router-dom';

class Header extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <React.Fragment>
                <header id="filterpageheader">
                    <div id="filterpagelogo"><Link to="/" style={{"textDecoration":"none"}}>e!</Link></div>
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