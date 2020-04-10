import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'
import SearchVideoForm from './SearchVideoForm'
import VideoListContainer from './VideoListContainer'



class VideoContainer extends Component {
	constructor() {
		super()

		this.state = {
			videos: []
		}
	}


	// method that will get the videos to play
	getVideos = async (name) => {
		// define our url
		const url = `https://www.googleapis.com/youtube/v3/search?part=id&q=${name}&type=video&key=` + process.env.REACT_APP_YOUTUBE_API_KEY

		try {

			// fetch call
			const videosResponse = await fetch(url, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			})

			const videosJson = await videosResponse.json()
			console.log(videosJson.items[0].id.videoId);
			this.setState({videoId: videosJson.items[0].id.videoId})

		} catch(err) {
			console.error(err);
		}
	}


	render() {

		return(
			<div>
				<SearchVideoForm getVideos={this.getVideos}/>

				<VideoListContainer />
			</div>
			)
	}
}



export default VideoContainer