import React, { Component } from 'react';
import { withRouter} from 'react-router-dom';
import '../../../App.css';
import API from "../../../Utils/API"


class Message extends Component {

  state = {
    start_date: "",
    end_date: "",
    guests: "",
    occasion: "",
    message: "",
    UserId:  parseInt(localStorage.getItem("user")),
    PromoterId: this.props.idPromoter,
    waitingForServer:false
  }

  createMessage=()=>{     
    event.preventDefault();
    if(this.state.start_date === "" || this.state.end_date === "" || this.state.guests === ""||this.state.message ===""){     
      alert("Invalid Credentials");
    }
    else {
      const {PromoterId,UserId,start_date, end_date, guests, occasion, message} = this.state;
      guests = parseInt(guests);
      const registerBody = {PromoterId,UserId, start_date, end_date, guests, occasion, message};
      this.setState({waitingForServer:true},()=>{
        API.createMessage(registerBody)
        .then((data)=>{
        })
      })
    }
  }

  handleType=(event)=>{
    this.setState({[event.target.name]: event.target.value})
  }

  render() {
    return (
      <div>
          <form className=" slideUp">
            <div className="form-group">
              <label htmlFor="exampleInputStartDate">Start Date</label>
              <input disabled={this.state.waitingForServer} onChange={this.handleType} name="start_date" type="date" className="form-control" id="exampleInputStartDate"  placeholder=""/>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputEndDate">Start End</label>
              <input disabled={this.state.waitingForServer} onChange={this.handleType} name="end_date" type="date" className="form-control" id="exampleInputEndDate"  placeholder=""/>
            </div>
            <div className="form-group">
              <label htmlFor="InputGuests">Guest</label>
              <select disabled={this.state.waitingForServer} onChange={this.handleType} name="guests" type="text" className="form-control" id="InputGuests">
                <option value="" default>Number of Guests</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10+</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputOccasion">Occasion</label>
              <input disabled={this.state.waitingForServer} onChange={this.handleType} name="occasion" type="text" className="form-control" id="exampleInputOccasion"  placeholder="Birthday"/>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputMessage">Message</label>
              <textarea disabled={this.state.waitingForServer} onChange={this.handleType} name="message" type="text" className="form-control" id="exampleInputMessage"  placeholder="Hello we want yacht for tonight..."/>
            </div>
            <div className="modal-footer">
            <button type="button" className="btn-login" data-dismiss="modal">Close</button>
            <button disabled={this.state.waitingForServer} onClick={this.createMessage} type="submit" data-dismiss="modal" className="btn-login">Submit</button>
            </div>
          </form>
      </div>
    );
  }
}

export default withRouter(Message);
