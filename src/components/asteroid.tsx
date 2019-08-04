import * as React from 'react'
import { MotionValue } from 'framer-motion'
import { PointWrapper } from './point-wrapper'
import { range, random } from 'lodash'

export const Asteroid: React.FC<{
	x: MotionValue<number>
	y: MotionValue<number>
	angle: MotionValue<number>
	radius: number
}> = ({ x, y, angle, radius = 100 }) => {
	const path = React.useMemo(() => {
		const num = 3 + Math.floor(radius / 3)
		const gap = 360 / num

		const points = range(num).map((i) => {
			const offset = random(0.82, 1) * radius
			const angle = (i * gap * Math.PI) / 180 // degress -> radians
			return [
				offset * Math.cos(angle) + radius,
				offset * Math.sin(angle) + radius,
			]
		})

		const [ox, oy] = points[0]

		return `M ${ox},${oy} L ${points
			.slice(1)
			.map((p) => p.join(','))
			.join(' ')} Z`
	}, [])

	return (
		<PointWrapper x={x} y={y} angle={angle}>
			<svg
				viewBox={`0 0 ${radius * 2} ${radius * 2}`}
				style={{
					width: radius * 2,
					height: radius * 2,
					position: 'absolute',
				}}
			>
				<path d={path} fill="none" strokeWidth={2} stroke="#41FF00" />
			</svg>
		</PointWrapper>
	)
}
