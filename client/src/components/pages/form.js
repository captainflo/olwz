import React, { Component } from 'react';
import logo from '../../logo.svg';
import '../../App.css';

class Form extends Component {

  state = {
    loggedIn: false,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    waitingForServer: false,
  }

  // function onclick login
  login=()=>{
    if(this.state.firstName != "a"|| this.state.lastName != "a"|| this.state.email != "a@a.com" || this.state.password != "a")
      alert(this.state.password + this.state.email + this.state.lastName + this.state.firstName);
    else {
      this.setState({waitingForServer:true})
    }
    
  }

  // function onclick log out
  logout=()=>{
    this.setState({loggedIn:false})
  }

  handleType=(event)=>{
    this.setState({[event.target.name]: event.target.value})
  }

  render() {
    return (
      <div>
        <div className="App App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Owlz</h2>
          <p>Please Login In</p>
        </div>

        {this.state.loggedIn?<div>You are login<button onClick={this.logout}>log out</button></div>:
        <div className="container">
          <form className="form-log">
            <h1 className="text-center">Log In</h1>
            {this.state.waitingForServer&&<div class="spinner-border text-primary" role="status">
              <span class="sr-only">Loading...</span>
            </div>}
            <div className="form-group">
              <label for="InputFirstname">First Name</label>
              <input disabled={this.state.waitingForServer} onChange={this.handleType} name="firstName" type="text" className="form-control" id="InputFirstname" placeholder="Florian"/>
            </div>
            <div className="form-group">
              <label for="Inputlastname">Last Name</label>
              <input disabled={this.state.waitingForServer} onChange={this.handleType} name="lastName" type="text" className="form-control" id="Inputlastname" placeholder="Lahitte"/>
            </div>
            <div className="form-group">
              <label for="exampleInputEmail">Email address</label>
              <input disabled={this.state.waitingForServer} onChange={this.handleType} name="email" type="email" className="form-control" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter email"/>
            </div>
            <div className="form-group">
              <label for="InputPassword">Password</label>
              <input disabled={this.state.waitingForServer} onChange={this.handleType} name="password" type="password" className="form-control" id="InputPassword" placeholder="Password"/>
            </div>
            <button disabled={this.state.waitingForServer} onClick={this.login} type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>}
      </div>
      
    );
  }
}

export default Form;
