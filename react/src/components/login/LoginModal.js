import React,{Component} from 'react';
import Header from '../filter page/Header';

var url = 'http://localhost:5000/api/auth/login';

class LoginModal extends Component{
    constructor(props){
      super(props);
      this.props = props;
      this.state = {
        name:'',
        email:'',
        password:''
      }
    }

    componentDidMount(){
      console.log(this.props)
    }

    handleChange = (event) => {
      this.setState({[event.target.name]:event.target.value})
    }
    
    handleSubmit = ()=>{
      console.log(JSON.stringify(this.state),"from handleSubmit")
      fetch(url, {
        method:'POST',
        headers:{
          'accept':'application/json',
          'content-type':'application/json'
      },
      body:JSON.stringify(this.state)
      })
      .then((res)=>{return res.json()})
      .then((data)=>{
        console.log(data)
        if(data.auth === false){
          this.setState({message:data.token})
        }else{
            sessionStorage.setItem('ltk', data.token)
            this.props.history.push('/')
        }
      })
    }

    render(){
        return (
    <>
    <Header/>
    <div>
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header" style={{"padding":"35px 50px"}}>
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4><span class="glyphicon glyphicon-lock"></span> Login</h4>
        </div>
        <div class="modal-body" style={{"padding":"40px 50px;"}}>
          {/* <form role="form"> */}
          <div class="form-group">
              <label for="usrname"><span class="glyphicon glyphicon-user"></span> Username</label>
              <input type="text" class="form-control" id="usrname" placeholder="Enter name"  onChange={this.handleChange} name="name"/>
            </div>
            <div class="form-group">
              <label for=""><span class="glyphicon glyphicon-user"></span> Email</label>
              <input type="text" class="form-control" id="usrname" placeholder="Enter email"  onChange={this.handleChange} name="email"/>
            </div>
            <div class="form-group">
              <label for="psw"><span class="glyphicon glyphicon-eye-open"></span> Password</label>
              <input type="text" class="form-control" id="psw" placeholder="Enter password"  onChange={this.handleChange} name="password"/>
            </div>
              <button onClick={this.handleSubmit} class="btn btn-success btn-block"><span class="glyphicon glyphicon-off"></span> Login</button>
          {/* </form> */}
        </div>
        <div class="modal-footer">
          <button  class="btn btn-danger btn-default pull-left" data-dismiss="modal"><span class="glyphicon glyphicon-remove"></span> Cancel</button>
          <p>Not a member? <a href="#">Sign Up</a></p>
        </div>
      </div>
    </div>
  </div>
  </> )
    }
};

export default LoginModal;