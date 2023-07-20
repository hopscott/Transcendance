import React from "react"

import "./Signin.scss"

export default class Signin extends React.Component {

	signIn() {
		console.log("Redirect to sign-in!")
	}

	render() {
		return (
			<div>
				<h1>THE REAL PONG</h1>
				<button className="signin-button" onClick={this.signIn}>SIGN IN</button>
			</div>
		)
	}

}