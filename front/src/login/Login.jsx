import React from "react";

import './Login.scss'

export default class Login extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
		  username: '',
		  password: ''
		};
	}
	
	  handleUsernameChange(event) {
		this.setState({ username: event.target.value });
	  }
	
	  handlePasswordChange(event) {
		this.setState({ password: event.target.value });
	  }
	
	  handleSubmit(event) {
		event.preventDefault();

		const { username, password } = this.state;

		fetch('http://localhost:3000/test/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username, password })
		  })
		  .then(response => response.text())
		  .then(data => console.log(data))
		  .catch(error => console.error('Erreur:', error));
	  }
	
	  render() {
		const { username, password } = this.state;
	
		return (
		  <div className="login-window">
			<h2>Connexion</h2>

			<form onSubmit={this.handleSubmit.bind(this)}>
			  <input
			  	id="username"
				type="text"
				placeholder="Nom d'utilisateur"
				value={username}
				onChange={this.handleUsernameChange.bind(this)}
			  />

			  <input
			  	id="password"
				type="password"
				placeholder="Mot de passe"
				value={password}
				onChange={this.handlePasswordChange.bind(this)}
			  />

			  <button className="login-btn" type="submit">Se connecter</button>
			</form>

		  </div>
		)
	  }
	}