import MovingObject from './moving-object'
import { game } from './index'

export default class Bullet extends MovingObject {
	radius = 2.5
	maxVelocity = 12
	wraps = false

	constructor(options = {}) {
		super(options)
	}

	update = () => {
		let dead = false
		game.asteroids.forEach((asteroid) => {
			if (dead) return
			if (asteroid.hitTest(this.x.get(), this.y.get())) {
				dead = true
				game.hits += 1
				asteroid.break()
			}
		})
		if (dead) {
			this.remove()
		}
	}

	remove = () => {
		game.shots += 1
		game.bullets.delete(this)
		// game.setBullets(new Set(game.bullets))
	}
}
