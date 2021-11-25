import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import '../../ss/filterpage/filterpageheader.css'
import {browserHistory} from 'react-router';

var url = 'http://localhost:5000/api/auth/userInfo';

class Header extends Component{
    constructor(props){
        super(props);
        this.state = {
            userData:{}
        }
    }

    componentDidMount(){
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

    conditionalHeader = ()=>{
        if(sessionStorage.getItem('userData')){
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
                    <Link to="/login">Login</Link>
                    <Link to="" id="createAccount">Create account</Link>
                </>
            )
        }
    }

    handleLogout = () => {
        // this.setState({userData:''});
        sessionStorage.removeItem('ltk');
        sessionStorage.removeItem('userData');
        console.log(this.props,"from handle logout")
        // this.props.redirect()
        // this.props.history.push('/')
        browserHistory.push('/')
    }

    render(){
        return (
            <React.Fragment>
                <header id="filterpageheader">
                    <div id="filterpagelogo"><Link to="/" style={{"textDecoration":"none", color:"#ce0505"}}>e!</Link></div>
                    <div id="header-links">
                        {this.conditionalHeader()}
                    </div>
                </header>
            </React.Fragment>
        );
    }
};

export default Header;