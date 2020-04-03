import React, { Component } from 'react'
import { Form, Button } from 'semantic-ui-react'


class NewMessageForm extends Component {
	constructor(props) {
		super(props)

		this.state = {
			message: ''
		}
	}


	// handle the changes when user types
	handleChange = (e) => {
		this.setState({message: e.target.value})
	}

	// submit message
	handleSubmit = (e) => {
		e.preventDefault()
		console.log("user is trying to submit changes");
	}

	render() {
		return(
			<div>
				<Form onSubmit={this.handleSubmit}>
					
					<Form.Input 
						type="text"
						value={this.state.message}
						onChange={this.handleChange}
					/>
					<Button type="submit">Send</Button>
				</Form>
			</div>
			)
	}
}


export default NewMessageForm