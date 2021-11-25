import React from 'react';
import Homeheader from './Homeheader';

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name:""
        }
    }

    render(){
        return (
            <>
                <Homeheader/>
            </>
        );
    }
};

export default Home;