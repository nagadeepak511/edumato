import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import '../../ss/filterpage/filterpageheader.css'

class FilterPage extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <React.Fragment>
                <Header/>
            </React.Fragment>
        );
    }
};

export default FilterPage;