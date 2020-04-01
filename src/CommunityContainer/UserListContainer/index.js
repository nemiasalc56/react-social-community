import React from 'react'
import './UserListContainer.css'
import { Segment } from 'semantic-ui-react'


function UserListContainer(props) {

	console.log(props.users);

	const users = props.users.map((user)=>{
		console.log(user.first_name);

		return(
				<Segment key={user.id} onClick={()=> console.log(user.id)}>
					{user.first_name}
				</Segment>
			)
	})

	return(
		<div>
			<div className="user-list">
				{users}
			</div>
		</div>
		)
}


export default UserListContainer