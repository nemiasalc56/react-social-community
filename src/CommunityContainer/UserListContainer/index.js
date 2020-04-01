import React from 'react'


function UserListContainer(props) {

	console.log(props.users);

	const users = props.users.map((user)=>{
		console.log(user.first_name);

		return(
			<div>
				<p key={user.id}>{user.first_name}</p>

			</div>
			)
	})

	return(
		<div>
			<h3>UserListContainer</h3>
			<div>
				{users}
			</div>
		</div>
		)
}


export default UserListContainer