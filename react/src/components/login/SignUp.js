import React from 'react';
import '../../ss/signUp.css';
import Header from '../filter page/Header';

var url = 'http://localhost:5000/api/auth/register';

class SignUp extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            status:"",
            name:"",
            phone:"",
            email:"",
            password:""
        }
    }

    handleChange = (event) => {
        console.log(this.state)
        this.setState({[event.target.name]:event.target.value})
    }

    handleRegistration = (event)=>{
        fetch(url,{
            method:'POST',
            headers:{
                'accept':'application/json',
                'content-type':'application/json'
            },
            body:JSON.stringify(this.state)
        })
        .then(()=>{
            this.props.history.push('/')
        })
    }

    render(){
        return (
        <>
        <Header/>
<section id="signup-section" class="vh-100 bg-image" style={{"background-image": "url('https://mdbootstrap.com/img/Photos/new-templates/search-box/img4.jpg')"}}>
  <div class="mask d-flex align-items-center h-100 gradient-custom-3">
    <div class="container h-100">
      <div id="signup-content-container" class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12 col-md-9 col-lg-7 col-xl-6" style={{"margin":"auto"}}>
          <div class="card" style={{"border-radius": "15px"}}>
            {
                this.state.status?("Registration Successful, you can login now using login button above"):(
                    <>
                    <div class="card-body p-5">
                    <h2 class="text-uppercase text-center mb-5">Create an account</h2>
      
                    <form>
      
                      <div class="form-outline mb-4">
                        <label class="form-label" for="form3Example1cg">Your Name</label>
                        <input onChange={this.handleChange} name="name" type="text" id="form3Example1cg" class="form-control form-control-lg" />
                      </div>
      
                      <div class="form-outline mb-4">
                        <label class="form-label" for="form3Example3cg">Your Email</label>
                        <input onChange={this.handleChange} name="email" type="email" id="form3Example3cg" class="form-control form-control-lg" />
                      </div>
      
                      <div class="form-outline mb-4">
                        <label class="form-label" for="form3Example3cg">Your phone no</label>
                        <input onChange={this.handleChange} name="phone" id="form3Example3cg" class="form-control form-control-lg" />
                      </div>
      
                      <div class="form-outline mb-4">
                        <label class="form-label" for="form3Example4cg">Password</label>
                        <input onChange={this.handleChange} name="pasword" type="password" id="form3Example4cg" class="form-control form-control-lg" />
                      </div>
      
                      <div class="form-outline mb-4">
                        <label class="form-label" for="form3Example4cdg">Repeat your password</label>
                        <input type="password" id="form3Example4cdg" class="form-control form-control-lg" />
                      </div>
      
                      <div class="form-check d-flex justify-content-center mb-5">
                        <input
                          class="form-check-input me-2"
                          type="checkbox"
                          value=""
                          id="form2Example3cg"
                        />
                        <label class="form-check-label" for="form2Example3g">
                          I agree all statements in <a href="#!" class="text-body"><u>Terms of service</u></a>
                        </label>
                      </div>
      
                      <div class="d-flex justify-content-center">
                        <button onClick={this.handleRegistration} type="button" class="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Register</button>
                      </div>
      
                      <p class="text-center text-muted mt-5 mb-0">Have already an account? <a href="#!" class="fw-bold text-body"><u>Login here</u></a></p>
      
                    </form>
      
                  </div>
                    </>
                )
            }
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
        </>
        )
    }
};

export default SignUp;