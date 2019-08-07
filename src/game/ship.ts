import MovingObject from './moving-object'
import Bullet from './bullet'
import { game } from './index'

export default class Ship extends MovingObject {
	dead = false
	friction = 0.08
	maxVelocity = 6

	start = () => {
		game.inputs.set('w', this.accelerate)
		game.inputs.set('a', () => this.turn('left'))
		game.inputs.set('d', () => this.turn('right'))
		game.presses.set(' ', this.shoot)
	}

	update = () => {
		if (this.dead) return
		game.asteroids.forEach((asteroid) => {
			if (this.dead) return
			if (asteroid.hitTest(this.x.get(), this.y.get())) {
				this.dead = true
				asteroid.break()
			}
		})

		if (this.dead) {
			game.handlePlayerDeath()
		}
	}

	shoot = () => {
		const { angle, velocity, dead } = this
		if (dead) return

		const [x, y] = this.getOffsetPoint(this.radius + 3)

		game.bullets.add(
			new Bullet({
				x,
				y,
				angle: angle.get(),
				velocity: velocity + 10,
			})
		)

		// game.setBullets(new Set(game.bullets))
	}
}
