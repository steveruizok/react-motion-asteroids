import * as React from 'react'
import { MotionValue } from 'framer-motion'
import { PointWrapper } from './point-wrapper'

export const Ship: React.FC<{
	x: MotionValue<number>
	y: MotionValue<number>
	angle: MotionValue<number>
	radius: number
}> = ({ x, y, angle, radius }) => {
	return (
		<PointWrapper x={x} y={y} angle={angle}>
			<svg
				viewBox={`0 0 ${radius * 2} ${radius * 2}`}
				style={{
					width: radius * 2,
					height: radius * 2,
					transform: 'rotate(90deg)',
					position: 'absolute',
				}}
			>
				<path
					d={`M ${radius},1 L ${radius * 1.75},${radius *
						1.5} ${radius},${radius * 2 - 1} ${radius * 0.25},${radius *
						1.5} ${radius},1 Z`}
					fill="none"
					strokeWidth={2}
					strokeLinejoin="round"
					strokeLinecap="round"
					stroke="#41FF00"
				/>
			</svg>
		</PointWrapper>
	)
}
