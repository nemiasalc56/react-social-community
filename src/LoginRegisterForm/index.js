import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'


class LoginRegisterForm extends Component {


	render() {
		return(
			<div>
				<h3>LoginRegisterForm</h3>

				<Form>
					<Form.Input 
						label="First name"
						type="text"
						name="first_name"
						placeholder="First name"
					/>

					<Form.Input
						label="Last name"
						type="text"
						name="last_name"
						placeholder="Last name"
					/>

					<Form.Input
						label="Email"
						type="text"
						name="email"
						placeholder="Email"
					/>

					<Form.Input
						label="Password"
						type="password"
						name="password"
						placeholder="Password"
					/>
				</Form>

			</div>
			)
	}
}


export default LoginRegisterForm