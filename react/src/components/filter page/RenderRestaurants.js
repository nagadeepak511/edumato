import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import FilterPageHotel from './FilterPageHotel';
import NavContainer from './NavContainer';
import FilterForm from './FilterForm';

var api = 'https://edumato-naga.herokuapp.com';

class RenderRestaurants extends Component{
    constructor(props){
        super(props);
        this.state = {
            data:[],
            page:[],
            totalCount:0,
            currentPage:1
        }
    }

    updatePage = (page)=>{
        var temp = []
        if(this.state.data.length>(page-1)*2) temp.push(this.state.data[(page-1)*2])
        if(this.state.data.length>(page-1)*2+1) temp.push(this.state.data[(page-1)*2+1])
        return temp;
    }

    static getDerivedStateFromProps(props, state){
        return {
            data:props.listData,
            page:((page)=>{
                var temp = []
                if(props.listData.length>(page-1)*2) temp.push(props.listData[(page-1)*2])
                if(props.listData.length>(page-1)*2+1) temp.push(props.listData[(page-1)*2+1])
                return temp;
            })(1),
            totalCount:props.listData.length,
            currentPage:1
        }
    }

    changePage = (page)=>{
        this.setState({currentpage:page, page:this.updatePage(page)});
    }

    componentDidMount(){
        var d = this.props.listData;
        var temp = []
        if(d.length>0) temp.push(d[0])
        if(d.length>1) temp.push(d[1])
        console.log(d,temp,"from component did mount")
        this.setState(
            {data:d, totalCount:d.length, page:temp, currentPage:1}
        )
    }

    renderRes(){
        {
            console.log(this.props.listData, this.state, "from renderRes")
            if(this.props.listData){
                var page = this.updatePage(this.state.currentpage)
                if(page.length>0){
                    var i=0;
                    return (page.map((item)=>{
                        return (
                            <Link to={"/details/"+item.restaurant_id}>
                                <FilterPageHotel hotelid={(i++)==0?"top-hotel-container":""} name={item.restaurant_name} address={item.address} cuisine="Bakery" costfortwo={item.cost} hotelimg="https://i.ibb.co/4tM0gZc/hotel.png"/>
                            </Link>
                        );
                    }));
                }
                else return "No results found!"
            }else{
                return "Loading .."
            }
        }
    }

    render(){
        return (
            <>
                <div id="content-container">
                    <FilterForm mealtype={this.props.mealtype} updateData={this.props.updateData}/>
                    {this.renderRes()}
                </div>
                <NavContainer number={(this.state.totalCount+this.state.totalCount%2)/2} handler={this.changePage} pgNo={this.state.currentpage}/>
            </>
        );
    }
};

export default RenderRestaurants;