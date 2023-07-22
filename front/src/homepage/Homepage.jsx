import React from "react"

import Title from "../components/Title.jsx"
import Button from "../components/Button"

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
				
				<div className="header">
					<Title name="THE REAL PONG" className="homepage-title"/>
				</div>

				<div className="main">

					<div className="center-menu">
						<Button name="PLAY" className="play-button"
							clickAction={this.queueMatchmaking}/>

						<Button name="LEADERBOARD" className="leaderboard-button"
							clickAction={this.displayLeaderboard}/>

						<Button name="CHAT" className="chat-button"
							clickAction={this.openChat}/>

						<Button name="HISTORY" className="history-button"
							clickAction={this.displayHistory}/>
					</div>

				</div>
				
				<div className="footer">
					<div className="settings">
						<Button name="PROFILE" className="button"/>
						<Button name="FRIENDS" className="button"/>
						<Button name="LOGOUT" className="button"/>
					</div>
					<div className="logins">
						<Button name="acousini" className="button"/>
						<Button name="jpeyron" className="button"/>
						<Button name="iguscett" className="button"/>
						<Button name="tcarasso" className="button"/>
					</div>
				</div>
			</div>
		)
	}
}