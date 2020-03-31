import React from 'react'



function GroupListContainer(props) {

	

	const groups = props.groups.map((group) => {
		console.log(group.name);

		return(
			<div>
				<li key={group.id}>
					{group.name}
				</li>
				
			</div>
			)
	})


	return(
		<div>
			<ul>
				{groups}
			</ul>
		</div>
		)
}



export default GroupListContainer