import React from 'react'
import { Segment, Image } from 'semantic-ui-react'



function VideoListContainer(props) {
	
	// loop through the list
	const videos = props.videos.map((video) => {
		console.log(video.snippet);

		// we will return the list of videos found with 
		// the titles and a picture of the video
		return(
			<Segment key={video.id}>

				<Image 
					src={video.snippet.thumbnails.standard.url} 
				/>
				<h1>{video.snippet.title}</h1>

			</Segment>
			)
	})


	return(
		<div>
			{videos}
		</div>
		)
}




export default VideoListContainer