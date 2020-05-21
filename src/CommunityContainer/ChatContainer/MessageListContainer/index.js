import React from 'react'



function MessageListContainer(props) {


	// loop through the messages to show the list
	const messages = props.messages.map((message)=> {

		if(props.user.id === message.owner_fk.id) {

			return(
				<div className="message" key={message.id}>
					<div className="owner">
						<small>You</small>
					</div>
					<div className="message-mine">
						<div key={message.id} className="my-message">
							<p>{message.message}</p>
						</div>

					</div>
					
					<div className="owner">
						<small>{message.created_at}</small>
					</div>
				</div>
				)

		} else {
			return(
				<div className="message" key={message.id}>
					<div className="other">
						<small>{message.owner_fk.first_name}</small>
					</div>

					<div className="message-for-others">
						<div key={message.id} className="other-message">
							<p>{message.message}</p>
						</div>
						
					</div>
					<div className="other">
						<small>{message.created_at}</small>
					</div>
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