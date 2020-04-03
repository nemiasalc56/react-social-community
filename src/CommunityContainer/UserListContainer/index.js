import React from 'react'
import './UserListContainer.css'
import { Segment } from 'semantic-ui-react'


function UserListContainer(props) {

	console.log(props.users);

	console.log("logged in user");
	console.log(props.loggedInUser.id);
	const users = props.users.map((user)=>{
		// return all the users except the one logged in
		if(user.id === props.loggedInUser.id){
			return null
		}else {
			return(
					<Segment key={user.id} onClick={()=> props.addMember(user.id)}>
						{user.first_name}
					</Segment>
				)

		}
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