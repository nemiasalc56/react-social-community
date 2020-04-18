import React, { Component } from 'react'
import { Form, Button, Modal } from 'semantic-ui-react'



class UserUpdateForm extends Component {
	constructor(props) {
		super(props)

		this.state = {
			open: true,
			first_name: '',
			last_name: '',
			password: ''
		}
	}


	render() {

		return(
			<div>
				UserUpdateForm

				<Modal size="mini" open={this.state.open} >
					<h3>UserUpdateForm</h3>
					
					<Form>
						<Form.Input 
							label="First name"
							placeholder="First name"
							value={this.state.first_name}
						/>

						<Form.Input 
							label="Last name"
							placeholder="Last name"
							value={this.state.last_name}
						/>

						<Form.Input 
							label="Password"
							placeholder="Password"
							value={this.state.password}
						/>

						<Button type="submit">Update Account</Button>

					</Form>

				</Modal>
			</div>
			)
	}
}




export default UserUpdateForm