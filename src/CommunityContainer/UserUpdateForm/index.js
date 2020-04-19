import React, { Component } from 'react'
import { Form, Button, Modal } from 'semantic-ui-react'
import './UserUpdateForm.css'



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

	componentDidMount() {
		this.setState({
			first_name: this.props.user.first_name,
			last_name: this.props.user.last_name
		})
	}

	
	// allow user to type on the form
	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	// close modal
	close = () => {
		this.props.switcher("updateUserAccountOpen")
	}

	handleSubmit = (e) => {
		e.preventDefault()
		this.props.updateAccount(this.state)
		this.close()
	}


	render() {

		return(
			<div>
				

				<Modal size="mini" open={this.state.open} onClose={this.close}>
					<h2>Update Account</h2>
					
					<Form onSubmit={this.handleSubmit}>
						<Form.Input 
							label="First name"
							name="first_name"
							type="text"
							placeholder="First name"
							value={this.state.first_name}
							onChange={this.handleChange}
						/>

						<Form.Input 
							label="Last name"
							type="text"
							placeholder="Last name"
							name="last_name"
							value={this.state.last_name}
							onChange={this.handleChange}
						/>

						<Form.Input 
							label="Password"
							name="password"
							type="password"
							placeholder="Password"
							value={this.state.password}
							onChange={this.handleChange}
						/>

						<Button style={{width: "100%"}} color="green" type="submit">Update</Button>

					</Form>

				</Modal>
			</div>
			)
	}
}




export default UserUpdateForm