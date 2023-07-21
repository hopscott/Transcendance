import React from "react";

const Title = ({name}) => {
	return (
		<div className={name.toLowerCase().replace(/ /g,"-")}>
			<h1>{name}</h1>
		</div>
	)
}

export default Title