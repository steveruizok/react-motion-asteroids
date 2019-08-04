import MovingObject from './moving-object'
import { defaults, random } from 'lodash'
import { game } from './index'

export default class Asteroid extends MovingObject {
	constructor(options = {}) {
		super(
			defaults(options, {
				velocity: random(0.2, 0.5),
				angle: random(360),
				radius: random(32, 128),
			})
		)
	}

	break = () => {
		this.remove()
		if (this.radius > 32) {
			const r = random(0.25, 0.75)
			game.asteroids.add(this.getChunk(r))
			game.asteroids.add(this.getChunk(1 - r))
			game.setAsteroids(new Set(game.asteroids))
		}
	}

	getChunk = (size = 0.5) => {
		const { radius, velocity } = this
		const [x, y] = this.getOffsetPoint(
			random(this.radius / 4, this.radius / 2),
			Math.random() * 360
		)
		return new Asteroid({
			x,
			y,
			radius: radius * size,
			velocity: velocity * 1.5,
		})
	}

	update = () => {}

	remove = () => {
		game.asteroids.delete(this)
		game.setAsteroids(new Set(game.asteroids))
	}
}
