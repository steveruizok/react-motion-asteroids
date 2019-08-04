import * as React from 'react'
import { MotionValue } from 'framer-motion'
import { PointWrapper } from './point-wrapper'

export const Bullet: React.FC<{
	x: MotionValue<number>
	y: MotionValue<number>
	angle: MotionValue<number>
	radius: number
}> = ({ x, y, angle, radius }) => {
	return (
		<PointWrapper x={x} y={y} angle={angle}>
			<div
				style={{
					position: 'absolute',
					height: radius * 2,
					width: radius * 2,
					borderRadius: '100%',
					backgroundColor: '#41FF00',
				}}
			/>
		</PointWrapper>
	)
}
