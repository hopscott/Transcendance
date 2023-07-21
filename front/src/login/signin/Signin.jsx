import React from "react"

import Title from "../../components/Title.jsx"
import Button from "../../components/Button"

import "./Signin.scss"

export default class Signin extends React.Component {

	signIn() {
		console.log("Redirect to sign-in!")
	}

	render() {
		return (
			<div>
				<Title name="THE REAL PONG"/>
				<Button name="SIGN IN" clickAction={this.signIn}/>
			</div>
		)
	}

}