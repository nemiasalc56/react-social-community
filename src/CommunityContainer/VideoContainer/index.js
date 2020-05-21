import React, { Component } from 'react'
import SearchVideoForm from './SearchVideoForm'
import VideoListContainer from './VideoListContainer'
import VideoPlayerContainer from './VideoPlayerContainer'



class VideoContainer extends Component {
	constructor() {
		super()

		this.state = {
			videos: [],
			videoListOpen: false,
			videoPlayerOpen: false,
			videoToPlay: null
		}
	}

	// show the user a list of videos when they first access
	componentDidMount() {
		this.getVideoIds("music")
	}



	// method that will get the videos to play
	getVideoIds = async (name) => {
		// define our url
		const url = `https://www.googleapis.com/youtube/v3/search?part=id&q=${name}&type=video&maxResults=15&key=` + process.env.REACT_APP_YOUTUBE_API_KEY

		try {

			// fetch call
			const videosResponse = await fetch(url, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			})

			const videosJson = await videosResponse.json()

			// we are storing the items that have the video id
			let videoIds = ""

			for(let i = 0; i < videosJson.items.length; i++) {
				// adding "%2C" works with all the ids
				videoIds +=  "%2C" + `${videosJson.items[i].id.videoId}`
			}

			this.getVideosInfo(videoIds)

		} catch(err) {
			console.error(err);
		}
	}

	// get video info with the video ids found
	getVideosInfo = async (videoIds) => {
		// define our youtube url
		const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoIds}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`
		try {

			const videosInfoResponse = await fetch(url, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			})

			const videosInfoJson = await videosInfoResponse.json()
			
			this.setState({
				videos: videosInfoJson.items,
				videoListOpen: true,
				videoPlayerOpen: false
			})

		} catch(err) {
			console.error(err);
		}
	}

	// method that get the video to play
	getVideoToPlay = (video) => {

		this.setState({
			videoPlayerOpen: true,
			videoToPlay: video
		})
	}

	// streaming video
	streamVideo = async () => {
		console.log("user is trying to stream");

// 		const url = `https://www.googleapis.com/youtube/v3/liveStreams?key=` + process.env.REACT_APP_YOUTUBE_API_KEY
// 
// 		try {
// 
// 			const streamResponse = await fetch(url, {
// 				method: 'POST',
// 				data: JSON.stringify(this.state.videoToPlay),
// 				headers: {
// 					'Content-Type': 'application/json'
// 				}
// 			})
// 
// 			const streamJson = await streamResponse.json()
// 
// 			console.log(streamJson); 
// 
// 		} catch(err) {
// 			console.error(err);
// 		}
	}


	render() {

		return(
			<div>
				<SearchVideoForm getVideoIds={this.getVideoIds}/>
				<button onClick={this.streamVideo}>Stream</button>
				{this.state.videoPlayerOpen?
					<VideoPlayerContainer 
						videoToPlay={this.state.videoToPlay}
					/>
					:null
				}

				{this.state.videoListOpen?
					<VideoListContainer 
						getVideoToPlay={this.getVideoToPlay}
						videos={this.state.videos} />
					: null
				}
			</div>
			)
	}
}



export default VideoContainer