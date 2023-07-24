const PositionedDiv = ({className, x, y, style}) => {
	const divStyle = {
		position: "absolute",
		left: x + "px",
		top: y + "px",
		...style
	}
	
	return <div className={className} style={divStyle}/>
}

export default PositionedDiv