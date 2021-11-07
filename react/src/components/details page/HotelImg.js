import React from 'react';

class HotelImg extends React.Component{
    render(){
        return (<div id="details-hotel-img" style={{backgroundImage:`url(${this.props.bgImg})`, backgroundPosition:"center", backgroundSize:"cover", backgroundRepeat:"no-repeat"}}></div>)
    }
}

export default HotelImg