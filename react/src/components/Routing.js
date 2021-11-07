import React,{Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Home from './Home';
import FilterPage from './filter page/FilterPage';
import Details from './details page/Details';

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
				</BrowserRouter>
			</React.Fragment>
		);
	}
};

export default Routing;