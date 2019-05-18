import './chatApp.css'
import React from 'react'
import Chatkit from '@pusher/chatkit-client'
import MessageWindow from './MessageWindow'
import SendMessageForm from './SendMessageForm'
import MessageList from './MessageList'
import ShowHide from './ShowHide'
//import NewMessageForm from './NewMessageForm'

class ChatApp extends React.Component {
    state = {
        roomId: null,
        messages: [],
        joinableRooms: [],
        joinedRooms: [],
        hide: false,
        currentUserId: this.props.email
    }

    componentDidMount() {

        
    }

    componentDidUpdate(){

        const chatManager = new Chatkit.ChatManager({
            instanceLocator: 'v1:us1:22ea8e99-d0c0-4562-b5e8-847a27eaa8e2',
            userId: this.state.currentUserId || 'client4',
            tokenProvider: new Chatkit.TokenProvider({
                url: 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/22ea8e99-d0c0-4562-b5e8-847a27eaa8e2/token'
            })
        })
        chatManager.connect()
            .then(currentUser => {
                this.currentUser = currentUser;
                this.getChats()


            }).catch(err => console.log('error on connecting: ', err))

    }

    getChats = () => {
        this.currentUser.getJoinableRooms()
            .then(joinableRooms => {
                this.setState({
                    joinableRooms: joinableRooms,
                    joinedRooms: this.currentUser.rooms
                })
            }).catch(err => console.log('error on joinableRooms: ', err))
    }

    subscribeToChat = (roomId) => { //ROOM ID COMING THROUGH FROM MESSAGELIST
        this.setState({ messages: [] });
        //console.log(`room id in subscribeToChat (App.js): ${roomId}`) //works
        this.currentUser.subscribeToRoom({
            roomId: roomId /* this.currentUser.rooms[0].id */,
            hooks: {
                onMessage: message => {
                    console.log(`subscribed successfully`)
                    //console.log('message.text: ', message.text);
                    this.setState({
                        messages: [...this.state.messages, message]
                    });
                }
            }
        }).then(room => {
            this.setState({
                roomId: room.id
            })
            this.getChats()
        }).catch(err => console.log('error on subscribing to room: ', err))
    }

    sendMessage = (text) => {
        this.currentUser.sendMessage({
            text: text,
            roomId: this.state.roomId/* this.currentUser.rooms[0].id */,
        })
    }

    createChat(parameter) {   //create new chat not done until implemented into app

        console.log( 'logged in chat email' + this.state.currentUserId )
        
        this.currentUser.createRoom({
            name: 'test' ,
            private: true,
            addUserIds: [ this.state.currentUserId ],
        })
            .then(room => this.subscribeToChat(room.id)) // may not need this
            .catch(err => console.log('error with createRoom: ', err))
    } 

    //for creating a new user
    /* newUser = () => {
        const chatkit = new Chatkit.default({
            instanceLocator: "YOUR INSTANCE LOCATOR",
            key: "YOUR SECRET KEY"
        })

        chatkit.createUser({
            id: "bookercodes",
            name: "Alex Booker"
        })
    } */

    showHide = (hide) => {
        this.setState({
            hide: hide
        })
    }

    activeChat = () => {
        return (
            <div className="app">
                <MessageList
                    roomId={this.state.roomId}
                    subscribeToChat={this.subscribeToChat}
                    rooms={[...this.state.joinedRooms, ...this.state.joinableRooms]} />
                <MessageWindow messages={this.state.messages} />
                <SendMessageForm sendMessage={this.sendMessage} />
                {/* <NewMessageForm /> */}
                <ShowHide hide={this.state.hide} showHide={this.showHide} />
            </div>
        )
    }

    hiddenChat = () => {
        return (
            <div className="app-hidden">
                <ShowHide hide={this.state.hide} showHide={this.showHide} />
            </div>
        )
    }


    render() {
        console.log(`login email: ${this.props.email}`)
        //console.log(`hide state in ChatApp ${this.state.hide}`)
        //console.log(this.state.joinedRooms[0]) //shows a lot
        //\console.log(` messages: ${this.state.messages}`) //works
        //console.log(`room in state ${this.state.roomId}`) //works
        return (
            <div>
                {!this.state.hide ? this.activeChat() : this.hiddenChat()}
            </div>
        );
    }
}

export default ChatApp