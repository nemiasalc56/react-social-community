import React, { Component } from 'react'
import './LoginRegister.css'
import { Form, Segment } from 'semantic-ui-react'



class LoginRegisterForm extends Component {
	constructor(props) {
		super(props)

		this.state = {
			first_name: '',
			last_name: '',
			picture: '',
			email: '',
			password: '',
			action: 'login'
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
		
		if(this.state.action === "register") {
			this.props.register(this.state)
		} else if(this.state.action === "login") {
			this.props.login(this.state)
		}

	}

	// switch form to register or login
	switchForm = () => {
		if (this.state.action === "login") {
			this.setState({action: "register"})
		} else {
			this.setState({action: "login"})
		}

		this.clearForm()
	}

	// clear our form when user switch to login or register
	clearForm = () => {
		this.setState({
			first_name: '',
			last_name: '',
			picture: '',
			email: '',
			password: ''
		})
	}



	render() {
		return(
			<div>
				<h1>Social Community</h1>

				<div className="login-register-form">
					<Segment>
						<div className="login-register-title">
							<h3>
								{this.state.action ==="login"?
								"Login" : "Register"
								}
							</h3>
							
						</div>

						<Form onSubmit={this.handleSubmit}>
							<Form.Field>
								
							
							{this.state.action === "login"
								? null

								:
								<div>
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
									
								</div>
							}

							

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

							</Form.Field>

							<Form.Field>
								<button color="green" type="submit">
									{this.state.action === "login"?"Sign In" : "Sign Up"}
								</button>
								
							</Form.Field>
							
							<p id="login-link" onClick={this.switchForm}>
								{this.state.action === "login"
									? "Create an account"
									: "Already have an account?"
								}
							</p>
						</Form>
					</Segment>

				</div>

			</div>
			)
	}
}


export default LoginRegisterForm