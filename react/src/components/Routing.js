import React,{Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Home from './Home';
import FilterPage from './filter page/FilterPage';
import Details from './details page/Details';
import Login from './login/LoginModal';
import SignUp from './login/SignUp';

class Routing extends Component{
	constructor(props){
		super(props);
	}

	render(){
		return (
			<React.Fragment>
				<BrowserRouter>
					<Route exact path="/" component={Home}/>
					<Route exact path="/filterpage/:mealtype" component={FilterPage}/>
					<Route exact path="/details/:restaurant_id" component={Details}/>
					<Route exact path="/login" component={Login}/>
					<Route exact path="/signup" component={SignUp}/>
				</BrowserRouter>
			</React.Fragment>
		);
	}
};

export default Routing;