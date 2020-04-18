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

	
	// allow user to type on the form
	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
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
							name="first_name"
							placeholder="First name"
							value={this.state.first_name}
							onChange={this.handleChange}
						/>

						<Form.Input 
							label="Last name"
							placeholder="Last name"
							name="last_name"
							value={this.state.last_name}
							onChange={this.handleChange}
						/>

						<Form.Input 
							label="Password"
							name="password"
							placeholder="Password"
							value={this.state.password}
							onChange={this.handleChange}
						/>

						<Button type="submit">Update Account</Button>

					</Form>

				</Modal>
			</div>
			)
	}
}




export default UserUpdateForm