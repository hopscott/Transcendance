import React from "react"

import Title from "../../components/Title"
import Button from "../../components/Button"

import "./Signin.scss"

export default class Signin extends React.Component {

	signIn() {
		console.log("Redirect to sign-in!")
	}

	render() {
		return (
			<div className="signin-page">
				<Title name="THE REAL PONG" className="signin-title"/>
				<Button name="SIGN IN" className="signin-button" clickAction={this.signIn}/>
			</div>
		)
	}

}