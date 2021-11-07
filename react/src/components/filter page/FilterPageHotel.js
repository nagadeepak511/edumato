import React from 'react';
import '../../ss/filterpage/filterpagehotel.css';

class FilterPageHotel extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name:'',
            address:'',
            cuisine:'',
            costfortwo:'',
            hotelid:''
        }
    }

    static getDerivedStateFromProps(props, state){
        return ({
            name:props.name,
            address:props.address,
            cuisine:props.cuisine,
            costfortwo:props.costfortwo,
            hotelid:props.hotelid,
            hotelimg:props.hotelimg
        });
    }

    render(){
        return (
            <>
                <div class="hotel-container" id={this.state.hotelid}>
                    <div class="hotel-image" style={{backgroundImage:`url("${this.state.hotelimg}")`}}></div>
                    <div class="hotel-name">{this.state.name}</div>
                    <div class="hotel-fort">FORT</div>
                    <div class="hotel-address">{this.state.address}</div>
                    <div class="horizontal-line"></div>
                    <div class="hotel-sub-heading">
                        CUISINE: <br/>
                        COST FOT TWO:
                    </div>
                    <div class="hotel-values">
                        <span class="hotel-room-type">{this.state.cuisine}</span> <br/>
                        <span class="hotel-ccftwo">&#8377; {this.state.costfortwo}</span>
                    </div>
                </div>
            </>
        );
    }
};

export default FilterPageHotel;