import React, { Component } from 'react'
import NewMessageForm from './NewMessageForm'
import './ChatContainer.css'
import MessageListContainer from './MessageListContainer'
import io from 'socket.io-client'



class ChatContainer extends Component {
	constructor(props) {
		super(props)

		this.state = {
			messages: this.props.messages
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

		const endPoint = process.env.REACT_APP_API_URL

		const socket = io(url)

		// const socket = io(`${endPoint}`)

		const room = this.props.groupToChat.id

		socket.emit('join', { room }, (error) => {
	      if(error) {
	        alert(error);
	      }
    	})

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
		const endPoint = process.env.REACT_APP_API_URL
		const socket = io.connect(endPoint)

		console.log('login group id');
		console.log(this.state.groupToChatId);


		socket.on('message', async (msg) => {
		
			try {
				// fetch call to get messages
				const messagesResponse = await fetch(url, {
					credentials: 'include',
					method: 'GET',
					headers: {
						'Content-Type': 'application/json'
					}
				})


				const messagesJson = await messagesResponse.json()
				console.log(messagesJson);
				if(messagesJson.status === 200) {
					
					this.setState({
						messages: messagesJson.data
					})	

				}



			} catch(err) {
				console.error(err);
			}
			
		})
	}


	render() {
		console.log("messagessss", this.props.groupToChat.id);
		return(
			<div>
				<h4>Chatting with the group named {this.props.groupToChat.name}</h4>
				<div className="message-container">
					<MessageListContainer messages={this.state.messages}/>
				</div>
				
				<div className="new-message-form">
					<NewMessageForm sendMessage={this.sendMessage} />
				</div>
			</div>
			)
	}
}




export default ChatContainer