import React, { Component } from 'react';
import API from '../../../Utils/API';
import './dashboard.css';
import EditPromoter from './editPromoter';
import Footer from '../../Footer/footer'


export default class dashboardPromoter extends Component {

    state = {
        promoter: {},
        message:{},
        edit: false,
        userEmail: "",
        userPhone: "",
        userFirsName: "",
        userLastName:"",
    }
    componentDidMount() {
        const id =this.props.match.params.id
        console.log(id)
        API.getPromoterById(id).then((data)=> {
            console.log("Promoter data")
            console.log(data)
            const promoter = data.data;
            API.getMessageByPromoterId(id).then((data)=> {
                this.setState({ message: data.data, promoter})
            });
        });   
    }

    messageConfirm=(id, confirm, userId)=>{
        confirm = true;
        const newBody = {id: id, confirm: confirm }
        API.putMessageById(id, newBody).then((data)=> {
            console.log("Message confirm data ")
            const promoterId =this.props.match.params.id
             API.getMessageByPromoterId(promoterId).then((data)=> {
                console.log(data)
                this.setState({ message: data.data})
                this.setState({accept: "Start Chat"})
            });
            API.getUserById(userId).then((data)=> {
                this.setState({userPhone: data.data.phone});
                this.setState({userEmail: data.data.email});
                this.setState({userFirsName: data.data.first_name});
                this.setState({userLastName: data.data.last_name});
            });
        });
    }


    messageDelete=(id, confirm)=>{
        confirm = false;
        const newBody = {id: id, confirm: confirm}
        API.putMessageById(id, newBody).then((data)=> {
            console.log("Message Delete data")
            const promoterId =this.props.match.params.id
            API.getMessageByPromoterId(promoterId).then((data)=> {
                console.log(data)
                this.setState({ message: data.data})
            });
        }); 
    }

    edit=()=>{
        this.setState({edit:true})
      }

      messages = () => {
        let Message = []
        
        for (let i = 0; i < this.state.message.length; i++) {
            const selector = `modal${this.state.message[i].id}`
            const htmlid = `#modal${this.state.message[i].id}`
            // const start = moment(this.state.message[i].start_date).format("LL");
            // const end = moment(this.state.message[i].end_date).format("LL");
            Message.push(
                <div className="card-profil">
                    {/* If confirm is null button */}
                    {this.state.message[i].confirm === null &&<div><button data-toggle="modal" data-target={htmlid} className="btn-login float-right" onClick={()=> this.messageConfirm(this.state.message[i].id, this.state.message[i].confirm, this.state.message[i].UserId)}>{!this.state.message[i].confirm?<b>Accept <i className="fas fa-check"></i></b>:<b>Contact him <i className="fas fa-comments"></i></b>}</button>
                    <button className="btn-login float-right" onClick={() => this.messageDelete(this.state.message[i].id)}>Reject <i className="fas fa-times"></i></button></div>}

                    {/* Confirm is true or false */}
                    {this.state.message[i].confirm &&<button data-toggle="modal" data-target={htmlid} className="btn-login float-right" onClick={()=> this.messageConfirm(this.state.message[i].id, this.state.message[i].confirm, this.state.message[i].UserId)}>{!this.state.message[i].confirm?<b>Accept <i className="fas fa-check"></i></b>:<b>Contact him <i className="fas fa-comments"></i></b>}</button>}
                    {!this.state.message[i].confirm && this.state.message[i].confirm != null&&<button className="btn-login float-right" onClick={() => this.messageDelete(this.state.message[i].id)}>Reject <i className="fas fa-times"></i></button>}

                    <h4>Date <i className="fas fa-calendar-alt"></i> : <span className="text-message">{this.state.message[i].start_date} to {this.state.message[i].end_date}</span></h4>
                    <h4>Guests <i className="fas fa-user-friends"></i> : <span className="text-message">{this.state.message[i].guests}</span></h4>
                    <h4>Occassion <i className="fas fa-gift"></i> : <span className="text-message">{this.state.message[i].occasion}</span></h4>
                    <h4>Message <i className="fas fa-comments"></i> : <span className="text-message">{this.state.message[i].message}</span></h4>

                    <div className="modal fade" id={selector} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Information About {this.state.userFirsName} {this.state.userLastName}</h5>
                                </div>
                                <div className="modal-body contact-user">
                                    <p><i className="fas fa-envelope"></i> {this.state.userEmail}</p>
                                    <p><i className="fas fa-phone-square"></i> {this.state.userPhone}</p>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn-login" data-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
               
            )
        }
        return Message
      }

    render() {
        return (
            <div>
                <div className="jumbotron jumbotron-fluid jumbotron-dash slideRight">
                    <div className="container text-center">
                        <h2>Welcome</h2> 
                        <h2>{this.state.promoter.first_name} {this.state.promoter.last_name}</h2>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="card-profil slideRight">
                                <img src={this.state.promoter.profile_pic} alt="promoter"></img>
                                <button onClick={this.edit} type="button" className="btn-login float-right">Edit {this.state.promoter.first_name} <i className="fas fa-user-edit"></i></button>
                                <p><i className="fas fa-signature"></i> {this.state.promoter.handle}</p>
                                <p><i className="fas fa-envelope"></i> {this.state.promoter.email}</p>
                                <p><i className="fas fa-mobile"></i> {this.state.promoter.phone}</p>
                                <p><i className="fas fa-city"></i> {this.state.promoter.city}</p>
                                <p><i className="fas fa-language"></i> {this.state.promoter.languages}</p>
                                <p><i className="fab fa-instagram"></i> {this.state.promoter.instagram}</p>
                            </div>
                            
                        </div>
                        <div className="col-md-8 slideLeft">
                            {this.state.edit&&<EditPromoter onUpdate={(promoter)=>{this.setState({promoter, edit: false})}} promoterData={this.state.promoter}/>}
                            {!this.state.edit&&<div className="card-profil">
                                <h2>About me</h2>
                                <hr></hr>
                                <p>{this.state.promoter.descriptions}</p>
                                <h2>My Reservation</h2>
                                <hr></hr>
                                {this.messages()}
                            </div>}
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
            
        )
    }
}
