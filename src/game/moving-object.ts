import { motionValue, MotionValue } from 'framer-motion'
import { getOffsetPoint } from './utils'
import { screen } from './index'
import { uniqueId } from 'lodash'

export interface MovingObjectOptions {
	x?: number
	y?: number
	velocity?: number
	angle?: number
	radius?: number
	wraps?: boolean
}

export default class MovingObject {
	id = uniqueId()
	dead = false
	x: MotionValue<number>
	y: MotionValue<number>
	angle: MotionValue<number>
	velocity: number
	radius: number
	wraps = true
	maxVelocity = 10
	friction = 0

	constructor(options = {} as MovingObjectOptions) {
		const {
			x = 0,
			y = 0,
			angle = 0,
			velocity = 0,
			radius = 12,
			wraps = true,
		} = options

		this.x = motionValue(x)
		this.y = motionValue(y)
		this.angle = motionValue(angle)
		this.radius = radius
		this.velocity = velocity
		this.wraps = wraps
	}

	wrap = (x: number, y: number) => {
		const { radius: r } = this
		const { width, height } = screen

		if (x - r > width) {
			x = -r
		}
		if (x + r < 0) {
			x = width + r
		}
		if (y - r > height) {
			y = -r
		}
		if (y + r < 0) {
			y = height + r
		}

		return [x, y]
	}

	offScreen = (x: number, y: number) => {
		const { radius: r } = this
		const { width, height } = screen
		return x - r > width || x + r < 0 || y - r > height || y + r < 0
	}

	getOffsetPoint = (distance: number, angle = this.angle.get()) => {
		const { x, y } = this
		return getOffsetPoint(x.get(), y.get(), angle, distance)
	}

	hitTest = (x: number, y: number) => {
		return Math.hypot(this.y.get() - y, this.x.get() - x) < this.radius
	}

	turn = (direction: 'left' | 'right') => {
		if (direction === 'left') {
			this.angle.set(this.angle.get() - 4)
		}
		if (direction === 'right') {
			this.angle.set(this.angle.get() + 4)
		}
	}

	accelerate = () => {
		if (this.velocity < this.maxVelocity) {
			this.velocity += 1
		}
	}

	move = () => {
		const { wrap, friction, wraps, x, y, velocity, maxVelocity } = this
		let [nx, ny] = this.getOffsetPoint(velocity)

		if (velocity > maxVelocity) {
			this.velocity *= 0.98
		}

		if (friction) {
			this.velocity *= 1 - friction
		}

		if (wraps) {
			;[nx, ny] = wrap(nx, ny)
		} else {
			if (this.offScreen(nx, ny)) {
				this.remove()
			}
		}

		x.set(nx)
		y.set(ny)
	}

	start = () => {}
	update = () => {}
	remove = () => {}

	render = () => {
		if (this.dead) return
		this.move()
		this.update()
	}
}
