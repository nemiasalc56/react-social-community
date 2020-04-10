import React from 'react'
import { Segment, Button } from 'semantic-ui-react'


function MemberList(props) {

	const members = props.members.map((member) => {
		console.log(member.member_fk);
		return(
			<Segment key={member.id}>
				<h1>{member.member_fk.first_name}</h1>
				<Button className="basic" color="red">Remove Member</Button>

			</Segment>
			)
	})

	return(
		<div>
			{members}
		</div>
		)
}


export default MemberList