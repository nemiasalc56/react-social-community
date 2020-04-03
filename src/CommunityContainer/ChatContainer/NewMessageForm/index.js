import React, { Component } from 'react'
import { Form, Button } from 'semantic-ui-react'


class NewMessageForm extends Component {
	constructor() {
		super()

		this.state = {
			message: ''
		}
	}




	render() {
		return(
			<div>
				<Form>
					
					<Form.Input 
						type="text"
						value={this.state.message}
					/>
					<Button type="submit">Send</Button>
				</Form>
			</div>
			)
	}
}


export default NewMessageForm