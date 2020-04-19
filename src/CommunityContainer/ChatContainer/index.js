import React, { Component } from 'react'
import NewMessageForm from './NewMessageForm'
import './ChatContainer.css'
import { Button } from 'semantic-ui-react'
import MessageListContainer from './MessageListContainer'
import io from 'socket.io-client'

// declaring the var here don't the issue when loading socketio
const endPoint = process.env.REACT_APP_API_URL
const socket = io.connect(endPoint)



class ChatContainer extends Component {
	constructor(props) {
		super(props)

		this.state = {
			messages: []
		}
	}

	componentDidMount() {
		this.getMessages()
	}

	// send message method
	sendMessage = async (message) => {
		console.log("sendMessage method: user is trying to send message");
		console.log(message);

		// define the url
		const url = process.env.REACT_APP_API_URL + '/api/v1/messages/' + this.props.groupToChat.id

		socket.emit("message", message);


		console.log(this.props.groupToChat);
		try {
			// fetch call that will send the message
			const sendMessageResponse = await fetch(url, {
				credentials: 'include',
				method: 'POST',
				body: JSON.stringify(message),
				headers: {
					'Content-Type': 'application/json'
				}
			})

			const sendMessageJson = await sendMessageResponse.json()
			console.log(sendMessageJson);

			// if succesfully send message added in state
			if(sendMessageJson.status === 200) {
				const messages = this.state.messages
				messages.push(sendMessageJson.data)
				this.setState({messages: messages})
			}

		} catch(err) {
			console.error(err);
		}
	}

	// get all the messages
	getMessages = async () => {
		// define the url to get messages
		const url = process.env.REACT_APP_API_URL + '/api/v1/messages/' + this.props.groupToChat.id
		
		socket.on('message', (msg) => {
			console.log("this is socket message >> ", msg);
			this.getMessages()
		})
		
		try {
			
			// fetch call to get messages
			const messagesResponse = await fetch(url, {
				credentials: 'include',
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			})
			console.log("getting messages");

			const messagesJson = await messagesResponse.json()
			console.log("this is getMessages in ChatContainer")
			console.log(messagesJson)
			if(messagesJson.status === 200) {
				
				this.setState({
					messages: messagesJson.data
				})	

			}

		} catch(err) {
			console.error(err);
		}
			
	}

	// go back to group list
	goBack = () => {

		
		// leave room

		const room = this.props.groupToChat.id

		socket.emit('leave', { room }, (error) => {
	      if(error) {
	        alert(error);
	      }
    	})

		this.props.switcher("chatContainer")
	}


	render() {
		return(
			<div>
				<Button style={{width: "100%"}} onClick={this.goBack}>Go Back</Button>
				<h2 id="group-name">{this.props.groupToChat.name}</h2>
				<div className="message-container">
					<MessageListContainer 
						user={this.props.user}
						messages={this.state.messages}/>
				</div>
				
				<div className="new-message-form">
					<NewMessageForm sendMessage={this.sendMessage} />
				</div>
			</div>
			)
	}
}




export default ChatContainer