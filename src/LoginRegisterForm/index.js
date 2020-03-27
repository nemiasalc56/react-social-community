import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'


class LoginRegisterForm extends Component {
	constructor(props) {
		super(props)

		this.state = {
			first_name: '',
			last_name: '',
			picture: '',
			email: '',
			password: ''
		}
	}

	// handle input changes
	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	handleSubmit = (e) => {
		e.preventDefault()
		this.props.register(this.state)
	}



	render() {
		return(
			<div>
				<h3>LoginRegisterForm</h3>

				<Form onSubmit={this.handleSubmit}>
					<Form.Input 
						label="First name"
						type="text"
						name="first_name"
						value={this.state.first_name}
						onChange={this.handleChange}
						placeholder="First name"
					/>

					<Form.Input
						label="Last name"
						type="text"
						name="last_name"
						value={this.state.last_name}
						onChange={this.handleChange}
						placeholder="Last name"
					/>

					<Form.Input
						label="Picture"
						type="text"
						name="picture"
						value={this.state.picture}
						onChange={this.handleChange}
						placeholder="Picture"
					/>

					<Form.Input
						label="Email"
						type="text"
						name="email"
						value={this.state.email}
						onChange={this.handleChange}
						placeholder="Email"
					/>

					<Form.Input
						label="Password"
						type="password"
						name="password"
						value={this.state.password}
						onChange={this.handleChange}
						placeholder="Password"
					/>

					<button type="submit">Sing Up</button>
				</Form>

			</div>
			)
	}
}


export default LoginRegisterForm