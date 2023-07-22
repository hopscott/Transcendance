import React from "react";

const Title = ({name, className}) => {
	return (
		<div className={className}>
			<h1>{name}</h1>
		</div>
	)
}

export default Title