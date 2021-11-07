import React from 'react'
import Header from '../filter page/Header';
import HotelImg from './HotelImg'
import '../../ss/Details.css'

var api = "https://edumato-naga.herokuapp.com"

class Details extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurant:{},
            whichDesc:0
        }
    }

    componentDidMount(){
        fetch(api+'/restaurantDetails/'+this.props.match.params.restaurant_id)
        .then((res)=>{return res.json()})
        .then((data)=>{
            this.setState({restaurant:data[0]})
            console.log(data[0])
        })
    }

    changeFocus = (event)=>{
        if(event.target.innerHTML == 'Overview') this.setState({whichDesc:0})
        else this.setState({whichDesc:1})
    }

    render(){
        return (
            <>
                <Header/>
                <div id="details-container-fluid">
                    <div id="details-container">
                        <HotelImg bgImg={this.state.restaurant.restaurant_thumb}/>
                        <div id="details-hotel-name" className="hotel-name">{this.state.restaurant.restaurant_name}</div>
                        <div id="details-nav-container">
                            <button onClick={this.changeFocus} class={"btn btn-nav"+(this.state.whichDesc==0?" details-underline-button":"")}>Overview</button>
                            <button onClick={this.changeFocus} class={"btn btn-nav"+(this.state.whichDesc==1?" details-underline-button":"")}>Contact</button>
                            <button id="details-place-order" class="btn btn-danger">Place order online</button>
                            <div class="details-horizontal-line"></div>
                        </div>
                        <div class="details-details">
                            {
                                this.state.whichDesc==1?(
                                    <>
                                        <h4 class="blue">Phone number:</h4>
                                        <h4 class="red">{this.state.restaurant.contact_number?this.state.restaurant.contact_number:1234567890}</h4>
                                        <br/>
                                        <h2 class="blue">{this.state.restaurant.restaurant_name}</h2>
                                        <div id="details-hotel-address" class="fadedBlue">{this.state.restaurant.address}</div>
                                    </>
                                ):(
                                    <>
                                        <h2 class="blue">Cuisine</h2>
                                        <h4 class="blue">Bakery</h4>
                                        <br/>
                                        <h2 class="blue">Average Cost(Approx)</h2>
                                        <h4 class="blue">&#8377;{this.state.restaurant.cost}</h4>
                                    </>
                                )
                            }
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Details;