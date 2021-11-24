import React from 'react';
import Homeheader from './Homeheader';
import LoginModal from './login/LoginModal';

class Home extends React.Component{
    render(){
        return (
            <>
                <Homeheader/>
                <LoginModal/>
            </>
        );
    }
};

export default Home;