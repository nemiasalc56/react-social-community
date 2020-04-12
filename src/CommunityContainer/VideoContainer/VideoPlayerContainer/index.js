import React, { Component } from 'react'
import YouTube from 'react-youtube'



class VideoPlayerContainer extends Component {
	constructor(props) {
		super(props)

		this.state = {
			opts: {
		    	height: '490',
		      	width: '740',
		      	playerVars: {
	        		autoplay: 1,
	      		}
			}
		}
	}

	onReady(event) {
    	// access to player in all event handlers via event.target
    	event.target.pauseVideo();
  	}

	render() {
		console.log(this.props.videoToPlay);


		return(
			<div>
				<h1>{this.props.videoToPlay.snippet.title}</h1>
				<YouTube 
					videoId={this.props.videoToPlay.id}
					opts={this.state.opts}
					onReady={this.onReady}
				/>
			</div>
			)
	}
}




export default VideoPlayerContainer