import React from "react";

import PositionedDiv from "./PositionedDiv"

export default class PongPaddle extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			left: props.left, width: props.width, height: props.height,
			x: props.x, y: props.y,
			screenWidth: window.innerWidth, screenHeight: window.innerHeight,
		}

		this.updateTimer = null
		this.dirY = 10
		this.wayBack = false
	}

	updateScreenSize = () => {
		this.setState({
			screenWidth: window.innerWidth,
			screenHeight: window.innerHeight,
		});
	};

	updatePosition() {
		if (this.state.y + this.state.height >= this.state.screenHeight)
			this.dirY = -10
		else if (this.state.y <= 0)
			this.dirY = 10;

		this.setState((prevState) => ({ y: prevState.y + this.dirY }))
	}

	componentDidMount() {
		window.addEventListener("resize", this.updateScreenSize);

		this.updateTimer = window.setInterval(this.updatePosition.bind(this), 100)
	}
	
	componentWillUnmount() {
		window.removeEventListener("resize", this.updateScreenSize);
		window.clearInterval(this.updateTimer)
	}

	render() {
		const x = this.state.left ? this.state.x : this.state.screenWidth - this.state.x
		const y = this.state.left ? this.state.y : this.state.screenHeight - this.state.y - this.state.height 

		return (
			<PositionedDiv className={this.props.className}
				x={x} y={y}
				style={{width: this.state.width + "px", height: this.state.height + "px"}}/>
		)
	}

}

PongPaddle.defaultProps = {
	width: 50,
	height: 250
}