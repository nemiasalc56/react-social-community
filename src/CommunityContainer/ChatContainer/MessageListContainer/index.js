import React from 'react'



function MessageListContainer(props) {


	// loop through the messages to show the list
	const messages = props.messages.map((message)=> {

		if(props.user.id === message.owner_fk.id) {

			return(
				<div key={message.id} className="my-message">
					<p>{message.message}</p>
					<small>{message.owner_fk.first_name} on {message.created_at}</small>
				</div>
				)

		} else {
			return(
				<div key={message.id} className="other-message">
					<p>{message.message}</p>
					<small>{message.owner_fk.first_name} on {message.created_at}</small>
				</div>
				)
		}
	})

	return(
		<div className="message-list">
			{messages}
		</div>
		)
}



export default MessageListContainer