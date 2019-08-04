import * as React from 'react'

export const EndScreen: React.FC<{
	onClick: any
}> = ({ onClick }) => {
	return (
		<div>
			<h1>Game Over</h1>
			<button style={{ all: 'unset' }} onClick={onClick}>
				Play Again
			</button>
		</div>
	)
}
