import React from "react"

import "./Homepage.scss"

export default class HomePage extends React.Component {

	queueMatchmaking() {

	}

	displayLeaderboard() {

	}

	openChat() {

	}

	displayHistory() {

	}

	profilePage() {

	}

	friendsPage() {

	}

	logout() {

	}

	render() {
		return (
			<div className="home-page">
				<h1 className="heading">THE REAL PONG</h1>
	  
				<div className="center-menu">
					<p onClick={this.queueMatchmaking()}>PLAY</p>
					<p onClick={this.displayLeaderboard()}>LEADERBOARD</p>
					<p onClick={this.openChat()}>CHAT</p>
					<p onClick={this.displayHistory()}>HISTORY</p>
				</div>

				<div className="bottom-left-menu">
					<p onClick={this.profilePage()}>PROFILE</p>
					<p onClick={this.friendsPage()}>FRIENDS</p>
					<p onClick={this.logout()}>LOGOUT</p>
				</div>

				<div className="bottom-right-menu">
					<p onClick={this.profilePage()}>acousini</p>
					<p onClick={this.friendsPage()}>jpeyron</p>
					<p onClick={this.logout()}>iguscett</p>
					<p onClick={this.logout()}>tcarasso</p>
				</div>
			</div>
		)
	}
}