import * as React from 'react'
import { motion, MotionValue } from 'framer-motion'

export const PointWrapper: React.FC<{
	x: MotionValue<number>
	y: MotionValue<number>
	angle: MotionValue<number>
}> = ({ x, y, angle, children }) => {
	return (
		<motion.div
			style={{
				x,
				y,
				rotate: angle,
				position: 'relative',
				width: 0,
				height: 0,
				display: 'flex',
				placeItems: 'center',
				placeContent: 'center',
			}}
		>
			{children}
		</motion.div>
	)
}
