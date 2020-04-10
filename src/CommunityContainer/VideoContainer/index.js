import React, { Component } from 'react'


class VideoContainer extends Component {
	constructor() {
		super()

		this.state = {
			videos: []
		}
	}

	componentDidMount() {
		this.getVideos()
	}


	// method that will get the videos to play
	getVideos =async () => {
		// define our url
		const url = `https://www.googleapis.com/youtube/v3/search?part=id&q=tuto&type=video&key=` + process.env.REACT_APP_YOUTUBE_API_KEY

		try {

			// fetch call
			const videosResponse = await fetch(url, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			})

			const videosJson = await videosResponse.json()
			console.log(videosJson);

		} catch(err) {
			console.error(err);
		}
	}

	render() {

		return(
			<div>
				VideoContainer
			</div>
			)
	}
}



export default VideoContainer