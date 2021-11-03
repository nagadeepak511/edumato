import React,{Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Home from './Home';
import FilterPage from './filter page/FilterPage';

class Routing extends Component{
	constructor(props){
		super(props);
	}

	render(){
		return (
			<React.Fragment>
				<BrowserRouter>
					<Route exact path="/" component={Home}/>
					<Route path="/filterpage" component={FilterPage}/>
				</BrowserRouter>
			</React.Fragment>
		);
	}
};

export default Routing;