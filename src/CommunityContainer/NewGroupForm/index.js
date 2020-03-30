import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'



class NewGroupForm extends Component {
	constructor() {
		super()

		this.state = {
			name: ''
		}
	} 

	render() {

		return(
			<div>
				<Form>

					<Form.Input 
						label="Group Name:"
						type="text" 
						name="name" />
				</Form>
			</div>
			)
	}
}


export default NewGroupForm